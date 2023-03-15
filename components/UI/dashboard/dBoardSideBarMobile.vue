<template>
  <div class="w-full z-50">
    <nav class="">
      <div class="upper-sidebar dark:bg-db-pry bg-db-white-light">
        <ul class="mt-10 flex items-end justify-between px-4">
          <!-- <li> -->
            <mobile-nav-item
              text="Home"
              :icon="HomeMobileIcon"
              class=""
              link="/"
            ></mobile-nav-item>
          <!-- </li> -->
          <!-- <li> -->
            <mobile-nav-item
              text="Classes"
              :icon="ClassesMobileIcon"
              class=""
              link="/classes"
            ></mobile-nav-item>
          <!-- </li> -->
          <!-- <li> -->
            <mobile-nav-item
              text="Updates"
              :icon="AnnouncementIcon"
              class=""
              link="/updates"
            ></mobile-nav-item>
          <!-- </li> -->
          <!-- <li> -->
            <mobile-nav-item
              text="Timetable"
              :icon="TimetableMobileIcon"
              class=""
              link="/timetable"
            ></mobile-nav-item>
          <!-- </li> -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import TimetableMobileIcon from "../../icons/timetable-mobile-icon.vue";
import ClassesMobileIcon from "../../icons/classes-mobile-icon.vue";
import HomeMobileIcon from "../../icons/home-mobile-icon.vue";
import MobileNavItem from "../../mobile-nav-item.vue";
import SideBarItem from "../side-bar-item.vue";
import SettingsIcon from "../../icons/settings-icon.vue";
import TimeTableIcon from "../../icons/time-table-icon.vue";
import AssignmentIcon from "../../icons/assignment-icon.vue";
import AnnouncementIcon from "../../icons/announcement-icon.vue";
import ClassesIcon from "../../icons/classes-icon.vue";
import DashboardIcon from "../../icons/dashboard-icon.vue";
import DBoardLogo from "../../UI/d-board-logo.vue";
// bg-gray-900 flex flex-col w-0 lg:w-64 h-0 lg:h-screen z-10 lg:fixed start-0 top-0
import { useUserStore } from "../../../store/user";
import { storeToRefs } from "pinia";
let store = useUserStore();
</script>

<style scoped lang="postcss">
nav .upper-sidebar ul li div a div {
  @apply text-sec
    
}
</style>
