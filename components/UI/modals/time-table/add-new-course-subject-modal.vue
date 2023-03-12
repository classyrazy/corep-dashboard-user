<template>
  <div class="" v-if="!displayBorrowedCourse">
    <div class="py-6 px-2 md:p-6 flex justify-between items-center dark:text-white">
      <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
        Add Course to timetable
      </h1>
      <div
        class="close_btn dark:border-db-white-dark border w-8 h-8 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md"
        v-if="!displayBorrowedCourse">
        <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
      </div>
    </div>
    <div class="bg-sec w-full h-[0.4px]"></div>
    <form class="w-full mx-auto mt-6" @submit.prevent="submitCourseSchedule">
      <div class="mb-4 flex justify-between items-center md:px-6 px-4">
        <h1 class="text-lg md:text-xl text-left dark:text-white text-db-pry-dark font-semibold">
          {{ !tabsToggles.courseDetails && formReactive.courseName.value ? formReactive.courseName.value : `Add Course
                    Details`}}
        </h1>
        <down-icon :color="darkMode ? '#fff' : '#000'" class="cursor-pointer" @click="handleTabToggle('courseDetails')"
          :class="tabsToggles.courseDetails ? 'rotate-180' : ''"></down-icon>
      </div>
      <div class="flex flex-col gap-4">
        <section class="" v-show="tabsToggles.courseDetails">
          <div class="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:px-6">
            <div class="flex flex-col w-full">
              <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Code</label>
              <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class=""
                size="medium" :value="formReactive.courseCode">
              </v-input>
            </div>
            <div class="flex flex-col w-full">
              <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Unit</label>
              <v-input type="number" placeholder="Enter course unit e.g 3" full styleType="modal-input" class=""
                size="medium" :value="formReactive.unit" max="10" min="1">
              </v-input>

            </div>
          </div>
          <div class="flex flex-col w-full md:px-6 px-4 mt-4">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Title</label>
            <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
              class="text-white rounded-lg" size="medium" :value="formReactive.courseName">
            </v-input>
          </div>
        </section>
        <div class="bg-db-pry-light mt-10 mb-4 w-full h-[0.5px]"></div>
        <section class="relative">
          <div class="mb-8 flex justify-between items-center md:px-6 px-4">
            <h1 class="text-lg md:text-xl text-left dark:text-white text-db-pry-dark font-semibold">
              Add Course Timelines
            </h1>
            <add-time-table-icon :color="darkMode ? '#fff' : '#000'" class="cursor-pointer" :size="20"
              @click="addNewTimeLine"></add-time-table-icon>
          </div>
          <div class="" v-if="formReactive.timeline.length">
            <each-course-timeline v-for="(form, idx) in formReactive.timeline" :day-id="formReactive.timeline[idx].day"
            :start-time="formReactive.timeline[idx].startTime" :end-time="formReactive.timeline[idx].endTime"
            :location-type="formReactive.timeline[idx].locationType" :location="formReactive.timeline[idx].location"
            :is-opened="formReactive.timeline[idx].isOpened" @update:day-id="handleDayIdChange($event, idx)"
            @update:is-opened="handleToggleTimeline(idx)" @update:start-time="handleStartTimeChange($event, idx)" @update:end-time="handleEndTimeChange($event, idx)"
            @update:location-type="handleLocationTypeChange($event, idx)" @update:location="handleLocationChange($event, idx)"
            ></each-course-timeline>
          </div>
          <div class="flex flex-col justify-center items-center min-h-[150px]" v-else>
            <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark ">No Timeline Added
            </h3>
        </div>
        </section>

      </div>
      <div class="flex gap-4 flex-col md:flex-row md:justify-between items-center mt-8 pb-10 px-4">
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
import EachCourseTimeline from './create/each-course-timeline.vue'
import AddTimeTableIcon from '../../../icons/add-time-table-icon.vue'
import DownIcon from '../../../svgs/down-icon.vue'
import CourseBorrowSuggestionList from './borrowed/course-borrow-suggestion-list.vue'
import ChosenBorrowedCourse from './borrowed/chosen-borrowed-course.vue'
import CloseIcon from '../../../icons/close-icon.vue'
import LeftArrow from '../../../svgs/left-arrow.vue'
import SearchIcon from "../../../icons/search-icon.vue";
import VInput from "../../../forms/v-input.vue";
import VButton from "../../../forms/v-button.vue";
import { useUserStore } from "../../../../store/user";
import useUserScreenSize from "../../../../composables/useUserScreenSize";
import { useRouter, useRoute } from "vue-router";
import { courseType } from '~~/utils/types/courses/courseType';
import moment from "moment";
import _, { debounce } from 'lodash';
import { useTimetableStore } from "~~/store/timetable"
import Graph from '@avanda/avandajs';
import { useAlert } from '~~/composables/core/useToast';
let router = useRouter();
let store = useUserStore();
let timetableStore = useTimetableStore();
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
let tabsToggles = ref({
  courseDetails: true,
  courseTimelines: true,
})
function handleTabToggle(tab: "courseDetails" | "courseTimelines") {
  tabsToggles.value = {
    courseDetails: tab === "courseDetails" ? !tabsToggles.value.courseDetails : false,
    courseTimelines: tab === "courseTimelines",
  }
}
let formReactive = reactive<{
  courseCode: {
    value: string | null;
    error: string | null;
  },
  courseName: {
    value: string | null;
    error: string | null;
  },
  unit: {
    value: number | null;
    error: string | null;
  },
  timeline: {
    day: {
      value: number;
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
      value: "physical" | "online";
      error: string | null;
    },
    location: {
      value: string | null;
      error: string | null;
    },
    isOpened: boolean;
  }[]
}>({
  courseCode: {
    value: null,
    error: null,
  },
  courseName: {
    value: null,
    error: null,
  },
  unit: {
    value: 1,
    error: null,
  },
  timeline: []
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
const days = timetableStore.days

// function setActiveDay(day: number) {
//   // activeDay.value = day;
//   formReactive.day.value = day;
//   console.log(formReactive)
// }
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
function handleDayIdChange(ev: number, idx: number): void {
  console.log({ ev, idx })
  formReactive.timeline[idx].day.value = ev
}
function handleStartTimeChange(ev: string, idx: number): void {
  console.log({ ev, idx })
  formReactive.timeline[idx].startTime.value = ev
}
function handleEndTimeChange(ev: string, idx: number): void {
  console.log({ ev, idx })
  formReactive.timeline[idx].endTime.value = ev
}
function handleLocationTypeChange(ev: "physical" | "online", idx: number): void {
  console.log({ ev, idx })
  formReactive.timeline[idx].locationType.value = ev
}
function handleLocationChange(ev: string, idx: number): void {
  console.log({ ev, idx })
  formReactive.timeline[idx].location.value = ev
}
function handleToggleTimeline(idx: number) {
  formReactive.timeline[idx].isOpened = !formReactive.timeline[idx].isOpened
}
function addNewTimeLine() {
  // turn all other is Opend to false
  formReactive.timeline.forEach((timeline) => {
    timeline.isOpened = false
  })
  formReactive.timeline.push({
    day: {
      value: 1,
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
    isOpened: true,
  })
  // scroll to bottom after creating
  setTimeout(() => {
    let el: HTMLDivElement | null = document.querySelector('.vm__modal__container')
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, 200);
}
function removeTimeLine(idx: number) {
  formReactive.timeline.splice(idx, 1)
}
function submitCourseSchedule() {
  console.log(formReactive)
}
</script>

<style scoped></style>
