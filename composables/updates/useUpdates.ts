import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
import newUpdatePostVue from "~~/components/UI/modals/updates/new-update-post.vue";
import { useModal } from "vue-modally-v3";
import { useQuickFunction } from "../core/useQuickFunctions";
import { courseType } from "~~/utils/types/courses/courseType";
import Graph from "@avanda/avandajs";
import { ComputedRef } from "vue";
import { defineEmits } from "vue";

const store = useUserStore();
const darkMode = computed(() => store.darkMode);
const { computedDeviceType } = useUserScreenSize();
const { getAppTodoInNumber } = useQuickFunction();
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
export const loadingCourses = ref(false)
interface courseTypeWithActive extends courseType {
    active: boolean
}
let courses = ref<courseType[]>([])
export const computedCourses = computed(() => {
    return courses.value.map((course) => {
        return {
            ...course,
            active: formReactive.chosenCourse.value === course.id
        }
    })
})
let emit = defineEmits(['close'])

export const formReactive = reactive<{
    updateType: {
        value: string,
        error: string | null
    },
    chosenCourse: {
        value: number | null,
        error: string | null
    },
    updateContent: {
        value: string | null,
        error: string | null
    },
    updateTitle: {
        value: string | null,
        error: string | null
    }
}>({
    updateType: {
        value: updateTypes[0].value,
        error: null
    },
    chosenCourse: {
        value: null,
        error: null
    },
    updateContent: {
        value: null,
        error: null
    },
    updateTitle: {
        value: null,
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
        if (getAppTodoInNumber(store.user?.user_todo_level!) <= 2) {
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
        if (formStep.value === maxStep) return
        if (formReactive.updateType.value !== 'general' && formReactive.chosenCourse.value === null) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Kindly choose a course to send update to' })
            return
        }
        formStep.value += 1
        // else {
        //     if (formReactive.updateType.value !== "general") {
        //         if (formReactive.chosenCourse.value === null) {
        //             useAlert().openAlert({ type: 'ERROR', msg: 'Kindly choose a course' })
        //             return
        //         } else {
        //             formStep.value = 2
        //         }
        //     } else {
        //         formStep.value = 2
        //     }
        // }
    }

    async function handleFetchCoursesForUpdates() {
        loadingCourses.value = true
        try {
            let req = await new Graph().service("Course/getCourseCreatedByUser").fetch(
                "*",
                new Graph().service("Department/courseOriginDetailsFromParent").as("course_origin")
            ).get()
            courses.value = req.getData()
        } catch (error: any) {
            console.log(error)
            useAlert().openAlert({ type: 'ERROR', msg: `${error.getMsg() || 'Oops, Something went wrong 🤭'}` })

        } finally {
            loadingCourses.value = false
        }
    }

    function handleCourseChosen(id: number) {
        console.log(id)
        formReactive.chosenCourse.value = id
    }
    function validateCreateUpdateForm() {
        let isValid = true
        if (formReactive.updateType.value === null) {
            isValid = false
            useAlert().openAlert({ type: 'ERROR', msg: 'Kindly choose an update type' })
        } else if (formReactive.updateContent.value === null) {
            isValid = false
            formReactive.updateContent.error = "Update Details is required"
        } else if (formReactive.updateType.value !== "general" && formReactive.chosenCourse.value === null) {
            isValid = false
            useAlert().openAlert({ type: 'ERROR', msg: 'Kindly choose a course' })
        } else if (!formReactive.updateTitle.value) {
            isValid = false
            formReactive.updateTitle.error = "Update title is required"
        } else {
            isValid = true
        }


        // Object.keys(formReactive).forEach((key)=>{
        //     if(formReactive[key as keyof typeof formReactive].value === null){
        //         isValid = false
        //         formReactive[key as keyof typeof formReactive].error = "This field is required"
        //     }
        // })
        return isValid
    }
    function closeModal() {
        emit('close')
    }
    let { submitForm, loading: loadingSubmitCreateUpdate, data } = useFormRequest(
        "CourseUpdate/createCourseUpdate",
        formReactive,
        null,
        (data: any) => {
            if (data) {
                return true
            }
        },
        (error: { getData: () => any; getMsg: () => any }) => {
            useAlert().openAlert({ type: 'ERROR', msg: error.getMsg() || `Oops, Something went wrong 🤭` })
            let errObj = error.getData();
            Object.keys(errObj).forEach((key) => {
                formReactive[key as keyof typeof formReactive].error = errObj[key][0]
            }
            );
            return false
        }
    );
    async function handleCreateNewUpdate() {
        if (!validateCreateUpdateForm()) return
        submitForm()
    }
    return {
        openCreateNewUpdateModal,
        handleNextStepOrSubmit,
        handleFetchCoursesForUpdates,
        handleCourseChosen,
        handleCreateNewUpdate,
        loadingSubmitCreateUpdate,
        validateCreateUpdateForm
    }
}
