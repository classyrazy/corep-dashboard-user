<template>
        <router-link :to="link"
            class=" py-3 flex justify-between items-center mx-2 rounded-md mt-6">
            <div class="flex items-center w-full mx-auto lg:w-auto  lg:ml-6">
                <component v-if="icon" :is="icon" :size="size" :bg-color="darkMode ? bgColor : '#4471E3'"
                    :text-color="darkMode ? textColor : '#212939'" class="mx-auto"></component>
                <h2 class="text-sm font-medium dark:text-white text-db-pry-dark font-inter ml-2 hidden lg:inline-block">{{ text }}</h2>
            </div>
            <div class="num-item bg-red-500 rounded-full mr-4 w-3 h-3 hidden lg:inline-block" v-if="active"></div>

            <div class="num-item bg-[#4471E3] rounded-md mr-4 hidden lg:inline-block" v-if="infoNum"><span
                    class="text-white text-[12px] px-2 py-1 font-inter">{{ infoNum }}</span></div>

        </router-link>
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
    infoNum?: number;
    text: string;
    active?: boolean;
    mode?: boolean;
    link: string;
}
let props = withDefaults(defineProps<Props>(), {
    bgColor: "#C4C4C4",
    textColor: "#ffffff",
    size: 20,
});

</script>

<style scoped>
</style>