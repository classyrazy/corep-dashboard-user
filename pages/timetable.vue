<template>
  <div>
    <db-content>
      <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
        <div class=" mt-6 md:mt-0 flex justify-between items-center mb-8">
          <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold">
            Timetable
          </h1>
          <v-button type="sec" class="" @click="handleCreateTImeTable" :icon="AddIcon"
            v-if="!(computedDeviceType == 'mobile')">
            Add Course
          </v-button>
          <div class="bg-sec w-10 h-10 flex justify-center items-center rounded-full fixed z-50 bottom-[200px] right-10"
            @click="handleCreateTImeTable" v-else>
            <add-icon :size="24"></add-icon>
          </div>
        </div>

        <div class="flex flex-col items-center mt-40 space-y-4" v-if="false">
          <timetable :size="120" />
          <p class="dark:text-white text-db-pry-dark text-2xl md:text-4xl font-bold">No Timetable yet</p>
          <v-button type="sec" class="bg-[#F9B700]" @click="handleCreateTImeTable">Create Timetable</v-button>
        </div>
        <div class=" w-full relative" v-if="events.length">
          <ul class="flex gap-4 w-full max-w-[1000px] mx-auto justify-around mb-6 overflow-x-auto" v-if="computedDeviceType === 'mobile'">
            <li class="text-lg p-4  w-10 h-10 flex justify-center items-center rounded-md"
              :class="it.id == currentDayViewId ? 'bg-sec' : 'dark:text-white'" v-for="it in timetableStore.days"
              :key="it.id" @click="handleDayViewChange(it.id)">{{ it.name.slice(0, 1) }}</li>
          </ul>
          <!-- :today-style="{ 'background-color': 'red' }" style="{ backgroundColor: event.backgroundColor, color: event.color }" :min-cell-width="200" :min-split-width="200" -->
          <vue-cal :selected-date="currentDate" :time-from="6 * 60" :time-to="21 * 60" 
            :disable-views="disabledtimeTableViews" active-view="day" :events="events"
            class="dark:bg-db-pry-dark text-white py-6 pb8 pr-4 md:pr-0 rounded-lg" :time-cell-height="70"
            hide-view-selector hide-title-bar>
            <template #time-cell="{ hours, minutes }">
              <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }" class="">
                <strong class="text-sm md:text-base dark:text-white font-inter py-6">{{ moment({
                  hour: hours, minute:
                    minutes
                }).format('h a') }}</strong>
                <!-- <span  style="font-size: 11px">{{ minutes }}</span> -->
              </div>
            </template>
            <template #event="{ event, view }">
              <div class="">
                <!-- <div class="vuecal__event-title" v-html="event.title"></div> -->
                <!-- {{ view }} -->
                <!-- <close-icon></close-icon>
                <hr> -->
                <!-- <em class="vuecal__event-time">
                  <strong>Event start: </strong>
                  <span>{{ event.start.formatTime() }}</span>
                  <br>
                  <strong>Event end: </strong>
                  <span>{{ event.end.formatTime() }}</span>
                  
                </em> -->
                <course-event :color="event.color" :end-time="event.end.formatTime()" @click="handleEventClick(event)" tabindex="0" @keydown.enter="handleEventClick(event)"
                  :start-time="event.start.formatTime()" :course-code="event.code" :course-name="event.title"
                  :editable="store.user?.role == 'course-rep' && !event.isBorrowed ? true : false"></course-event>
              </div>
            </template>
            <template v-slot:weekday-heading="{ heading }">
              <p class="dark:text-white text-base md:text-lg text-db-pry-dark font-semibold">{{ heading.label.substring(0,
                3) }}</p>
            </template>
            <template #no-event>
              <p class="dark:text-db-white-darker text-base md:text-lg text-db-pry-dark font-medium">No Class 😁</p>
            </template>

          </vue-cal>
        </div>
      </div>
    </db-content>
  </div>
</template>

<script setup lang="ts">
import ViewSchedulePreview from '../components/UI/modals/schedules/view-schedule-preview.vue'
import AddIcon from '../components/icons/add-icon.vue'
import CircleExclude from '../components/svgs/circle-exclude.vue'
import UnionSvg from '../components/svgs/union-svg.vue'
import CloseIcon from '../components/icons/close-icon.vue'
import CourseEvent from '../components/UI/modals/time-table/view/course-event.vue'
import AddNewCourseSubjectModal from '../components/UI/modals/time-table/add-new-course-subject-modal.vue'
import DbContent from "../components/UI/db-content.vue";
import Timetable from "../components/icons/time-table-icon.vue";
import VButton from "../components/forms/v-button.vue";
import "@/assets/css/tailwind.css";
import { useModal } from "vue-modally-v3"
import { useUserStore } from "../store/user";
import { useTimetableStore } from "../store/timetable";
import useUserScreenSize from "../composables/useUserScreenSize";
import { useRouter, useRoute } from 'vue-router';
import VueCal from 'vue-cal'
import Graph from "~~/libs/avanda"
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'
import { useAlert } from '~~/composables/core/useToast';
import { useTimetable, TimeTableItem } from '~~/composables/timetable/useTimetable';


definePageMeta({
  layout: "d-board",
  middleware: ["logged-in"],
});

let router = useRouter();
let store = useUserStore();

let darkMode = computed(() => store.darkMode);
let timetableStore = useTimetableStore();

let {
  getUserScreenSize,
  computedDeviceType,
} = useUserScreenSize();
let { events, getTimeTableData } = useTimetable()
let disabledtimeTableViews = ref(["years", "year", "month", "day"]);
getUserScreenSize();
if (computedDeviceType.value == 'mobile') {
  disabledtimeTableViews.value = ["years", "year", "month", "week"]
}
onMounted(() => {
  let openCreate = useRoute().query?.a
  if (!!openCreate) {
    handleCreateTImeTable()
  }
  // if(computedDeviceType.value == 'mobile'){
  // }

});
console.log(moment("10:20", 'HH:mm').format('HH:mm:ss') > moment("11:20", 'HH:mm').format('HH:mm:ss'))
const computedUser = computed(() => store.user)
// watch(computedUser, (val) => {
//   if (val && val.dept_timetable_id) {
//     getTimeTableData(1)

//   }
// })
watchEffect(() => {
  if (computedUser.value && computedUser.value.department && computedUser.value.department.id) {
    getTimeTableData(1)
  }
})


async function handleCreateTImeTable() {
  if (store.user?.user_todo_level !== 'add-time-table') {
    if (store.user?.user_todo_level === 'add-course-and-level') {
      return useAlert().openAlert({ type: 'ERROR', msg: 'Add course of study' })
    }
  }
  let modalColor = darkMode.value ? "#212939" : "white";
  let modalType: "panel" | "modal" =
    computedDeviceType.value == "mobile" ? "panel" : "modal";
  let modal = await useModal(AddNewCourseSubjectModal, {
    options: {
      width: 1000,
      background: modalColor,
      blur: false,
      type: modalType,
    }
  })

}
// let events = ref<TimeTableItem[]>([])
const currentDate = ref(moment().format('YYYY-MM-DD HH:mm'))
// if currentDate is sunday let cuurrent date be mondayt
if (moment(currentDate.value).day() === 0) {
  currentDate.value = moment(currentDate.value).day(1).format('YYYY-MM-DD HH:mm')
}

let currentDayViewId = ref(moment().day())
if (currentDayViewId.value === 0) {
  currentDate.value = moment(currentDate.value).day(1).format('YYYY-MM-DD HH:mm')
}
console.log(currentDayViewId.value)
function handleDayViewChange(id: number) {
  if (computedDeviceType.value !== 'mobile') return
  currentDayViewId.value = id
  currentDate.value = moment().day(id).format('YYYY-MM-DD HH:mm')
}

async function handleEventClick(eventDet: object) {
  console.log({eventDet})
  let modalColor = darkMode.value ? "#212939" : "white";
  let modalType: "panel" | "modal" =
    computedDeviceType.value == "mobile" ? "panel" : "modal";
  let modal = await useModal(ViewSchedulePreview, {
    options: {
      width: 400,
      background: modalColor,
      blur: false,
      type: modalType,
    },
    props: {
      schedule:eventDet,
    }
  })

}

// async function getTimeTableData(dayId: number) {
//   try {
//     let req = await new Graph().service("CourseTimeline/getAllScheduleWithDeptId").fetch(
//       "*",
//       new Graph().service("Course/getCourseFromParent").as("course"),
//       new Graph().service("CourseSchedule/getScheduleFromParent").as("schedule")
//     ).params({ "department_timetable_id": store.user?.dept_timetable_id }).get()
//     console.info(transformTimeTableArray(req.getData()))
//     events.value = transformTimeTableArray(req.getData())
//   } catch (error: any) {
//     useAlert().openAlert({ type: 'ERROR', msg: error.getMsg() })
//   }
// }

</script>

<style></style>
