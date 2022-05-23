<template>
    <div v-if="showTab">
        {{selectedTitle.title}}
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

interface Props {
    title: string
}
let props = defineProps<Props>();
console.log(props.title)


let selectedTitle = inject('tabs')
let showTab = computed(() => {
    return selectedTitle.title.value === props.title
})
console.log(selectedTitle.title.value)
console.log(selectedTitle.title.value === props.title)

console.log(unref(selectedTitle.title))


</script>

<style scoped>

</style>