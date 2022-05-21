<template>
    <div class="grid grid-auto grid-cols-3 gap-4 max-w-[1000px]" v-if="startAppLevel">
        <start-app-todo :bg-color="startAppTodo.bgColor" :todo-text="startAppTodo.todoText"
            :description="startAppTodo.description" :icon="startAppTodo.icon" :link="startAppTodo.link"
            v-for="startAppTodo in computedTodoArray" :completed="startAppTodo.completed"></start-app-todo>
    </div>
</template>

<script setup lang="ts">
import StartAppTodo from './start-app-todo.vue';
import AddCourseOfStudyIcon from '~~/components/icons/add-course-of-study-icon.vue';
import AddTimeTableIcon from '~~/components/icons/add-time-table-icon.vue';

let startTodoArray = reactive([
    {
        id: 1,
        bgColor: '#8D24AA',
        completed: false,
        todoText: 'Add your course of study',
        description: 'Add your course of study and your current level',
        icon: AddCourseOfStudyIcon,
        link: '/add-course'
    },
    {
        id: 2,
        bgColor: '#20319D',
        completed: false,
        todoText: 'Get Started as a Course rep',
        description: 'Create your class timetable to allow other students to get updates',
        icon: AddTimeTableIcon,
        link: '/add-time-table'
    },
    {
        id: 3,
        bgColor: '#F97800',
        completed: false,
        todoText: 'Add your course of study',
        description: 'Add your course of study and your current level',
        icon: AddCourseOfStudyIcon,
        link: '/add-course'
    }
])

interface Props {
    startAppLevel: "add-course-and-level" | "add-time-table" | "subscribe-courses" | "completed"
}

let props = withDefaults(defineProps<Props>(), {
    startAppLevel: 'add-course-and-level'

});
let testLevel = "subscribe-courses"
let startAppTodoLevelNum = computed(() => {
    switch (testLevel) {
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

</script>

<style scoped>
</style>