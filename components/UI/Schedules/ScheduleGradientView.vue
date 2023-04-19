<template>
    <section class="w-full grad min-h-[200px] relative">
        <div
            class="relative dark:back-glass-bg-dark back-glass-bg-light w-10 h-10 p-2 rounded-sm flex justify-center items-center mx-8 top-4">
            <back-icon class="w-6"></back-icon>
        </div>
        <div class="mt-10 ml-20">
            <h1 class="schedule-title text-4xl font-bold text-white font-inter">Real Analysis 2</h1>
            <p class="text-2xl font-semibold text-white mt-4 font-inter">MAT232/MAT234</p>
        </div>
        <p class="w-full flex justify-end pr-10 text-2xl text-white">3hrs</p>
    </section>
</template>

<script setup lang="ts">
import BackIcon from '../../icons/back-icon.vue'

</script>

<style scoped>
.grad {
    background: linear-gradient(180deg, rgba(172, 9, 236, 0.36) 0%, rgba(172, 9, 236, 0.6) 67.19%, rgba(33, 41, 57, 0) 100%);
}

.back-glass-bg-dark {
    background: rgba(33, 41, 57, 0.64);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(33, 41, 57, 0.7);
}

.back-glass-bg-light {
    background: rgba(33, 41, 57, 0.64);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(33, 41, 57, 0.7);
}
</style>