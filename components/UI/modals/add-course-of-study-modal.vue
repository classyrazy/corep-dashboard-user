<template>
  <div
    class="min-h-[600px] pb-2"
    :class="darkMode ? 'dark' : ''"
    v-if="faculties"
  >
    <div class="upper">
      <div
        class="name-close_btn p-6 flex justify-between items-center dark:text-white"
      >
        <h1 class="font-semibold text-2xl text-center">
          Choose course of study
        </h1>
        <div
          class="close_btn dark:border-db-white-dark border-2 w-10 h-10 flex justify-center cursor-pointer items-center rounded-md"
        >
          <close-icon :text-color="darkMode ? 'white' : 'black'"></close-icon>
        </div>
      </div>
      <div class="bg-sec w-full h-[1px]"></div>

      <div class="erorr flex justify-between" v-if="showError">
        <h2 class="error-text">{{ error }}</h2>
        <h2 class="error-close-btn" @click="showError = !showError">
          close error
        </h2>
      </div>
    </div>
    <div class="courses-part mt-4">
      <tabs-wrapper
        :dark-mode="darkMode"
        @chosen-faculty="handleChosenFaculty"
        @search-course="handleSeachCourses"
      >
        <tab
          v-for="faculty in faculties"
          :title="faculty.name"
          :key="faculty.id"
          v-slot="slotProps"
          class="styled_scrollbar rounded-lg mt-4 dark:bg-db-pry mx-4 h-[400px] max-h-[500px] overflow-y-auto"
        >
          <course-of-study-list-modal-view
            :course-of-studies="computedCourseOfStudies"
            v-if="!loadingDepartments && computedCourseOfStudies"
            class=""
            @chosen-course-of-study="handleChosenCourseOfStudy"
          >
          </course-of-study-list-modal-view>
          <h1 v-if="loadingDepartments">{{ loadingDepartments }}</h1>
        </tab>
      </tabs-wrapper>
    </div>
    <div class="flex justify-end m-8">
      <v-button
        type="pry"
        :loading="loading"
        class="text-right"
        @click="handleSubmitCourseChosen"
        >Done</v-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from "../../forms/v-button.vue";
import Tab from "../tabs/tab.vue";
import TabsWrapper from "../tabs/tabs-wrapper.vue";
import CloseIcon from "../../icons/close-icon.vue";
import Graph from "../../../libs/avanda";
import CourseOfStudyListModalView from "./course-of-study-list-modal-view.vue";
import useFormRequest from "../../../composables/useFormRequest";

interface Props {
  darkMode: boolean;
  faculties: object[];
}

let props = defineProps<Props>();
let emit = defineEmits(["close"]);

let modalSubmitData = ref(null);
let courseOfStudies = ref(null);
let searchValue = ref(null);
let returnedData = ref(null);
let error = ref(null);
let showError = ref(false);
let loadingDepartments = ref(false);

async function handleChosenFaculty(facultyIdpassed) {
  console.log("hello World", facultyIdpassed);
  loadingDepartments.value = true;

  searchValue.value = null;
  let id = facultyIdpassed;
  let { submitData, loading, data } = useFormRequest(
    "Department/getAllDepartmentsByFaculty",
    null,
    { id },
    (data) => {
      console.log(data);
      if (data) {
        courseOfStudies.value = data;
      }
      loadingDepartments.value = false;
    },
    (error) => {
      console.log(error);
    }
  );
  submitData();
}
function handleSeachCourses(searchVal) {
  searchValue.value = searchVal;
  console.log(searchValue.value);
}
let computedCourseOfStudies = computed(() => {
  if (searchValue.value) {
    return courseOfStudies.value.filter((course) =>
      course.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  }
  return courseOfStudies.value;
});
// onBeforeMount(() => {
//     getFaculties()
// })
onMounted(() => {
  // getFaculties()
  console.log("mounted");
});
function handleChosenCourseOfStudy(courseObj) {
  modalSubmitData.value = courseObj;
}

function handleSubmitCourseChosen() {
  console.log(modalSubmitData.value);
  if (!modalSubmitData.value) {
    error.value = "Please choose a course of study";
    showError.value = true;
    return;
  }
  let unrefModalSubmitData = modalSubmitData.value;
  let { submitData, loading, data } = useFormRequest(
    "User/courseOfStudyRegisteration",
    null,
    { ...unrefModalSubmitData },
    (data) => {
      console.log(data);
      if (data) {
        returnedData.value = data;
        emit("close", returnedData.value);
      }
    },
    (error) => {
      console.log(error);
    }
  );
  submitData();
}
let colors = {
  scrollthumb: props.darkMode ? "#BBB9B6" : "rgb(100 116 139/.5)",
  scrollbar: props.darkMode ? "#212939" : "transparent",
};
</script>

<style scoped>
.styled_scrollbar::-webkit-scrollbar {
  background-color: transparent;
  width: 0.375rem !important;
  height: 0.375rem !important;
}

.styled_scrollbar::-webkit-scrollbar-thumb {
  background-color: v-bind(colors.scrollthumb) !important;
  opacity: 1 !important;
  border-radius: 50px;
}

.styled_scrollbar::-webkit-scrollbar-track {
  background-color: rgb(100 116 139/0.16) !important;
  border-radius: 50px !important;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
