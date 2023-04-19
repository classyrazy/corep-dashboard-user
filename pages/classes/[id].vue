<template>
    <db-content v-slot="slotProps" type="no-style">
        <schedule-gradient-view class="first"></schedule-gradient-view>

        <Tabs :tabs="tabItems" class="flex w-full border-b mt-8 border-db-white-darker"
            tb-header-item-style="dark:text-white min-w-[200px] py-2 text-center ml-8 first:ml-20 text-lg cursor-pointer rounded-tl-md rounded-tr-md" @changed="handleTabChange"/>
            <component :is="tabs[tab]" class="w-full"></component>
    </db-content>
</template>

<script setup lang="ts">
import Tabs from '../../components/core/tabs.vue'
import ScheduleDetails from '../../components/UI/Schedules/ScheduleDetails.vue'
import DbContent from '../../components/UI/db-content.vue'
import ScheduleGradientView from '../../components/UI/Schedules/ScheduleGradientView.vue'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

let courseId = useRoute().params.id as string

definePageMeta({
    layout: "d-board",
    middleware: ["logged-in"],
});
const tabs: any = {
    "Course Details": ScheduleDetails,
    "Flags": ScheduleDetails,
    "Materials": ScheduleDetails,
}

const tabItems = Object.keys(tabs)
let tab = ref(tabItems[0])
function handleTabChange(tabIdx: number) {
    tab.value = tabItems[tabIdx]
}
const config = useRuntimeConfig()
const parts = courseId.split('-');

const uuidStr = parts[parts.length - 1];
const num = parseInt(uuidStr);
</script>

<style>
.tab-active {
    @apply border-t border-r border-l border-sec;
}
</style>