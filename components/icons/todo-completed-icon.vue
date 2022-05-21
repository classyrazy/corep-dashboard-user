<template>
    <svg :width="size" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.00039 16.2001L4.80039 12.0001L3.40039 13.4001L9.00039 19.0001L21.0004 7.0001L19.6004 5.6001L9.00039 16.2001Z"
            :fill="bgColor" />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    bgColor: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "#ffffff",
    textColor: "#ffffff",
    size: 30,
});
</script>

<style scoped>
</style>
