import { defineStore } from "pinia";
import Graph from "../libs/avanda";
import { ref, watch } from "vue";
type UserType = {
  id: string;
  email: string;
  username: string;
  is_verified: boolean;
  level: object;
  role: string;
  school: {
    id: number,
    name: string,
    [key: string]: any
  };
  department: object;
  faculty: object;
  user_todo_level: string;
}
const store = () => {
  let user = ref<UserType | null>(null);
  let userRegTodoStageLevel = ref<string | null>(null);
  let darkMode = computed<boolean>(() => {

    if (process.client) {
      if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) == "dark") return true;
    }
    return false;
  });
  let emptyState = ref(true)

  // if(localStorage.getItem("user")){
  //   user.value = JSON.parse(localStorage.getItem("user"))
  // }

  if (process.client) {
    watch(
      user,
      (userVal) => {
        if (userVal) {
          localStorage.setItem("isLoggedIn", JSON.stringify(true))
        } else {
          localStorage.setItem("isLoggedIn", JSON.stringify(false))
        }
        if (userVal?.is_verified) {
          localStorage.setItem("isVerified", JSON.stringify(true))
        } else {
          localStorage.setItem("isVerified", JSON.stringify(false))
        }
      },
      { deep: true }
    )
  }

  //Create a user Object
  async function fetchUserObject() {
    try {
      let req = new Graph().service("User/getLoggedInUser");
      console.log(req)
      user.value = await (await req.get()).getData();
    } catch (error: any) {
      if (error.getMsg() === "you are not logged in" || error.code === 401) {
        return "/login"
        //Redirect to login page
        //  error({
        //     message: "You must be logged in to access this page",
        //     statusCode: 403
        //   })
      } else if (error.getMsg() === "you are not verified" || error.code === 429) {
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
      user.value = await (await req.get()).getData();
      if(!user.value){
        useRouter().push("/login")
      }else{
        if(!user.value.is_verified){
          useRouter().push("/email-verification")
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  function changeUserRegTodoStageLevel(level: string) {
    if (user.value)
        user.value.user_todo_level = level;

    // userRegTodoStageLevel.value = level;
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
      let levelGotten: string = await (await req.get()).getData()
      // userRegTodoStageLevel.value = await (await req.get()).getData();
      changeUserRegTodoStageLevel(levelGotten)

    } catch (error) {
      console.log(error);
    }
  }
  let mode = ref(false);
  const LOCAL_STORAGE_THEME_KEY = "app-theme";
  function setUserTheme() {
    let isDarkModePreferred: boolean
    if (process.client) {
      isDarkModePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }
    // watchEffect(() => { localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkModePreferred ? "dark" : "light"); })
    if (process.client) {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkModePreferred ? "dark" : "light");
    }
    // mode.value = newTheme === "dark";
    console.log({ isDarkModePreferred })
  }
  const getUserToken = computed(() => {
    let userToken
    if (process.client) {
      userToken = localStorage.getItem("session-token");
    }
    return userToken
  })
  const getUserVerificationState = computed(() => {
    let userToken
    if(user.value){
      return user.value.is_verified
    }
    return null
  })
  const getUserLoggedInState = computed(() => {
    let userLoggedInState: Ref<string>;
    if (process.client) {
      userLoggedInState = ref(localStorage.getItem("isLoggedIn"))
    }
    return userLoggedInState?.value
  })


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
    fetchUserObject,
    getUserToken,
    getUserLoggedInState,
    getUserVerificationState
  };
};
export const useUserStore = defineStore("user", store);
// function redirect() {
//   throw new Error("Function not implemented.");
// }
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
