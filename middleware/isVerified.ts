import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  // if (userStore.getUserToken && !userStore.user?.isVerified) {
  //     return navigateTo('/email-verification')
  // } else if(!userStore.user) {
  //  userStore.fetchUser()
  // } 
  // else{
  //   navigateTo("/")
  // }
  // return navigateTo(to)
})

