<template>
    <div class="overflow-y-auto w-full h-screen md:p-8 pt-4 px-2 md:px-auto md:pt-auto">
        <slot :user-store="user" :mode="store.darkMode"></slot>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
import { storeToRefs } from 'pinia'
let store = useUserStore()

// const soreDetails = storeToRefs(store)
const user = computed(() =>  store.user)

// const user = computed(() => {
//     return store.user
// })
// const getMode = computed(() => {
//     return store.getMode
// })

onMounted(() => {
    // store.fetchUser();
    console.log("This is from db content")

})

</script>

<style scoped>
</style>