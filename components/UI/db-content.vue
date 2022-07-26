<template>
    <div class="overflow-y-auto w-full h-screen p-8">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
import { storeToRefs } from 'pinia'
let store = useUserStore()

// const soreDetails = storeToRefs(store)
const user = computed(() => {
    return store.user
})
// const user = computed(() => {
//     return store.user
// })
// const getMode = computed(() => {
//     return store.getMode
// })

// onMounted(() => {
//     store.fetchUser();

// })

</script>

<style scoped>
</style>