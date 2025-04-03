// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://jlewisbooth.github.io",
  base: "/adrian-sutton/",
  integrations: [tailwind()],
});
