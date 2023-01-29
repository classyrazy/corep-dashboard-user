
import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  if (!userStore.getUserToken) {
    return navigateTo('/login')
  } else if (!userStore.user) {
    userStore.fetchUser()
  }
  // return navigateTo(to)
})
