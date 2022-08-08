<template>
  <svg :width="size" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="24.792" width="100" height="100" transform="rotate(-14.1983 0 24.792)" :fill="bgColor" fill-opacity="0.4"/>
</svg>


</template>

<script setup lang="ts">
interface Props {
    bgColor: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "#B1B3B8",
    size: 122,
});
</script>

<style scoped></style>
