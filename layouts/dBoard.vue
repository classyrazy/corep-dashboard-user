<template>
  <div :class="storeData.darkMode ? 'dark' : ''">
    <div
      class="relative dark:bg-db-pry md:max-h-screen min-h-screen md:max-h-auto lg:max-h-auto md:h-auto lg:h-auto bg-white md:bg-db-white-dark db-con md:flex items-center w-full"
    >
      <div
        class="relative w-full hidden lg:block md:block lg:max-w-[18rem] md:max-w-[4rem] shrink-0 z-10"
      >
        <d-board-side-bar
          class="dark:bg-db-pry-dark bg-db-white-light h-screen overflow-y-auto top-0"
        >
        </d-board-side-bar>
      </div>
      <div class="db-content w-full pb-32 md:pb-0">
        <slot></slot>
      </div>
      <d-board-side-bar-mobile
        class="block fixed bottom-0 md:hidden lg:hidden"
      ></d-board-side-bar-mobile>
    </div>
    <modal-root></modal-root>
  </div>
</template>

<script setup lang="ts">
import DBoardSideBarMobile from "../components/UI/dashboard/dBoardSideBarMobile.vue";
import DBoardSideBar from "../components/UI/dashboard/dBoardSideBar.vue";
import DbContent from "../components/UI/db-content.vue";
import { useUserStore } from "../store/user"; 
const themeFromLocalStorage = localStorage.getItem("theme");
let storeData = useUserStore();
onMounted(() => {
  console.log("This is from D-board Mounted");

  if (process.client) {
    //   window.addEventListener('load', () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("serviceWorker is not supported in current browser!");
    }
    navigator.serviceWorker.register("/sw.js");
    //   })
  }
  //   store.fetchUser();
});
</script>

<style scoped>
.db-con {
  /* display: grid;
    grid-template-columns: 1fr 5fr;
    min-width: none; */
  /* grid-template-rows: 1fr; */
  /* grid-template-areas: "sidebar content"; */
}

.content {
  /* max-width: 1200px; */
}

.sidebar {
  overflow-y: auto;
}
</style>
