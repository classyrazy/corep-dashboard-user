import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
import newUpdatePostVue from "~~/components/UI/modals/updates/new-update-post.vue";
import { useModal } from "vue-modally-v3";
const store = useUserStore();
const darkMode = computed(() => store.darkMode);
const {computedDeviceType} = useUserScreenSize();
export const useUpdates = () => {
    async function createNewUpdate() {
        if (store.user?.user_todo_level !== 'add-time-table') {
            if (store.user?.user_todo_level === 'add-course-and-level') {
                return useAlert().openAlert({ type: 'ERROR', msg: 'Add course of study' })
            }
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

    return {
        createNewUpdate
    }
}
