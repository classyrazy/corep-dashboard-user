<template>
    <svg :width="size" :height="size" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.83964 1.2H1.18747V6.8H6.30051V2.6H4.83964V1.2ZM0.457031 0.8472C0.457031 0.6554 0.620283 0.5 0.821883 0.5H5.20486L7.03094 2.25V7.14755C7.03128 7.19351 7.02217 7.23909 7.00412 7.28168C6.98608 7.32427 6.95946 7.36303 6.92578 7.39576C6.89211 7.42849 6.85204 7.45454 6.80785 7.47242C6.76367 7.49031 6.71624 7.49968 6.66828 7.5H0.819692C0.723778 7.49936 0.631977 7.46258 0.564119 7.39762C0.496262 7.33266 0.457796 7.24472 0.457031 7.1528V0.8472ZM3.37877 5.05H4.10921V5.75H3.37877V5.05ZM3.37877 2.25H4.10921V4.35H3.37877V2.25Z"
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
    bgColor: "#ffffff",
    textColor: "#FF0000",
    size: 20,
});
</script>

<style scoped></style>
