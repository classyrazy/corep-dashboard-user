<template>
  <div>
    <layer-bg class="fixed md:relative bg-pry-dark min-h-screen h-full block my-auto overflow-x-hidden px-4 md:px-0">
      <div class=" rounded-xl mt-10 pt-2 max-w-md mx-auto font-inter px-4 overflow-hidden">
        <div class="my-4">
          <d-board-logo dark-mode showLogoText></d-board-logo>
        </div>
        <img src="/email-veriff-image.png" class="rounded-lg"/>
        <div class="my-4">
          <h2 class="md:text-xl text-white">Verify your school Email</h2>
          <p class="text-db-white-light my-4">Hi, Olix! Use the link in your microsoft account to verify your email and start enjoying corep.</p>
          <v-button type="sec" full>Go to Email App</v-button>
          <v-button type="border-sec" full class="mt-4">Resend verification Email</v-button>
        </div>
      </div>
    </layer-bg>
  </div>
</template>

<script setup lang="ts">
import DBoardLogo from '../components/UI/d-board-logo.vue'
import VButton from "../components/forms/v-button.vue";
import VInput from "../components/forms/v-input.vue";
import Stack from "../components/UI/stack.vue";
import CorepLogoNotext from "../components/svgs/corep-logo-notext.vue";
import LayerBg from "../components/UI/layer-bg.vue";
</script>

<style scoped></style>
