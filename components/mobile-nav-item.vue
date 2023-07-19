<template>
    <!-- <div> -->
        <li class="">
            <router-link :to="link"
            class=" w-full mx-auto items-center rounded-md">
            <!-- <li class=""> -->
                <div class="flex flex-col justify-center ">
                <component v-if="icon" :is="icon" class="mx-auto w-6"></component>
                <h2 class="text-sm font-medium font-inter">{{ text }}</h2>
            </div>
            <!-- </li> -->

        </router-link>
        </li>
    <!-- </div> -->
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
    infoNum?: number;
    text: string;
    active?: boolean;
    mode?: boolean;
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
