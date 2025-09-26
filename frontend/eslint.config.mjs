import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2021, process: "readonly" },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];
