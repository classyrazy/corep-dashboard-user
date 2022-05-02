<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" height="auto" viewBox="0 0 24 24" fill="none" :stroke="color"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>

</template>

<script setup>
// interface Props{
//   color: string,
//   size: number
// }
let props = defineProps({
    color: {
        type: String,
        default: '#000'
    },
    size: {
        type: Number,
        default: 24
    }
})

</script>

<style>
</style>