  <template>
  <div class="w-full" :class="darkMode ? 'dark' : ''">
    <div
      class="upper flex justify-between md:px-4 dark:border-b-db-white-dark border-b-2"
    >
      <ul
        class="tabs_header items-center w-full max-w-2xl overflow-x-auto"
        ref="tabWrapper"
      >
        <li
          class="tab-titles w-min dark:text-white mx-4 border-b-sec rounded-md whitespace-nowrap dark:hover:bg-db-pry-dark hover:bg-db-white-dark px-3 py-1 mb-1"
          v-for="obj in computedSlotArr"
          :key="obj.title"
          :class="obj.isActive ? 'active' : ''"
          @click="handleTabTitleClick($event, obj)"
        >
          <button :id="obj.title">{{ obj.title }}</button>
        </li>
      </ul>
      <div class="search_input_con hidden md:block">
        <v-input
          placeholder="Search Courses"
          class="text-sm rounded-lg dark:bg-db-pry-dark dark:text-white"
          type="text"
          size="small"
          :icon="SearchIcon"
          :value="formHandler.searchCourse"
          @custom-change="handleSearchCourses"
          :icon-color="darkMode ? '#ffff' : '#212939'"
          iconLeft
          full
          styleType="modal-search"
        ></v-input>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "../../icons/search-icon.vue";
import VInput from "../../forms/v-input.vue";

interface Props {
  darkMode: boolean;
}

let props = withDefaults(defineProps<Props>(), {});

let slots = useSlots();
let slotsArr = reactive(
  slots.default()[0].children.map((slot) => {
    return {
      title: slot.props.title,
      id: slot.props.key,
    };
  })
);

let formHandler = reactive({
  searchCourse: {
    value: null,
    error: null,
  },
});
let titleArray = [];
const emit = defineEmits(["chosenFaculty", "searchCourse"]);
let computedSlotArr = computed(() => {
  slotsArr.forEach((element) => {
    let titleObj = {
      title: element.title,
      id: element.id,
      isActive: false,
    };
    titleArray.push(reactive(titleObj));
  });
  return titleArray;
});

let selectedTitle = ref({
  title: computedSlotArr.value[0].title,
  id: computedSlotArr.value[0].id,
});
emit("chosenFaculty", selectedTitle.value.id);

computedSlotArr.value.forEach((element) => {
  if (element.title === selectedTitle.value.title) {
    element.isActive = true;
  }
});
let tabWrapper = ref(null);

function handleTabTitleClick(e, selectObj) {
  selectedTitle.value = selectObj;
  computedSlotArr.value.forEach((element) => {
    element.isActive = false;
    if (element.title === selectObj.title) {
      element.isActive = true;
    }
  });
  emit("chosenFaculty", selectedTitle.value.id);
}
function handleSearchCourses() {
  let searchCourse = formHandler.searchCourse.value;
  emit("searchCourse", searchCourse);
}
provide("tabs", selectedTitle);

let colors = {
  scrollthumb: props.darkMode ? "#BBB9B6" : "rgb(100 116 139/.5)",
  scrollbar: props.darkMode ? "#212939" : "transparent",
};
</script>

<style scoped>
.tab-titles {
  display: inline-block;
  position: relative;
  transition: all 0.4s ease-in;
  /* transform: scaleX(0); */
  /* margin: auto; */
}

.tab-titles.active::after {
  content: "";
  position: absolute;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  height: 3px;
  bottom: -3px;
  transform: scaleX(1);
  left: 0;
  background: #f9b700;
  /* transition: all .4s ease-out; */
}

.tabs_header {
  display: grid;
  grid-auto-flow: column;
  display: flex;
  grid-auto-columns: 23%;
}

.tabs_header::-webkit-scrollbar {
  background-color: transparent;
  width: 0.375rem !important;
  height: 0.375rem !important;
}

.tabs_header::-webkit-scrollbar-thumb {
  background-color: v-bind(colors.scrollthumb) !important;
  opacity: 1 !important;
  border-radius: 50px;
}

.tabs_header::-webkit-scrollbar-track {
  background-color: rgb(100 116 139/0.16) !important;
  border-radius: 50px !important;
}
@media screen and (max-width: 768px) {
  .tabs_header::-webkit-scrollbar {
    display: none;
  }
}
</style>
