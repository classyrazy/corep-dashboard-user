<template>
    <div :class="store.darkMode ? 'dark' : ''">
        <div class="dark:bg-db-pry bg-db-white-dark db-con flex w-full">
            <div class="relative w-full lg:max-w-[18rem] md:max-w-[4rem] z-10">
                <d-board-side-bar class=" dark:bg-db-pry-dark bg-db-white-light h-screen overflow-y-auto top-0">
                </d-board-side-bar>
                <button @click="store.changeMode" class="bg-red-400">Change Modee</button>
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
const themeFromLocalStorage = localStorage.getItem("theme");
import { useUserStore } from '../store/user'
let store = useUserStore()
onMounted(() => {
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