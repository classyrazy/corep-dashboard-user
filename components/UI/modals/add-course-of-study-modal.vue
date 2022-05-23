<template>
    <div class="min-h-[600px]" :class="darkMode? 'dark':''">
        <div class="upper">
            <div class="name-close_btn p-6  flex justify-between items-center dark:text-white">
                <h1 class="font-semibold text-2xl text-center">Choose course of study</h1>
                <div class="close_btn dark:border-db-white-dark border-2 w-10 h-10 flex justify-center cursor-pointer items-center rounded-md">
                    <close-icon :text-color="darkMode? 'white':'black'"></close-icon>
                </div>
            </div>
            <div class="bg-sec w-full h-[1px]"></div>
        </div>
        <div class="courses-part mt-4">
            <tabs-wrapper>
                <tab title="Tab-1">Hello from tab 1</tab>
                <tab title="Tab-2">Hello from tab 2</tab>
                <tab title="Tab-3">Hello from tab 3</tab>
                
            </tabs-wrapper>
        </div>
    </div>
</template>

<script setup lang="ts">
import Tab from '../tabs/tab.vue'
import TabsWrapper from '../tabs/tabs-wrapper.vue'
import CloseIcon from '../../icons/close-icon.vue'

interface Props {
    darkMode: boolean
}

let props = defineProps<Props>();
onMounted(() => {
    console.log('mounted')
})

</script>

<style scoped>

</style>