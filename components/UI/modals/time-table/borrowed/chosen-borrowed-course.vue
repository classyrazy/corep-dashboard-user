<template>
    <div class="">
        <h3 class="mx-4 mb-2 text-base md:text-lg text-left dark:text-white text-db-pry-dark font-semibold">Course Details
        </h3>
        <div class="flex flex-col gap-6 md:grid md:grid-cols-10 mx-4 py-4 dark:bg-db-pry rounded-md">

            <div class="flex flex-col gap-4 mx-4 col-span-4 w-full">
                <div class="course-code-con flex gap-6 items-center">
                    <h3 class="text-sm md:text-md text-left dark:text-white text-db-pry-dark font-inter uppercase">Course
                        code
                        :
                    </h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark uppercase">{{
                        courseDetails.optional_code ? `${courseDetails.code}/${courseDetails.optional_code}` :
                        courseDetails.code }}</p>
                </div>
                <div class="course-code-con flex gap-6 items-center">
                    <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">Course
                        name
                        :
                    </h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark capitalize">
                        {{ courseDetails.title }}
                    </p>
                </div>
                <div class="course-code-con flex gap-6 items-center">
                    <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">Course
                        units :</h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark">{{ courseDetails.unit }}
                        units
                    </p>
                </div>

                <div class="course-code-con flex gap-6 items-center">
                    <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">Faculty :
                    </h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark  capitalize">
                        {{ courseDetails.course_origin.faculty.name }}</p>
                </div>
                <div class="course-code-con flex gap-6 items-center">
                    <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">
                        Department :
                    </h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark capitalize">
                        {{ courseDetails.course_origin.parent_department?.name ?
                            `${courseDetails.course_origin.parent_department?.name} ---> ` : '' }}
                        {{ courseDetails.course_origin.department.name }}</p>
                </div>
                <div class="course-code-con flex gap-6 items-center" v-if="courseDetails.coordinator">
                    <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">
                        Coordinator :
                    </h3>
                    <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark capitalize">
                        {{ courseDetails.coordinator }}</p>
                </div>
            </div>
            <div class="col-span-6 w-[90%] mx-auto">
                <ul class="dark:text-db-white flex flex-col gap-4" v-if="scheduleDetails.length">
                    <li class="border dark:border-db-white-darker min-w-[150px] rounded-md px-4 py-2 font-inter cursor-pointer list-none my-2 first-of-type:mt-0"
                        v-for="i in scheduleDetails" :key="i.id">
                        <!-- <h3 class="text-md font-semi-bold dark:text-white">Time</h3> -->
                        <div class="course-code-con flex gap-6 items-center">
                            <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">
                                Time
                                :
                            </h3>
                            <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark ">
                                <span class="capitalize">{{ getGetCurrentDaybasedOnId(i.day).full }}</span>
                                {{ i.start_time }} -
                                {{ i.end_time }}
                            </p>
                        </div>
                        <div class="course-code-con flex gap-6 items-center my-2">
                            <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">
                                Location type :
                            </h3>
                            <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark truncate "> {{
                                i.location_type }}
                            </p>
                        </div>
                        <div class="course-code-con flex gap-6 items-center">
                            <h3 class="text-sm md:text-sm text-left dark:text-white text-db-pry-dark font-inter uppercase">
                                Location :
                            </h3>
                            <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark truncate "> {{
                                i.location }}
                            </p>
                        </div>
                    </li>
                </ul>
                <loader-icon class="center-element" :size="50" :color="darkMode ? '#fff' : '#212939'" v-else-if="!scheduleDetails.length && fetchingSchedule"></loader-icon>

                <div class="flex flex-col items-center justify-center gap-4" v-else>
                    <h3 class="text-lg font-semibold dark:text-white">No schedule found</h3>
                    <p class="text-sm dark:text-gray-300">Please contact your
                        {{ courseDetails.course_origin.department.name }} department for more information</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { courseType } from '~~/utils/types/courses/courseType';
import { courseSchedule } from '~~/utils/types/courses/schedulesType';
import { useQuickFunction } from "~~/composables/core/useQuickFunctions"
import { useAlert } from '~~/composables/core/useToast';
import { useUserStore } from "~~/store/user";

import Graph from "~~/libs/avanda"
interface Props {
    courseDetails: courseType,
}
let props = defineProps<Props>();
const { getGetCurrentDaybasedOnId } = useQuickFunction()
let store = useUserStore();

let darkMode = computed(() => store.darkMode);


let scheduleDetails = ref<courseSchedule[]>([])
let fetchingSchedule = ref(false)
async function handleGetScheduleDetails() {
    try {
        fetchingSchedule.value = true
        let req = await new Graph().service("Schedule/getScheduleOfCourse").params({ course_id: props.courseDetails.id }).get()
        scheduleDetails.value = req.getData()
    } catch (error: any) {
        useAlert().openAlert({ type: 'ERROR', msg: `${error.getMsg()}` })
    } finally {
        fetchingSchedule.value = false
    }
}
onMounted(() => {
    handleGetScheduleDetails()
})
</script>

<style scoped></style>