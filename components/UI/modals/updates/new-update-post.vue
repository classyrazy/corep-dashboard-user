<template>
  <aside class="">
    <div class="px-4 py-4 md:px-6 flex justify-between items-center dark:text-white">
      <h1 class="text-xl md:text-2xl text-left dark:text-white text-db-pry-dark font-semibold">
        Create New Update
      </h1>
      <div
        class="close_btn dark:border-db-white-dark border w-8 h-8 md:w-10 md:h-10 flex justify-center cursor-pointer items-center rounded-md">
        <close-icon :text-color="darkMode ? 'white' : 'black'" @click="$emit('close')"></close-icon>
      </div>
    </div>
    <hr class="w-full border-gray-500" />
    <form class="px-4" @submit.prevent="handleNextStepOrSubmit">
      <p class="dark:text-db-white-darker text-db-pry-dark text-sm my-4">
        {{
          formStep == 1
          ? "Please select the type of update you want to create"
          : "Kindly make your update brief and clear for your people to understand"
        }}
      </p>
      <div class="flex flex-col w-full" v-if="formStep === 1">
        <select v-model="formReactive.updateType.value"
          class="dark:bg-db-pry-dark dark:text-white bg-white text-db-pry-dark rounded-lg w-full max-w-[200px] h-12 px-4 focus:border-sec border border-gray-400 ouline-none focus:outline-none">
          <option v-for="option in updateTypes" :key="option.value" :value="option.value">
            {{ option.name }}
          </option>
        </select>
        <select-update-course-list class="mt-4 mb-6" @course-chosen="handleCourseChosen"
          v-if="formReactive.updateType.value !== 'general'" :course-suggestion="computedCourses" :loading="false"
          :dark-mode="darkMode">
        </select-update-course-list>
        <ul
          class="dark:bg-db-pry flex flex-col mt-4 gap-4 py-4 relative rounded-lg min-h-[250px] max-h-[400px] overflow-y-auto list-disc"
          v-else>
          <li class="text-sec border-b-[0.5px] last-of-type:border-b-0 mx-10 border-sec py-2"
            v-for="option in updateTypes" :key="option.value">
            <h4 class="dark:text-white text-db-pry-dark text-md mb-1 font-semibold">
              {{ option.name }}
            </h4>
            <p class="dark:text-db-white-darker text-db-pry-dark text-sm mb-1">
              {{ option.description }}
            </p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col w-full gap-4" v-else-if="formStep === 2">
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-base mb-2">Update Title</label>
          <v-input type="text" placeholder="E.g Course Form submission" full styleType="modal-input" autofocus
            class="text-white rounded-lg" size="medium" :value="formReactive.courseTitle">
          </v-input>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-2">Update Desciption</label>
          <div id="editor-con" class="border border-gray-400 rounded-md max-h-[300px] overflow-y-auto">
            <QuillEditor :toolbar="['bold', 'italic', 'underline', 'link', { 'list': 'ordered' }, { 'list': 'bullet' }]" placeholder="Start an announcement..."
              theme="snow" :modules="modules" style="border: 0" v-model:content="formReactive.updateContent.value" content-type="html">
            </QuillEditor>
          </div>
        </div>
      </div>

      <div class="flex justify-between py-6">
        <v-button type="sec" class="text-right" v-if="formStep === 2" @click="formStep = 1">Back</v-button>
        <v-button type="pry" :loading="loadingSubmitData" class="ml-auto" @click="handleNextStepOrSubmit">{{ formStep == 1
          ? "Next" : "Done" }}</v-button>
      </div>
    </form>
  </aside>
</template>

<script setup lang="ts">
import VInput from "../../../forms/v-input.vue";
import VButton from "../../../forms/v-button.vue";
import SelectUpdateCourseList from "./select-update-course-list.vue";
import CloseIcon from "../../../icons/close-icon.vue";
import { useUserStore } from "~~/store/user";
import { Quill } from "@vueup/vue-quill";
import { QuillEditor } from "@vueup/vue-quill";
import {
  formStep,
  updateTypes,
  useUpdates,
  formReactive,
} from "~~/composables/updates/useUpdates";
import { useVueQuill } from "~~/composables/core/useVueQuill"
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import MagicUrl from "quill-magic-url";


let store = useUserStore();
const darkMode = computed(() => store.darkMode);
// if (!process.server) {
//   const { QuillEditor } = await import("@vueup/vue-quill");
//   const { vueApp } = useNuxtApp();
//   vueApp.component("QuillEditor", QuillEditor);
//   Quill.register('modules/magicUrl', MagicUrl)
// }

const { handleNextStepOrSubmit } = useUpdates();
const { handleTextChange } = useVueQuill()

let defaultCourses = ref([
  {
    id: 1,
    code: "CSC 101",
    title: "Introduction to Computer Science",
    description:
      "This is a course that introduces students to the world of computer science",
    color: "#000",
    course_origin: {
      department: {
        faculty_id: 1,
        id: 1,
        name: "Computer Science",
      },
      parent_department: {
        id: 1,
        name: "Science and Technology",
      },
      faculty: {
        id: 1,
        name: "Science and Technology",
      },
    },
    department_id: 1,
    level_id: 1,
    unit: 3,
    optional_code: "CSC 101",
    school_id: 1,
    updatedAt: "2021-08-12T12:00:00.000Z",
    createdAt: "2021-08-12T12:00:00.000Z",
  },
]);

const vueQuillOptions = {
  debug: "info",
  modules: {
    toolbar: ["bold", "italic", "underline", "list", "bullet"],
    MagicUrl
  },
  placeholder: "Compose an epic...",
  readOnly: false,
  theme: "snow",
};
const modules = [
  {
    name: "magicUrl",
    module: MagicUrl,
  }
]

const computedCourses = computed(() => {
  return defaultCourses.value.map((course) => {
    return {
      ...course,
      active: false,
    };
  });
});
</script>

<style scoped></style>
