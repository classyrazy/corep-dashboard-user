<template>
    <div>
      <db-content>
        <div class="main-content-index py-6 md:py-auto mx-2 md:mx-auto ">
         <div class=" mt-6 md:mt-0" >
           <h1 class="dark:text-white text-2xl md:text-4xl text-db-pry-dark font-bold"> 
            Announcements
          </h1>
         </div>
  
        <div class="flex flex-col items-center mt-40 space-y-2">
         <announcement-icon class="text-white" :size="120"/>
         <p class="dark:text-white text- text-db-pry-dark text-2xl md:text-4xl font-bold">No announcements yet</p>
        </div>
        </div>
      </db-content>
    </div>
  </template>
  
  <script setup lang="ts">
  import DbContent from "../components/UI/db-content.vue";
  import "@/assets/css/tailwind.css";
import AnnouncementIcon from "../components/icons/announcement-icon.vue";
  
  definePageMeta({
    layout: "d-board",
    middleware: ["logged-in"],
  });
  </script>
  
  