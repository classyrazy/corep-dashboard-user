<template>
    <div class="m-3 pt-12 lg:pt-20 lg:m-30">
    <div class="flex flex-col">
        <h1 class=" text-2xl  dark:text-white text-text-db-pry-dark mb-10 font-bold">Create New Course</h1>
        <ul class="flex gap-4 mb-3">
            <li class="font-bold border p-1 rounded bg-db-pry text-white border-transparent">MON</li>
            <li class="font-bold border p-1 rounded bg-yellow border-transparent">TUE</li>
            <li class="font-bold border p-1 rounded bg-yellow border-transparent">WED</li>
            <li class="font-bold border p-1 rounded bg-yellow border-transparent">THU</li>
            <li class="font-bold border p-1 rounded bg-yellow border-transparent">FRI</li>
            <li class="font-bold border p-1 rounded bg-yellow border-transparent">SAT</li>
        </ul>
    </div>
        <form class="lg:pb-20 pb-12">
                <stack class="mx-auto" :gap="1">
                    <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="modal-input" class="text-white rounded-lg mb-5" size="small" >
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

</script>

<style lang="scss" scoped>

</style>