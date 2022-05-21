<template>
    <div class="py-6 w-full">
        <nav class="flex flex-col max-h-screen h-full justify-between">
            <div class="upper-sidebar">
                <router-link to="/">
                    <d-board-logo class="w-[70%] mx-auto"></d-board-logo>
                </router-link>
                <ul class="mt-10">
                    <router-link to="/">
                        <side-bar-item text="Dashboard" :icon="DashboardIcon" class="bg-sec"></side-bar-item>
                    </router-link>

                    <router-link to="/classes">
                        <side-bar-item text="Classes" :icon="ClassesIcon" :info-num="7"></side-bar-item>
                    </router-link>

                    <router-link to="/announcements">
                        <side-bar-item text="Announcements" :icon="AnnouncementIcon" :info-num="2"></side-bar-item>
                    </router-link>

                    <router-link to="/assignments">
                        <side-bar-item text="Assignments" :icon="AssignmentIcon" :info-num="3"></side-bar-item>
                    </router-link>

                    <router-link to="/timetable">
                        <side-bar-item text="Timetable" :icon="TimeTableIcon" active></side-bar-item>
                    </router-link>
                </ul>
            </div>
            <div class="bottom-side-item">
                <div class="w-[90%] h-[1px] bg-sec mt-16 mx-auto"></div>

                <router-link to="/settings">
                    <side-bar-item text="Settings" :icon="SettingsIcon" class="py-3"></side-bar-item>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import SideBarItem from '../components/UI/side-bar-item.vue'
import SettingsIcon from '../components/icons/settings-icon.vue'
import TimeTableIcon from '../components/icons/time-table-icon.vue'
import AssignmentIcon from '../components/icons/assignment-icon.vue'
import AnnouncementIcon from '../components/icons/announcement-icon.vue'
import ClassesIcon from '../components/icons/classes-icon.vue'
import DashboardIcon from '../components/icons/dashboard-icon.vue'
import DBoardLogo from '../components/UI/d-board-logo.vue'
// bg-gray-900 flex flex-col w-0 lg:w-64 h-0 lg:h-screen z-10 lg:fixed start-0 top-0
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'
let store = useUserStore()

</script>

<style scoped>
</style>