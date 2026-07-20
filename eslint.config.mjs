import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    "node_modules/",
    ".next/",
    "out/",
    "build/",
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "next-env.d.ts",
    "src/generated/**/*",
    "prisma/generated/**/*",
    "scratch/**/*",
  ]),
  {
    files: [
      "src/app/fr/privacy/page.tsx",
      "src/app/fr/terms/page.tsx",
      "src/app/it/privacy/page.tsx",
      "src/app/it/terms/page.tsx",
    ],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);
