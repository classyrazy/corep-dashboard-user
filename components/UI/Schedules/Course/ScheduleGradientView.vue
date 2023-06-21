<template>
    <section class="w-full grad min-h-[200px] relative" :style="styleObject">
        <div
            class="relative back-glass-bg-light md:w-10 md:h-10 p-2 w-12 h-12 rounded-sm flex justify-center items-center mx-8 top-4" @click="handleGoBack" tabindex="0" @keydown.enter="handleGoBack">
            <back-icon class="text-db-pry-dark dark:text-db-white-light w-6"></back-icon>
        </div>
        <div class="mt-10 ml-10 md:ml-20">
            <h1 class="schedule-title text-4xl font-bold text-white font-inter">{{ courseDetails.title }}</h1>
            <p class="text-2xl font-semibold text-white mt-4 font-inter">{{ courseDetails.optional_code ?
                `${courseDetails.code} /${courseDetails.optional_code}` : courseDetails.code }}</p>
        </div>
        <p class="w-full flex justify-end pr-10 text-2xl dark:text-white">{{duration}}</p>
    </section>
</template>

<script setup lang="ts">
import BackIcon from '../../../icons/back-icon.vue'
import { useQuickFunction } from "~~/composables/core/useQuickFunctions"

interface props {
    courseDetails: {
        title: string;
        code: string;
        optional_code: string;
        color: string;
    }
    duration: string;
}

const props = defineProps<props>();
const {regulateColor,convertToRgba} = useQuickFunction()
let colorInRGBA = regulateColor(props.courseDetails.color, 1)
console.log(colorInRGBA)
const styleObject = reactive({
    backgroundImage: `linear-gradient(180deg, ${convertToRgba(props.courseDetails.color, 0.36)[1]} 0%, ${convertToRgba(props.courseDetails.color, 0.6)[1]} 67.19%, rgba(33, 41, 57, 0) 100%)`
})
function handleGoBack(){
    useRouter().back()
}
</script>

<style scoped>
/* .grad {
    background: linear-gradient(180deg, rgba(172, 9, 236, 0.36) 0%, rgba(172, 9, 236, 0.6) 67.19%, rgba(33, 41, 57, 0) 100%);
} */

.back-glass-bg-dark {
    /* background: rgba(33, 41, 57, 0.64);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(33, 41, 57, 0.7); */
    @apply dark:bg-db-pry-dark dark:rounded-lg cursor-pointer shadow-lg border border-db-pry-dark backdrop-filter backdrop-blur-md;
}

.back-glass-bg-light {
    /* background: rgba(33, 41, 57, 0.64);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(33, 41, 57, 0.7); */
    @apply bg-db-white-light dark:bg-db-pry-dark rounded-lg cursor-pointer shadow-lg border border-db-white-dark dark:border-db-pry-dark backdrop-filter backdrop-blur-md;
}
</style>