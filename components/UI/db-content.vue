<template>
    <div class="md:overflow-y-auto w-full md:h-screen md:px-auto md:pt-auto"
        :class="type == 'default' ? 'md:p-8 pt-4 px-2' : ''">
        <slot :user-store="user" :mode="store.darkMode"></slot>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
import { storeToRefs } from 'pinia'
import { messaging } from "~~/firebase/init";
import { getToken, onMessage } from "firebase/messaging";
import { useAlert } from '~~/composables/core/useToast';

interface Props {
    type: "default" | "no-style"
}
const props = withDefaults(defineProps<Props>(), {
    type: "default"
})
let store = useUserStore()

const user = computed(() => store.user)


onMounted(() => {
    if (!user.value) {
        store.fetchUser();
    }
    console.log("This is from db content")
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        useAlert().openAlert({
          type: "Alert",
          msg: "Info: " + payload.data?.title
        });
    });
})

</script>

<style scoped></style>