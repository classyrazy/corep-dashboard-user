<template>
    <div class="h-[1000px] relative" :style="styleObject">
        <span class="flex justify-between items-center w-full md:px-1 px-4 relative">
            <p class="text-base text-white my-5  font-inter text-start md:truncate">{{courseCode}} | {{courseName}}</p>
            <edit-course-event-icon :size="20" text-color="white" class="md:absolute md:bottom-0 right-0 text-white" v-if="editable"></edit-course-event-icon>
        </span>
        <div class="px-4">
            <course-live-icon :size="20"></course-live-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import CourseLiveIcon from '../../../../icons/course-live-icon.vue'
import EditCourseEventIcon from '../../../../icons/edit-course-event-icon.vue'
import {useQuickFunction} from "~~/composables/core/useQuickFunctions"
interface Props {
    courseName: string,
    courseCode: string,
    editable: boolean,
    startTime: string,
    endTime: string,
    color: string
}
let props = defineProps<Props>();
let {regulateColor} = useQuickFunction()
let computedColor = computed(() => {
    let colorInRGBA = regulateColor(props.color, 0.5)
    console.log(colorInRGBA)
    let linearGradient = `linear-gradient(90deg, ${colorInRGBA[0]} 0%, ${colorInRGBA[1]} 100%)`
    return linearGradient
})
console.log(computedColor.value)
const styleObject = reactive({
  backgroundImage: computedColor
})
</script>

<style scoped>
.event {
    background-image: linear-gradient(90deg, rgba(223, 45, 45, 0.5) 0%, rgba(11, 219, 94, 0.5) 100%);
}
</style>