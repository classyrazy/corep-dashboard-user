<template>
    <div :class="store.darkMode ? 'dark' : ''">
        <div class="dark:bg-db-pry bg-db-white-dark db-con flex w-full">
            <div class="relative w-full lg:max-w-[18rem] md:max-w-[4rem] z-10">
                <d-board-side-bar class=" dark:bg-db-pry-dark bg-db-white-light h-screen overflow-y-auto top-0">
                </d-board-side-bar>
                <button @click="store.changeMode" class="bg-red-400">Change Modee</button>
                <button @click="store.changeUserRegTodoStageLevel('subscribe-courses')" class="bg-blue-400">test Modee</button>
                {{ store }}
            </div>
            <slot></slot>

        </div>
    </div>
    <modal-root></modal-root>

</template>

<script setup lang="ts">
import DbContent from '../components/UI/db-content.vue'
import DBoardSideBar from './dBoardSideBar.vue'
import { useUserStore } from '../store/user'
const themeFromLocalStorage = localStorage.getItem("theme");
let store = useUserStore()
onMounted(() => {
    if (process.client) {
    //   window.addEventListener('load', () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("serviceWorker is not supported in current browser!");
    }
    navigator.serviceWorker.register("/sw.js");
    //   })
  }
    store.fetchUser();
})


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