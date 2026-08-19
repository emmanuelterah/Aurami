"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./Hero.module.css";

const TURN_SPEED = 0.0022; // slow idle turn, ~48s per revolution
const ACCENT = 0x8b95e8; // ≈ var(--accent)
const ACCENT_2 = 0xa184e6; // ≈ var(--accent-2)

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

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
      34,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.15, 4.4);

    // "emerging from darkness": faint ambient, dim key, strong cool rims
    scene.add(new THREE.HemisphereLight(0x2a2d38, 0x050608, 0.55));

    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(1.2, 2.2, 3);
    scene.add(key);

    const rimL = new THREE.DirectionalLight(ACCENT, 2.6);
    rimL.position.set(-3, 1.6, -2.4);
    scene.add(rimL);

    const rimR = new THREE.DirectionalLight(ACCENT_2, 2.1);
    rimR.position.set(3, 0.8, -2.2);
    scene.add(rimR);

    const under = new THREE.PointLight(ACCENT, 0.6, 8);
    under.position.set(0, -1.6, 1.2);
    scene.add(under);

    const group = new THREE.Group();
    scene.add(group);

    // pointer parallax
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", onPointer);

    new GLTFLoader().load("/models/hero.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;

      // normalize: center at origin, scale to a known height
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 2.35 / size.y;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.position.y -= 0.08;

      group.add(model);
      setReady(true);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();

      group.rotation.y += TURN_SPEED;
      group.rotation.x += (target.y * 0.06 - group.rotation.x) * 0.04;
      group.position.y = Math.sin(t * 0.6) * 0.03;
      camera.position.x += (target.x * 0.18 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
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
      mount.removeEventListener("pointermove", onPointer);
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
  }, []);

  return (
    <div
      ref={mountRef}
      className={`${styles.canvasWrap} ${ready ? styles.canvasWrapReady : ""}`}
      aria-label="Aria humanoid robot, 3D model"
      role="img"
    />
  );
}
