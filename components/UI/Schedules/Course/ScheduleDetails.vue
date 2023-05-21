<template>
    <aside class="dark:bg-db-pry-dark bg-db-white-light  max-w-[60%] rounded-md ml-20 mt-6">
        <h2 class="text-lg dark:text-white text-db-pry-dark border-b border-sec dark:border-db-white-darker py-4 px-2">Class
            Details</h2>
        <div class="course-details-wrapper flex flex-col gap-4 text-white p-4">
            <div class="course-row flex justify-between py-2">
                <h3 class="dark:text-db-white-darker text-pry-dark">Time :</h3>
                <p class="font-inter dark:text-db-white text-pry-dark">{{ computedTime?.day }} --> {{computedTime?.startTime}} - {{ computedTime?.endTime }}</p>
            </div>
            <div class="course-row flex justify-between py-2">
                <h3 class="dark:text-db-white-darker text-pry-dark">Status :</h3>
                <span class="font-inter dark:bg-db-pry-light bg-db-white-dark px-2 py-1 text-sm rounded-md capitalize text-pry-dark dark:text-db-white">{{details?.status}}</span>
            </div>
            <div class="course-row flex justify-between py-2">
                <h3 class="dark:text-db-white-darker text-pry-dark">Location :</h3>
                <p class="font-inter text-pry-dark dark:text-db-white">
                    <span class="dark:bg-db-pry-light bg-db-white-dark px-2 py-1 text-sm rounded-md capitalize text-pry-dark dark:text-db-white">{{details?.location_type}}</span> --> {{details?.location}}
                </p>
            </div>
            <div class="course-row flex justify-between py-2">
                <h3 class="dark:text-db-white-darker text-pry-dark">Attendace :</h3>
                <span class="font-inter dark:bg-db-pry-light bg-db-white-dark text-pry-dark px-2 py-1 text-sm rounded-md dark:text-db-white">Compulsory</span>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { useClasses } from '~~/composables/classes/useClasses';
import { useQuickFunction } from '~~/composables/core/useQuickFunctions';
import { useTimetable } from '~~/composables/timetable/useTimetable';

interface Props {
    // create an interface based o  the above schema
    scheduleId: number
}

const props = defineProps<Props>()
const { getCourseNameAndColor, getScheduleDetails, scheudleUrlDetails, scheduleDetail :details, timeDiff } = useClasses()
const { formatTimeToCalendar } = useTimetable()
// const details = ref(null) as Ref<Details | null>
// async function getDetails() {
//     details.value = await getScheduleDetails(scheudleUrlDetails.value.scheduleId)
// }
const computedTime = computed(() => {
    if (!details.value) return
    let day = moment().day(details.value.day).format("dddd")
    let startTime = moment(details.value.start_time, "HH:mm:ss").format("hh:mma")
    let endTime = moment(details.value.end_time, "HH:mm:ss").format("hh:mma")
    return {
        day,
        startTime,
        endTime
    }
})
onMounted(() => {
    getScheduleDetails(scheudleUrlDetails.value.scheduleId)
    console.log({ details, timeDiff })
})
</script>

<style scoped></style>