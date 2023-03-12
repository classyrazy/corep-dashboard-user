import { defineNuxtPlugin } from "#app";
import vueCal from "vue-cal"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vueCal, {});
});