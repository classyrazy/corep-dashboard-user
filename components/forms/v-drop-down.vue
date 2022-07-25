<template>
    <div class="dropdown-container mx-auto relative" v-click-outside="closeDropDown" tabindex="0"
        @keydown.enter="handleDropdown()" @keydown.esc="closeDropDown()">
        <div class="dropdown-toggle click-dropdown flex justify-between border-gray-100 border-2 rounded-lg p-2 cursor-pointer"
            @click="handleDropdown()" :class="error ? 'border-red-100' : ''">
            <p class="truncate">{{ refLabel }}</p>
            <down-icon></down-icon>
        </div>
        <div class="absolute top-12 w-full z-10">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white "
                :class="computedDropState ? 'block' : 'hidden'">
                <v-input size="x-small" style-type="white" :placeholder="placeholder" full :value="searchValue"
                    class="mt-2 border-0 border-b-2 rounded-none" @input="searchDropdown()"></v-input>
                <ul class="">
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                        @click="chooseFromDropDown($event, item.id)" v-if="computedRefData"
                        v-for="(item, idx) in computedRefData" :key="idx" tabindex="0"
                        @focusout="closeDropDownAfterLastChild(idx, computedRefData.length)"
                        @keydown.enter="chooseFromDropDown($event, item.id)">
                        ({{ item.short_name.toUpperCase() }}) {{ item.full_name }}</li>
                </ul>
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
    error: boolean,

}
let props = withDefaults(defineProps<DropDownProps>(), {
    loading: false,
    placeholder: "Search",
    label: "Choose one",
    dropState: false
})
let refDropState = ref(false)
let computedDropState = computed(() => refDropState.value)


function handleDropdown() {
    console.log(refDropState.value)
    refDropState.value = !refDropState.value
}
let searchValue = reactive({
    value: null,
    error: null
})
function closeDropDown() {
    // if (refDropState.value === true) {
    // console.log("close")
    refDropState.value = false
    searchValue.value = null
    // }
    // else {
    //     return
    // }
}
function closeDropDownAfterLastChild(idx, length) {
    console.log(idx, length)
    if (idx === length - 1) {
        closeDropDown()
    }
}
let refLabel = ref(props.label)
const emit = defineEmits(['chosen'])

function chooseFromDropDown(curentChose, chosenId) {
    // console.log(curentChose.target.innerHTML)
    refLabel.value = curentChose.target.innerHTML
    setTimeout(() => {
        closeDropDown()
    }, 100)
    emit('chosen', chosenId)

}
let refData = unref(props.data)
let computedRefData = computed(() => {
    if (searchValue.value) {
        return refData.filter(item => item.short_name.toLowerCase().includes(searchValue.value.toLowerCase()))
    } else {
        return refData
    }
})
console.log(refData)

function searchDropdown() {
    console.log(searchValue.value)
}
function clearSearchValue() {
    searchValue.value = null
}
</script>

<style scoped>
</style>