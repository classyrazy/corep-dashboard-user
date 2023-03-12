<template>
  <div>
    <db-content>
      <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
        <div class=" mt-6 md:mt-0">
          <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold">
            Timetable
          </h1>
        </div>

        <div class="flex flex-col items-center mt-40 space-y-4" v-if="false">
          <timetable :size="120" />
          <p class="dark:text-white text-db-pry-dark text-2xl md:text-4xl font-bold">No Timetable yet</p>
          <v-button type="sec" class="bg-[#F9B700]" @click="handleCreateTImeTable">Create Timetable</v-button>
        </div>
        <div class="h-[70vh] w-full">
          <vue-cal :selected-date="currentDate" :time-from="6 * 60" :time-to="21 * 60" :hide-weekdays="[7]"
            :disable-views="['years', 'year', 'month']" :events="events"
            :today-style="{ 'background-color': 'red' }" :event-style="{ 'background-color': 'red', 'font-size': '14px' }">
          </vue-cal>
        </div>
      </div>
    </db-content>
  </div>
</template>

<script setup lang="ts">
import AddNewCourseSubjectModal from '../components/UI/modals/time-table/add-new-course-subject-modal.vue'
import DbContent from "../components/UI/db-content.vue";
import Timetable from "../components/icons/time-table-icon.vue";
import VButton from "../components/forms/v-button.vue";
import "@/assets/css/tailwind.css";
import { useModal } from "vue-modally-v3"
import { useUserStore } from "../store/user";
import useUserScreenSize from "../composables/useUserScreenSize";
import { useRouter, useRoute } from 'vue-router';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment'

definePageMeta({
  layout: "d-board",
  middleware: ["logged-in"],
});

let router = useRouter();
let store = useUserStore();
let darkMode = computed(() => store.darkMode);

let {
  getUserScreenSize,
  computedDeviceType,
} = useUserScreenSize();


onMounted(() => {
  getUserScreenSize();

  let openCreate = useRoute().query?.a
  if (!!openCreate) {
    handleCreateTImeTable()
  }
});


async function handleCreateTImeTable() {
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
// const mondayStartTime = moment({ hour: 14, minute: 0 });
// get monday date with moment
const mondayStartTime = moment({ hour: 14, minute: 0 }).day(1);
const mondayEndTime = moment({ hour: 16, minute: 0 }).day(1);
const wednesdayStartTime = moment({ hour: 15, minute: 0 });
const wednesdayEndTime = moment({ hour: 16, minute: 0 });
const daysOfWeek = [1, 3];
let events = ref([
  {
    start: mondayStartTime.format('YYYY-MM-DD HH:mm'),
    end: mondayEndTime.format('YYYY-MM-DD HH:mm'),
    title: 'Need to go shopping for monday',
    icon: 'shopping_cart', // Custom attribute.
    content: 'Click to see my shopping list',
    contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.
    class: 'leisure'
  },
  {
    start: '2018-11-22 10:00',
    end: '2018-11-22 15:00',
    title: 'Golf with John',
    icon: 'golf_course', // Custom attribute.
    content: 'Do I need to tell how many holes?',
    contentFull: 'Okay.<br>It will be a 18 hole golf course.', // Custom attribute.
    class: 'sport'
  }
])

console.info(mondayStartTime.format('YYYY-MM-DD HH:mm'), mondayEndTime.format('YYYY-MM-DD HH:mm'), daysOfWeek, wednesdayEndTime, wednesdayStartTime)
const currentDate = mondayEndTime.format('YYYY-MM-DD HH:mm')


</script>

<style>
.vuecal__event {
  background-color: red;
  color: white;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 90%;
  margin: auto;
}
</style>
