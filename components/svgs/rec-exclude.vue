<template>
  <svg :width="size" height="200" viewBox="0 0 155 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="-181.7" y="-22" width="386.113" height="35.0426" transform="rotate(29.5832 -181.7 -22)" fill-opacity="0.4" :fill="bgColor"/>
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
    size: 155,
});
</script>

<style scoped></style>
