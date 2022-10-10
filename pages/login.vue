<template>
    <!-- Desktop Login --> 

    <div class="md:flex justify-center hidden">
        <div class="flex items-center min-h-screen w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div class="w-full">
                    <div class="">
                        <div class="bg-white rounded-xl max-w-md mx-auto font-inter">
                            <div class="w-full">
                                <corep-logo-notext size="90" class=" mx-auto justify-center"></corep-logo-notext>
                                <div class="w-full h-[1px] bg-[#F9B700] mt-4"></div>
                            </div>
                            <form @submit.prevent="submitHandler" >
                                <stack class=" gap-6">
                                    <h2 class="font-bold text-2xl text-center">Log In</h2>
                                    <v-input type="email" placeholder="Enter email addresss" full styleType="white" class="text-sm rounded-lg" size="small" label="Email Address" :value="formReactive.email">
                                    </v-input>
                                    <v-input type="password" placeholder="Enter Password" full styleType="white" class="text-sm rounded-lg" size="small" label="Password" iconClick :value="formReactive.password"></v-input>
                                    <v-button full type="pry" :loading="loading">Log In</v-button>
                                </stack>
                            </form>
                        </div>
                        <div class="text-center text-pry-dark my-5 md:my-8 font-ibmplex">
                            <p>
                                Don't have an account?<span class="opacity-70 underline-none ml-1 text-pry-dark">
                                    <router-link to="/signup">Signup</router-link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        <layer-bg class="  block my-auto overflow-x-hidden px-4 center-middle  md:px-0"></layer-bg>
                <div class=" hidden pt-[15%] bg-cover lg:block lg:w-6/12" style="background-image: url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')">
                    <div class="text-white  md:p-12 md:mx-6">
                        <h1 class="title  mb-6">GET A</h1>
                        <h1 class="seam  mb-6">SEAMLESS</h1>
                        <h1 class="title1"><span class="span0">experience attending your </span>
                            <span class="span1">classes</span>
                        </h1>
                    </div>
             </div>
    </div>


    <login />

</template>

<script setup>
import LayerBg from '../components/UI/layer-bg.vue'
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
import login from '../components/mobile/login.vue'
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
.center-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title{
    color: rgba(255, 255, 255, 1);
    font-size: 40px;
    font-weight: 800;
    letter-spacing: 2px;
    line-height: 60px;
    min-height: 60px;
    white-space: nowrap;
}
.seam{
    color: rgba(249, 183, 0, 1);
    font-size: 72px;
    font-weight: 800;
    letter-spacing: 3.6px;
    line-height: 108px;
    min-height: 108px;
    white-space: nowrap;
}

.title1{
    color: rgba(255, 255, 255, 1);
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 60px;
    min-height: 120px;
    width: 462px;
}
.span0{
    color: rgba(255, 255, 255, 1);
}
.span1{
    color: rgba(243, 58, 58, 1);
}

</style>