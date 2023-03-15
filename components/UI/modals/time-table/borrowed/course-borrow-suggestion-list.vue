<template>
    <div class="dark:bg-db-pry px-4 py-4 relative mx-4 rounded-lg min-h-[300px]">
        <ul class=" course-list flex flex-wrap items-center gap-4 md:gap-8 max-w-auto" v-if="courseSuggestion.length">
            <borrowed-course-view v-for="cs in courseSuggestion" :active="cs.active" :key="cs.id"
                :department-name="cs.course_origin.department.name"
                :parent-department="cs.course_origin.parent_department"
                :faculty-name="cs.course_origin.faculty.name" :code="cs.code" :optional-code="cs.optional_code"
                :title="cs.title" @click="handleCourseChosen(cs)"></borrowed-course-view>
        </ul>

        <div class="flex flex-col justify-center items-center min-h-[300px]"
            v-else-if="!courseSuggestion.length && loading">
            <loader-icon class="center-element" :size="50" :color="darkMode ? '#fff' : '#212939'"></loader-icon>
        </div>
        <div class="flex flex-col justify-center items-center min-h-[300px]" v-else>
            <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark " v-if="!searchTerm">Nothing here yet
            </h3>
            <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark" v-else>Can't find course
                "{{ searchTerm }}"</h3>
        </div>

    </div>
</template>

<script setup lang="ts">
import BorrowedCourseView from './borrowed-course-view.vue'
import LoaderIcon from '../../../../svgs/loader-icon.vue'
import { courseType } from '~~/utils/types/courses/courseType';


interface courseSuggestionWithActive extends courseType {
    active?: boolean
}
interface Props {
    courseSuggestion: courseSuggestionWithActive[],
    searchTerm: string,
    loading: boolean,
    darkMode: boolean
}
let props = defineProps<Props>()
let emit = defineEmits(['courseChosen'])
watchEffect(() => {
    console.log(props.courseSuggestion)
})
function handleCourseChosen(course: courseType) {
    emit('courseChosen', course)
}
</script>

<style scoped></style>