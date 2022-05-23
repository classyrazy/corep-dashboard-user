<template>
    <div class="w-full">
        <div class="upper flex justify-between px-6 dark:border-b-db-white-dark border-b-2 ">
            <ul class="tabs_header flex items-center w-full max-w-2xl overflow-x-auto" ref="tabWrapper">
                <li class="tab-titles  mx-4 w-full border-b-sec  whitespace-nowrap hover:bg-db-white-dark px-2 mb-1"
                    v-for="obj in computedSlotArr" :key="obj.title" :class="obj.isActive ? 'active' : ''"
                    @click.native="handleTabTitleClick($event, obj)">
                    <button :id="obj.title">{{ obj.title }}</button>
                </li>
            </ul>
            <h2 class="">Hellohsjdgj.kfhdfdkhbjhvflkvnfkjvhfjkhfjfbljggjhgkhjgkghghgkglhgg;hk</h2>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

let slots = useSlots()
let slotsArr = reactive(slots.default().map(slot => slot.props.title))

let titleArray = []
let computedSlotArr = computed(() => {
    slotsArr.forEach(element => {
        let titleObj = {
            title: element,
            isActive: false
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
let selectedTitle = ref(computedSlotArr.value[0].title)
computedSlotArr.value.forEach(element => {
    if (element.title === selectedTitle.value) {
        element.isActive = true
    }
});
let tabWrapper = ref(null)
function handleTabTitleClick(e, selectObj) {
    selectedTitle.value = selectObj.title
    computedSlotArr.value.forEach(element => {
        element.isActive = false
        if (element.title === selectObj.title) {
            element.isActive = true
        }
    });
    console.log(computedSlotArr.value)
}


provide('tabs', {
    title: selectedTitle,
})

</script>

<style scoped>
.tab-titles {
    display: inline-block;
    position: relative;
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
    transition: transform .4s ease-out;
}

.tabs_header::-webkit-scrollbar {
    background-color: transparent;
    width: 0.375rem !important;
    height: 0.375rem !important;
}

.tabs_header::-webkit-scrollbar-thumb {
    background-color: rgb(100 116 139/.5) !important;
    opacity: 1 !important;
    border-radius: 50px;
}

.tabs_header::-webkit-scrollbar-track {
    background-color: rgb(100 116 139/.16) !important;
    border-radius: 50px !important;
}
</style>