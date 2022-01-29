<template>
  <div
    class="bg-pry h-screen relative overflow-x-hidden px-4 grid md:block justify-center items-center md:px-0 m-auto w-full"
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
        <!-- <loading color="black"></loading> -->
        <form @submit.prevent="submitHandler">
          <stack class="max-w-[500px] mx-auto" :gap="1">
            <h2 class="font-bold text-4xl">Create your account</h2>
            <v-input
              placeholder="Enter full name"
              type="text"
              full
              styleType="white"
              label="Full Name"
              :value="formReactive.fullName"
            ></v-input>
            <v-input
              type="email"
              placeholder="Enter Email Address"
              full
              styleType="white"
              label="Email Address"
              :value="formReactive.email"
            ></v-input>
            <v-input
              placeholder="Enter Phone Number"
              full
              styleType="white"
              label="Phone Number"
              :value="formReactive.phoneNumber"
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
            <v-input
              type="password"
              placeholder="Enter Password"
              full
              styleType="white"
              label="Confirm Password"
              iconClick
              :value="formReactive.confirmPassword"
            ></v-input>
            <label for="termsAgreement">
              <input
                type="checkbox"
                id="termsAgreement"
                v-model="formReactive.agreement"
              />
              To register with us please tick to agree to our <br /><a href="#"
                ><span class="text-pry">Terms and Conditions</span></a
              >
            </label>
              <p v-if="!formReactive.agreement.value" class="text-xs text-red-600 m-0">{{formReactive.agreement.error}}</p>
            <v-button full type="pry-reverse" :loading="loading"
              >Register</v-button
            >
          </stack>
        </form>
      </div>
    </div>
    <div class="text-center text-white my-5 md:my-8 font-ibmplex">
      <p>
        Already have account?<span class="opacity-70 underline"
          ><a href="/">login</a></span
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
import ToastText from "../components/UI/toast-text.vue";
import Loading from "../components/svgs/loader-icon.vue";
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
import { computed } from "vue";
import { reactive } from "@vue/reactivity";
import useFormRequest from "../composables/useFormRequest.js";
import { useRouter } from "vue-router";
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
let router = useRouter();
let formReactive = reactive({
  fullName: {
    value: null,
    error: null,
  },
  email: {
    value: null,
    error: null,
  },
  phoneNumber: {
    value: null,
    error: null,
  },
  password: {
    value: null,
    error: null,
  },
  confirmPassword: {
    value: null,
    error: null,
  },
  agreement: {
    value: false,
    error: null,
  },
});
let validate = () => {
if (formReactive.fullName.value == null) {
  formReactive.fullName.error = "Full Name is required";
}
else if(formReactive.fullName.value.length < 3) {
  formReactive.fullName.error = "Full Name must be at least 3 characters";
}
else {
  formReactive.fullName.error = false;
}
if (formReactive.email.value == null) {
  formReactive.email.error = "Email is required";
}else if(!formReactive.email.value.includes("@")) {
  formReactive.email.error = "Email must be a valid email address";
}
else {
  formReactive.email.error = false;
}
if (formReactive.phoneNumber.value == null) {
  formReactive.phoneNumber.error = "Phone Number is required";
}else if(formReactive.phoneNumber.value.match(/[0-9]/g).length < 10) {
  formReactive.phoneNumber.error = "Phone Number must be a valid phone number";
}
else {
  formReactive.phoneNumber.error = false;
}
if (formReactive.password.value == null) {
  formReactive.password.error = "Password is required";
}else if(formReactive.password.value.length < 6) {
  formReactive.password.error = "Password must be at least 6 characters";
}
else {
  formReactive.password.error = false;
}
if (formReactive.confirmPassword.value == null) {
  formReactive.confirmPassword.error = "Confirm Password is required";
}else if(formReactive.confirmPassword.value !== formReactive.password.value) {
  formReactive.confirmPassword.error = "Confirm Password must match Password";
}
else {
  formReactive.confirmPassword.error = false;
}
if(formReactive.agreement.value == false) {
  formReactive.agreement.error = "Agreement must be checked";
  return
}
if (formReactive.fullName.error == false && formReactive.email.error == false && formReactive.phoneNumber.error == false && formReactive.password.error == false && formReactive.confirmPassword.error == false) {
  return true;
}
return false;
}



let { submitForm, form, loading, data } = useFormRequest(
  formReactive,
  "https://corep-mock-node.herokuapp.com/api/signup",
  (data) => {
    console.log(data);
    if (data.created) {
      console.log(data);
      createToast(
        withProps(ToastText, { text: "Successfully login redirecting..." }),
        {
          showIcon: "true",
          swipeClose: "true",
          type: "success",
          transition: "bounce",
          position: "bottom-center",
          timeout: 1000,
        }
      );
      router.push("/login");
    } else {
      createToast(
        withProps(ToastText, { text: "Wahala occured while registering" }),
        {
          showIcon: "true",
          swipeClose: "true",
          type: "danger",
          transition: "bounce",
          position: "bottom-center",
        }
      );
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
