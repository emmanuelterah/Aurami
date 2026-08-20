"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadModel } from "./loadModel";
import { useNearViewport } from "./useNearViewport";
import { applyBrandAccent } from "./warmModel";
import styles from "./ShowcaseViewer.module.css";

const GOLD = 0xf7d081;
const AMBER = 0xe5764f;

/** 3D anchor per capability on the normalized (h=2.35, centered) body. */
const ANCHORS: Record<string, [number, number, number]> = {
  vision: [0, 1.0, 0.2],
  intelligence: [0.18, 0.82, 0.16],
  hands: [-0.45, -0.12, 0.14],
  learning: [0, 0.38, 0.2],
  movement: [0, -0.85, 0.14],
};

type Props = {
  focus: string;
  children?: React.ReactNode; // fallback until the model loads
};

/**
 * Showcase stage: Aria front-on and steady (the DOM hotspots are pinned at
 * fixed positions), breathing gently, while a warm focus light glides to
 * whichever capability is selected.
 */
export default function ShowcaseViewer({ focus, children }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(mountRef);
  const [ready, setReady] = useState(false);
  const targetRef = useRef(new THREE.Vector3(0, 1.0, 0.2));

  useEffect(() => {
    const a = ANCHORS[focus];
    if (a) targetRef.current.set(a[0], a[1], a[2]);
  }, [focus]);

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
      32,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.1, 4.8);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0x3a332a, 0x080604, 0.6));
    const key = new THREE.DirectionalLight(0xfff1dd, 0.65);
    key.position.set(1.2, 2.2, 3);
    scene.add(key);
    const rimL = new THREE.DirectionalLight(GOLD, 2.2);
    rimL.position.set(-3, 1.7, -2.4);
    scene.add(rimL);
    const rimR = new THREE.DirectionalLight(AMBER, 1.7);
    rimR.position.set(3, 0.9, -2.2);
    scene.add(rimR);

    // the guided-tour light: glides to the selected capability
    const focusLight = new THREE.PointLight(GOLD, 2.4, 2.2, 1.6);
    focusLight.position.copy(targetRef.current);
    scene.add(focusLight);

    const group = new THREE.Group();
    scene.add(group);

    loadModel("/models/hero.glb").then((gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 2.35 / size.y;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      applyBrandAccent(model);
      group.add(model);
      setReady(true);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();

      // steady front pose: breathing only, so the hotspots stay anchored
      group.position.y = Math.sin(t * 0.9) * 0.012;
      group.rotation.y = Math.sin(t * 0.25) * 0.03;

      focusLight.position.lerp(targetRef.current, 0.06);
      focusLight.intensity = 2.4 + Math.sin(t * 3) * 0.35;

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
  }, [near]);

  return (
    <div
      ref={mountRef}
      className={`${styles.wrap} ${ready ? styles.wrapReady : ""}`}
      aria-label="Aria full-body view, 3D model"
      role="img"
    >
      {!ready && children ? (
        <div className={styles.fallback}>{children}</div>
      ) : null}
    </div>
  );
}
