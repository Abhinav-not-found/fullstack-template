import fs from "fs";
import path from "path";
import { spawn } from "child_process";

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
console.log('Starting development server...\n');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

spawn(npm, ['run', 'dev'], {
  stdio: 'inherit',
  shell: false,
});