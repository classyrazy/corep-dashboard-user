<template>
    <div class=" w-full ">
        <div class="max-w-[80%] ml-10 mt-6">
            <h2 class="dark:text-white text-xl my-4">Class Flags</h2>
            <div class="flags flex flex-col gap-4 pb-20" v-if="flags.length">
                <flag-message v-for="it in flags" :key="it.id" :data="{ flagComment: it }"></flag-message>
            </div>
            <loader-icon class="center-element" :size="50" :color="darkMode ? '#fff' : '#212939'"
                v-else-if="!flags.length && loading"></loader-icon>
            <div class="w-full text-center dark:text-white mt-8" v-else>
                <h4 class="text-xl font-semibold">No Flags yet</h4>
                <p class="w-2/3 md:w-1/2 mx-auto mt-4 ">Tell people what's going on in the class or Ask question about the
                    class if you have any</p>
            </div>
        </div>
        <!-- dark:bg-db-pry bg-db-white-dark absolute bottom--24 md:bottom-0 md:space-x-8 w-full md:w-auto -->
        <div class="sticky bottom-20 py-6  md:bottom-0 flex w-full flex-1 dark:bg-db-pry bg-db-white-dark dark-grad md:py-4 max-h-[200px]">
            <form
                class="relative flex justify-center w-full md:w-[80%] mx-auto px-4 md:px-0"
                @submit.prevent="handleSubmitFlagMessage">
                <textarea v-model="formReactive.message.value"
                    class=" dark:bg-db-pry-dark bg-db-white rounded-md p-4 h-24 dark:text-white pr-8 outline-none w-full resize-none"
                    placeholder="What is happening in class or what questions do you have question about this course? Tell Us here"></textarea>
                <v-button type="sec" class="my-auto absolute bottom-1 right-6 md:right-1  px-2" size="x-small"><send-icon class="w-5" /></v-button>
            </form>
            <!-- <form
                class="grid grid-cols-12 items-center max-w-full mx-3 md:mx-10 mb-6 dark:bg-db-pry-light bg-db-white gap-2 p-3 rounded-md"
                @submit.prevent="handleSubmitFlagMessage">
                <textarea v-model="formReactive.message.value"
                    class="md:col-span-11 col-span-10 dark:bg-db-pry-light bg-db-white py-4 px-2 outline-none w-full resize-none h-20 dark:text-white"
                    placeholder="What is happening in class or what questions do you have question about this course? Tell Us here"></textarea>
                <v-button type="sec" class="md:col-span-1 col-span-2"><send-icon class="w-6 md:w-8" /></v-button>
            </form> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import SendIcon from '../../../../icons/send-icon.vue'
import LoaderIcon from '../../../../svgs/loader-icon.vue'
import VButton from '../../../../forms/v-button.vue'
import FlagMessage from './FlagMessage.vue'
import { useFlags } from '~~/composables/classes/flags/useFlags';
import { useUserStore } from '~~/store/user';

const { createFlagMessage, getAllFlags, getCurrentViewingParamId, flags, watchCourseFlags, loading } = useFlags()
let formReactive = reactive({
    message: {
        value: "",
        error: ""
    }
})
const store = useUserStore()
const darkMode = computed(() => store.darkMode)
// const flagsComments = ref([])
async function handleSubmitFlagMessage() {
    createFlagMessage(formReactive.message.value, getCurrentViewingParamId.value.courseId)
    formReactive.message.value = ""
    // await getAllFlags(getCurrentViewingScheduleId.value)
}
// getAllFlags(getCurrentViewingScheduleId.value)
onMounted(() => {
    watchCourseFlags()
})
</script>

<style scoped>

</style>