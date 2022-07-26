<template>
  <db-content v-slot="slotProps">
  {{ slotProps }}
  Hello World
    <div class="font-inter" v-if="slotProps.userStore">
      <!-- {{ slotProps.mode }} -->
      <header class="w-full flex justify-between items-center mb-6">
        <div class="w-full max-w-lg">
          <v-input
            class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg"
            size="x-small"
            style-type="search"
            :icon="SearchIcon"
            placeholder="Search for Courses"
            full
            iconLeft
            :icon-color="slotProps.mode ? '#ffff' : '#212939'"
          ></v-input>
        </div>
        <div class="flex items-center mx-2">
          <div
            class="w-10 h-10 flex justify-center items-center hover:bg-sec rounded-full mx-4"
          >
            <router-link to="/notifications">
              <div class="flex relative">
                <bell-icon
                  class=""
                  :text-color="slotProps.mode ? '#ffff' : '#212939'"
                ></bell-icon>
                <div
                  class="w-2 h-2 bg-red-400 top-1 left-1 absolute rounded-full"
                ></div>
              </div>
            </router-link>
          </div>
          <router-link to="/settings/user">
            <div class="flex items-center font-inter text-sm">
              <p
                class="dark:text-white text-db-pry-dark mr-2"
                v-if="slotProps.userStore"
              >
                {{ slotProps.userStore.username }}
              </p>
              <div
                class="flex bg-pry rounded-full w-10 h-10 justify-center items-center"
              >
                <img
                  src="/m-header.png"
                  alt="avataar"
                  class="rounded-full p-[4px]"
                />
              </div>
            </div>
          </router-link>
        </div>
      </header>
      <div class="">
        <h1 class="dark:text-white text-4xl text-db-pry-dark font-bold">
          Hello {{ slotProps.userStore.username }}
        </h1>
        <start-app-todo-list
          class="mt-4"
          v-if="startAppTodoLevel !== 'completed'"
        ></start-app-todo-list>
      </div>
    </div>
  </db-content>
</template>

<script setup lang="ts">
import DbContent from "../components/UI/db-content.vue";
import BellIcon from "../components/icons/bell-icon.vue";
import SearchIcon from "../components/icons/search-icon.vue";
import VInput from "../components/forms/v-input.vue";
import "@/assets/css/tailwind.css";
import StartAppTodoList from "~~/components/UI/dashboard/start-app-todo-list.vue";
import Graph from "~~/libs/avanda";
import { useUserStore } from "../store/user";

let store = useUserStore();

// definePageMeta({
//   layout: "d-board",
//   middleware: "logged-in",
// });

type Theme = "light" | "dark";
// let startAppTodoLevel = ref(null)
let startAppTodoLevel = computed(() => store.userRegTodoStageLevel);

const LOCAL_STORAGE_THEME_KEY = "app-theme";
let mode = ref("");
let darkMode = ref(false);

const setTheme = (newTheme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  darkMode.value = newTheme === "dark";
};
const isDarkModePreferred = ref(null);
// async function getStartAppTodos() {
//     try {
//         let req = new Graph()
//             .service("User/getUserTodos")
//         startAppTodoLevel.value = await (await req.get()).getData();
//         console.log(startAppTodoLevel.value)
//     } catch (error) {
//         console.log(error);
//     }
// }
onMounted(() => {
  console.log("This is from index Mounted")
  store.fetchUser()
  // getStartAppTodos()
  store.fetchUserRegStartTodoLevelMode();
  isDarkModePreferred.value = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  console.log(isDarkModePreferred.value);
  console.log(darkMode.value);

  const themeFromLocalStorage = localStorage.getItem(
    LOCAL_STORAGE_THEME_KEY
  ) as Theme;
  setTheme(isDarkModePreferred.value ? "dark" : "light");
  // setTheme(themeFromLocalStorage);
});

watch(darkMode, (selected) => {
  setTheme(selected ? "dark" : "light");
});
</script>

<style scoped>
.header {
}
</style>
