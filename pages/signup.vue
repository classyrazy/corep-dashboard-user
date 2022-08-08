<template>
    <layer-bg class="bg-pry-dark h-screen block my-auto overflow-x-hidden px-4 center-middle  md:px-0">
        <div class="w-full ">
            <div class="bg-white rounded-xl mt-10 pt-2 mx-auto max-w-md font-inter w-full">
                <div class="w-full">
                    <corep-logo-notext size="40" class=" mx-auto justify-center"></corep-logo-notext>
                    <div class="w-full h-[1px] bg-[#F9B700] mt-4"></div>
                </div>
                <form @submit.prevent="submitHandler" class="p-4">
                    <stack class="mx-auto" :gap="1">
                        <h2 class="font-bold text-2xl text-center">Sign Up</h2>
                        <v-input placeholder="Classydev" class="text-sm rounded-lg" type="text" size="small" full
                            styleType="white" label="Username" :value="formReactive.username"></v-input>
                        <v-drop-down class="w-full text-sm" label="Select your school" placeholder="Search for school"
                            :data="schools" v-if="schools" @chosen="setSchool" :error="formReactive.id.error">
                        </v-drop-down>
                        <v-input type="text" placeholder="Enter School Email addresss" full styleType="white"
                            class="text-sm rounded-lg" size="small" label="Email Address" :value="formReactive.email">
                        </v-input>
                        <k-dropdown class="w-full text-sm" :label="levelDropDownLabel" placeholder="Search for school"
                            :drop-state="dropState2" :error="formReactive.level.error" @on-search="searchDropDown"
                            @on-dropdown-click="handleDropdown" @on-close-dropdown="closeDropDown">
                            <ul class="" v-if="levels">
                                <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                    @click="chooseFromDropDown($event, item.id)" v-for="(item, idx) in levels"
                                    tabindex="0" :key="idx"
                                    @focusout="closeDropDownAfterLastChild(idx, computedRefData.length)"
                                    @keydown.enter="chooseFromDropDown($event, item.id)">
                                    ({{ item.name }} level) - {{ item.year }} year</li>
                            </ul>
                            <p v-else>Loading ...</p>
                        </k-dropdown>
                        <v-input type="password" placeholder="Enter Password" full styleType="white"
                            class="text-sm rounded-lg" size="small" label="Password" iconClick
                            :value="formReactive.password"></v-input>
                        <v-button full type="pry" :loading="loading">Sign Up</v-button>
                        <h3 class="text-sm text-center">By signing up, you agree to our <router-link to="#"><span
                                    class="text-pry">Terms
                                    and Conditions</span></router-link>
                        </h3>
                    </stack>
                </form>
            </div>
        </div>
        <div class="text-center text-white my-5 md:my-8 font-ibmplex">
            <p>
                Already have account?<span class="opacity-70 underline ml-1">
                    <router-link to="/login">login</router-link>
                </span>
            </p>
        </div>
    </layer-bg>
</template>

<script setup lang="ts">
import LayerBg from '../components/UI/layer-bg.vue'
import KDropdown from '../components/forms/k-dropdown.vue'
import VDropDown from '../components/forms/v-drop-down.vue'
import CorepLogoNotext from '../components/svgs/corep-logo-notext.vue'
import ToastText from "../components/UI/toast-text.vue";
import '@/assets/css/tailwind.css'
import Loading from "../components/svgs/loader-icon.vue";
import VButton from "../components/forms/v-button.vue";
import Stack from "../components/UI/stack.vue";
import UnionSvg from "../components/svgs/union-svg.vue";
import CircleExclude from "../components/svgs/circle-exclude.vue";
import VInput from "../components/forms/v-input.vue";
import { useRouter } from "vue-router";
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import Graph from "../libs/avanda.ts"
import useFormRequest from '../composables/useFormRequest';

let router = useRouter();
let schools = ref(null)
let dropState = ref(false)
let dropState2 = ref(false)
let searchValue = ref(null)
let levelDropDownLabel = ref("Select your Level")
let levels = ref(null)
let initialFormData = ref(null)
let formReactive = reactive({
    username: {
        value: null,
        error: null,
    },
    email: {
        value: null,
        error: null,
    },
    password: {
        value: null,
        error: null,
    },
    id: {
        value: null,
        error: null
    },
    level: {
        value: null,
        error: null
    }
});

let availableLevels = [
    {
        id: 1,
        name: 100,
        year: '1st',
    }
    ,
    {
        id: 2,
        name: 200,
        year: '2nd',
    }
    ,
    {
        id: 3,
        name: 300,
        year: '3rd',
    }
    ,
    {
        id: 4,
        name: 400,
        year: '4th',
    }
    ,
    {
        id: 5,
        name: 500,
        year: '5th',
    }
]
function handleDropdown() {
    console.log(dropState2.value)
    dropState.value = false
    dropState2.value = !dropState2.value
}
function searchDropDown(searchText: string) {
    searchValue.value = searchText
}
let computedRefData = computed(() => {
    return availableLevels
})
function closeDropDown() {
    dropState.value = false
    dropState2.value = false
    searchValue.value = null

}
function chooseFromDropDown(curentChose, chosenId: number) {
    console.log(curentChose.target.innerHTML)
    levelDropDownLabel.value = curentChose.target.innerHTML
    formReactive.level.value = chosenId
    formReactive.level.error = null
    setTimeout(() => {
        closeDropDown()
    }, 100)
    console.log(levelDropDownLabel.value)
}
function closeDropDownAfterLastChild(idx, length) {
    console.log(idx, length)
    if (idx === length - 1) {
        closeDropDown()
    }
}
let validate = () => {
    if (formReactive.username.value == null || formReactive.username.value.trim() == "") {
        formReactive.username.error = "Full Name is required";
    }
    else if (formReactive.username.value.trim().length < 3) {
        formReactive.username.error = "Full Name must be at least 3 characters";
    }
    else {
        formReactive.username.error = null;
    }
    if (formReactive.email.value == null || formReactive.email.value.trim() == "") {
        formReactive.email.error = "Email is required";
    }
    else {
        formReactive.email.error = null;
    }
    if (formReactive.id.value == null) {
        formReactive.id.error = true;
    }
    else {
        formReactive.id.error = null;
    }
    if (formReactive.level.value == null) {
        formReactive.level.error = true;
    }
    else {
        formReactive.level.error = null;
    }
    if (formReactive.password.value == null || formReactive.email.value.trim() == "") {
        formReactive.password.error = "Password is required";
    } else if (formReactive.password.value.trim().length < 6) {
        formReactive.password.error = "Password must be at least 6 characters";
    }
    else {
        formReactive.password.error = null;
    }
    if (formReactive.username.error == null && formReactive.email.error == null && formReactive.password.error == null && formReactive.id.error == null && formReactive.level.error == null) {
        return true;
    }
    return false;
}
async function requestSchools() {
    try {
        let req = new Graph().service('School/getAll').selectAll("id", "short_name", "full_name")
        let data = await (await req.get()).getData()
        schools.value = data
    } catch (error) {
        console.log(error)
    }
}
async function requestLevels() {
    try {
        let req = new Graph().service('Level/getAll').selectAll("id", "name", "year")
        let data = await (await req.get()).getData()
        levels.value = data
    } catch (error) {
        console.log(error)
    }
}
console.log({ schools }, { levels })
function setSchool(schoolChosen) {
    formReactive.id.value = schoolChosen
    formReactive.id.error = null
}


onMounted(() => {
    requestSchools()
    setTimeout(() => {
        requestLevels()
    }, 5000)
    console.log({ schools })

})

let { submitForm, form, loading, data } = useFormRequest(
    "User/signup",
    formReactive,
    null,
    (data) => {
        console.log(data);
        if (data) {
            if (process.client) {
                localStorage.setItem("session-token", data.token)
            }
            setTimeout(() => {
                router.push('/')
            }, 3000);
        }
    },
    (error) => {
        console.log(error);
        let errObj = error.getData()
        console.log(errObj);
        if (errObj) {
            Object.keys(errObj).forEach(key => {
                formReactive[key].error = errObj[key]
            });
            console.log({ errObj }, { formReactive });
            return
        }
        formReactive.email.error = error.getMsg()
    }
);
let submitHandler = () => {
    validate();
    console.log({ formReactive });

    if (validate()) {
        submitForm()
    }
};


</script>

<style scoped>
.center-middle {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.dropdown-container {}

.rotate-def {
    transform: rotate(180deg);
}

.bg-image {
    background-image: url("/sign-up-bg.svg");
    background-position: center;
    background-repeat: no-repeat;
}
</style>