import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

/**
 * Shared GLB loader.
 * - Fetches each model file at most once per page (several sections reuse
 *   hero.glb; previously each viewer downloaded/parsed it independently).
 * - Meshopt decoder wired in, so models compressed with
 *   `yarn optimize:models` (gltf-transform, EXT_meshopt_compression) load
 *   without any further code changes.
 */
const bufferCache = new Map<string, Promise<ArrayBuffer>>();

export function loadModel(url: string): Promise<GLTF> {
  let buf = bufferCache.get(url);
  if (!buf) {
    buf = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
      return r.arrayBuffer();
    });
    buf.catch(() => bufferCache.delete(url)); // allow retry after failure
    bufferCache.set(url, buf);
  }
  return buf.then(
    (data) =>
      new Promise<GLTF>((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.parse(data, "", resolve, reject);
      }),
  );
}
