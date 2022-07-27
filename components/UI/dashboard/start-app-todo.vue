<template>
    <!-- <router-link :to="link"> -->
        <div class="dark:bg-db-white-light bg-db-white-dark dark:border-db-white-dark border-2  rounded-md p-4 flex justify-center items-center"
            :class="completed ? '' : 'cursor-pointer'">
            <div class="h">
                <div class="cicle circle-bg-color rounded-full flex justify-center mr-2">
                    <component :is="icon" :size="20" class="m-auto" v-if="!completed"></component>
                    <todo-completed-icon v-else></todo-completed-icon>
                </div>
            </div>
            <div class="inner-con ">
                <h2 class="text-sm font-semibold">{{ todoText }}</h2>
                <p class="text-xs font-medium">{{ description }}</p>
            </div>
            <h1 v-if="loading">loading</h1>
        </div>
    <!-- </router-link> -->
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import TodoCompletedIcon from "../../icons/todo-completed-icon.vue";

let router = useRouter()

interface Props {
    bgColor: string;
    completed: boolean;
    todoText: string;
    description: string;
    icon: object;
    link: string;
    loading: boolean;
}

let props = withDefaults(defineProps<Props>(), {});
let computedBgColor = computed(() => props.bgColor);

function handleTodoClick() {
    if (!props.completed) {
        router.push(props.link)
    }
}
</script>

<style scoped>
.circle-bg-color {
    background-color: v-bind(computedBgColor);
    width: 40px;
    height: 40px;
    border-radius: 50%;

}
</style>