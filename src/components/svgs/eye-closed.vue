<template>
  <svg class="svg" :width="size" height="auto" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.508 7.801c.556-.527 1.036-1.134 1.422-1.801h-1.185C12.48 7.814 10.378 9 8 9 5.622 9 3.52 7.814 2.254 6H1.07c.386.667.866 1.274 1.421 1.801L.896 9.396l.708.707L3.26 8.446c.71.523 1.511.932 2.374 1.199l-.617 2.221.964.268.626-2.255C7.06 9.96 7.525 10 8 10c.475 0 .94-.041 1.392-.12l.626 2.254.964-.268-.617-2.221c.863-.267 1.663-.676 2.374-1.2l1.657 1.658.708-.707-1.595-1.595z" fill-rule="nonzero" fill-opacity="1" fill="#000" stroke="none"/></svg>
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
