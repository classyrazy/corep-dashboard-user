import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { defineNuxtPlugin, useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(piniaPluginPersistedstate);
});
