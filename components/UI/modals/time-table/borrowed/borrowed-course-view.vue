<template>
    <li class="dark:border-db-white-dark border min-w-[150px] rounded-md px-4 py-2 font-inter cursor-pointer list-none w-full :md:w-auto"
        :class="active ? 'dark:border-sec border-sec' : ''">
        <h3 class="text-md font-semi-bold dark:text-white">{{ optionalCode? `${code}/${optionalCode}`: code }}</h3>
        <h3 class="text-sm font-light dark:text-db-white-darker">{{title}}</h3>
        <div class="mt-4">
            <h4 class="text-sm dark:text-db-white-darker">{{facultyName}} {{parentDepartmentName? `---> ${parentDepartmentName}`: ''}}---> {{departmentName}} </h4>
        </div>
    </li>
</template>

<script setup lang="ts">
type parent_departmentObj = {
    id: number,
    name: string
}
interface Props {
    code: string,
    optionalCode?: string,
    title: string,
    facultyName: string,
    departmentName: string,
    parentDepartmentName?: string
    active?: boolean
}

let props = defineProps<Props>();
</script>

<style scoped></style>