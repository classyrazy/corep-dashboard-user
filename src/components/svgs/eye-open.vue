<template>
   <svg class="svg" :width="size" height="auto" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 10c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2-1.104 0-2 .895-2 2 0 1.105.896 2 2 2z" fill-rule="nonzero" fill-opacity="1" fill="#000" stroke="none"/><path d="M8 4c2.878 0 5.378 1.621 6.635 4-1.257 2.379-3.757 4-6.635 4-2.878 0-5.377-1.621-6.635-4C2.623 5.621 5.122 4 8 4zm0 7c-2.3 0-4.322-1.194-5.478-3C3.678 6.194 5.7 5 8 5c2.3 0 4.322 1.194 5.479 3C12.322 9.806 10.3 11 8 11z" fill-rule="evenodd" fill-opacity=".9" fill="#000" stroke="none"/></svg>
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
</style>
