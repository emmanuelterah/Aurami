"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { loadModel } from "./loadModel";
import { useNearViewport } from "./useNearViewport";
import { applyBrandAccent } from "./warmModel";
import styles from "./EngineeringViewer.module.css";

const GOLD = 0xf7d081;
const AMBER = 0xe5764f;
const TURN_SPEED = 0.0022;

/**
 * The Engineering "diagnostic rig": one continuously rotating model,
 * re-rendered per layer tab —
 *  exterior/intelligence: textured shell (intelligence adds pulsing rims)
 *  skeleton/actuators:    holographic wireframe linework
 *  sensors:               near-silhouette, only the emissive details glow
 */
export default function EngineeringViewer({ mode }: { mode: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(mountRef);
  const [ready, setReady] = useState(false);
  const apiRef = useRef<((m: string) => void) | null>(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
    apiRef.current?.(mode);
  }, [mode]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !near) return;
    let disposed = false;
    let raf = 0;
    let visible = true;
    let pulse = false;

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
    camera.position.set(0, 0.15, 4.9);
    camera.lookAt(0, 0, 0);

    const hemi = new THREE.HemisphereLight(0x3a332a, 0x080604, 0.65);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff1dd, 0.8);
    key.position.set(1.4, 2.4, 3);
    scene.add(key);
    const rimL = new THREE.DirectionalLight(GOLD, 2.8);
    rimL.position.set(-3, 1.7, -2.4);
    scene.add(rimL);
    const rimR = new THREE.DirectionalLight(AMBER, 2.2);
    rimR.position.set(3, 0.9, -2.2);
    scene.add(rimR);

    const rig = new THREE.Group();
    scene.add(rig);
    const group = new THREE.Group();
    rig.add(group);

    // Intelligence overlay: the "nervous system" — signal paths flowing from
    // the limbs to the head, with pulses traveling along them. Wiring as
    // light, never as cable. Coordinates hug the normalized (h=2.35) body.
    const signals = new THREE.Group();
    signals.visible = false;
    rig.add(signals);

    const mkPath = (pts: [number, number, number][]) =>
      new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const signalPaths = [
      mkPath([[-0.5, -0.25, 0.08], [-0.4, 0.2, 0.11], [-0.26, 0.6, 0.09], [-0.08, 0.82, 0.09], [0, 1.02, 0.1]]),
      mkPath([[0.5, -0.25, 0.08], [0.4, 0.2, 0.11], [0.26, 0.6, 0.09], [0.08, 0.82, 0.09], [0, 1.02, 0.1]]),
      mkPath([[-0.17, -1.12, 0.1], [-0.16, -0.55, 0.13], [-0.1, -0.05, 0.11], [0, 0.45, 0.09], [0, 1.02, 0.1]]),
      mkPath([[0.17, -1.12, 0.1], [0.16, -0.55, 0.13], [0.1, -0.05, 0.11], [0, 0.45, 0.09], [0, 1.02, 0.1]]),
      mkPath([[0, -0.6, -0.13], [0, 0.1, -0.15], [0, 0.7, -0.11], [0, 1.02, -0.05]]),
    ];
    const traceMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffe6b0,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseGeo = new THREE.SphereGeometry(0.022, 10, 10);
    const pulses: { mesh: THREE.Mesh; path: THREE.CatmullRomCurve3; offset: number; speed: number }[] = [];
    signalPaths.forEach((path, i) => {
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(path, 64, 0.007, 6),
        traceMat,
      );
      signals.add(tube);
      for (let k = 0; k < 2; k++) {
        const mesh = new THREE.Mesh(pulseGeo, pulseMat);
        signals.add(mesh);
        pulses.push({
          mesh,
          path,
          offset: i * 0.17 + k * 0.5,
          speed: 0.1 + (i % 3) * 0.025,
        });
      }
    });

    // optional dedicated models per layer, loaded on demand
    const LAYER_MODEL_URLS: Record<string, string> = {
      skeleton: "/models/skeleton.glb",
      actuators: "/models/actuators.glb",
    };
    const layerModels = new Map<string, THREE.Group | "loading" | "failed">();

    const normalize = (model: THREE.Group) => {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 2.35 / size.y;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
    };

    const ensureLayerModel = (m: string) => {
      const url = LAYER_MODEL_URLS[m];
      if (!url || layerModels.has(m)) return;
      layerModels.set(m, "loading");
      loadModel(url).then(
        (gltf) => {
          if (disposed) return;
          const model = gltf.scene;
          normalize(model);
          applyBrandAccent(model);
          const holder = new THREE.Group();
          holder.add(model);
          holder.visible = false;
          rig.add(holder);
          layerModels.set(m, holder);
          if (modeRef.current === m) applyMode(m);
        },
        () => {
          if (!disposed) layerModels.set(m, "failed");
        },
      );
    };

    const origMats = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
    const sensorMats = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
    const wireGold = new THREE.MeshBasicMaterial({
      color: GOLD,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wireAmber = new THREE.MeshBasicMaterial({
      color: AMBER,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const setLights = (h: number, k: number, l: number, r: number) => {
      hemi.intensity = h;
      key.intensity = k;
      rimL.intensity = l;
      rimR.intensity = r;
    };

    const applyMode = (m: string) => {
      pulse = m === "intelligence";
      signals.visible = pulse;
      ensureLayerModel(m);
      const dedicated = layerModels.get(m);
      const hasDedicated = dedicated instanceof THREE.Group;

      // show the dedicated layer model if we have one, else the hero model
      layerModels.forEach((v, k) => {
        if (v instanceof THREE.Group) v.visible = hasDedicated && k === m;
      });
      group.visible = !hasDedicated;

      if (hasDedicated) {
        // real internal geometry: light it like the product shots
        setLights(0.55, 0.7, 2.6, 2.0);
        return;
      }

      if (m === "skeleton" || m === "actuators") setLights(0.15, 0.05, 0.3, 0.25);
      else if (m === "sensors") setLights(0.1, 0.05, 0.55, 0.4);
      else setLights(0.65, 0.8, 2.8, 2.2);

      group.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        if (m === "skeleton") obj.material = wireGold;
        else if (m === "actuators") obj.material = wireAmber;
        else if (m === "sensors")
          obj.material = sensorMats.get(obj) ?? obj.material;
        else obj.material = origMats.get(obj) ?? obj.material;
      });
    };
    apiRef.current = applyMode;

    loadModel("/models/hero.glb").then((gltf) => {
      if (disposed) return;
      const model = gltf.scene;

      normalize(model);
      applyBrandAccent(model);

      model.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        origMats.set(o, o.material);
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const clones = mats.map((mm) => {
          if (mm instanceof THREE.MeshStandardMaterial) {
            const c = mm.clone();
            c.map = null;
            c.color.set(0x131110);
            c.roughness = 0.95;
            c.metalness = 0;
            c.emissiveIntensity = 2.6;
            return c;
          }
          return mm;
        });
        sensorMats.set(o, Array.isArray(o.material) ? clones : clones[0]);
      });

      group.add(model);
      applyMode(modeRef.current);
      setReady(true);

      // prefetch the layer models (now ~4MB each) so the Skeleton and
      // Actuators tabs swap in real geometry instantly, with no
      // wireframe stand-in flash
      ensureLayerModel("skeleton");
      ensureLayerModel("actuators");
    });

    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const t = clock.getElapsedTime();
      rig.rotation.y += TURN_SPEED;
      if (pulse) {
        rimL.intensity = 2.8 + Math.sin(t * 2.2) * 1.3;
        rimR.intensity = 2.2 + Math.sin(t * 2.2 + Math.PI / 2) * 1.0;
        for (const p of pulses) {
          const u = (t * p.speed + p.offset) % 1;
          p.mesh.position.copy(p.path.getPointAt(u));
          const s = 0.75 + 0.45 * Math.sin(u * Math.PI); // brightens mid-path
          p.mesh.scale.setScalar(s);
        }
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
      apiRef.current = null;
      wireGold.dispose();
      wireAmber.dispose();
      sensorMats.forEach((m) => {
        (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
      });
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
      aria-label="Aria engineering layers, 3D viewer"
      role="img"
    />
  );
}
