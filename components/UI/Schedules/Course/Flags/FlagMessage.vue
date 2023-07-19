<template>
    <div class="max-w-[700px]">
        <div class="dark:bg-db-pry-dark border border-gray-300 p-4 rounded-lg">
            <div class="upper-det flex justify-between">
                <div class="img-name flex text-db-pry-dark dark:text-white gap-4 items-center">
                    <img src="/m-header.png" alt="User profile picture" class="w-8 h-8 rounded-full">
                    <p class="">{{ data.flagComment.user.username }}</p>
                </div>
                <p class="text-sm dark:text-db-white-darker">2 days ago</p>
            </div>
            <div class="message mt-2">
                <p class="dark:text-white break-words">{{ data.flagComment.message }}
                </p>
            </div>
            <div class="cta flex gap-4 items-center justify-end">
                <button type="button"
                    class="text-sec hover:bg-sec hover:text-black hover:px-2 rounded-md text-sm py-1">Reply</button>
                <button type="button"
                    class="text-error hover:bg-error hover:text-black hover:px-2 py-1 rounded-md text-sm">Delete</button>
            </div>
        </div>
        <div class="course-rep-replies ml-6 mt-8" v-if="data.replies">
            <div class="dark:bg-db-pry-dark p-4 rounded-lg connect-line">
                <div class="upper-det flex justify-between">
                    <div class="img-name flex text-db-pry-dark dark:text-white gap-4 items-center">
                        <img src="/m-header.png" alt="User profile picture" class="w-8 h-8 rounded-full">
                        <p class="">Sammie Course Rep</p>
                    </div>
                    <p class="text-sm dark:text-db-white-darker">2 days ago</p>
                </div>
                <div class="message">
                    <p class="dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                        voluptatum.
                    </p>
                </div>
                <div class="cta flex gap-4 items-center justify-end">
                    <button type="button"
                        class="text-sec hover:bg-sec hover:text-black hover:px-2 rounded-md text-sm py-1">Reply</button>
                    <button type="button"
                        class="text-error hover:bg-error hover:text-black hover:px-2 py-1 rounded-md text-sm">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { flagCommentType } from '~~/composables/classes/flags/useFlags'
interface Props {
    data: {
        flagComment: flagCommentType,
        replies?: flagCommentType[]
        
    }
}
const props = defineProps<Props>()
</script>

<style scoped>
.connect-line::before {
    width: 100%;
    height: 200px;
}
</style>