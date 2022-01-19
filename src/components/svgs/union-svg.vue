<template>
  <svg
    :width="size"
    height="auto"
    viewBox="0 0 60 56"
    fill="none"
    class="rotate-style"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25 0H17V17L0 17V25H17H25V17V0Z"
      fill="white"
      fill-opacity="0.4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35 56L43 56L43 39L60 39L60 31L43 31L35 31L35 39L35 56Z"
      fill="white"
      fill-opacity="0.4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M60 25L60 17L43 17L43 -7.43094e-07L35 -1.09278e-06L35 17L35 25L43 25L60 25Z"
      fill="white"
      fill-opacity="0.4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.27835e-06 31L2.22928e-06 39L17 39L17 56L25 56L25 39L25 31L17 31L3.27835e-06 31Z"
      fill="white"
      fill-opacity="0.4"
    />
  </svg>
</template>

<script setup>
let props = defineProps({
  size: {
    type: Number,
    default: 60,
  },
});
</script>

<style scoped>
.rotate-style{
  transform: rotate(40deg)
}
</style>
