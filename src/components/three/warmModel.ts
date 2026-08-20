import * as THREE from "three";

/**
 * Recolors the baked glow details in a GLB's basecolor texture — the blue
 * LED accents (ears, sensors, visor edges) — to the brand gold/amber, and
 * builds an emissive map from those same pixels so they actually glow.
 * All other pixels (ceramic shell, titanium, graphite) are left untouched.
 */

const GOLD_HUE = 0.105; // ≈38°, matches the logo gradient
const HUE_MIN = 0.5; // cyan
const HUE_MAX = 0.83; // violet
const SAT_MIN = 0.25; // ignore desaturated greys/metals

function isGlowPixel(h: number, s: number, l: number) {
  return h >= HUE_MIN && h <= HUE_MAX && s >= SAT_MIN && l > 0.1;
}

function copySettings(dst: THREE.Texture, src: THREE.Texture) {
  dst.flipY = src.flipY;
  dst.wrapS = src.wrapS;
  dst.wrapT = src.wrapT;
  dst.repeat.copy(src.repeat);
  dst.offset.copy(src.offset);
  dst.rotation = src.rotation;
  dst.anisotropy = src.anisotropy;
  dst.needsUpdate = true;
}

export function applyBrandAccent(root: THREE.Object3D) {
  const done = new Set<THREE.Material>();
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach((m) => {
      if (!(m instanceof THREE.MeshStandardMaterial) || done.has(m)) return;
      done.add(m);
      const src = m.map;
      if (!src || !src.image) return;
      const img = src.image as HTMLImageElement | ImageBitmap;
      const w = img.width;
      const h = img.height;
      if (!w || !h) return;

      const base = document.createElement("canvas");
      base.width = w;
      base.height = h;
      const bg = base.getContext("2d");
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = w;
      glowCanvas.height = h;
      const gg = glowCanvas.getContext("2d");
      if (!bg || !gg) return;

      bg.drawImage(img, 0, 0, w, h);
      const baseData = bg.getImageData(0, 0, w, h);
      const glowData = gg.createImageData(w, h);
      const p = baseData.data;
      const q = glowData.data;
      const c = new THREE.Color();
      const hsl = { h: 0, s: 0, l: 0 };
      let hits = 0;

      for (let i = 0; i < p.length; i += 4) {
        c.setRGB(p[i] / 255, p[i + 1] / 255, p[i + 2] / 255);
        c.getHSL(hsl);
        if (!isGlowPixel(hsl.h, hsl.s, hsl.l)) continue;
        hits++;
        // rotate hue to gold, keep the texture's own shading
        c.setHSL(GOLD_HUE, Math.min(1, hsl.s * 1.08), hsl.l);
        p[i] = Math.round(c.r * 255);
        p[i + 1] = Math.round(c.g * 255);
        p[i + 2] = Math.round(c.b * 255);
        // emissive mask: stronger where the LED was more saturated/brighter
        const a = Math.min(1, ((hsl.s - SAT_MIN) / 0.6) * hsl.l * 2);
        q[i] = Math.round(c.r * 255 * a);
        q[i + 1] = Math.round(c.g * 255 * a);
        q[i + 2] = Math.round(c.b * 255 * a);
        q[i + 3] = 255;
      }

      if (!hits) return; // nothing blue in this texture — leave it alone

      bg.putImageData(baseData, 0, 0);
      gg.putImageData(glowData, 0, 0);

      const newMap = new THREE.CanvasTexture(base);
      newMap.colorSpace = src.colorSpace;
      copySettings(newMap, src);
      m.map = newMap;

      const emissive = new THREE.CanvasTexture(glowCanvas);
      emissive.colorSpace = THREE.SRGBColorSpace;
      copySettings(emissive, src);
      m.emissiveMap = emissive;
      m.emissive.set(0xffffff);
      m.emissiveIntensity = 1.15;
      m.needsUpdate = true;
    });
  });
}
