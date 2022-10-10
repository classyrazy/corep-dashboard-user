<template>
  <!-- Mobile Login -->
  <div class='lg:hidden md:hidden'>
  <layer-bg class="bg-pry-dark h-screen block my-auto overflow-x-hidden p-4  md:px-0">
        <div class=" rounded-xl font-inter">
            <div class="w-full">
                <corep-logo-notext size="70" class=" mx-auto justify-center"></corep-logo-notext>
                <div class="w-full h-[1px] bg-[#F9B700] mt-4"></div>
            </div>

            <div class=" p-3">
                <h1 class="text-2xl font-bold text-white">Welcome Back &#128075;</h1>
                <h1 class="text-[#c4c4c4] font-medium">Comrade, you've been <br />
                    <span>missed</span>
                </h1>
            </div>
            <form @submit.prevent="submitHandler" class="p-4">
                <stack class="mx-auto" :gap="1">
                    <h2 class="font-bold text-2xl text-center text-white">Log In</h2>
                    <v-input type="email" placeholder="Enter email addresss" full styleType="white" class="text-xl rounded-lg mb-3" size="small" :value="formReactive.email">
                    </v-input>
                    <v-input type="password" placeholder="Enter Password" full styleType="white" class="text-xl rounded-lg mb-3" size="small" iconClick :value="formReactive.password"></v-input>
                    <v-button full type="pry" class="bg-[#F9B700]" :loading="loading">Log In</v-button>
                </stack>
            </form>
        </div>
        <div class="text-center text-[#c4c4c4] my-5 md:my-8 font-ibmplex">
            <p>
                Don't have an account?<span class="opacity-70 underline-none text-xl ml-1">
                    <router-link to="/signup">Signup</router-link>
                </span>
            </p>
        </div>

</layer-bg>
    </div>

</template>

<script setup>
    import LayerBg from '../../components/UI/layer-bg.vue'
    import VDropDown from '../../components/forms/v-drop-down.vue'
    import CorepLogoNotext from '../../components/svgs/corep-logo-notext.vue'
    import ToastText from "../../components/UI/toast-text.vue";
    import '@/assets/css/tailwind.css'
    import Loadingicon from "../../components/svgs/loader-icon.vue";
    import VButton from "../../components/forms/v-button.vue";
    import Stack from "../../components/UI/stack.vue";
    import UnionSvg from "../../components/svgs/union-svg.vue";
    import CircleExclude from "../../components/svgs/circle-exclude.vue";
    import VInput from "../../components/forms/v-input.vue";
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