import Graph from "../libs/avanda";
import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  if (!userStore.user?.isVerified) {
      return navigateTo('/email-verification')
  } else if(!userStore.user) {
   userStore.fetchUser()
  } 
  // return navigateTo(to)
})

