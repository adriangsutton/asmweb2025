// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://adriangsutton.github.io",
  base: "/asmweb2025/",
  integrations: [tailwind()],
});
