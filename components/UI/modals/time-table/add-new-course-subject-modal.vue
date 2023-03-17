<template>
  <div class="" v-if="!displayBorrowedCourse">
    <transition-group name="slide">
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
        <!-- <transition-group name="slide"> -->
        <div class="flex flex-col gap-4" :key="1">
          <div class="mb-4 flex justify-between items-center md:px-6 px-4">
            <h1 class="text-lg md:text-xl text-left dark:text-white text-db-pry-dark font-semibold">
              {{ !tabsToggles.courseDetails && formReactive.courseTitle.value ? formReactive.courseTitle.value : `Add
                            Course
                            Details`}}
            </h1>
            <down-icon :color="darkMode ? '#fff' : '#000'" class="cursor-pointer"
              @click="handleTabToggle('courseDetails')"
              :class="tabsToggles.courseDetails ? 'rotate-180' : ''"></down-icon>
          </div>
          <!-- <div class="flex flex-col gap-4"> -->
          <!-- <transition name="slide" appear :duration="500"> -->
          <section class="" v-show="tabsToggles.courseDetails" ref="dropdown">
            <div class="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:px-6">
              <div class="flex flex-col w-full">
                <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Code</label>
                <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class=""
                  size="medium" :value="formReactive.courseCode">
                </v-input>
              </div>
              <div class="flex flex-col w-full">
                <label class="dark:text-white text-db-pry-dark text-md mb-1">Optional Code</label>
                <v-input type="text" placeholder="Enter another code for the course e.g MAT211" full
                  styleType="modal-input" class="" size="medium" :value="formReactive.optionalCode">
                </v-input>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 md:gap-6 px-4 md:px-6">
              <div class="flex flex-col w-full">
                <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Unit</label>
                <v-input type="number" placeholder="Enter course course unit e.g 3" full styleType="modal-input" class=""
                  size="medium" :value="formReactive.courseUnit" max="10" min="1">
                </v-input>

              </div>
              <div class="flex flex-col w-full">
                <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Title</label>
                <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
                  class="text-white rounded-lg" size="medium" :value="formReactive.courseTitle">
                </v-input>
              </div>

            </div>
          </section>
        </div>
        <!-- </transition-group> -->
        <!-- </transition> -->
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
            <!-- <transition-group name="slide" appear> -->
            <each-course-timeline v-for="(form, idx) in formReactive.timeline" :day-id="formReactive.timeline[idx].day"
              :start-time="formReactive.timeline[idx].startTime" :end-time="formReactive.timeline[idx].endTime"
              :location-type="formReactive.timeline[idx].locationType" :location="formReactive.timeline[idx].location"
              :is-opened="formReactive.timeline[idx].isOpened" @update:day-id="handleDayIdChange($event, idx)"
              @update:is-opened="handleToggleTimeline(idx)" @update:start-time="handleStartTimeChange($event, idx)"
              @update:end-time="handleEndTimeChange($event, idx)"
              @update:location-type="handleLocationTypeChange($event, idx)"
              @update:location="handleLocationChange($event, idx)"></each-course-timeline>
            <!-- </transition-group> -->
          </div>
          <div class="flex flex-col justify-center items-center min-h-[150px]" v-else>
            <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark ">No Timeline Added
            </h3>
          </div>
        </section>

        <!-- </div> -->
        <div class="flex gap-4 flex-col md:flex-row md:justify-between items-center mt-8 pb-10 px-4">
          <v-button type="sec" class="w-full md:w-auto" :loading="loading">Add Course</v-button>
          <v-button type="border-sec" class="w-full md:w-auto" @click.prevent="handleBorrowedCourse">Borrow
            Course</v-button>
        </div>
      </form>
    </transition-group>

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
          style-type="modal-input" :icon="SearchIcon" placeholder="Search for Courses by title, code" full iconLeft
          :value="courseSearch" @custom-change="debouncedSearchCourseFunction"></v-input>
      </div>
      <chosen-borrowed-course class="mt-4 mb-6" v-if="currentScreen === 'added-borrow' && selectedCourseDetails"
        :course-details="selectedCourseDetails"></chosen-borrowed-course>
      <course-borrow-suggestion-list class="mt-4 mb-6 mx-4" @course-chosen="handleCourseChosen"
        :search-term="displayCourseSearchString" v-if="currentScreen === 'add-borrow'"
        :course-suggestion="computedCourses" :loading="courseSuggestionLoading"
        :dark-mode="darkMode"></course-borrow-suggestion-list>
      <div class="flex flex-col gap-4 md:flex-row items-center pb-10 justify-between w-full px-4">
        <v-button type="border-sec" class="w-full md:w-auto" v-if="currentScreen === 'added-borrow'"
          @click="handleBackToSearch">Back</v-button>
        <v-button type="sec" class="w-full md:w-auto" v-if="currentScreen === 'added-borrow'" @click="addBorrowedCourse">Add Borrowed
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
import useFormRequest from '~~/composables/useFormRequest';
import { vAutoAnimate } from "@formkit/auto-animate"



let emit = defineEmits(["close"])
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
const dropdown = ref()
function handleTabToggle(tab: "courseDetails" | "courseTimelines") {
  // autoAnimate(dropdown.value)
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
  optionalCode: {
    value: string | null;
    error: string | null;
  },
  courseTitle: {
    value: string | null;
    error: string | null;
  },
  courseUnit: {
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
  optionalCode: {
    value: null,
    error: null,
  },
  courseTitle: {
    value: null,
    error: null,
  },
  courseUnit: {
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
function closeModal(){
emit("close")
}
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
    courseSuggestionLoading.value = true
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
function validateForm() {
  let isValid = true
  if (formReactive.courseCode.value === null) {
    formReactive.courseCode.error = "Course code is required"
    isValid = false
  } else if (formReactive.courseCode.value.length < 3) {
    formReactive.courseCode.error = "Not A valid Course Code"
    isValid = false
  } else {
    formReactive.courseCode.error = null
  }

  if (formReactive.courseTitle.value === null) {
    formReactive.courseTitle.error = "Course title is required"
    isValid = false
  } else if (formReactive.courseTitle.value.length < 3) {
    formReactive.courseTitle.error = "Not A valid Course title"
    isValid = false
  } else {
    formReactive.courseTitle.error = null
  }
  if (formReactive.courseUnit.value === null) {
    formReactive.courseUnit.error = "course unit is required"
    isValid = false
  }
  // check if day inside timeline is unique
  let dayArr = formReactive.timeline.map((timeline) => timeline.day.value)
  let isDayUnique = dayArr.every((day, idx) => dayArr.indexOf(day) === idx)
  if (!isDayUnique) {
    useAlert().openAlert({ type: 'ERROR', msg: `Duplicate Timeline days` })
    isValid = false
  }
  formReactive.timeline.forEach((timeline, idx) => {
    if (timeline.startTime.value === null) {
      timeline.startTime.error = "Start time is required"
      isValid = false
    } else {
      timeline.startTime.error = null
    }
    if (timeline.endTime.value === null) {
      timeline.endTime.error = "End time is required"
      isValid = false
    } else {
      timeline.endTime.error = null
    }
    if (timeline.locationType.value === null) {
      timeline.locationType.error = "Location type is required"
      isValid = false
    } else {
      timeline.locationType.error = null
    }
    if (timeline.location.value === null) {
      timeline.location.error = "Location is required"
      isValid = false
    } else {
      timeline.location.error = null
    }
  })
  return isValid
}
let { submitForm, loading, data } = useFormRequest(
  "Course/createCourseSchedule",
  formReactive,
  null,
  (data: any) => {
    if (data) {
      console.log(data);
    }
  },
  (error: { getData: () => any; getMsg: () => any }) => {
    console.log(error);
    let errObj = error.getData();
    console.log(errObj);
  }
);
function submitCourseSchedule() {
  if (validateForm()) {
    console.log(formReactive)
    submitForm()
  }
}
async function addBorrowedCourse() {
  if (selectedCourseDetails.value) {
    try {
      let req = await new Graph().service("DepartmentTimetable/addBorrowedCourse").params({ course_id: selectedCourseDetails.value.id }).get()
      let res = req.getData()
      useAlert().openAlert({ type: 'SUCCESS', msg: req.getMsg() })
      console.log({res})
    } catch (error) {
      useAlert().openAlert({ type: 'ERROR', msg: error.getMsg() })
    }
  }
}
</script>

<style scoped></style>
