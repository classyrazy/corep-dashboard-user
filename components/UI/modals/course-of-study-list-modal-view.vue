<template>
    <div class="course-list items-center gap-8 mx-4 max-w-auto">
        <course-of-study-modal-view v-for="courseOfStudy in courseOfStudies" :key="courseOfStudy.id"
            :department="courseOfStudy.name" :faculty="courseOfStudy.faculty" :parent-department="courseOfStudy.parent_department" @click="handleCourseOfStudyChosen(courseOfStudy.id)"></course-of-study-modal-view>
    </div>
</template>

<script setup lang="ts">
import CourseOfStudyModalView from './course-of-study-modal-view.vue'
type parent_departmentObj = {
    id: number,
    name: string
}
type courseOfStudyObj = {
    id: number,
    name: string,
    subDepartment: string,
    faculty: string,
    parent_department? : parent_departmentObj
}
interface Props {
    courseOfStudies: courseOfStudyObj[] 
}

let props = defineProps<Props>();
let emit = defineEmits<Props>();

function handleCourseOfStudyChosen(courseOfStudyId) {
    console.log("hello World", courseOfStudyId)
}


</script>

<style scoped>
.course-list{
    display: grid;
    display: flex;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    max-width: auto;
    /* grid-gap: 1rem; */
}
</style>