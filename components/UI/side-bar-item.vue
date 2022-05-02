<template>
    <li class="dark:hover:bg-db-pry hover:bg-db-white-dark py-3 flex justify-between items-center mx-2 rounded-md mt-6">
        <div class="flex items-center ml-6">
            <component v-if="icon" :is="icon" :size="size" :bg-color="darkMode ? bgColor : '#4471E3'"
                :text-color="darkMode ? textColor : '#212939'"></component>
            <h2 class="text-sm font-medium dark:text-white text-db-pry-dark font-inter ml-2">{{ text }}</h2>
        </div>
        <div class="num-item bg-red-500 rounded-full mr-4 w-3 h-3" v-if="active"></div>

        <div class="num-item bg-[#4471E3] rounded-md mr-4" v-if="infoNum"><span
                class="text-white text-[12px] px-2 py-1 font-inter">{{ infoNum }}</span></div>

    </li>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
let store = useUserStore()
let darkMode = computed(() => store.darkMode)
interface Props {
    bgColor: string;
    textColor: string;
    size: number;
    icon: object;
    infoNum: number;
    text: string;
    active: boolean;
    mode: boolean;
}
let props = withDefaults(defineProps<Props>(), {
    bgColor: "#C4C4C4",
    textColor: "#ffffff",
    size: 20,
});

</script>

<style scoped>
</style>