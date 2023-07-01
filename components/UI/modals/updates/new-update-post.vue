<template>
    <aside class="">
        <div class="px-4 py-4 md:px-6 flex justify-between items-center dark:text-white">
            <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
                Create New Update
            </h1>
            <div
                class="close_btn dark:border-db-white-dark border w-8 h-8 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md">
                <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
            </div>
        </div>
        <hr class="w-full border-gray-500">
        <form action="" class="px-4">
            <p class="dark:text-db-white-darker text-db-pry-dark text-sm my-4">Please select the type of update you want to create</p>
            <div class="flex flex-col w-full">
                <select v-model="formReactive.updateType.value"
                    class="dark:bg-db-pry-dark dark:text-white bg-white text-db-pry-dark rounded-lg w-full max-w-[200px] h-12 px-4 focus:border-sec border border-gray-400 ouline-none focus:outline-none">
                    <option v-for="option in updateTypes" :key="option.value" :value="option.value">
                        {{ option.name }}
                    </option>
                </select>
                <select-update-course-list class="mt-4 mb-6" @course-chosen="handleCourseChosen" v-if="formReactive.updateType.value !== 'general'"
                    :course-suggestion="computedCourses"
                    :loading="false" :dark-mode="darkMode"></select-update-course-list>
                <ul class="dark:bg-db-pry flex flex-col mt-4 gap-4 py-4 relative rounded-lg min-h-[250px] max-h-[400px] overflow-y-auto list-disc" v-else>
                    <li class="text-sec border-b-[0.5px] last-of-type:border-b-0 mx-10 border-sec py-2" v-for="option in updateTypes" :key="option.value">
                        <h4 class="dark:text-white text-db-pry-dark text-md mb-1 font-semibold">{{ option.name }}</h4>
                        <p class="dark:text-db-white-darker text-db-pry-dark text-sm mb-1">{{ option.description }}</p>
                    </li>
                </ul>
                <div class="flex justify-end m-8">
                    <v-button type="pry" :loading="loadingSubmitData" class="text-right"
                        @click="handleSubmitCourseChosen">{{formStep == 1 ? 'Next': 'Done'}}</v-button>
                </div>
            </div>
        </form>
    </aside>
</template>

<script setup lang="ts">
import VButton from '../../../forms/v-button.vue'
import SelectUpdateCourseList from './select-update-course-list.vue'
import CloseIcon from '../../../icons/close-icon.vue'
import { useUserStore } from '~~/store/user'

let store = useUserStore()
const darkMode = computed(() => store.darkMode)
const formStep  = ref(1)
const updateTypes = [
    {
        name: 'General Update',
        value: 'general',
        description: 'Sends a general update to all students in your department and level'
    },
    {
        name: 'Course Update',
        value: 'course',
        description: 'Sends an update to all students in a particular course'
    },
    {
        name: 'Assignment Update',
        value: 'assignment',
        description: 'Sends an update to all students in a particular course and also tracks assignments'
    },
    {
        name: 'Test Update',
        value: 'test',
        description: 'Sends an update to all students in a particular course and also tracks tests'
    },
]
const formReactive = reactive({
    updateType: {
        value: updateTypes[0].value,
        error: null
    }
})
// {
//     id:number,
//     code: string,
//     title: string,
//     description?: string,
//     color?: string,
//     course_origin: {
//         department:{
//             faculty_id: number,
//             id: number,
//             name: string,
//         }
//         parent_department?: {
//             id: number,
//             name: string, 
//         },
//         faculty: {
//             id: number,
//             name: string
//         }
//     },
//     department_id: number,
//     level_id: number,
//     unit: number,
//     optional_code: string,
//     coordinator?: string;
//     school_id: number,
//     updatedAt: string,
//     createdAt: string,
// } @copilot follow the above type and give me test data for defaultCourses
let defaultCourses = ref([

{
    id: 1,
    code: 'CSC 101',
    title: 'Introduction to Computer Science',
    description: 'This is a course that introduces students to the world of computer science',
    color: '#000',
    course_origin: {
        department:{
            faculty_id: 1,
            id: 1,
            name: 'Computer Science',
        },
        parent_department: {
            id: 1,
            name: 'Science and Technology', 
        },
        faculty: {
            id: 1,
            name: 'Science and Technology'
        }
    },
    department_id: 1,
    level_id: 1,
    unit: 3,
    optional_code: 'CSC 101',
    school_id: 1,
    updatedAt: '2021-08-12T12:00:00.000Z',
    createdAt: '2021-08-12T12:00:00.000Z',

}
])
const computedCourses = computed(() => {
    return defaultCourses.value.map((course) => {
        return {
            ...course,
            active: false
        }
    })
})

</script>

<style scoped></style>