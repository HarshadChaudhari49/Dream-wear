module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    "react-native/react-native": true,
    es2021: true,
  },
  ignorePatterns: ["node_modules/", ".expo/", "dist/"],
};
