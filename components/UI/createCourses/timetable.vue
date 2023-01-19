<template>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex justify-between mb-4">
        <h3 class="text-lg font-medium">Course Timetable</h3>
        <select v-model="selectedWeek" @change="switchWeek">
          <!-- <option v-for="week in weeks" :value="week">Week {{ week }}</option> -->
        </select>
      </div>
      <table class="w-full text-left table-collapse">
        <thead>
          <tr class="text-sm font-medium">
            <th class="px-4 py-2">Time</th>
            <th class="px-4 py-2">Monday</th>
            <th class="px-4 py-2">Tuesday</th>
            <th class="px-4 py-2">Wednesday</th>
            <th class="px-4 py-2">Thursday</th>
            <th class="px-4 py-2">Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(timeSlot, index) in timetable" :key="index" class="text-sm">
            <td class="px-4 py-2">{{ timeSlot.time }}</td>
            <td class="px-4 py-2" v-for="day in days" :key="day">
              <!-- {{ timetable[index][day] }} -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
export default {
  data() {
    return {
      selectedWeek: 1,
      weeks: [1, 2, 3, 4, 5],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timetable: [
        {
          time: '9:00am - 10:00am',
          Monday: 'Math 101',
          Tuesday: 'Science 102',
          Wednesday: 'English 103',
          Thursday: 'History 104',
          Friday: 'Art 105'
        },
        {
          time: '10:00am - 11:00am',
          Monday: 'Computer Science 106',
          Tuesday: 'Physics 107',
          Wednesday: 'Biology 108',
          Thursday: 'Business 109',
          Friday: 'Music 110'
        },
        // ... more timeslots
      ]
    }
  },
  methods: {
    switchWeek() {
      // Code to switch the timetable data based on the selected week
    }
  }
}
</script>

<style>
/* Use Tailwind CSS classes to style the component */
</style>