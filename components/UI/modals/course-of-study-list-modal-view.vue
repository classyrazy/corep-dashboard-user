<template>
    <div class="course-list items-center gap-8 mx-4 max-w-auto" v-if="courseOfStudies">
        <!-- {{ selectedCourse }} -->
        <course-of-study-modal-view v-for="courseOfStudy in computedCourseOfStudies" :key="courseOfStudy.id"
            :department="courseOfStudy.name" :faculty="courseOfStudy.faculty" :active="courseOfStudy.active"
            :parent-department="courseOfStudy.parent_department"
            @click="handleCourseOfStudyChosen(courseOfStudy.id, courseOfStudy.parent_department)">
        </course-of-study-modal-view>
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
    parent_department?: parent_departmentObj
}
interface Props {
    courseOfStudies: courseOfStudyObj[]
}
let selectedCourse = ref(null)

let withActiveArr = null
let computedCourseOfStudies = computed(() => {
    withActiveArr = []
    props.courseOfStudies.forEach((courseOfStudy) => {
        withActiveArr.push(reactive({
            id: courseOfStudy.id,
            name: courseOfStudy.name,
            faculty: courseOfStudy.faculty,
            parent_department: courseOfStudy.parent_department,
            active: false
        }))
    })
    return withActiveArr

})



let props = defineProps<Props>();
let emit = defineEmits(["chosenCourseOfStudy"]);

function handleCourseOfStudyChosen(courseOfStudyId, parent) {
    console.log({ computedCourseOfStudies: computedCourseOfStudies.value })
    let courseChosenObj = reactive({
        department_id: null,
        sub_department_id: null
    })
    let courseOfStudyWithParent = [...props.courseOfStudies].filter(e => e.parent_department)
    console.log({ parent })
    if (!parent) {
        let chosenCourseFound = [...props.courseOfStudies].find(c => c.id === courseOfStudyId)
        courseChosenObj.department_id = chosenCourseFound.id
        computedCourseOfStudies.value.forEach(course => {
            course.active = false
            if (course.id === chosenCourseFound.id && !course.parent_department) {
                course.active = true
            }
        })

    } else {
        let chosenCourseFound = courseOfStudyWithParent.find(c => c.id === courseOfStudyId)
        courseChosenObj.sub_department_id = chosenCourseFound.id
        courseChosenObj.department_id = chosenCourseFound.parent_department.id
        computedCourseOfStudies.value.forEach(course => {
            course.active = false
            if (course.id === chosenCourseFound.id && course.parent_department) {
                console.log(course)
                course.active = true
            }
        })

    }

    selectedCourse.value = courseChosenObj

    console.log("Chosen", courseChosenObj)

    emit("chosenCourseOfStudy", courseChosenObj)
}


</script>

<style scoped>
.course-list {
    display: grid;
    display: flex;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    max-width: auto;
    /* grid-gap: 1rem; */
}
</style>