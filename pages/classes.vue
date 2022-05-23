<template>
    <div>
        <db-content>
            <h2 class="text-2xl">Hello World</h2>
        </db-content>
    </div>
</template>

<script setup lang="ts">
import DbContent from '../components/UI/db-content.vue'
import '@/assets/css/tailwind.css'



definePageMeta({
    layout: 'd-board',
    middleware: 'logged-in'
})
</script>

<style scoped>
</style>