<template>
  <div class="p-5  lg:p-10 md:p-10 pt-6 lg:pt-20 lg:m-30" v-if="!displayBorrowedCourse">
    <div class="flex flex-row justify-between">
      <h1 class="text-2xl text-left dark:text-white text-text-db-pry-dark mb-10 font-bold">
        Create New Course
      </h1>
      <div
          class="close_btn dark:border-db-white-dark border-2 w-6 h-6 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md"
        >
          <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
        </div>
    </div>
      <ul class="flex gap-4 mb-10 w-[80%] mx-auto  md:w-full justify-around">
        <NuxtLink :to="day.route" class="nuxt-link-exact-active" v-for="day in days" :key="day.id">
          <li :class="[
            'transition duration-200 ease-in font-bold md:text-md text-sm rounded-lg px-2 py-1 md:px-4 md:py-2',
            activeDay === day.name ? 'bg-db-pry text-white border-b-2 border-yellow' : 'bg-yellow',
            'border-transparent cursor-pointer',
          ]" @click="setActiveDay(day.name)">
            {{ day.name }}
          </li>
        </NuxtLink>
      </ul>
    <form class="lg:pb-20 pb-5">
      <stack class="" :gap="1">
        <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input"
          class="text-white rounded-lg mb-3" size="small">
        </v-input>
        <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
          class="text-white rounded-lg mb-5" size="small">
        </v-input>
        <div class="flex justify-center gap-4">
          <v-input type="time" placeholder="Enter Time" label="From" styleType="modal-input"
            class="rounded-lg mb-5" size="small">
          </v-input>
          <v-input type="time" placeholder="10:00AM - 1:00PM" label="To" styleType="modal-input" class="rounded-lg mb-5"
            size="small">
          </v-input>
        </div>
        <v-input type="text" placeholder="Location" full styleType="modal-input" class="rounded-lg mb-5" size="small">
        </v-input>
      </stack>
      <div class="flex gap-4 flex-col md:flex-row md:justify-between items-center mt-4">
        <v-button full type="sec" class="bg-[#F9B700] w-full md:w-auto">ADD COURSE</v-button>
        <v-button full type="border-sec" class=" my-auto w-full md:w-auto " @click.prevent="handleBorrowedCourse">BORROWED COURSES</v-button>
      </div>
    </form>
  </div>

  <div class="p-5 lg:p-10 md:p-10 pt-6 lg:pt-20 lg:m-30" v-else>
    <div class="flex flex-col">
      <span class="flex inset-y-0 left-0 gap-4">
        <div
          class="close_btn mt-2 dark:border-db-white-dark border-2 w-6 h-6  flex justify-center cursor-pointer items-center rounded-md"
        >
        <left-arrow :text-color="darkMode ? 'white' : 'black'" class="cursor-pointer" @click="displayBorrowedCourse = false" />
        </div>
        <h1 class="text-2xl dark:text-white w-full text-text-db-pry-dark mb-10 font-bold">
          Search Borrowed Courses
        </h1>
      </span>
      <ul class="flex gap-4 mb-10 w-[80%] mx-auto  md:w-full justify-around">
        <NuxtLink :to="day.route" class="nuxt-link-exact-active" v-for="day in days" :key="day.id">
          <li :class="[
            'transition duration-200 ease-in font-bold md:text-md text-sm rounded-lg px-2 py-1 md:px-4 md:py-2',
            activeDay === day.name ? 'bg-db-pry text-white border-b-2 border-yellow' : 'bg-yellow',
            'border-transparent cursor-pointer',
          ]" @click="setActiveDay(day.name)">
            {{ day.name }}
          </li>
        </NuxtLink>
      </ul>

      <v-input class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg" size="small"
        style-type="modal-input" :icon="SearchIcon" placeholder="Search for Courses" full iconLeft></v-input>
    </div>
    <form class="lg:pb-20 pb-5">
      <stack class="mx-auto" :gap="1">
        <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input"
          class="text-white rounded-lg mb-3" size="small">
        </v-input>
        <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"
          class="text-white rounded-lg mb-5" size="small">
        </v-input>
        <div class="flex justify-center gap-4">
          <v-input type="time" placeholder="10:00AM - 1:00PM" label="From" styleType="modal-input"
            class="rounded-lg mb-5" size="small">
          </v-input>
          <v-input type="time" placeholder="10:00AM - 1:00PM" label="To" styleType="modal-input" class="rounded-lg mb-5"
            size="small">
          </v-input>
        </div>
        <v-input type="text" placeholder="Location" full styleType="modal-input" class="rounded-lg mb-5" size="small">
        </v-input>
      </stack>
      <div class="flex gap-4 flex-col md:flex-row md:justify-center items-center mt-4">
        <v-button full type="sec" class="bg-yellow w-full md:w-auto">ADD COURSE</v-button>
    
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
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

const activeDay = ref("");
const days = [
  {id: 1, name: "MON", route: "" },
  {id: 2, name: "TUE", route: "" },
  {id: 3, name: "WED", route: "" },
  {id: 4, name: "THU", route: "" },
  {id: 5, name: "FRI", route: "" },
  {id: 6, name: "SAT", route: "" },
];

function setActiveDay(day: string) {
  activeDay.value = day;
  return {
    activeDay,
    setActiveDay,
    days,
  };
}
</script>

<style scoped>

</style>
