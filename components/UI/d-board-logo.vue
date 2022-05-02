<template>
    <div class="flex max-w-[200px] items-center">
        <corep-logo-notext :size="40" :bg-color="darkMode? '#3B3F4D': '#EEEEEE'" :text-color="darkMode? '#fff': '#212939'"></corep-logo-notext>
        <div class="relative mt-2 ml-2">
            <corep-logo-text :size="100" :text-color="darkMode? '#fff': '#212939'"></corep-logo-text>
            <div class="absolute right-[-25px] top-[-10px]">
                <span class="bg-pry text-[10px] text-white px-1 rounded-md">Unilag</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CorepLogoText from '../svgs/corep-logo-text.vue'
import CorepLogoNotext from '../svgs/corep-logo-notext.vue'
import { useUserStore } from '../../store/user'
let store = useUserStore()
let darkMode = computed(() => store.darkMode)
</script>

<style scoped>

</style>