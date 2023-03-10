<template>
  <div class="" v-if="!displayBorrowedCourse">
    <div class="py-6 px-2 md:p-6 flex justify-between items-center dark:text-white">
      <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
        Add Course to timetable
      </h1>
      <div
        class="close_btn dark:border-db-white-dark border-2 w-6 h-6 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md"
        v-if="!displayBorrowedCourse">
        <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
      </div>
    </div>
    <div class="bg-sec w-full h-[1px]"></div>

    <ul class="flex flex-wrap gap-4 w-[90%] mx-auto justify-around mb-4 mt-6">
      <li v-for="day in days" :key="day.id" :class="[
        'transition duration-200 ease-in font-semibold md:text-md text-sm rounded-md  text-center py-1 md:py-2 px-2 md:px-1 md:min-w-[100px] cursor-pointer',
        formReactive.day.value !== day.id ? 'bg-db-pry-light text-white border-b-2 border-yellow' : 'bg-yellow',
        'border-transparent cursor-pointer',
      ]" @click="setActiveDay(day.id)">
        {{ day.name }}
      </li>
    </ul>
    <form class="w-full px-4 md:px-8 mx-auto mt-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 md:gap-6">
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Code</label>
            <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class=""
              size="medium" :value="formReactive.courseCode">
            </v-input>
          </div>
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Title</label>
            <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
              class="text-white rounded-lg" size="medium" :value="formReactive.courseName">
            </v-input>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Start time</label>
            <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium"
              :value="formReactive.startTime">
            </v-input>
          </div>
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">End time</label>
            <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium"
              :value="formReactive.endTime">
            </v-input>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Unit</label>
            <v-input type="number" placeholder="Enter course unit e.g 3" full styleType="modal-input" class=""
              size="medium" :value="formReactive.unit" max="10" min="1">
            </v-input>
          </div>
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Location Type</label>
            <select
              class="dark:bg-db-pry-dark dark:text-white bg-white text-db-pry-dark rounded-lg w-full h-12 px-4 focus:border-sec border border-gray-400 ouline-none"
              v-model="formReactive.locationType.value">
              <option value="physical">Physical</option>
              <option value="online">online</option>
            </select>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Location</label>
          <v-input type="text" placeholder="Location" full styleType="modal-input" class="rounded-lg " size="medium"
            :value="formReactive.location">
          </v-input>
        </div>
      </div>
      <div class="flex gap-4 flex-col md:flex-row md:justify-between items-center mt-8 pb-10">
        <v-button type="sec" class="w-full md:w-auto">Add Course</v-button>
        <v-button type="border-sec" class="w-full md:w-auto" @click.prevent="handleBorrowedCourse">Borrow
          Course</v-button>
      </div>
    </form>
  </div>

  <div class="md:py-6 pb-8 pt-8 md:pb-0" v-else>
    <div class="flex flex-col">
      <span class="flex items-center gap-4 px-6">
        <left-arrow :text-color="darkMode ? 'white' : 'black'" class="cursor-pointer"
          @click="displayBorrowedCourse = false" />
        <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
          Borrow Course
        </h1>
      </span>
      <div class="bg-sec w-full h-[1px] mt-3"></div>
      <div class="w-full mx-auto px-4 my-4" v-if="currentScreen === 'add-borrow'">
        <v-input class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg" size="small"
          style-type="modal-input" :icon="SearchIcon" placeholder="Search for Courses" full iconLeft :value="courseSearch"
          @custom-change="debouncedSearchCourseFunction"></v-input>
      </div>
      <chosen-borrowed-course class="mt-4 mb-6" v-if="currentScreen === 'added-borrow' && selectedCourseDetails"
        :course-details="selectedCourseDetails"></chosen-borrowed-course>
      <course-borrow-suggestion-list class="mt-4 mb-6 mx-4" :course-suggestion="computedCourses"
        @course-chosen="handleCourseChosen" :search-term="displayCourseSearchString" v-if="currentScreen === 'add-borrow'"
        :loading="courseSuggestionLoading" :dark-mode="darkMode"></course-borrow-suggestion-list>
      <div class="flex flex-col gap-4 md:flex-row items-center pb-10 justify-between w-full px-4">
        <v-button type="border-sec" class="w-full md:w-auto" v-if="currentScreen === 'added-borrow'"
          @click="handleBackToSearch">Back</v-button>
        <v-button type="sec" class="w-full md:w-auto" v-if="currentScreen === 'added-borrow'">Add Borrowed
          Course</v-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourseBorrowSuggestionList from './borrowed/course-borrow-suggestion-list.vue'
import ChosenBorrowedCourse from './borrowed/chosen-borrowed-course.vue'
import CloseIcon from '../../../icons/close-icon.vue'
import LeftArrow from '../../../svgs/left-arrow.vue'
import SearchIcon from "../../../icons/search-icon.vue";
import AddBorrowedCourse from "./borrowed/add-borrowed-course.vue";
import VInput from "../../../forms/v-input.vue";
import VButton from "../../../forms/v-button.vue";
import { useModal } from "vue-modally-v3";
import { useUserStore } from "../../../../store/user";
import useUserScreenSize from "../../../../composables/useUserScreenSize";
import { useRouter, useRoute } from "vue-router";
import { courseType } from '~~/utils/types/courses/courseType';
import moment from "moment";
import _, { debounce } from 'lodash';

import Graph from '@avanda/avandajs';
import { useAlert } from '~~/composables/core/useToast';
let router = useRouter();
let store = useUserStore();
let darkMode = computed(() => store.darkMode);

let { getUserScreenSize, computedDeviceType } = useUserScreenSize();
let currentScreen = ref<"add-borrow" | "added-borrow">("add-borrow")
onMounted(() => {
  getUserScreenSize();

  let openCreate = useRoute().query?.b;
  if (openCreate) {
    handleBorrowedCourse();
  }
});
let formReactive = reactive<{
  day: {
    value: number | null;
    error: string | null;
  },
  courseCode: {
    value: string | null;
    error: string | null;
  },
  courseName: {
    value: string | null;
    error: string | null;
  },
  startTime: {
    value: string | null;
    error: string | null;
  },
  endTime: {
    value: string | null;
    error: string | null;
  },
  locationType: {
    value: "physical" | "online" | null;
    error: string | null;
  },
  location: {
    value: string | null;
    error: string | null;
  },
  unit: {
    value: number | null;
    error: string | null;
  },
}>({
  day: {
    value: 1,
    error: null,
  },
  courseCode: {
    value: null,
    error: null,
  },
  courseName: {
    value: null,
    error: null,
  },
  startTime: {
    value: moment(new Date().getTime()).format("HH:mm"),
    error: null,
  },
  endTime: {
    value: moment(new Date().getTime() + (60 * 60 * 1000)).format("HH:mm"),
    error: null,
  },
  locationType: {
    value: "physical",
    error: null,
  },
  location: {
    value: null,
    error: null,
  },
  unit: {
    value: 1,
    error: null,
  },
});

let formReactiveBorrowed = reactive<{
  day: {
    value: number | null;
    error: string | null;
  },
  courseChosenId: {
    value: string | null;
    error: string | null;
  }
}>({
  day: {
    value: 1,
    error: null,
  },
  courseChosenId: {
    value: null,
    error: null,
  }
})
let courses = ref<courseType[]>([]);
let computedCourses = computed(() => {
  return courses.value.map((course: any) => {
    return {
      ...course,
      active: course.id === formReactiveBorrowed.courseChosenId.value,
    }
  })
});
let displayBorrowedCourse = ref(false)
function handleBorrowedCourse() {
  displayBorrowedCourse.value = !displayBorrowedCourse.value

}

const activeDay = ref(1);
const days = [
  { id: 1, name: "MON", fullName: "Monday" },
  { id: 2, name: "TUE", fullName: "Tuesday" },
  { id: 3, name: "WED", fullName: "Wednesday" },
  { id: 4, name: "THU", fullName: "Thursday" },
  { id: 5, name: "FRI", fullName: "Friday" },
  { id: 6, name: "SAT", fullName: "Saturday" },
];

function setActiveDay(day: number) {
  // activeDay.value = day;
  formReactive.day.value = day;
  console.log(formReactive)
}
let courseSearch = reactive({
  value: '',
  error: null,
});
let courseSuggestionLoading = ref(false)
let displayCourseSearchString = ref('')
async function handleSearchCourseWithDay() {

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
    setTimeout(() => {
      courseSuggestionLoading.value = false
    }, 3000);
    displayCourseSearchString.value = courseSearch.value.trim()
  }

}
const debouncedSearchCourseFunction = debounce(() => {
  // debounce before sending request
  if (courseSearch.value.trim() === '') return
  let searchQueryBefore: string = '';
  if (searchQueryBefore?.trim() === courseSearch.value.trim()) return
  searchQueryBefore = courseSearch.value.trim()
  courseSuggestionLoading.value = true
  console.log('debounced')
  handleSearchCourseWithDay()

}, 1500)

let selectedCourseDetails = ref<courseType | null>(null)
function handleCourseChosen(courseChosen: courseType) {
  selectedCourseDetails.value = courseChosen
  currentScreen.value = "added-borrow"
}
function handleBackToSearch() {
  currentScreen.value = "add-borrow"
}
</script>

<style scoped></style>
