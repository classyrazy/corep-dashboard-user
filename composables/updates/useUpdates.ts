import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
import newUpdatePostVue from "~~/components/UI/modals/updates/new-update-post.vue";
import { useModal } from "vue-modally-v3";
import { useQuickFunction } from "../core/useQuickFunctions";

const store = useUserStore();
const darkMode = computed(() => store.darkMode);
const { computedDeviceType } = useUserScreenSize();
const {getAppTodoInNumber} = useQuickFunction();
export const formStep = ref(1)
export const updateTypes = [
    {
        name: 'General Update',
        value: 'general',
        description: 'Sends a general update to all students in your department and level'
    },
    {
        name: 'Course Update',
        value: 'course',
        description: 'Sends an update to all students in a particular course'
    },
    {
        name: 'Assignment Update',
        value: 'assignment',
        description: 'Sends an update to all students in a particular course and also tracks assignments'
    },
    {
        name: 'Test Update',
        value: 'test',
        description: 'Sends an update to all students in a particular course and also tracks tests'
    },
]
export const formReactive = reactive({
    updateType: {
        value: updateTypes[0].value,
        error: null
    },
    chosenCourse:{
        value: 1,
        error: null
    }
})
export const useUpdates = () => {
    async function openCreateNewUpdateModal() {
        // if (store.user?.user_todo_level !== 'add-time-table') {
        //     if (store.user?.user_todo_level === 'add-course-and-level') {
        //         return useAlert().openAlert({ type: 'ERROR', msg: 'Add course of study' })
        //     }
        // }
        if(getAppTodoInNumber(store.user?.user_todo_level!) <= 2){
            return useAlert().openAlert({ type: 'ERROR', msg: 'Kindly complete your registration' })
        }
        let modalColor = darkMode.value ? "#212939" : "white";
        let modalType: "panel" | "modal" =
            computedDeviceType.value == "mobile" ? "panel" : "modal";
        let modal = await useModal(newUpdatePostVue, {
            options: {
                width: 800,
                background: modalColor,
                blur: false,
                type: modalType,
            }
        })
    }
    function handleNextStepOrSubmit() {
        const maxStep = 2
        if(formStep.value === maxStep){
            console.log('submit', {formReactive})
        }
        else{
            if (formReactive.updateType.value!== "general") {
                if(formReactive.chosenCourse.value === null){
                    useAlert().openAlert({ type: 'ERROR', msg: 'Kindly choose a course' })
                    return
                }else{
                    formStep.value = 2
                }
            }else{
                formStep.value = 2
            }
        }
    }
    return {
        openCreateNewUpdateModal,
        handleNextStepOrSubmit
    }
}
