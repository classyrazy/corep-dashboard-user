<template>
    <div class="p-12 lg:m-20">
        <div class="flex justify-center gap-3 mb-3">
            <span class="font-bold border p-1 rounded bg-db-pry text-white border-transparent">MON</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">TUE</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">WED</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">THU</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">FRI</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">SAT</span>
            <span class="font-bold border p-1 rounded bg-yellow border-transparent">SUN</span>
        </div>
        <form class="p-4">
                <stack class="mx-auto" :gap="1">
                    <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="white" class=" rounded-lg mb-5" size="small" >
                    </v-input>
                    <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="white"  class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <div class="flex justify-center gap-4"> 
                        <label class="text-white font-bold text-xl">From</label>
                    <v-input type="time" placeholder="10:00AM - 1:00PM"  styleType="white" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <label class="text-white font-bold text-xl">To</label>
                    <v-input type="time" placeholder="10:00AM - 1:00PM"  styleType="white" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    </div>
                    <v-input type="text" placeholder="Location" full styleType="white" class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <v-button full type="sec" class="bg-[#F9B700]">ADD COURSE</v-button>
                </stack>
            </form>
            <v-button full type="pry" class="">BORROWED COURSES</v-button>
    </div>
</template>

<script setup lang="ts">
import VInput from '../../../forms/v-input.vue'
import VButton from '../../../forms/v-button.vue'

</script>

<style lang="scss" scoped>

</style>