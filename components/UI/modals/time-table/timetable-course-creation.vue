<template>
  <div>
    <component :is="selectedComponent"></component>
  </div>
</template>

<script setup lang="ts">
import AddNewCourse from './add-new-course-subject-modal.vue'
import AddBorrowedCourse from './add-borrowed-course.vue'



const selectedComponent = computed(() => {
 
})

</script>
