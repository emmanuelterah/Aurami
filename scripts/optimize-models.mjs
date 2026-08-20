// Compress every GLB in public/models in place (meshopt + WebP textures).
// Run:  yarn optimize:models   (no setup needed; npx fetches the CLI)
// Commit your repo first — files are overwritten in place.
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";

const dir = "public/models";
for (const f of readdirSync(dir).filter((f) => f.endsWith(".glb"))) {
  const p = `${dir}/${f}`;
  const before = statSync(p).size;
  console.log(`\noptimizing ${p} (${(before / 1e6).toFixed(1)} MB)…`);
  execSync(
    `npx -y -p @gltf-transform/cli gltf-transform optimize "${p}" "${p}" --compress meshopt --texture-compress false`,
    { stdio: "inherit" },
  );
  const after = statSync(p).size;
  console.log(`${f}: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`);
}
