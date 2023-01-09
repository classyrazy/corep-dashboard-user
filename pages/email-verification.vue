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
         <div class="flex gap-4 justify-center">
         <a href="https://outlook.office.com/mail/" target="_blank" rel="noopener noreferrer"><v-button :icon="MicrosoftIcon"  type="sec" >Microsoft</v-button></a> 
          <a href="http://gmail.com" target="_blank" rel="noopener noreferrer"><v-button :icon="GmailIcon" type="sec" > Gmail</v-button></a>
         </div>
         <form  @submit.prevent="sendVerificationEmail">
          <v-button  type="border-sec" :loading="!Loading" full class="mt-4">Resend verification Email</v-button>
         </form>
        </div>
      </div>
    </layer-bg>
  </div>
</template>

<script setup lang="ts">
import DBoardLogo from '../components/UI/d-board-logo.vue'
import VButton from "../components/forms/v-button.vue";
import Loading from "../components/svgs/loader-icon.vue";
import Stack from "../components/UI/stack.vue";
import CorepLogoNotext from "../components/svgs/corep-logo-notext.vue";
import LayerBg from "../components/UI/layer-bg.vue";
import GmailIcon from "../components/icons/gmail-icon.vue";
import MicrosoftIcon from "../components/icons/microsoft-icon.vue";
import Graph from "../libs/avanda.ts"



async function sendVerificationEmail(){
  // let loading = Loading
  try {
      let req = new Graph().service("User/resendVerificationEmail");
      let user = await (await req.get()).getData();
      // console.log(user)
      alert("Email Verification Link Sent")
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style scoped></style>
