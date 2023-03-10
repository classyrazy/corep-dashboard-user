<template>
    <div class="py-6 ">
        <nav class="flex flex-col max-h-screen h-full justify-between">
            <div class="upper-sidebar">
                <router-link to="/">
                    <d-board-logo class="w-[70%] mx-auto"></d-board-logo>
                </router-link>
                <ul class="mt-10">
                    <!-- <router-link to="/" class="bg-pry"> -->
                    <!-- </router-link> -->
                    <li>
                        <side-bar-item text="Dashboard" :icon="DashboardIcon" class="" link="/"></side-bar-item>

                    </li>

                    <li>
                        <side-bar-item text="Classes" :icon="ClassesIcon" :info-num="7" link="/classes"></side-bar-item>

                    </li>
                    <li>
                        <side-bar-item text="Updates" :icon="AnnouncementIcon" :info-num="2"
                            link="/updates">
                        </side-bar-item>
                    </li>

                    <li>
                        <side-bar-item text="Assignments" :icon="AssignmentIcon" :info-num="3" link="/assignments">
                        </side-bar-item>
                    </li>
                    <li>
                        <side-bar-item text="Timetable" :icon="TimeTableIcon" active link="/timetable"></side-bar-item>

                    </li>

                </ul>
            </div>
            <div class="bottom-side-item">
                <div class="w-[90%] h-[1px] bg-sec mt-16 mx-auto"></div>
                <li>
                    <side-bar-item text="Settings" :icon="SettingsIcon" class="py-3" link="/settings"></side-bar-item>

                </li>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import SideBarItem from '../side-bar-item.vue'
import SettingsIcon from '../../icons/settings-icon.vue'
import TimeTableIcon from '../../icons/time-table-icon.vue'
import AssignmentIcon from '../../icons/assignment-icon.vue'
import AnnouncementIcon from '../../icons/announcement-icon.vue'
import ClassesIcon from '../../icons/classes-icon.vue'
import DashboardIcon from '../../icons/dashboard-icon.vue'
import DBoardLogo from '../../UI/d-board-logo.vue'
// bg-gray-900 flex flex-col w-0 lg:w-64 h-0 lg:h-screen z-10 lg:fixed start-0 top-0
import {useUserStore} from '../../../store/user'
import { storeToRefs } from 'pinia'
let store = useUserStore()

</script>

<style scoped lang="postcss">
nav a.router-link-exact-active {
  @apply bg-sec
    
}
nav a {
  @apply dark:hover:bg-db-pry hover:bg-db-white-dark
    
}
nav a.router-link-exact-active:hover {
  @apply bg-sec
    
}
</style>