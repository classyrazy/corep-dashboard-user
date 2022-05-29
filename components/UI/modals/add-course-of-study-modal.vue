<template>
    <div class="min-h-[600px]" :class="darkMode ? 'dark' : ''" v-if="faculties">
        <div class="upper">
            <div class="name-close_btn p-6  flex justify-between items-center dark:text-white">
                <h1 class="font-semibold text-2xl text-center">Choose course of study</h1>
                <div
                    class="close_btn dark:border-db-white-dark border-2 w-10 h-10 flex justify-center cursor-pointer items-center rounded-md">
                    <close-icon :text-color="darkMode ? 'white' : 'black'"></close-icon>
                </div>
            </div>
            <div class="bg-sec w-full h-[1px]"></div>
        </div>
        <div class="courses-part mt-4">
            <tabs-wrapper :dark-mode="darkMode" @chosen-faculty="handleChosenFaculty"
                @search-course="handleSeachCourses">
                <tab v-for="faculty in faculties" :title="faculty.name" :key="faculty.id" v-slot="slotProps"
                    class=" styled_scrollbar rounded-lg mt-4 dark:bg-db-pry mx-4 h-[400px] max-h-[500px] overflow-y-auto">
                    <course-of-study-list-modal-view :course-of-studies="computedCourseOfStudies" v-if="computedCourseOfStudies.length" class=""
                        @chosen-course-of-study="handleChosenCourseOfStudy">
                    </course-of-study-list-modal-view>
                    <div class="" v-else>Nothing to show ooo</div>
                </tab>
            </tabs-wrapper>
        </div>
        <div class="flex justify-end m-8">
            <v-button type="pry" :loading="loading" class="text-right" @click="handleSubmitCourseChosen">Done</v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import VButton from '../../forms/v-button.vue'
import Tab from '../tabs/tab.vue'
import TabsWrapper from '../tabs/tabs-wrapper.vue'
import CloseIcon from '../../icons/close-icon.vue'
import Graph from "../../../libs/avanda";
import CourseOfStudyListModalView from './course-of-study-list-modal-view.vue';
import useFormRequest from '../../../composables/useFormRequest';

interface Props {
    darkMode: boolean
}

let props = defineProps<Props>();

let modalSubmitData = ref(null)

let faculties = ref(null)
let courseOfStudies = ref(null)
let searchValue = ref(null)

async function getFaculties() {
    try {
        let req = new Graph()
            .service("Faculty/getAllFacultiesBySchool")
            .selectAll("id", "name")
        faculties.value = await (await req.get()).getData();
        console.log(faculties.value)
    } catch (error) {
        console.log(error);
    }
}
async function handleChosenFaculty(facultyIdpassed) {
    console.log("hello World", facultyIdpassed)
    searchValue.value = null
    let id = facultyIdpassed
    let { submitData, loading, data } = useFormRequest(
        "Department/getAllDepartmentsByFaculty",
        null,
        { id },
        (data) => {
            console.log(data);
            if (data) {
                courseOfStudies.value = data;
            }
        },
        (error) => {
            console.log(error);
        }
    );
    submitData()
}
function handleSeachCourses(searchVal) {
    searchValue.value = searchVal
    console.log(searchValue.value)
}
let computedCourseOfStudies = computed(() => {
    if(searchValue.value){
        return courseOfStudies.value.filter(course => course.name.toLowerCase().includes(searchValue.value.toLowerCase()))
    }
    return courseOfStudies.value
})
onBeforeMount(() => {
    getFaculties()
})
onMounted(() => {
    // getFaculties()
    console.log('mounted')
})
function handleChosenCourseOfStudy(courseObj) {
    modalSubmitData.value = courseObj
}


function handleSubmitCourseChosen() {
    console.log(modalSubmitData.value)
}
let colors = {
    scrollthumb: props.darkMode ? '#BBB9B6' : 'rgb(100 116 139/.5)',
    scrollbar: props.darkMode ? '#212939' : 'transparent',
}

</script>

<style scoped>
.styled_scrollbar::-webkit-scrollbar {
    background-color: transparent;
    width: 0.375rem !important;
    height: 0.375rem !important;
}

.styled_scrollbar::-webkit-scrollbar-thumb {
    background-color: v-bind(colors.scrollthumb) !important;
    opacity: 1 !important;
    border-radius: 50px;
}

.styled_scrollbar::-webkit-scrollbar-track {
    background-color: rgb(100 116 139/.16) !important;
    border-radius: 50px !important;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>