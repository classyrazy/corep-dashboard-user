<template>
    <div class="bg-pry-dark min-h-screen h-full block my-auto overflow-x-hidden px-4 center-middle md:px-0">
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
                <form @submit.prevent="submitHandler" class="p-4">
                    <stack class="mx-auto" :gap="1">
                        <h2 class="font-bold text-2xl text-center">Log In</h2>
                        <v-input type="email" placeholder="Enter email addresss" full styleType="white"
                            class="text-sm rounded-lg" size="small" label="Email Address" :value="formReactive.email">
                        </v-input>
                        <v-input type="password" placeholder="Enter Password" full styleType="white"
                            class="text-sm rounded-lg" size="small" label="Password" iconClick
                            :value="formReactive.password"></v-input>
                        <v-button full type="pry" :loading="loading">Log In</v-button>
                    </stack>
                </form>
            </div>
        </div>
        <div class="text-center text-white my-5 md:my-8 font-ibmplex">
            <p>
                Don't have an account?<span class="opacity-70 underline ml-1"><router-link to="/signup">signup</router-link></span>
            </p>
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
import VDropDown from '../components/forms/v-drop-down.vue'
import CorepLogoNotext from '../components/svgs/corep-logo-notext.vue'
import ToastText from "../components/UI/toast-text.vue";
import '@/assets/css/tailwind.css'
import Loadingicon from "../components/svgs/loader-icon.vue";
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
import { useRouter } from "vue-router";
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
let router = useRouter();

let formReactive = reactive({
    email: {
        value: null,
        error: null,
    },
    password: {
        value: null,
        error: null,
    }
});


let validate = () => {
    if (formReactive.email.value == null || formReactive.email.value.trim() == "") {
        formReactive.email.error = "Email is required";
    } else if (!formReactive.email.value.includes("@")) {
        formReactive.email.error = "Email must be a valid email address";
    }
    else {
        formReactive.email.error = null;
    }
    if (formReactive.password.value == null || formReactive.email.value.trim() == "") {
        formReactive.password.error = "Password is required";
    } else if (formReactive.password.value.trim().length < 6) {
        formReactive.password.error = "Password must be at least 6 characters";
    }
    else {
        formReactive.password.error = null;
    }
    if (formReactive.email.error == null && formReactive.password.error == null) {
        return true;
    }
    return false;
}

let { submitForm, form, loading, data } = useFormRequest(
    "User/login",
    formReactive,
    null,
    (data) => {
        console.log(data);
        if (data) {
            if (process.client) {
                localStorage.setItem("session-token", data.token)
            }
            setTimeout(() => {
                // router.push('/')
                location.href = "/";
            }, 2000);
        }
    },
    (error) => {
        let errObj = error.getData()
        console.log(errObj);
        if (errObj) {
            Object.keys(errObj).forEach(key => {
                formReactive[key].error = errObj[key]
            });
            console.log({ errObj }, { formReactive });
            return
        }
        formReactive.email.error = error.getMsg()
    }
);
let submitHandler = () => {
    validate();
    if (validate()) {
    submitForm()
    }
};





</script>

<style scoped>
.center-middle {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>