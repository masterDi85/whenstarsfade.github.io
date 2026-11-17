
import fs from "node:fs";
import path from "node:path";

const photosDir = "assets/photos";
const outputFile = path.join(photosDir, "gallery.json");

const extensions = [".jpg", ".jpeg", ".png", ".webp"];

fs.mkdirSync(photosDir, { recursive: true });

const photos = fs.readdirSync(photosDir)
  .filter(file => extensions.includes(path.extname(file).toLowerCase()))
  .sort()
  .map(file => ({
    src: `assets/photos/${file}`,
    alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")
  }));

fs.writeFileSync(outputFile, JSON.stringify(photos, null, 2));

console.log(`Gallery generated: ${photos.length} photos`);
