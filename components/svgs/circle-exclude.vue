<template>
  <svg
    :width="size"
    height="auto"
    viewBox="0 0 329 329"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M164.5 329C255.351 329 329 255.351 329 164.5C329 73.6492 255.351 0 164.5 0C73.6492 0 0 73.6492 0 164.5C0 255.351 73.6492 329 164.5 329ZM164.5 230.3C200.84 230.3 230.3 200.84 230.3 164.5C230.3 128.16 200.84 98.7 164.5 98.7C128.16 98.7 98.7 128.16 98.7 164.5C98.7 200.84 128.16 230.3 164.5 230.3Z"
      :fill="bgColor"
      fill-opacity="0.5"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
    bgColor: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "white",
    size: 30,
});
</script>

<style scoped></style>
