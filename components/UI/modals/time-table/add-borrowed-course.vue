<template>
  <div class="p-8 pt-6 lg:pt-20 lg:m-30">
    <div class="flex flex-col">
      <span class="flex inset-y-0 left-0 gap-4">
        <left-arrow class="cursor-pointer mt-3" @click="$emit('close')"/>
        <h1 class="text-2xl dark:text-white text-text-db-pry-dark mb-10 font-bold">
          Search Borrowed Courses
        </h1>
      </span>
      <ul class="flex gap-4 mb-3">
        <NuxtLink
          :to="day.route"
          class="nuxt-link-exact-active"
          v-for="day in days"
          :key="day.name"
        >
          <li
            :class="[
              'transition duration-200 ease-in font-bold border p-1 rounded',
              activeDay === day.name ? 'bg-db-pry text-white' : 'bg-yellow',
              'border-transparent cursor-pointer',
            ]"
            @click="setActiveDay(day.name)"
          >
            {{ day.name }}
          </li>
        </NuxtLink>
      </ul>

      <v-input
        class="dark:bg-db-pry-dark min-w-[70%] block py-2 px-3 dark:text-white rounded-lg"
        size="small"
        style-type="modal-input"
        :icon="SearchIcon"
        placeholder="Search for Courses"
        full
        iconLeft
      ></v-input>
    </div>
    <form class="lg:pb-20 pb-5">
      <stack class="mx-auto" :gap="1">
        <v-input
          type="text"
          placeholder="Enter course code e.g MAT231"
          full
          styleType="modal-input"
          class="text-white rounded-lg mb-3"
          size="small"
        >
        </v-input>
        <v-input
          type="text"
          placeholder="Enter course name e.g Real Analysis"
          full
          styleType="modal-input"
          class="text-white rounded-lg mb-5"
          size="small"
        >
        </v-input>
        <div class="flex justify-center gap-4">
          <v-input
            type="time"
            placeholder="10:00AM - 1:00PM"
            label="From"
            styleType="modal-input"
            class="rounded-lg mb-5"
            size="small"
          >
          </v-input>
          <v-input
            type="time"
            placeholder="10:00AM - 1:00PM"
            label="To"
            styleType="modal-input"
            class="rounded-lg mb-5"
            size="small"
          >
          </v-input>
        </div>
        <v-input
          type="text"
          placeholder="Location"
          full
          styleType="modal-input"
          class="rounded-lg mb-5"
          size="small"
        >
        </v-input>
        <v-button full type="sec" class="bg-[#F9B700]">ADD COURSE</v-button>
      </stack>
    </form>
  </div>
</template>

<script setup lang="ts">
import LeftArrow from "../../../svgs/left-arrow.vue";
import VInput from "../../../forms/v-input.vue";
import VButton from "../../../forms/v-button.vue";
import SearchIcon from "../../../icons/search-icon.vue";
import { ref } from "vue";

const activeDay = ref("");
const days = [
  { name: "MON", route: "" },
  { name: "TUE", route: "" },
  { name: "WED", route: "" },
  { name: "THU", route: "" },
  { name: "FRI", route: "" },
  { name: "SAT", route: "" },
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

<style scoped></style>
