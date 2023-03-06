<template>
  <div
    class="grid grid-auto md:grid-cols-3 gap-4 max-w-[1000px]"
    v-if="startAppTodoLevel"
  >
    <start-app-todo
      :bg-color="startAppTodo.bgColor"
      :todo-text="startAppTodo.todoText"
      :description="startAppTodo.description"
      :icon="startAppTodo.icon"
      :link="startAppTodo.link"
      v-for="startAppTodo in computedTodoArray"
      :completed="startAppTodo.completed"
      :key="startAppTodo.id"
      @click="
        handleTodoClick(startAppTodo, startAppTodo.modal, startAppTodo.link)
      "
      :loading="startAppTodo.id === 1 ? loadingModal : false"
    >
    </start-app-todo>
  </div>
</template>

<script setup lang="ts">
import RegisterCoursesIcon from '../../icons/register-courses-icon.vue'
import StartAppTodo from "./start-app-todo.vue";
import AddCourseOfStudyIcon from "../../icons/add-course-of-study-icon.vue";
import AddTimeTableIcon from "../../icons/add-time-table-icon.vue";
import { useModal } from "vue-modally-v3";
import AddCourseOfStudyModal from "../modals/add-course-of-study-modal.vue";
import { useUserStore } from "../../../store/user";
import Graph from "../../../libs/avanda";
import useUserScreenSize from "../../../composables/useUserScreenSize";

// import startAppTodoObjType from "../../../types/appTodoObj.ts"

interface startAppTodoObjType {
  id: number;
  todoText: string;
  completed: boolean;
  bgColor: string;
  description: string;
  icon: Object;
  modal?: Object;
  link?: string;
  courseRepOnly?: boolean;
}

let store = useUserStore();
let router = useRouter()
let darkMode = computed(() => store.darkMode);
let loadingModal = ref(false);
let capitalizedSchoolName = computed(() => {
  let schoolName = store.user?.school.short_name;
  return schoolName.toUpperCase()
  // return schoolName.charAt(0).toUpperCase() + schoolName.slice(1);
});
let startTodoArray = reactive<startAppTodoObjType[]>([
  {
    id: 1,
    bgColor: "#8D24AA",
    completed: false,
    todoText: "Add your course of study",
    description: `Choose from the lists of departments from ${capitalizedSchoolName.value}.`,
    icon: AddCourseOfStudyIcon,
    modal: AddCourseOfStudyModal,
    courseRepOnly: false
  },
  {
    id: 2,
    bgColor: "#20319D",
    completed: false,
    todoText: "Get Started as a Course rep",
    description:
      "Create your class timetable to allow other students to get updates.",
    icon: AddTimeTableIcon,
    link: "/timetable?a=create",
    courseRepOnly: true
  },
  {
    id: 3,
    bgColor: "#F97800",
    completed: false,
    todoText: "Register your Courses",
    description:
      "Select all the courses you are offering, and be notified If any changes occur on each.",
    icon: RegisterCoursesIcon,
    link: "/timetable?a=register",
    courseRepOnly: false

  },
  {
    id: 4,
    bgColor: "#5EA625",
    completed: false,
    todoText: "View your Timetable",
    description: "Your class timetable has been generated based on your registered courses.",
    icon: AddTimeTableIcon,
    link: "/timetable",
    courseRepOnly: false
  },
]);
let {
  getUserScreenSize,
  computedDeviceType,
} = useUserScreenSize();

onMounted(() => {
  getUserScreenSize();
});
let startAppTodoLevel = computed(() => store.user?.user_todo_level);
// let startAppTodoLevel = computed(() => store.userRegTodoStageLevel);
console.log(startAppTodoLevel.value);
let modalResult = ref(null);
let startAppTodoLevelNum = computed(() => {
  console.log("from start app todo level num", startAppTodoLevel.value);
  switch (startAppTodoLevel.value) {
    case "add-course-and-level":
      return 1;
    case "add-time-table":
      return 2;
    case "subscribe-courses":
      return 3;
    case "completed":
      return 4;
  }
});
console.log(startAppTodoLevelNum.value);
let computedTodoArray = computed(() => {
  if(store.user?.role !== "course-rep") {
    return startTodoArray.filter(todo => todo.courseRepOnly === false)
  }
  if (startAppTodoLevel.value) {
    console.log("from computedTodoArray", startAppTodoLevel.value);
    startTodoArray.forEach((todo) => {
      if (startAppTodoLevelNum.value && todo.id < startAppTodoLevelNum.value) {
        todo.completed = true;
      }
    });
    return startTodoArray;
  }
});
let faculties = ref(null);
async function getFaculties() {
  try {
    let req = new Graph().service("Faculty/getAllFacultiesBySchool");
    faculties.value = await (await req.get()).getData();
    console.log(faculties.value);
  } catch (error) {
    console.log(error);
  }
}

let handleTodoClick = async (
  todo: startAppTodoObjType,
  componentPassed,
  link
) => {
  let modalColor = darkMode.value ? "#212939" : "white";
  let modalType: "panel" | "modal" =
    computedDeviceType.value == "mobile" ? "panel" : "modal";
  // 2A3343

  if (!link && !todo.completed && todo.id === 1) {
    loadingModal.value = true;

    await getFaculties();
    loadingModal.value = false;
    if (faculties.value) {
      modalResult.value = await useModal(componentPassed, {
        options: {
          background: modalColor,
          width: 1000,
          blur: false,
          type: modalType,
        },
        props: {
          darkMode: darkMode.value,
          faculties: faculties,
        },
      });
      if (modalResult.value) {
        store.fetchUserRegStartTodoLevelMode();
      }
    }
  }else if(link && !todo.completed && !todo.modal){
    router.push(link)
  }
};
</script>

<style scoped></style>
