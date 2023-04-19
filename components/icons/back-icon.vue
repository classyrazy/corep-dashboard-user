<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2362_9279)">
            <path d="M10 22L0 12L10 2L11.775 3.775L3.55 12L11.775 20.225L10 22Z" fill="#EEEEEE" />
        </g>
        <defs>
            <clipPath id="clip0_2362_9279">
                <rect width="24" height="24" fill="currentColor" />
            </clipPath>
        </defs>
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
