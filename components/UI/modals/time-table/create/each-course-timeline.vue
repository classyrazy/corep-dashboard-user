<template>
  <div class="border-b border-db-pry-light py-6">
    <div class="flex relative md:pr-8 pl-6 pr-6">
      <ul class="flex flex-wrap gap-4 w-full mx-auto">
        <li v-for="day in days" :key="day.id" :class="[
          'transition duration-200 ease-in font-semibold md:text-md text-sm rounded-md  text-center py-1 md:py-2 px-2 md:px-1 md:min-w-[100px] cursor-pointer',
          dayId.value !== day.id ? `dark:bg-db-pry-light border border-db-white-dark dark:text-white dark:border-b-2 dark:border-yellow ${!isOpened ? 'hidden' : 'block'}` : 'bg-yellow block',
          'border-transparent cursor-pointer',
        ]" @click="setActiveDay(day.id)">
          {{ day.name }}
        </li>
      </ul>
      <down-icon :color="darkMode ? '#fff' : '#000'" class="cursor-pointer ml-4" @click="setOpened"
        :class="isOpened ? 'rotate-180' : ''"></down-icon>

    </div>
    <section class="timeline-form" v-show="isOpened">
      <div class="flex gap-6 md:px-8 px-6 mt-4 items-center">
        <div class="flex flex-col w-full" id="start-time">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Start time</label>
          <!-- <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium"
            :value="startTime" @custom-change="setStartTime">
          </v-input> -->
          <!-- <date-input type="time" placeholder="Select time"></date-input> -->
          <date-picker id="start" :time-picker-options="{
            start: '08:00', step: '00:60', end: '20:00'
          }" format="hh:mm a" type="time" placeholder="Enter start time" @change="setStartTime"
            v-model:value="formatedStartTime" input-class="start-time-input" popup-class="start-time-input-picker"
            :popup-style="{ backgroundColor: darkMode ? '#212939' : 'white' }" :editable="false" />

          <p v-if="startTime.error" class="mt-2 text-xs text-red-600">
            {{ startTime.error }}
          </p>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">End time</label>
          <!-- <v-input type="time" placeholder="From" styleType="modal-input" class="rounded-lg" full size="medium"
            :value="endTime" @custom-change="setEndTime">
          </v-input> -->
          <date-picker id="start" :time-picker-options="{
            start: '08:00', step: '00:60', end: '20:00'
          }" format="hh:mm a" type="time" placeholder="Enter start time"
            v-model:value="formatedEndTime" input-class="start-time-input" popup-class="start-time-input-picker"
            :popup-style="{ backgroundColor: darkMode ? '#212939' : 'white' }" :editable="false" @change="setEndTime" />
          <p v-if="endTime.error" class="mt-2 text-xs text-red-600">
            {{ endTime.error }}
          </p>
        </div>
      </div>
      <div class="flex gap-6 items-center md:px-8 px-6 mt-4">
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Location Type</label>
          <select
            class="dark:bg-db-pry-dark dark:text-white bg-white text-db-pry-dark rounded-lg w-full h-12 px-4 focus:border-sec border border-gray-400 ouline-none"
            v-model="locationType.value">
            <option value="physical">Physical</option>
            <option value="online">online</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-1">Location</label>
          <v-input type="text" placeholder="Location" full styleType="modal-input" class="rounded-lg " size="medium"
            :value="location" @custom-change="setLocation">
          </v-input>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DownIcon from '../../../../svgs/down-icon.vue'
import VInput from '../../../../forms/v-input.vue'
import { useUserStore } from "~~/store/user";
import { useTimetableStore } from "~~/store/timetable"
import { useAlert } from '~~/composables/core/useToast';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import moment from 'moment';
let store = useUserStore();
let timetableStore = useTimetableStore();
interface Props {
  dayId: {
    value: number,
    error: string | null,
  },
  startTime: {
    value: string | null,
    error: string | null,
  },
  endTime: {
    value: string | null,
    error: string | null,
  },
  locationType: {
    value: "physical" | "online",
    error: string | null,
  },
  location: {
    value: string | null,
    error: string | null,
  },
  isOpened: boolean,
}
let props = defineProps<Props>();
let emit = defineEmits(['update:dayId', 'update:startTime', 'update:endTime', 'update:locationType', 'update:location', 'update:isOpened']);
let days = timetableStore.days;
let formatedEndTime = ref(moment(props.endTime.value).toDate() || new Date())
let formatedStartTime = ref(moment(props.startTime.value).toDate() || new Date())
let momentFormat = {
  stringify: (date: Date) => moment(date).format('HH:mm'),
  parse: (date: string) => moment(date, "").toDate()
}
let darkMode = store.darkMode;
function setActiveDay(id: number) {
  emit('update:dayId', id);
}
function setStartTime(value: any, type: string) {
  emit('update:startTime', moment(value).format("HH:mm"));
}
function setEndTime(value: any, type: string) {
  emit('update:endTime', moment(value).format("HH:mm"));
}
function setLocation(location: string) {
  emit('update:location', location);
}
function setOpened() {
  emit('update:isOpened');
}
</script>

<style scoped></style>