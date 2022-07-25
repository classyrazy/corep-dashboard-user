<template>
    <div class="grid grid-auto grid-cols-3 gap-4 max-w-[1000px]" v-if="startAppTodoLevel">
        <start-app-todo :bg-color="startAppTodo.bgColor" :todo-text="startAppTodo.todoText"
            :description="startAppTodo.description" :icon="startAppTodo.icon" :link="startAppTodo.link"
            v-for="startAppTodo in computedTodoArray" :completed="startAppTodo.completed" :key="startAppTodo.id"
            @click="handleTodoClick(startAppTodo, startAppTodo.modal, startAppTodo.link)">
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
import Graph from "../../../libs/avanda";
// import startAppTodoObjType from "../../../types/appTodoObj.ts"


interface startAppTodoObjType {
    id: number;
    todoText: string;
    completed: boolean;
    bgColor: string;
    description: string;
    icon: Object;
    modal: Object ;
    link?: string;
}

let store = useUserStore()
let darkMode = computed(() => store.darkMode)


let startTodoArray  = reactive<startAppTodoObjType[]>([
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

// interface Props {
//     startAppLevel: "add-course-and-level" | "add-time-table" | "subscribe-courses" | "completed"
// }
let startAppTodoLevel = computed(() => store.userRegTodoStageLevel)
console.log(startAppTodoLevel.value)

// let props = withDefaults(defineProps<Props>(), {
//     // startAppLevel: 'add-course-and-level'

// });
let modalResult = ref(null)
// let computedStartAppLevel = computed(() => {
//     if (modalResult.value) {
//         return modalResult.value
//     }

//     return props.startAppLevel
// })
let startAppTodoLevelNum = computed(() => {
    console.log("from start app todo level num", startAppTodoLevel.value)
    switch (startAppTodoLevel.value) {
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
console.log(startAppTodoLevelNum.value)
// let computedPropsStartAppLevel = computed(() => props.startAppLevel)
let computedTodoArray = computed(() => {
    if (startAppTodoLevel.value) {
        console.log("from computedTodoArray", startAppTodoLevel.value)
        startTodoArray.forEach((todo) => {
            if (todo.id < startAppTodoLevelNum.value) {
                todo.completed = true;
            }
        })
        return startTodoArray
    }
});
let faculties = ref(null)
async function getFaculties() {
    try {
        let req = new Graph()
            .service("Faculty/getAllFacultiesBySchool")
        faculties.value = await (await req.get()).getData();
        console.log(faculties.value)
    } catch (error) {
        console.log(error);
    }
}
let handleTodoClick = async (todo: startAppTodoObjType, componentPassed, link) => {
    let modalColor = darkMode.value ? '#212939' : 'white'
    // 2A3343

    if (!link && !todo.completed) {
        await getFaculties()
        if (faculties.value) {
            modalResult.value = await useModal(componentPassed, {
                options: {
                    background: modalColor,
                    width: 1000,
                    blur: false,
                }, props: {
                    darkMode: darkMode.value,
                    faculties: faculties
                }
            })
            if (modalResult.value) {
                store.fetchUserRegStartTodoLevelMode()
            }
        }
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