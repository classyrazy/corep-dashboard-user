<template>
  <div>
    <db-content>
      <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
       <div class=" mt-6 md:mt-0" >
         <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold"> 
          Timetable
        </h1>
       </div>

      <div class="flex flex-col items-center mt-40 space-y-4">
       <timetable :size="120"/>
       <p class="dark:text-white text-db-pry-dark text-2xl md:text-4xl font-bold">No Timetable yet</p>
       <v-button  type="sec" class="bg-[#F9B700]" @click="handleCreateTImeTable">Create Timetable</v-button>
      </div>
      </div>
    </db-content>
  </div>
</template>

<script setup lang="ts">
import AddNewCourseSubjectModal from '../components/UI/modals/time-table/add-new-course-subject-modal.vue'
import DbContent from "../components/UI/db-content.vue";
import Timetable from "../components/icons/time-table-icon.vue";
import VButton from "../components/forms/v-button.vue";
import "@/assets/css/tailwind.css";
import {useModal} from "vue-modally-v3"
import { useUserStore } from "../store/user";
import useUserScreenSize from "../composables/useUserScreenSize";
import { useRouter, useRoute } from 'vue-router';

definePageMeta({
  layout: "d-board",
  middleware: ["logged-in", "is-verified"],
});

let router = useRouter();
let store = useUserStore();
let darkMode = computed(() => store.darkMode);

let {
  getUserScreenSize,
  computedDeviceType,
} = useUserScreenSize();


onMounted(() => {
  getUserScreenSize();

  let openCreate = useRoute().query?.a
  if(!!openCreate){
    handleCreateTImeTable()
  }
});


async function handleCreateTImeTable(){
  let modalColor = darkMode.value ? "#212939" : "white";
  let modalType: "panel" | "modal" =
    computedDeviceType.value == "mobile" ? "panel" : "modal";
  let modal = await useModal(AddNewCourseSubjectModal, {
    options:{
    width: 1000,
    background: modalColor,
    blur: false,
    type: modalType,
  }
  })
  
}



</script>

<style>
.vm__modal__wrapper .vm__modal__container .vm__modal__box .vm__modal__box_container {
 @apply rounded-2xl md:rounded-xl
}
</style>
