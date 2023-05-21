<template>
    <db-content v-slot="slotProps" type="no-style">
        <schedule-gradient-view class="first" :course-details="coursePreamble" :duration="timeDiff"></schedule-gradient-view>

        <Tabs :tabs="tabItems" class="flex w-full border-b mt-8 border-db-white-darker"
            tb-header-item-style="dark:text-white min-w-[200px] py-2 text-center ml-8 first:ml-20 text-lg cursor-pointer rounded-tl-md rounded-tr-md"
            @changed="handleTabChange" />
        <keep-alive>
            <component :is="tabs[tab]" class=""></component>
        </keep-alive>
    </db-content>
</template>

<script setup lang="ts">
import ComingSoon from '../../components/UI/Schedules/Course/Materials/ComingSoon.vue'
import CourseFlagTab from '../../components/UI/Schedules/Course/Flags/CourseFlagTab.vue'
import Tabs from '../../components/core/tabs.vue'
import ScheduleDetails from '../../components/UI/Schedules/Course/ScheduleDetails.vue'
import DbContent from '../../components/UI/db-content.vue'
import ScheduleGradientView from '../../components/UI/Schedules/Course/ScheduleGradientView.vue'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { useFlags } from '~~/composables/classes/flags/useFlags'
import { useClasses, timeDiff } from '~~/composables/classes/useClasses'

let courseId = useRoute().params.id as string
definePageMeta({
    layout: "d-board",
    middleware: ["logged-in"],
});
const tabs: any = {
    "Course Details": ScheduleDetails,
    "Flags": CourseFlagTab,
    "Materials": ComingSoon,
}

const tabItems = Object.keys(tabs)
let tab = ref(tabItems[0])
function handleTabChange(tabIdx: number) {
    tab.value = tabItems[tabIdx]
}
const config = useRuntimeConfig()
const parts = courseId.split('-');

const scheduleId = parts[parts.length - 2];
const courseIdParam = parseInt(parts[parts.length - 1]);
console.log(scheduleId, courseIdParam)
const num = parseInt(scheduleId);
const { getCourseNameAndColor,scheudleUrlDetails } = useClasses()
const coursePreamble:{
    id: string,
    title: string,
    code: string,
    color: string,
    optional_code: string
} = await getCourseNameAndColor(scheudleUrlDetails.value.courseId)
console.log({ coursePreamble })

</script>

<style>
.tab-active {
    @apply border-t border-r border-l border-sec;
}
</style>