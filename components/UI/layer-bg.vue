<template>
  <div class="absolute z-30 overflow-x-hidden">
    <div
      class="fixed -z-10 -top-[3rem] -right-[4rem] md:-top-[3rem] md:-right-[5rem]"
    >
      <union-svg
        :size="200"
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></union-svg>
    </div>
    <div
      class="fixed -z-10 w-8 h-8 top-[200px] right-[100px] md:top-[300px] md:right-[16rem] md:w-20 md:h-20"
    >
      <circle-exclude
        :size="100"
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></circle-exclude>
    </div>
    <div class="fixed -z-10 -top-[5rem] -left-[3rem] md:-top-[3rem] md:-left-[3rem]">
      <rec-exclude
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></rec-exclude>
    </div>
    <div class="relative z-10 jus w-full">
      <!-- h-screen grid justify-center items-center m-auto text-center -->
      <div :class="storeData.darkMode? 'dark':''">
        <slot class></slot>
      </div>
    </div>

    <div class="fixed -z-10 center-element">
      <square-exclude-svg
      bg-color="#333C48"
        class="relative w-24 h-24 md:w-auto md:h-auto max-w-[150px] md:max-w-[250px]"
      ></square-exclude-svg>
    </div>
    <div
      class="fixed -z-10 -bottom-[3rem] -left-[4rem] md:-bottom-[7rem] md:-left-[8rem]"
    >
      <circle-exclude
        :size="250"
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></circle-exclude>
    </div>
    <div
      class="fixed -z-10 w-8 h-8 bottom-[200px] left-[50px] md:bottom-[9rem] md:left-[16rem] md:w-20 md:h-20"
    >
      <union-svg
        :size="100"
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></union-svg>
    </div>
    <div
      class="fixed -z-10 -bottom-[5rem] -right-[3rem] md:bottom-0 md:-right-[3rem] -rotate-180"
    >
      <rec-exclude
        bg-color="#333C48"
        class="relative max-w-[150px] md:max-w-[250px]"
      ></rec-exclude>
    </div>
  </div>
</template>

<script setup lang="ts">
import SquareExcludeSvg from "../svgs/square-exclude-svg.vue";
import RecExclude from "../svgs/rec-exclude.vue";
import UnionSvg from "../svgs/union-svg.vue";
import CircleExclude from "../svgs/circle-exclude.vue";

import { useUserStore } from "../../store/user";

let storeData = useUserStore();
storeData.setUserTheme();
console.log(storeData.darkMode);
</script>

<style scoped>
.center-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
