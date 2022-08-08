<template>
    <div class="flex max-w-[200px] items-center">
        <corep-logo-notext :size="40" :bg-color="darkMode? '#3B3F4D': '#EEEEEE'" :text-color="darkMode? '#fff': '#212939'"></corep-logo-notext>
        <div class="relative lg:mt-2 lg:ml-2 lg:block" :class="!showLogoText
        ?'hidden':''">
            <corep-logo-text :size="100" :text-color="darkMode? '#fff': '#212939'"></corep-logo-text>
            <div class="absolute super-logo-text">
                <span class="bg-pry text-[10px] text-white px-1 rounded-md" v-if="user">{{user.school.short_name}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CorepLogoText from '../svgs/corep-logo-text.vue'
import CorepLogoNotext from '../svgs/corep-logo-notext.vue'
import { useUserStore } from '../../store/user'
interface Props{
    darkMode: boolean
    showLogoText: boolean
}

let props = withDefaults(defineProps<Props>(), {
    darkMode: false,
    showLogoText: false
});
let store = useUserStore()
let darkMode = computed(() =>{
    if(props.darkMode){
        return props.darkMode
    }
    return store.darkMode

})
let user = computed(() => store.user)

</script>

<style scoped>
.super-logo-text{
    top: -10px;
    right: -19px;
    max-width: min-content;
}

</style>