<template>
    <div class="grid grid-cols-1" :style="{gridGap: `${gapRef}em`}">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

    let props = defineProps({
        gap: {
            type: Number,
            default: 2
        }
    })
    let gapRef = ref(props.gap)
</script>

<style scoped>

</style>