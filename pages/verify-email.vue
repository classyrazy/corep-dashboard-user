<template>
    <div class="bg-pry min-h-screen h-full block my-auto overflow-x-hidden px-4 center-middle md:px-0">
        <div class="fixed -top-[7rem] -right-[7rem] md:-top-[7rem] md:-right-[8rem]">
            <circle-exclude :size="250" class="relative max-w-[200px] md:max-w-[250px]"></circle-exclude>
        </div>
        <div class="fixed -top-[5rem] -left-[8rem] md:-top-[3rem] md:-left-[7rem]">
            <union-svg :size="250" class="relative max-w-[200px] md:max-w-[250px]"></union-svg>
        </div>
        <div class="w-full">
            <div class="bg-white rounded-xl mt-10 pt-2 max-w-md mx-auto font-inter">
                <div class="w-full">
                    <corep-logo-notext size="40" class=" mx-auto justify-center"></corep-logo-notext>
                    <div class="w-full h-[1px] bg-[#F9B700] mt-4"></div>
                </div>
                <stack class="mx-auto p-4" :gap="1">
                    <h2 class="font-bold text-2xl text-center"> Email Verification</h2>
                    <p v-if="hasExpired" class="text-md text-center">Verification Link expired</p>
                    <stack class="mx-auto" :gap="1" v-if="loading">
                        <loader-icon class="mx-auto w-full" :size="40" :color="'#F9B700'">
                        </loader-icon>
                        <p class="text-center text-gray-600">
                            Verifying your email address...
                        </p>
                    </stack>
                    <p class="text-center text-gray-600" v-if="verified">
                        Email Verified Successfully <br>Redirecting to Login Page.
                    </p>
                    <v-button full type="pry-reverse" v-else>Resend Verification Email</v-button>
                </stack>
            </div>
        </div>
        <div class="fixed -bottom-[7rem] -left-[7rem] md:-bottom-[7rem] md:-left-[8rem]">
            <circle-exclude :size="250" class="relative max-w-[200px] md:max-w-[250px]"></circle-exclude>
        </div>
        <div class="fixed -bottom-[5rem] -right-[7rem] md:-bottom-[3rem] md:-right-[7rem]">
            <union-svg :size="250" class="relative max-w-[200px] md:max-w-[250px]"></union-svg>
        </div>
    </div>
</template>

<script setup>
import LoaderIcon from '../components/svgs/loader-icon.vue'
import VDropDown from '../components/forms/v-drop-down.vue'
import CorepLogoNotext from '../components/svgs/corep-logo-notext.vue'
import ToastText from "../components/UI/toast-text.vue";
import '@/assets/css/tailwind.css'
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router';
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import Graph from "../libs/avanda.ts"
import useFormRequest from '../composables/useFormRequest';

let router = useRouter();
let route = useRoute();
let hasExpired = ref(false);
let verified = ref(false);
console.log(route.query.token);
let token = route.query.token;

let { submitData, loading, data } = useFormRequest(
    "User/verifyEmail",
    null,
    { token },
    (data) => {
        console.log(data);
        if(data){
            verified.value = true;
            router.push('/')
        }
    },
    (error) => {
        if (error.getMsg() == "jwt expired") {
            hasExpired.value = true
            console.log(loading);
        }
    }
);
onMounted(() => {
    submitData();
    console.log(loading);

});





</script>

<style scoped>
.center-middle {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.dropdown-container {}

.rotate-def {
    transform: rotate(180deg);
}

.bg-image {
    background-image: url("/sign-up-bg.svg");
    background-position: center;
    background-repeat: no-repeat;
}
</style>