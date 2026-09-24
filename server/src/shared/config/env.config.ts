import { config } from "dotenv";
import { z } from "zod";
import envConst from "../constants/env.constant.js";
import { colorText } from "../utils/color-text.utils.js";

config({ quiet: true });

const envSchema = z.object({
  PORT: z.coerce.number().default(envConst.PORT),
  MONGODB: z
    .string()
    .trim()
    .min(1, "MONGODB_URI is required")
    .default(envConst.MONGODB),
  NODE_ENV: z.enum(["development", "production"]),
  JWT_SECRET_ACCESS: z.string().min(1),
  JWT_SECRET_REFRESH: z.string().min(1),
});

function reportDefaults() {
  const defaults = ["PORT", "MONGODB_URI"];

  const injected = defaults.filter((key) => process.env[key] === undefined);

  if (!injected.length) return;

  console.warn(`\n${colorText("⚠ Environment defaults", "yellow")}`);

  for (const key of injected) {
    console.warn(`  ${colorText(key, "cyan")} (injected from constants)`);
  }

  console.warn();
}

function validateEnv() {
  reportDefaults();

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(colorText("✖ Environment validation failed", "white", "red"));

    console.error("\nMissing or invalid environment variables:\n");

    for (const issue of result.error.issues) {
      console.error(
        `  ${colorText("✖", "red")} ${issue.path.join(".")}: ${issue.message}`,
      );
    }

    console.error(`\n${colorText("Server could not start.", "red")}`);

    process.exit(1);
  }

  return Object.freeze({
    ...result.data,
    IS_PROD: result.data.NODE_ENV === "production",
  });
}

const env = validateEnv();

export default env;
