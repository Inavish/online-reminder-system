import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      eqeqeq: ["error", "always"],
      "no-unused-vars": [
        "warn",
        { args: "after-used", ignoreRestSiblings: true },
      ],
      "no-undef": "error",
    },
  },
];
