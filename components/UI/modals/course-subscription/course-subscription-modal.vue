<template>
  <div class="">
    <div class="flex flex-col">
      <div class="pt-4 px-2 md:p-6 flex justify-between items-center dark:text-white">
        <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
          Register Your Courses
        </h1>
        <div
          class="close_btn dark:border-db-white-dark border w-8 h-8 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md">
          <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
        </div>
      </div>
      <div class="bg-sec w-full h-[1px] mt-3"></div>
      <div class="w-full mx-auto px-4 my-4">
        <v-input class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg" size="small"
          style-type="modal-input" :icon="SearchIcon" placeholder="Search for Courses by title, code" full iconLeft
          :value="courseSearch" @custom-change="debouncedSearchCourseFunction"></v-input>
      </div>
      <course-subscription-suggestion-list class="mt-4 mb-6 mx-4" @course-chosen="handleCourseChosen"
        :search-term="displayCourseSearchString" :course-suggestion="computedCourses" :loading="courseSuggestionLoading"
        :dark-mode="darkMode"></course-subscription-suggestion-list>
      <div class="flex justify-end m-8">
        <v-button type="pry" :loading="loadingSubmitData" class="text-right"
          @click="handleSubmitCourseChosen">Done</v-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '../../../icons/close-icon.vue'
import VInput from '../../../forms/v-input.vue'
import CourseSubscriptionSuggestionList from './course-subscription-suggestion-list.vue'
import VButton from '../../../forms/v-button.vue'
import Graph from '~~/libs/avanda'
import _, { debounce } from 'lodash';
import { useAlert } from '~~/composables/core/useToast';
import { useUserStore } from '~~/store/user'
import SearchIcon from "../../../icons/search-icon.vue";
import useFormRequest from '~~/composables/useFormRequest'


interface Props {
  darkModeProps: boolean;

}
let props = defineProps<Props>()
let store = useUserStore()
let courseSuggestionLoading = ref(false)
let loadingSubmitData = ref(false)
let darkMode = computed(() => store.darkMode);

let courseSearch = reactive({
  value: "",
  error: null
})
let displayCourseSearchString = ref('')
let courses = ref([])
let defaultCourses = ref([])
let chosenCourses = ref<number[]>([])
let computedCourses = computed(() => {
  if (!courseSearch.value.trim()) {
    return defaultCourses.value.map((course: any) => {
      return {
        ...course,
        active: chosenCourses.value.includes(course.id)
      }
    })
  }
  return courses.value.map((course: any) => {
    return {
      ...course,
      active: chosenCourses.value.includes(course.id)
    }
  })
});
async function handleSearchCourseWithDay() {
  courseSuggestionLoading.value = true
  try {
    let req = await new Graph().service("Course/getCourseScheduleWithQuery")
      .fetch("*",
        new Graph().service("Department/courseOriginDetailsFromParent").as("course_origin")
      )
      .params({ course_query: courseSearch.value.trim() })
      .get()
    console.log(req.getData())
    courses.value = req.getData()
  } catch (error) {
    console.log(error)
    useAlert().openAlert({ type: 'ERROR', msg: `Oops, Something went wrong 🤭` })

  } finally {
    // setTimeout(() => {
    courseSuggestionLoading.value = false
    // }, 3000);
    displayCourseSearchString.value = courseSearch.value.trim()
  }

}
const debouncedSearchCourseFunction = debounce(() => {
  // debounce before sending request
  if (courseSearch.value.trim() === '') return
  let searchQueryBefore: string = '';
  if (searchQueryBefore?.trim() === courseSearch.value.trim()) return
  searchQueryBefore = courseSearch.value.trim()
  console.log('debounced')
  courseSuggestionLoading.value = true
  handleSearchCourseWithDay()

}, 1500)
async function handlefetchCourseSuggestionFromTimetable() {
  courseSuggestionLoading.value = true
  try {
    let req = await new Graph().service("CourseSubscription/getUserTimetableCourses")
      .fetch(
        new Graph().service("Course/getCourseFromParent").fetch(
          "*",
          new Graph().service("Department/courseOriginDetailsFromParent").as("course_origin")
        ),
      ).get()
    console.log(req.getData())
    courses.value = req.getData().map((course: any) => {
      chosenCourses.value.push(course.course.id)
      return {
        ...course.course
      }
    })
    defaultCourses.value = req.getData().map((course: any) => {
      return {
        ...course.course
      }
    })
  } catch (error) {
    console.log(error)
    useAlert().openAlert({ type: 'ERROR', msg: `Oops, Something went wrong 🤭` })

  } finally {
    courseSuggestionLoading.value = false
  }
}
onMounted(() => {
  handlefetchCourseSuggestionFromTimetable()
})
function handleCourseChosen(idPassed: number) {
  if (chosenCourses.value.includes(idPassed)) {
    chosenCourses.value = chosenCourses.value.filter((id) => id !== idPassed)
  } else {
    chosenCourses.value.push(idPassed)
  }
}
let computedChosenCourseId = computed(() => chosenCourses.value);

function handleSubmitCourseChosen() {
  if (chosenCourses.value.length === 0) {
    useAlert().openAlert({ type: 'Alert', msg: `You have to subscribe to at least a course` })
    return;
  }
  loadingSubmitData.value = true
  let { submitData, data } = useFormRequest(
  "CourseSubscription/subscribeToCourses",
  null,
  { courses: computedChosenCourseId.value },
  (data: any, reqMsg: string) => {
    console.log(data);
    loadingSubmitData.value = false
    if (data) {
      useAlert().openAlert({ type: 'SUCCESS', msg: reqMsg })
      store.fetchUser()
    }
  },
  (error: any) => {
    loadingSubmitData.value = false
    useAlert().openAlert({ type: 'Alert', msg: `${error.getMsg() || 'Something went wrong'}` })

  }
);

  console.log(chosenCourses.value)
  submitData();
}
</script>

<style scoped></style>