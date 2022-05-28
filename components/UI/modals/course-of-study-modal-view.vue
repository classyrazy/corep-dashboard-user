<template>
    <div class="dark:border-db-white-dark border-[1px] min-w-[150px] mt-4 rounded-md px-4 py-2 font-inter cursor-pointer" :class="active? 'dark:border-sec border-sec':''">
        <div class="template-sub-department" v-if="parentDepartment">
            <h3 class="text-md font-semi-bold dark:text-white">{{ department }}</h3>
            <div class="mt-4">
                <h4 class="text-sm dark:text-db-white-darker">{{ faculty }}  ---> {{parentDepartment.name}} </h4>
            </div>
        </div>
        <div class="template-no-sub-dept" v-else>
            <h3 class="text-md dark:text-white font-semi-bold">{{ department }}</h3>
            <div class="mt-4">
                <h4 class="text-sm dark:text-db-white-dark">{{ faculty }}</h4>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type parent_departmentObj = {
    id: number,
    name: string
}
interface Props {
    department: string,
    faculty: string,
    parentDepartment?: parent_departmentObj,
    active: boolean
}

let props = defineProps<Props>();
</script>

<style scoped>
</style>