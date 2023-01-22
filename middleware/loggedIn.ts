// import Graph from "../libs/avanda";
// export default async function () {
//   let data = null;
//   try {
//     let req = new Graph().service("User/getLoggedInUser");
//     data = await (await req.get()).getData();
//   } catch (error) {
//     console.log(error);
//     if (error.getMsg() === "You are not logged in" && error.getData() === null) {
//       return "/login";
//     }
//   }
//   console.log("Hello from loggedIn.ts", data);
// }

import { useUserStore } from "~~/store/user";
export default defineNuxtRouteMiddleware((_) => {
  const userStore = useUserStore();
  if (!userStore.getUserToken) {
      return navigateTo('/login')
  } else if(userStore) {
   userStore.fetchUser()
  } 
  // return navigateTo(to)
})
