<template>
  <div>
    <db-content>
      <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
        <div class=" mt-6 md:mt-0">
          <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold">
            Updates
          </h1>
        </div>

        <div class="flex flex-col items-center mt-40 space-y-2">
          <announcement-icon class="text-white" :size="120" />
          <p class="dark:text-white text-db-pry-dark text-2xl md:text-4xl font-bold">No updates yet</p>
          <p class="dark:text-white text-db-pry-dark text-lg md:text-lg font-light text-center w-1/2">Updates allows you to share accurate and timely updates, assignments, tests, and course information with their coursemates</p>
          <v-button type="sec" @click="openCreateNewUpdateModal">Create Your First Update</v-button>
        </div>
      </div>
    </db-content>
  </div>
</template>
  
<script setup lang="ts">
import VButton from '../components/forms/v-button.vue'
import DbContent from "../components/UI/db-content.vue";
import "@/assets/css/tailwind.css";
import AnnouncementIcon from "../components/icons/announcement-icon.vue";
import { useUserStore } from "~~/store/user";
import {useUpdates} from '~~/composables/updates/useUpdates'

let store = useUserStore();

definePageMeta({
  layout: "d-board",
  middleware: ["logged-in"],
});
const {openCreateNewUpdateModal} = useUpdates()
</script>
  
  