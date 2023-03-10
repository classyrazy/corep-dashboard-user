<template>
  <div>
    <db-content>
      <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
       <div class=" mt-6 md:mt-0" >
         <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold"> 
          Assignments
        </h1>
       </div>

      <div class="flex flex-col items-center mt-40 space-y-4">
       <assignmenticon :size="120"/>
       <p class="dark:text-white text-db-pry-dark text-2xl md:text-4xl font-bold">No Assignments yet</p>
      </div>
      </div>
    </db-content>
  </div>
</template>

<script setup lang="ts">
import DbContent from "../components/UI/db-content.vue";
import assignmenticon from "../components/icons/assignment-icon.vue";
import "@/assets/css/tailwind.css";

definePageMeta({
  layout: "d-board",
  middleware: ["logged-in"],
});
</script>

