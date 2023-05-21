<template>
    <svg width="20" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z" fill="currentColor" />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    bgColor?: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "#ffffff",
    textColor: "#000",
    size: 24,
});
</script>

<style scoped></style>
