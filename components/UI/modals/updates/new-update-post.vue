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
          v-if="formReactive.updateType.value !== 'general'" :course-suggestion="computedCourses"
          :loading="loadingCourses" :dark-mode="darkMode">
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
            class="text-white rounded-lg" size="medium" :value="formReactive.updateTitle">
          </v-input>
        </div>
        <div class="flex flex-col w-full">
          <label class="dark:text-white text-db-pry-dark text-md mb-2">Update Desciption</label>
          <div id="editor-con" class="border border-gray-400 rounded-md max-h-[300px] overflow-y-auto">
            <QuillEditor :toolbar="['bold', 'italic', 'underline', 'link', { 'list': 'ordered' }, { 'list': 'bullet' }]"
              placeholder="Start an announcement..." theme="snow" :modules="modules" style="border: 0"
              v-model:content="formReactive.updateContent.value" content-type="html">
            </QuillEditor>
          </div>
        </div>
      </div>

      <div class="flex justify-between py-6">
        <v-button type="sec" class="text-right" v-if="formStep === 2" @click="formStep = 1">Back</v-button>
        <v-button type="pry" v-if="formStep == 1" class="ml-auto" @click="handleNextStepOrSubmit">Next</v-button>
        <v-button type="pry" v-else :loading="loadingSubmitCreateUpdate" class="ml-auto" @click="handleCreateNewUpdate">Done</v-button>
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
  loadingCourses,
  computedCourses
} from "~~/composables/updates/useUpdates";
import { useVueQuill } from "~~/composables/core/useVueQuill"
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import MagicUrl from "quill-magic-url";
import { useAlert } from "~~/composables/core/useToast";


let store = useUserStore();
const darkMode = computed(() => store.darkMode);
let emit = defineEmits(["close"]);
const { handleNextStepOrSubmit, handleFetchCoursesForUpdates, handleCourseChosen, validateCreateUpdateForm} = useUpdates();
const { handleTextChange } = useVueQuill()


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

watch(formReactive.updateType, (value) => {
  if (value.value !== "general" && computedCourses.value.length === 0) {
    handleFetchCoursesForUpdates();
  }
  else{
  formReactive.chosenCourse.value = null;

  }
});
let { submitForm, loading: loadingSubmitCreateUpdate, data } = useFormRequest(
        "CourseUpdate/createCourseUpdate",
        formReactive,
        null,
        (data: any) => {
            if (data) {
                emit("close");
            }
        },
        (error: { getData: () => any; getMsg: () => any }) => {
            useAlert().openAlert({ type: 'ERROR', msg: error.getMsg() || `Oops, Something went wrong 🤭` })
            let errObj = error.getData();
            Object.keys(errObj).forEach((key) => {
                formReactive[key as keyof typeof formReactive].error = errObj[key][0]
            }
            );
        }
    );
    async function handleCreateNewUpdate() {
        if (!validateCreateUpdateForm()) return
        submitForm()
    }

</script>

<style scoped></style>
