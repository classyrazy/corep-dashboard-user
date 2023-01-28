<template>
    <div class="p-10 pt-12 lg:pt-20 lg:m-30">
    <div class="flex flex-col">
        <h1 class=" text-2xl  dark:text-white text-text-db-pry-dark mb-10 font-bold">Create New Course</h1>
        <ul class="flex gap-4 mb-3">
            <NuxtLink :to="day.route" class="nuxt-link-exact-active" v-for="day in days" :key="day.name">
      <li :class="[
        'transition duration-200 ease-in font-bold border p-1 rounded',
        activeDay === day.name ? 'bg-db-pry text-white' : 'bg-yellow',
        'border-transparent cursor-pointer'
      ]" @click="setActiveDay(day.name)">
        {{ day.name }}
      </li>
    </NuxtLink>
  </ul>
    </div>
        <form class="lg:pb-20 pb-12">
                <stack class="mx-auto" :gap="1">
                    <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class="text-white rounded-lg mb-3" size="small" >
                    </v-input>
                    <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="modal-input"  class="text-white rounded-lg mb-5" size="small" >
                    </v-input>
                    <div class="flex justify-center gap-4"> 
                        <label class="dark:text-white font-bold text-xl">From</label>
                    <v-input type="time" placeholder="10:00AM - 1:00PM"  styleType="modal-input" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <label class="dark:text-white font-bold text-xl">To</label>
                    <v-input type="time" placeholder="10:00AM - 1:00PM"  styleType="modal-input" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    </div>
                    <v-input type="text" placeholder="Location" full styleType="modal-input" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <v-button full type="sec" class="bg-[#F9B700]">ADD COURSE</v-button>
                </stack>
            <v-button full type="pry" class="mt-4">BORROWED COURSES</v-button>
            </form>
    </div>
</template>

<script setup lang="ts">
import VInput from '../../../forms/v-input.vue'
import VButton from '../../../forms/v-button.vue'
import {  ref } from 'vue'

const activeDay = ref('')
const days = [
      { name: 'MON', route: '' },
      { name: 'TUE', route: '' },
      { name: 'WED', route: '' },
      { name: 'THU', route: '' },
      { name: 'FRI', route: '' },
      { name: 'SAT', route: '' },
    ]

    function setActiveDay(day: string){
      activeDay.value = day
      return {
      activeDay,
      setActiveDay,
      days
    }
    }

</script>

<style scoped>
</style>