import { defineStore } from "pinia";
import Graph from "../libs/avanda";

export const useUserStore = defineStore("user", () => {
  let user = ref(null);
  let darkMode = ref(false);
  async function fetchUser() {
    try {
      let req = new Graph()
        .service("User/getLoggedInUser")
        .select("id", "username", "email", "picture", "school");
      user.value = await (await req.get()).getData();
    } catch (error) {
      console.log(error);
    }
  }
  function changeMode() {
    darkMode.value = !darkMode.value;
  }
  return{
    user,
    darkMode,
    fetchUser,
    changeMode,
  }
});
// import { defineStore } from "pinia";
// import Graph from "../libs/avanda";

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     user: null,
//     darkMode: false,
//   }),
//   getters: {
//     getUser(state) {
//       return state.user;
//     },
//     getMode(state) {
//       return state.darkMode;
//     },
//   },
//   actions: {
//     async fetchUser() {
//       try {
//         let req = new Graph().service("User/getLoggedInUser").select("id","username","email","picture","school");
//         this.user = await (await req.get()).getData();
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     changeMode() {
//       this.darkMode = !this.darkMode;
//     }
//   },
// });
