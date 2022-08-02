<template>
    <div>
        <router-link :to="link"
            class="flex justify-between items-center mx-2 rounded-md mt-6 py-4">
            <div class="flex flex-col justify-center ">
                <component v-if="icon" :is="icon" :size="size" :bg-color="darkMode ? bgColor : '#4471E3'" class="mx-auto"></component>
                <h2 class="text-sm font-medium font-inter">{{ text }}</h2>
            </div>

        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/user";
let store = useUserStore()
let route = useRoute()
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
    link: string;
}
let props = withDefaults(defineProps<Props>(), {
    bgColor: "#C4C4C4",
    textColor: "#ffffff",
    size: 30,
});

</script>

<style scoped lang="postcss">
nav a.router-link-exact-active{
  @apply text-sec dark:text-sec
}
nav a{
  @apply dark:text-[#cccc] text-db-pry-dark
}
</style>
