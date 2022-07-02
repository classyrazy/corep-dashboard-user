<template>
    <div class="dropdown-container mx-auto relative" v-click-outside="closeDropDown">
        <div class="dropdown-toggle click-dropdown flex justify-between border-gray-100 border-2 rounded-lg p-2 cursor-pointer"
            @click="handleDropdown()" :class="error ? 'border-red-100' : ''">
            <p class="truncate">{{ label }}</p>
            <down-icon></down-icon>
        </div>
        <div class="absolute top-12 w-full z-10">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white "
                :class="dropState ? 'block' : 'hidden'">
                <v-input size="x-small" style-type="white" :placeholder="placeholder" full :value="searchValue"
                    class="mt-2 border-0 border-b-2 rounded-none" @input="searchDropdown()" v-if="showSearch"></v-input>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DownIcon from '../svgs/down-icon.vue'
import VInput from './v-input.vue'
interface DropDownProps {
    loading: boolean,
    data: string[],
    placeholder: string,
    label: string,
    dropState: boolean,
    showSearch: boolean,
    error: boolean,

}
let props = withDefaults(defineProps<DropDownProps>(), {
    loading: false,
    placeholder: "Search",
    label: "Choose one",
    dropState: false,
    showSearch: false
})
let refDropState = ref(false)

// function handleDropdown() {
//     console.log(refDropState.value)
//     refDropState.value = !refDropState.value
// }

let searchValue = reactive({
    value: null,
    error: null
})

let refLabel = ref(props.label)
const emit = defineEmits(['chosen','onSearch','onDropdownClick','onCloseDropdown'])
function handleDropdown() {
    // console.log(props.dropState)
    emit('onDropdownClick')
}
function closeDropDown() {
    if (props.dropState === true) {
        emit('onCloseDropdown')
        searchValue.value = null
    }
    else {
        return
    }
}

function searchDropdown() {
    console.log(searchValue.value)
    emit('onSearch', searchValue.value)

}
function clearSearchValue() {
    searchValue.value = null
}
</script>

<style scoped>
</style>