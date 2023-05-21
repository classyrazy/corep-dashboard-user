<template>
    <div class=" w-full">
        <div class="max-w-[80%] ml-10 mt-6">
            <h2 class="dark:text-white text-xl my-4">Class Flags</h2>
            <div class="flags flex flex-col gap-4 pb-60" v-if="flags.length">
                <flag-message v-for="it in flags" :key="it.id" :data="{flagComment: it}"></flag-message>
            </div>
            <loader-icon class="center-element" :size="50" :color="darkMode ? '#fff' : '#212939'" v-else-if="!flags.length && loading"></loader-icon>
            <div class="w-full text-center dark:text-white mt-8" v-else>
                <h4 class="text-xl font-semibold">No Flags yet</h4>
                <p class="w-1/2 mx-auto mt-4">Tell people what's going on in the class or Ask question about the class if you have any</p>
            </div>
        </div>
        <div class="dark:bg-db-pry bg-db-white-dark absolute bottom-0 space-x-8 ">
            <form class="grid grid-cols-12 items-center max-w-full mx-10 mb-6 dark:bg-db-pry-light bg-db-white gap-2 p-3 rounded-md" @submit.prevent="handleSubmitFlagMessage">
            <textarea v-model="formReactive.message.value"
                class="col-span-11 dark:bg-db-pry-light bg-db-white py-4 px-2 outline-none w-full resize-none h-20 dark:text-white"
                placeholder="What is happening in class or what questions do you have question about this course? Tell Us here"></textarea>
            <v-button type="border-sec" class="col-span-1">Send</v-button>
        </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoaderIcon from '../../../../svgs/loader-icon.vue'
import VButton from '../../../../forms/v-button.vue'
import FlagMessage from './FlagMessage.vue'
import { useFlags } from '~~/composables/classes/flags/useFlags';
import { useUserStore } from '~~/store/user';

const {createFlagMessage, getAllFlags,getCurrentViewingParamId,  flags, watchCourseFlags, loading} = useFlags()
let formReactive  = reactive({
    message: {
        value: "",
        error: ""
    }
})
const store = useUserStore()
const darkMode = computed(()=> store.darkMode)
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
.grad {
    background-image: linear-gradient(90deg,hsla(0,0%,100%,0) 13.94%,# 54.73%);
}
</style>