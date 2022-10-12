<template>
    <div class="m-5">
        <form class="p-4">
                <stack class="mx-auto" :gap="1">
                    <v-input type="text" placeholder="Enter course code e.g MAT231" full styleType="white" class=" rounded-lg mb-5" size="small" >
                    </v-input>
                    <v-input type="text" placeholder="Enter course name e.g Real Analysis" full styleType="white"  class="  rounded-lg mb-5" size="small" >
                    </v-input>
                    <div class="flex justify-center gap-4"> 
                    <v-input type="time" placeholder="10:00AM - 1:00PM"  styleType="white" class="  rounded-lg mb-5" size="small" >
                    </v-input>
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