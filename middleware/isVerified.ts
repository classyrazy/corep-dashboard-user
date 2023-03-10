import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  console.log("from verified", userStore.user)
  if (!userStore.getUserVerificationState) {
    return navigateTo('/email-verification')
  }

  // else if(!userStore.user) {
  //  userStore.fetchUser()
  // } 
  // else{
  //   navigateTo("/")
  // }
  // return navigateTo(to)
})

