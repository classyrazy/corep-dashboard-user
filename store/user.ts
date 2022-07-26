import { defineStore } from "pinia";
import Graph from "../libs/avanda";
import {ref} from "vue";
export const useUserStore = defineStore("user", () => {
  let user = ref(null);
  let userRegTodoStageLevel = ref(null);
  let darkMode = ref(false);
  if (localStorage.getItem("app-theme") === "dark") {
    darkMode.value = true;
  } else {
    darkMode.value = false;
  }
  // async function fetchUser() {
  //   try {
  //     let req = new Graph().service("User/getLoggedInUser");
  //     user.value = await (await req.get()).getData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  function setUser(userData: object) {
    user.value = userData;
  }
  function changeUserRegTodoStageLevel(level: string){
    userRegTodoStageLevel.value = level
  }
  // watch(darkMode)
  function changeMode() {
    // localStorage.getItem("app-theme")
    darkMode.value = !darkMode.value;
  }
  async function fetchUserRegStartTodoLevelMode() {
    try {
      let req = new Graph().service("User/getUserTodos");
      userRegTodoStageLevel.value = await (await req.get()).getData();
    } catch (error) {
      console.log(error);
    }
  }
  return {
    user,
    darkMode,
    setUser,
    changeMode,
    fetchUserRegStartTodoLevelMode,
    userRegTodoStageLevel,
    changeUserRegTodoStageLevel
  };
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
