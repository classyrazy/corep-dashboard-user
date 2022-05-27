<template>
    <div v-if="showTab" class="">
        <slot :faculty-id="selectedTitle.id"></slot>
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
    return selectedTitle.value.title === props.title
})
// console.log(selectedTitle.title.value)
// console.log(selectedTitle.value === props.title)
// emit('chosenFaculty', selectedTitle.value.id)
// watch(() => selectedTitle.value.id, () => {
//     emit('chosenFaculty', selectedTitle.value.id)
// })

// watchEffect(() => {
//     // if (selectedTitle.value.title === props.title) {
//         console.log("Emittting value")
//         emit('chosenFaculty',selectedTitle.value.id)
//     // }
// })
console.log(selectedTitle.value)


</script>

<style scoped>
</style>