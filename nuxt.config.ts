// import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Corep",
      meta: [
        {charset: "utf-8"},
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: "theme-color", content: "#ffdd67" },
      ],
      link: [
        { hid: "icon", rel: "icon", type: "image/png", href: "/fa.png" },
        {
          hid: "apple-touch-icon",
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/manifest.json" },
      ],
    }
  },
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxtjs/tailwindcss"],
  ssr: false,
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'sessionStorage'
  }
});
