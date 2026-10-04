import fs from "fs";
import path from "path";

const envExample = path.join(process.cwd(), ".env.example");
const env = path.join(process.cwd(), ".env");

if (!fs.existsSync(envExample)) {
  console.error(".env.example not found");
  process.exit(1);
}

if (!fs.existsSync(env)) {
  fs.copyFileSync(envExample, env);
  console.log("✓ Created .env");
} else {
  console.log("✓ .env already exists");
}

console.log("✓ Setup complete");
console.log("Run: npm run dev");