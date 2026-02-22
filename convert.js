import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dir = path.join(__dirname, "public/images");

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith(".png")) {
    const input = path.join(dir, file);
    const output = path.join(dir, file.replace(".png", ".webp"));

    sharp(input)
      .webp({ quality: 75 })
      .toFile(output)
      .then(() => console.log(`Converted: ${file}`))
      .catch(err => console.error(err));
  }
});