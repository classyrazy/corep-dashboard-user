
import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware(async (_) => {
  const userStore = useUserStore();
  await userStore.fetchUser()
  if (userStore.user?.isVerified) {
    return navigateTo("/")
  }
})
