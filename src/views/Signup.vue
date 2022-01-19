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
        <form action="">
          <stack class="max-w-[500px] mx-auto" :gap="1">
            <h2 class="font-bold text-4xl">Create your account</h2>
            <v-input
              placeholder="Enter full name"
              full
              styleType="white"
              label="Full Name"
            ></v-input>
            <v-input
              type="email"
              placeholder="Enter Email Address"
              full
              styleType="white"
              label="Email Address"
            ></v-input>
            <v-input
              placeholder="Enter Phone Number"
              full
              styleType="white"
              label="Phone Number"
            ></v-input>
            <v-input
              type="password"
              placeholder="Enter Password"
              full
              styleType="white"
              label="Password"
              iconClick
            ></v-input>
            <v-input
              type="password"
              placeholder="Enter Password"
              full
              styleType="white"
              label="Confirm Password"
              iconClick
            ></v-input>
            <label for="termsAgreement">
              <input type="checkbox" id="termsAgreement" />
              To register with us please tick to agree to our <br /><a href="#"
                ><span class="text-pry">Terms and Conditions</span></a
              >
            </label>
            <v-button full type="pry-reverse">Register</v-button>
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
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
</script>

<style scoped></style>
