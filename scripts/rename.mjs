import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const write = (path, content) => writeFileSync(new URL(`../${path}`, import.meta.url), content);

try {
  const name = process.argv[2]?.trim();
  if (process.argv.length !== 3 || !name || /[\x00-\x1f\x7f]/.test(name)) throw new Error('Usage: node scripts/rename.mjs "My Extension"');
  const slug = name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!slug || slug.length > 214) throw new Error("The name must produce a package name of 1–214 ASCII letters, digits or hyphens.");
  const status = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: root, encoding: "utf8" });
  if (status.trim()) throw new Error("The git tree is dirty. Commit or stash your changes before renaming; no files were changed.");

  const pkg = JSON.parse(read("package.json"));
  const lock = JSON.parse(read("package-lock.json"));
  const html = read("index.html");
  const readme = read("README.md");
  if (!/<title>[^<]*<\/title>/.test(html) || !/^# .+$/m.test(readme) || !lock.packages?.[""]) throw new Error("Template markers or lockfile metadata are missing; no files were changed.");
  pkg.name = slug;
  pkg.displayName = name;
  lock.name = slug;
  lock.packages[""].name = slug;
  const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const nextHtml = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escape(name)}</title>`)
    .replace(/<main aria-label="[^"]*">/, () => `<main aria-label="${escape(name)}">`);
  const nextReadme = readme.replace(/^# .+$/m, () => `# ${name}`);
  const updates = {
    "package.json": JSON.stringify(pkg, null, 2) + "\n",
    "package-lock.json": JSON.stringify(lock, null, 2) + "\n",
    "index.html": nextHtml,
    "README.md": nextReadme,
  };
  for (const [path, content] of Object.entries(updates)) if (read(path) !== content) write(path, content);
  console.log(`Named ${name} (${slug}).\nNext: npm run dev\nRegister http://localhost:5173/ in Forma. See README.md.\nPreview without Forma: http://localhost:5173/?fixture=1\nReview git diff, then commit your customization.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
