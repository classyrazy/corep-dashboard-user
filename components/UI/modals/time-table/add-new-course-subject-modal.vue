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
      <NuxtLink :to="day.route" class="nuxt-link-exact-active" v-for="day in days" :key="day.id">
        <li :class="[
          'transition duration-200 ease-in font-semibold md:text-md text-sm rounded-md  text-center py-1 md:py-2 px-2 md:px-1 md:min-w-[100px]',
          activeDay !== day.name ? 'bg-db-pry-light text-white border-b-2 border-yellow' : 'bg-yellow',
          'border-transparent cursor-pointer',
        ]" @click="setActiveDay(day.name)">
          {{ day.name }}
        </li>
      </NuxtLink>
    </ul>
    <form class="w-full px-4 md:px-8 mx-auto mt-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4 md:gap-6">
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Code</label>
            <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class=""
              size="medium">
            </v-input>
          </div>
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Course Title</label>
            <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
              class="text-white rounded-lg" size="medium">
            </v-input>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">Start time</label>
            <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium">
            </v-input>
          </div>
          <div class="flex flex-col w-full">
            <label class="dark:text-white text-db-pry-dark text-md mb-1">End time</label>
            <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium">
            </v-input>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Location Type</label>
          <select
            class="dark:bg-db-pry-dark dark:text-white bg-white text-db-pry-dark rounded-lg w-full h-12 px-4 focus:border-sec border border-gray-400 ouline-none">
            <option value="physical">Physical</option>
            <option value="online">online</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Location</label>
          <v-input type="text" placeholder="Location" full styleType="modal-input" class="rounded-lg " size="medium">
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
          Search Borrowed Courses
        </h1>
      </span>
      <div class="bg-sec w-full h-[1px] mt-3"></div>

      <ul class="flex flex-wrap gap-4 w-[90%] mx-auto  justify-around mb-4 mt-6">
        <NuxtLink :to="day.route" class="nuxt-link-exact-active" v-for="day in days" :key="day.id">
          <li :class="[
            'transition duration-200 ease-in font-semibold md:text-md text-sm rounded-md  text-center py-1 md:py-2 px-2 md:px-1 md:min-w-[100px]',
            activeDay !== day.name ? 'bg-db-pry-light text-white border-b-2 border-yellow' : 'bg-yellow',
            'border-transparent cursor-pointer',
          ]" @click="setActiveDay(day.name)">
            {{ day.name }}
          </li>
        </NuxtLink>
      </ul>
      <div class="w-full mx-auto px-4">
        <v-input class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg" size="small"
          style-type="modal-input" :icon="SearchIcon" placeholder="Search for Courses" full iconLeft></v-input>
      </div>
      <h3 class="text-lg md:text-xl text-left dark:text-white text-db-pry-dark font-semibold mt-4 mb-6 mx-4">Results for
        MAT
        233 on Monday</h3>
      <div class="mb-10 flex flex-col gap-4 mx-10">
        <div class="course-code-con flex gap-6 items-center">
          <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark font-medium uppercase">Course code :
          </h3>
          <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark uppercase">MAT 233</p>
        </div>
        <div class="course-code-con flex gap-6 items-center">
          <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark font-medium uppercase">Course name :
          </h3>
          <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark  uppercase">Real Analyses 1</p>
        </div>
        <div class="course-code-con flex gap-6 items-center">
          <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark font-medium uppercase">Time :</h3>
          <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark  uppercase">12:00PM - 2:00PM</p>
        </div>
        <div class="course-code-con flex gap-6 items-center">
          <h3 class="text-md md:text-lg text-left dark:text-white text-db-pry-dark font-medium uppercase">Location :</h3>
          <p class="text-sm md:text-md text-left dark:text-gray-300 text-db-pry-dark  uppercase">LT009</p>
        </div>
      </div>
      <div class="w-full px-4 md:px-0 md:flex md:justify-end pb-10">
        <v-button type="sec" class="w-full md:w-auto">Add Borrowed Course</v-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Stack from '../../stack.vue'
import CloseIcon from '../../../icons/close-icon.vue'
import LeftArrow from '../../../svgs/left-arrow.vue'
import SearchIcon from "../../../icons/search-icon.vue";
import AddBorrowedCourse from "../time-table/add-borrowed-course.vue";
import VInput from "../../../forms/v-input.vue";
import VButton from "../../../forms/v-button.vue";
import { useModal } from "vue-modally-v3";
import { useUserStore } from "../../../../store/user";
import useUserScreenSize from "../../../../composables/useUserScreenSize";
import { useRouter, useRoute } from "vue-router";

let router = useRouter();
let store = useUserStore();
let darkMode = computed(() => store.darkMode);

let { getUserScreenSize, computedDeviceType } = useUserScreenSize();

onMounted(() => {
  getUserScreenSize();

  let openCreate = useRoute().query?.b;
  if (openCreate) {
    handleBorrowedCourse();
  }
});

// const currentComponent = ref('AddNewCourse')

// function toggleComponent() {
//   currentComponent.value = 'AddBorrowedCourse'
// }

// toggleComponent()
let displayBorrowedCourse = ref(false)
function handleBorrowedCourse() {
  displayBorrowedCourse.value = !displayBorrowedCourse.value

}

const activeDay = ref("MON");
const days = [
  { id: 1, name: "MON", route: "" },
  { id: 2, name: "TUE", route: "" },
  { id: 3, name: "WED", route: "" },
  { id: 4, name: "THU", route: "" },
  { id: 5, name: "FRI", route: "" },
  { id: 6, name: "SAT", route: "" },
];

function setActiveDay(day: string) {
  activeDay.value = day;
}
</script>

<style scoped></style>
