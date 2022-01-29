<template>
  <div
    class="bg-pry-dark h-screen relative overflow-x-hidden px-4 grid justify-center items-center md:block md:px-0 m-auto w-full"
  >
    <div
      class="fixed -top-[7rem] -right-[7rem] md:-top-[7rem] md:-right-[8rem]"
    >
      <circle-exclude
        :size="250"
        class="relative max-w-[200px] md:max-w-[250px]"
      ></circle-exclude>
    </div>
    <div class="fixed -top-[5rem] -left-[8rem] md:-top-[3rem] md:-left-[7rem]">
      <union-svg
        :size="250"
        class="relative max-w-[200px] md:max-w-[250px]"
      ></union-svg>
    </div>
    <div class="">
      <div class="w-full mb-4">
        <img
          src="../assets/corep-logo-white.png"
          alt=""
          class="mx-auto max-w-[15rem] mt-10"
        />
      </div>
      <div
        class="bg-white max-w-[500px] md:max-w-[600px] m-auto rounded-xl py-6 px-4 font-ibmplex"
      >
        <form @submit.prevent="submitHandler">
          <stack class="max-w-[500px] mx-auto" :gap="1">
            <h2 class="font-bold text-4xl">Login to your account</h2>
            <v-input
              type="email"
              placeholder="Enter Email Address"
              full
              styleType="white"
              label="Email Address"
              :value="formReactive.email"
            ></v-input>
            <v-input
              type="password"
              placeholder="Enter Password"
              full
              styleType="white"
              label="Password"
              iconClick
              :value="formReactive.password"
            ></v-input>
            <v-button full type="pry" :loading="loading">Login</v-button>
          </stack>
        </form>
      </div>
    </div>
    <div class="text-center text-white m-0 md:my-8 font-ibmplex">
      <p>
        Don't have an account?<span class="opacity-70 underline ml-1"
          ><a href="/signup">Signup</a></span
        >
      </p>
    </div>
    <div
      class="fixed -bottom-[7rem] -left-[7rem] md:-bottom-[7rem] md:-left-[8rem]"
    >
      <circle-exclude
        :size="250"
        class="relative max-w-[200px] md:max-w-[250px]"
      ></circle-exclude>
    </div>
    <div
      class="fixed -bottom-[5rem] -right-[7rem] md:-bottom-[3rem] md:-right-[7rem]"
    >
      <union-svg
        :size="250"
        class="relative max-w-[200px] md:max-w-[250px]"
      ></union-svg>
    </div>
  </div>
</template>

<script setup>
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
import useFormRequest from "../composables/useFormRequest.js";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import ToastText from "../components/UI/toast-text.vue";
let router = useRouter()

let formReactive = reactive({
  email: {
    value: null,
    error: null,
  },
  password: {
    value: null,
    error: null,
  },
});

let validate = () => {
if (formReactive.email.value == null) {
  formReactive.email.error = "Email is required";
}else if(!formReactive.email.value.includes("@")) {
  formReactive.email.error = "Email must be a valid email address";
}
else {
  formReactive.email.error = false;
}
if (formReactive.password.value == null) {
  formReactive.password.error = "Password is required";
}else if(formReactive.password.value.length < 6) {
  formReactive.password.error = "Password must be at least 6 characters";
}
else {
  formReactive.password.error = false;
}
if (formReactive.email.error == false && formReactive.password.error == false) {
  return true;
}
return false;
}

let { submitForm, form, loading } = useFormRequest(
  formReactive,
  "https://corep-mock-node.herokuapp.com/api/login",
  (data) => {
    if (data.correct) {
      router.push("/");
    }else{
      createToast(withProps(ToastText, {text:"Wahala occured while logging in"}), {
        showIcon: "true",
        swipeClose: "true",
        type: "danger",
        transition: "bounce",
        position: "bottom-center"
      });
    }
  }
);
let submitHandler = () => {
  validate();

  if(validate()){
    submitForm()
  }
};
</script>

<style scoped></style>
