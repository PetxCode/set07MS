import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "authApp",
      filename: "authApp.js",
      exposes: {
        "./App": "./src/App.tsx",
        // "./State": "./src/global/state.tsx",
        "./MGN": "./src/global/jotai.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "yup",
        "react-hook-form",
        "recoil-persist",
        "recoil",
        "jwt-decode",
        "axios",
        "@hookform/resolvers",
        "jotai",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
