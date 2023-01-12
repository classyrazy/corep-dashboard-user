import { defineStore } from "pinia";
import Graph from "../libs/avanda";
import { ref, watch } from "vue";
export const useUserStore = defineStore("user", () => {
  let user = ref(null);
  let userRegTodoStageLevel = ref(null);
  let darkMode = ref(false);
  let emptyState = ref(true)
  if (localStorage.getItem("app-theme") === "dark") {
    darkMode.value = true;
  } else {
    darkMode.value = false;
  }

  if(localStorage.getItem("user")){
    user.value = JSON.parse(localStorage.getItem("user"))
  }

  watch(
    user,
    (userVal) => {
      localStorage.setItem("user", JSON.stringify(userVal));
    },
    {deep : true}
  )

  //Create a user Object
  async function fetchUserObject(){
    try {
      let req = new Graph().service("User/getLoggedInUser");
      console.log(req)
      user.value = await (await req.get()).getData();
    } catch (error) {
      if(error.getMsg() === "you are not logged in" || error.code === 401){
        return "/login"
        //Redirect to login page
      //  error({
      //     message: "You must be logged in to access this page",
      //     statusCode: 403
      //   })
      } else if (error.getMsg() === "you are not verified" || error.code === 429){
        return "/email-verification"
        //Redirect to verification page 
        // error({
        //   message: "You must verify your account to access this page",
        //   statusCode: 403
        // })
      } else {
        //Handle other errors
        error({
          message: "An error occured while loading the user",
          statusCode: error.code || 500
        })
      }
    }
  }
  async function fetchUser() {
    console.log("this from store fetch user");
    try {
      let req = new Graph().service("User/getLoggedInUser");
      localStorage.setItem("user", JSON.stringify(req));
      user.value = await (await req.get()).getData();
      console.log(user.value)
    } catch (error) {
      console.log(error);
    }
  }
  function changeUserRegTodoStageLevel(level: string) {
    userRegTodoStageLevel.value = level;
  }
  // watch(darkMode)
  function changeMode() {
    // localStorage.getItem("app-theme")
    darkMode.value = !darkMode.value;
  }
  async function fetchUserRegStartTodoLevelMode() {
    console.log("this is from store fetch user reg start todo level mode");
    try {
      let req = new Graph().service("User/getUserTodos");
      userRegTodoStageLevel.value = await (await req.get()).getData();
    } catch (error) {
      console.log(error);
    }
  }
  let mode = ref(false);
  const LOCAL_STORAGE_THEME_KEY = "app-theme";
  function setUserTheme() {
    let isDarkModePreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkModePreferred ? "dark" : "light");
    // mode.value = newTheme === "dark";
    console.log({isDarkModePreferred})
  }
  return {
    user,
    darkMode,
    fetchUser,
    changeMode,
    fetchUserRegStartTodoLevelMode,
    userRegTodoStageLevel,
    changeUserRegTodoStageLevel,
    setUserTheme,
    emptyState,
    fetchUserObject
  };
});

function redirect() {
  throw new Error("Function not implemented.");
}
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
