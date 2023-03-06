
import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  console.log("this is from isLoggedIn", userStore.getUserToken, userStore.getUserLoggedInState)
  if (!userStore.getUserToken) {
    return navigateTo('/login')
  } 
  // else if (!userStore.user) {
  //   userStore.fetchUser()
  // }
  // return navigateTo(to)
})
