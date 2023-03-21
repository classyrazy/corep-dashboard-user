import { useModal } from "vue-modally-v3";
import CourseSubscriptionModal from '~~/components/UI/modals/course-subscription/course-subscription-modal.vue'
import { useUserStore } from "~~/store/user";
import useUserScreenSize from "../useUserScreenSize";
import { useAlert } from "../core/useToast";

let store = useUserStore()
let darkMode = computed(() => store.darkMode);
let modalColor = darkMode.value ? "#212939" : "white";
let {
    getUserScreenSize,
    computedDeviceType
} = useUserScreenSize();
getUserScreenSize()

let modalType: "panel" | "modal" =
    computedDeviceType.value == "mobile" ? "panel" : "modal";

export const useCoreModals = () => {
    async function openSubscribeCourseModal() {
        if (store.user?.user_todo_level !== 'add-time-table') {
            if (store.user?.user_todo_level === 'add-course-and-level') {
                return useAlert().openAlert({ type: 'ERROR', msg: 'Add course of study' })
            }
        }
        let modal = await useModal(CourseSubscriptionModal, {
            options: {
                background: modalColor,
                width: 1000,
                blur: false,
                type: modalType,
            },
            props: {
                darkMode: darkMode.value,
            },
        });
    }

    return {
        openSubscribeCourseModal
    }
}
