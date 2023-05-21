
<template>
	<div>
		<span v-for="(tab, idx) in (tabs as string[])" :key="tab" :class="['tab-item', tbHeaderItemStyle, idx==selectedIndex ? 'tab-active' :''] " @click="onClick(idx)" tabindex="1" @keydown.enter="onClick(idx)">{{ tab }}</span>
	</div>
</template>

<script setup lang="ts">

interface Props {
    tabs: string[],
    tbHeaderItemStyle: string,
}

const props = defineProps<Props>()

let selectedIndex = ref(0)

const emit = defineEmits(['changed'])

const onClick = (idx: number) => {
    selectedIndex.value = idx
    emit('changed', selectedIndex.value)
}
</script>

<style scoped lang="scss">

</style>
