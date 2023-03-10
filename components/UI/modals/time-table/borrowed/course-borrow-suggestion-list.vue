<template>
    <div class="dark:bg-db-pry px-4 py-4 relative mx-4 rounded-lg">
        <div class=" course-list md:flex flex-wrap items-center gap-8 max-w-auto" v-if="courseSuggestion.length">
            <borrowed-course-view v-for="cs in courseSuggestion" :active="cs.active"
                :department-name="cs.course_origin.department.name"
                :parent-department-name="cs.course_origin.parent_department?.name"
                :faculty-name="cs.course_origin.faculty.name" :code="cs.code" :optional-code="cs.optional_code"
                :title="cs.title"></borrowed-course-view>
        </div>
        <div class="flex flex-col justify-center items-center" v-else>
            <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark ">Nothing here yet</h3>
        </div>

    </div>
</template>

<script setup lang="ts">
import BorrowedCourseView from './borrowed-course-view.vue'
import { borrowedCourseSuggestionWithScheduleType } from '~~/utils/types/borrowedCourseType'

interface courseSuggestionWithActive extends borrowedCourseSuggestionWithScheduleType {
    active?: boolean
}
interface Props {
    courseSuggestion: courseSuggestionWithActive[]
}
let props = defineProps<Props>()
</script>

<style scoped></style>