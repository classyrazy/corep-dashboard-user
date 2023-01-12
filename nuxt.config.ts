import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: "Corep",
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1, user-scalable=no",
    meta: [{ name: "theme-color", content: "#ffdd67" }],
    link: [
      { hid: "icon", rel: "icon", type: "image/png", href: "/fa.png" },
      {
        hid: "apple-touch-icon",
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/manifest.json" },
    ],
  },
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  buildModules: ["@pinia/nuxt", "@nuxtjs/pwa",],
  ssr: false,
});
