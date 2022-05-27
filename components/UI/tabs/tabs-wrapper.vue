<template>
    <div class="w-full" :class="darkMode ? 'dark' : ''">
        <div class="upper flex justify-between px-4 dark:border-b-db-white-dark border-b-2 ">
            <ul class="tabs_header  items-center w-full max-w-2xl overflow-x-auto" ref="tabWrapper">
                <li class="tab-titles w-min dark:text-white mx-4 border-b-sec rounded-md whitespace-nowrap  dark:hover:bg-db-pry-dark hover:bg-db-white-dark px-3 py-1 mb-1"
                    v-for="obj in computedSlotArr" :key="obj.title" :class="obj.isActive ? 'active' : ''"
                    @click="handleTabTitleClick($event, obj)">
                    <button :id="obj.title">{{ obj.title }}</button>
                </li>
            </ul>
            <div class="search_input_con">
                <v-input placeholder="Search Courses" class="text-sm rounded-lg dark:bg-db-pry-dark dark:text-white"
                    type="text" size="small" :icon="SearchIcon" :icon-color="darkMode ? '#ffff' : '#212939'" iconLeft
                    full styleType="modal-search"></v-input>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import SearchIcon from '../../icons/search-icon.vue'
import VInput from '../../forms/v-input.vue'

interface Props {
    darkMode: boolean
}

let props = withDefaults(defineProps<Props>(), {});

let slots = useSlots()
// onMounted(() => {
//     console.log("mounted blajjjjjj", slots.default()[0].children.forEach(el => {
//         console.log(el.props.title)
//     }))
// })
let slotsArr = reactive(slots.default()[0].children.map(slot => {
    return {
        title: slot.props.title,
        id: slot.props.key,
    }
}))
console.log(slots.default()[0].children)
let titleArray = []
const emit = defineEmits(['chosenFaculty'])
let computedSlotArr = computed(() => {
    slotsArr.forEach(element => {
        let titleObj = {
            title: element.title,
            id: element.id,
            isActive: false,
        }
        titleArray.push(reactive(titleObj))
        // if (element === slots.default()[0].props.title) {
        //     titleObj.isActive = true
        // }
    });
    return titleArray
})
console.log(computedSlotArr.value)

// function scrollIfNeeded(el) {
//     const elLeft = el.offsetLeft + el.offsetWidth;
//     const elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

//     // check if element not in view
//     if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
//         el.parentNode.scrollLeft = elLeft - elParentLeft;
//     } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
//         el.parentNode.scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;
//     }
// }
// function scrollLft(outsider, elOffset) {
//     //   outsider.scrollBy({
//     //     left: 200,
//     //     behavior: 'smooth'
//     //   });
//     elOffset.scrollIntoView({
//         behavior: 'smooth',
//         block: 'center',
//         inline: 'start'
//     });
//     console.log(elOffset.parentNode.parentNode.offsetX)
// }

// function scrollThisShit(target, outer) {
//     var out = outer;
//     var tar = target;
//     var x = out.width();
//     var y = tar.outerWidth(true);
//     var z = tar.index();
//     var q = 0;
//     var m = out.find('li');
//     //Just need to add up the width of all the elements before our target. 
//     for (var i = 0; i < z; i++) {
//         q += m[i].outerWidth(true);
//     }
//     out.scrollLeft(Math.max(0, q - (x - y) / 2));
//     // el.target.parentNode.scrollLeft = el.target.offsetLeft;

// }
let selectedTitle = ref({
    title: computedSlotArr.value[0].title,
    id: computedSlotArr.value[0].id,
})
emit('chosenFaculty', selectedTitle.value.id)

computedSlotArr.value.forEach(element => {
    if (element.title === selectedTitle.value.title) {
        element.isActive = true
    }
});
let tabWrapper = ref(null)

function handleTabTitleClick(e, selectObj) {
    selectedTitle.value = selectObj
    computedSlotArr.value.forEach(element => {
        element.isActive = false
        if (element.title === selectObj.title) {
            element.isActive = true
        }
    });
    console.log("Emittting value")
    emit('chosenFaculty', selectedTitle.value.id)
    console.log(computedSlotArr.value)
    console.log(selectedTitle.value)
}
// watchEffect(() => {
//     // if (selectedTitle.value.title === props.title) {
//         console.log("Emittting value")
//         emit('chosenFaculty',selectedTitle.value.id)
//     // }
// })

console.log(selectedTitle)
provide('tabs', selectedTitle)

let colors = {
    scrollthumb: props.darkMode ? '#BBB9B6' : 'rgb(100 116 139/.5)',
    scrollbar: props.darkMode ? '#212939' : 'transparent',
}
</script>

<style scoped>
.tab-titles {
    display: inline-block;
    position: relative;
    transition: all .4s ease-in;
    /* transform: scaleX(0); */
    /* margin: auto; */
}

.tab-titles.active::after {
    content: "";
    position: absolute;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    height: 3px;
    bottom: -3px;
    transform: scaleX(1);
    left: 0;
    background: #f9b700;
    /* transition: all .4s ease-out; */
}

.tabs_header {
    display: grid;
    grid-auto-flow: column;
    display: flex;
    grid-auto-columns: 23%;
}

.tabs_header::-webkit-scrollbar {
    background-color: transparent;
    width: 0.375rem !important;
    height: 0.375rem !important;
}

.tabs_header::-webkit-scrollbar-thumb {
    background-color: v-bind(colors.scrollthumb) !important;
    opacity: 1 !important;
    border-radius: 50px;
}

.tabs_header::-webkit-scrollbar-track {
    background-color: rgb(100 116 139/.16) !important;
    border-radius: 50px !important;
}
</style>