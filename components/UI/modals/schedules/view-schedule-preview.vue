<template>
    <div>
        <div class="py-6 px-2 md:p-6 flex justify-between items-center dark:text-white">
            <h1 class="text-lg md:text-xl text-left dark:text-white text-db-pry-dark font-semibold">
                {{schedule.type == "course"? "Course Schedule": "Your Schedule" }}
            </h1>
            <div class="close_btn dark:border-db-white-dark w-4 h-4 md:w-6 md:h-6 flex justify-center cursor-pointer items-center rounded-md">
                <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
            </div>
        </div>
        <div class="details-wrapper min-h-[300px] flex flex-col gap-4 px-2">
            <div class="course-title-con flex space-x-8">
                <label class="dark:text-db-white-darker text-db-pry-dark text-base">Course Title :</label>
                <p class="dark:text-db-white text-db-pry-dark text-base">{{ schedule.title }}</p>
            </div>
            <div class="course-code-con flex space-x-8">
                <label class="dark:text-db-white-darker text-db-pry-dark text-base">Course Code :</label>
                <p class="dark:text-db-white text-db-pry-dark text-base">{{ computedCode }}</p>
            </div>
            <div class="course-time-con flex space-x-8">
                <label class="dark:text-db-white-darker text-db-pry-dark text-base">Time :</label>
                <p class="dark:text-db-white text-db-pry-dark text-base">{{ computedTime }}</p>
            </div>
        </div>
        <div class="py-4 px-4">
            <v-button type="sec" class="w-full" :icon="ExternalLinkIcon" @click="handleViewFullSchedule">
            View Full Details
          </v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExternalLinkIcon from '../../../icons/external-link-icon.vue'
import VButton from '../../../forms/v-button.vue'
import CloseIcon from '../../../icons/close-icon.vue'
import { useUserStore } from "../../../../store/user";
import { useClasses } from '~~/composables/classes/useClasses';
import moment from 'moment';
interface Props {
    schedule: {
        title: string,
        type: "course" | "user",
        id: number,
        start: string,
        end: string,
        color: string,
        code?: string,
        optionalCode?: string,
        details?: string,
        day: string,
    };
}
const props = defineProps<Props>();
let store = useUserStore();
let darkMode = computed(() => store.darkMode);
const {routeToClassWithEventId} = useClasses(); 
const emit = defineEmits(['close']);

const computedTime = computed(() => {
    return  `${moment(props.schedule.start).format("dddd")} ${moment(props.schedule.start).format('h:mm A')} - ${moment(props.schedule.end).format('h:mm A')}`
})
const computedCode = computed(() => {
    return `${props.schedule.code} ${props.schedule.optionalCode ? `/${props.schedule.optionalCode}` : ''}`
})

function handleViewFullSchedule() {
    emit('close');
    routeToClassWithEventId(props.schedule.id);
}


</script>

<style scoped></style>