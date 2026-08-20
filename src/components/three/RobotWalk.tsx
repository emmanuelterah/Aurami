"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadModel } from "./loadModel";
import { useNearViewport } from "./useNearViewport";
import { applyBrandAccent } from "./warmModel";
import styles from "./RobotWalk.module.css";

const ACCENT = 0xf7d081;
const ACCENT_2 = 0xe5764f;
const WALK_SPEED = 0.5; // world units per second
const ROBOT_HEIGHT = 1.7;
const AWARE_HEADING = -0.55; // turned toward the person callout, viewer-left

type Props = {
  variant?: "scene" | "strip";
  /** "walk": patrol across the scene. "aware": stand attentively and scan. */
  mode?: "walk" | "aware";
  children?: React.ReactNode; // fallback shown until the model loads
};

export default function RobotWalk({
  variant = "scene",
  mode = "walk",
  children,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(mountRef);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !near) return;

    let disposed = false;
    let raf = 0;
    let visible = true;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      variant === "scene" ? 36 : 30,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    if (variant === "scene") {
      camera.position.set(0, 1.15, 5.4);
      camera.lookAt(0, 0.85, 0);
    } else {
      camera.position.set(0, 1.0, 7.2);
      camera.lookAt(0, 0.8, 0);
    }

    // same darkness-and-rim-light language as the hero
    scene.add(new THREE.HemisphereLight(0x3a332a, 0x080604, 0.7));
    const key = new THREE.DirectionalLight(0xfff1dd, 0.75);
    key.position.set(1.5, 2.5, 3);
    scene.add(key);
    const rimL = new THREE.DirectionalLight(ACCENT, 2.6);
    rimL.position.set(-3, 1.8, -2.4);
    scene.add(rimL);
    const rimR = new THREE.DirectionalLight(ACCENT_2, 2.1);
    rimR.position.set(3, 1.0, -2.2);
    scene.add(rimR);

    // soft blob shadow that follows the robot
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const g = shadowCanvas.getContext("2d");
    if (g) {
      const grad = g.createRadialGradient(64, 64, 4, 64, 64, 60);
      grad.addColorStop(0, "rgba(0,0,0,0.65)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.55),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.001;
    scene.add(shadow);

    const group = new THREE.Group();
    scene.add(group);

    let mixer: THREE.AnimationMixer | null = null;
    const BOUND = variant === "scene" ? 1.8 : 2.8;
    let dir = 1;
    let heading = Math.PI / 2; // facing +x (direction of travel)
    let targetHeading = heading;

    loadModel(
      mode === "aware" ? "/models/reaching.glb" : "/models/walk.glb",
    ).then(
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = ROBOT_HEIGHT / size.y;
        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;
        model.position.y = -box.min.y * scale; // feet on the ground

        applyBrandAccent(model);
        group.add(model);
        if (mode === "aware") {
          group.position.x = 0.55;
          group.rotation.y = AWARE_HEADING;
          shadow.position.x = 0.55;
        } else {
          group.position.x = -BOUND;
          group.rotation.y = heading;
        }

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(model);
          const clip =
            gltf.animations.find((c) => /walk/i.test(c.name)) ??
            gltf.animations[0];
          mixer.clipAction(clip).play();
        }
        setReady(true);
      },
      () => {
        if (!disposed) setFailed(true);
      },
    );

    const clock = new THREE.Clock();
    let gaitT = 0;
    const STEP_FREQ = 1.9; // steps per second for the procedural gait
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);

      if (mode === "aware") {
        // reaching toward the bag: hold the gesture, faint breathing and a
        // very slight lean into the reach so the pose feels live
        gaitT += dt;
        group.rotation.y = AWARE_HEADING + Math.sin(gaitT * 0.3) * 0.05;
        group.rotation.x = 0.02 + Math.sin(gaitT * 0.7) * 0.008;
        group.position.y = Math.sin(gaitT * 0.9) * 0.01;
      } else {
        if (mixer) {
          mixer.update(dt);
        } else {
          // no animation clip in the GLB: fake a gait so the pose reads as
          // stepping — vertical bob on each step plus a subtle side sway
          gaitT += dt;
          const phase = gaitT * Math.PI * 2 * STEP_FREQ;
          group.position.y = Math.abs(Math.sin(phase * 0.5)) * 0.035;
          group.rotation.z = Math.sin(phase * 0.5) * 0.025;
          group.rotation.x = Math.abs(Math.sin(phase)) * 0.012;
        }

        // patrol: walk across, turn, walk back
        group.position.x += dir * WALK_SPEED * dt;
        if (group.position.x > BOUND) {
          dir = -1;
          targetHeading = -Math.PI / 2;
        } else if (group.position.x < -BOUND) {
          dir = 1;
          targetHeading = Math.PI / 2;
        }
        heading += (targetHeading - heading) * Math.min(1, dt * 4);
        group.rotation.y = heading;
        shadow.position.x = group.position.x;
      }

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mixer?.stopAllAction();
      shadowTex.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v instanceof THREE.Texture) v.dispose();
            });
            m.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant, mode, near]);

  const wrapClass = [
    styles.wrap,
    variant === "strip" ? styles.strip : "",
    ready ? styles.wrapReady : "",
    failed && variant === "strip" ? styles.hidden : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={mountRef}
      className={wrapClass}
      aria-label="Aria humanoid robot walking, 3D scene"
      role="img"
    >
      {!ready && children ? (
        <div className={styles.fallback}>{children}</div>
      ) : null}
    </div>
  );
}
