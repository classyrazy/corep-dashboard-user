<template>
    <svg :width="size" height="auto" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 0H10V7.5H20V0ZM20 10H10V20H20V10ZM22.5 20V10H30V20H22.5ZM20 22.5H10V30H20V22.5ZM22.5 30V22.5H30V23.75C30 25.4076 29.3415 26.9973 28.1694 28.1694C26.9973 29.3415 25.4076 30 23.75 30H22.5ZM22.5 7.5V0H23.75C25.4076 0 26.9973 0.65848 28.1694 1.83058C29.3415 3.00269 30 4.5924 30 6.25V7.5H22.5ZM6.25 0H7.5V7.5H0V6.25C0 4.5924 0.65848 3.00269 1.83058 1.83058C3.00269 0.65848 4.5924 0 6.25 0ZM0 10H7.5V20H0V10ZM0 22.5H7.5V30H6.25C4.5924 30 3.00269 29.3415 1.83058 28.1694C0.65848 26.9973 0 25.4076 0 23.75V22.5Z"
            :fill="textColor" />
    </svg>

</template>

<script setup lang="ts">
interface Props {
    bgColor: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "#c4c4c4",
    textColor: "#ffffff",
    size: 30,
});
</script>

<style scoped>
</style>
