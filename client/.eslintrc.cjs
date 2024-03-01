module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "react-app",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "args",
          "position",
          "rotation",
          "visible",
          "map",
          "attach",
          "castShadow",
          "object",
          "intensity",
          "receiveShadow",
          "castShadow",
          "shadow-mapSize-width",
          "shadow-mapSize-height",
          "shadow-camera-left",
          "shadow-camera-right",
          "shadow-camera-top",
          "shadow-camera-bottom",
          "shadow-camera-near",
          "shadow-camera-far",
          "makeDefault",
          "target",
          "enableRotate",
          "maxAzimuthAngle",
          "minAzimuthAngle",
          "maxPolarAngle",
          "minPolarAngle",
          "dispose",
          "geometry",
          "material",
          "skeleton",
          "rotateZ",
          "transparent",
          "flatShading",
        ],
      },
    ],
  },
};
