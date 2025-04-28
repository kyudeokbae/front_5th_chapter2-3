import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import path from "path"
import { fileURLToPath } from "url"
import conartiFsdPlugin from "@conarti/eslint-plugin-feature-sliced"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@conarti/feature-sliced": conartiFsdPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@conarti/feature-sliced/layers-slices": "error",
      "@conarti/feature-sliced/absolute-relative": "error",
      "@conarti/feature-sliced/public-api": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000", "^@?\\w"],
            ["^@app"],
            ["^@pages"],
            ["^@widgets"],
            ["^@features"],
            ["^@entities"],
            ["^@shared"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["vite.config.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
)
