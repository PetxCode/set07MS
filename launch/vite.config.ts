import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "launchApp",
      remotes: {
        authApp: "http://localhost:5500/assets/authApp.js",

        // stateApp: "http://localhost:5500/assets/stateApp.js",
        // exposeApp: "http://localhost:5500/assets/exposeApp.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
