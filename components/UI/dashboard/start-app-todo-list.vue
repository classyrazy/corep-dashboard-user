<template>
    <div class="grid grid-auto grid-cols-3 gap-4 max-w-[1000px]" v-if="startAppLevel">
        <start-app-todo :bg-color="startAppTodo.bgColor" :todo-text="startAppTodo.todoText"
            :description="startAppTodo.description" :icon="startAppTodo.icon" :link="startAppTodo.link"
            v-for="startAppTodo in computedTodoArray" :completed="startAppTodo.completed" :key="startAppTodo.id"
            @click="handleTodoClick(startAppTodo.id, startAppTodo.modal, startAppTodo.link)">
        </start-app-todo>


    </div>
</template>

<script setup lang="ts">
import StartAppTodo from './start-app-todo.vue';
import AddCourseOfStudyIcon from '../../icons/add-course-of-study-icon.vue';
import AddTimeTableIcon from '../../icons/add-time-table-icon.vue';
import { useModal } from "vue-modally-v3";
import AddCourseOfStudyModal from "../modals/add-course-of-study-modal.vue"
import { useUserStore } from '../../../store/user'


let store = useUserStore()
let darkMode = computed(() => store.darkMode)

let startTodoArray = reactive([
    {
        id: 1,
        bgColor: '#8D24AA',
        completed: false,
        todoText: 'Add your course of study',
        description: 'Add your course of study and your current level',
        icon: AddCourseOfStudyIcon,
        modal: AddCourseOfStudyModal
    },
    {
        id: 2,
        bgColor: '#20319D',
        completed: false,
        todoText: 'Get Started as a Course rep',
        description: 'Create your class timetable to allow other students to get updates',
        icon: AddTimeTableIcon,
        link: '/add-time-table',
        modal: AddCourseOfStudyModal
    },
    {
        id: 3,
        bgColor: '#F97800',
        completed: false,
        todoText: 'Add your course of study',
        description: 'Add your course of study and your current level',
        icon: AddCourseOfStudyIcon,
        link: '/add-course',
        modal: AddCourseOfStudyModal
    }
])

interface Props {
    startAppLevel: "add-course-and-level" | "add-time-table" | "subscribe-courses" | "completed"
}

let props = withDefaults(defineProps<Props>(), {
    startAppLevel: 'add-course-and-level'

});
let startAppTodoLevelNum = computed(() => {
    switch (props.startAppLevel) {
        case 'add-course-and-level':
            return 1;
        case 'add-time-table':
            return 2;
        case 'subscribe-courses':
            return 3;
        case 'completed':
            return 4;
    }
});
let computedTodoArray = computed(() => {
    if (props.startAppLevel) {
        startTodoArray.forEach((todo) => {
            if (todo.id < startAppTodoLevelNum.value) {
                todo.completed = true;
            }
        })
        return startTodoArray
    }
});

let handleTodoClick = async (todoId: number, componentPassed, link) => {
    let modalColor = darkMode.value ? '#2A3343' : 'white'

    if(!link){
        await useModal(componentPassed, {
        options: {
            background: modalColor,
            width: 1000,
            blur: false,
        },props: {
            darkMode: darkMode.value
        }
    })
    }
}
// async function openIntroMobile() {
//     await useModal(CitiesModal, {
//         options: {
//             background: '#EDEDED',
//             width: 1000,
//             blur: false,
//         },
//         props: {
//             city: formHandlers.countrySelectedMobile,
//             country: foundCity
//         }
//     })
// }
</script>

<style scoped>
</style>