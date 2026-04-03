import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // IMPORTANT: Replace 'worksheet_generator' with your exact GitHub repo name
  base: "/worksheet-generator/",
});
