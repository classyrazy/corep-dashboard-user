<template>
  <div>
    <component :is="selectedComponent"></component>
  </div>
</template>

<script setup lang="ts">
import AddNewCourse from './add-new-course-subject-modal.vue'
import AddBorrowedCourse from './borrowed/add-borrowed-course.vue'



const selectedComponent = computed(() => {
 
})

</script>
