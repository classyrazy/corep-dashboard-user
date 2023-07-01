<template>
    <div>
        <CoreAlert />
        <NuxtLoadingIndicator color="#F9B700" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
    loading.value = true;
    console.log({ loading: loading.value }, "start")

});
nuxtApp.hook("page:finish", () => {
    loading.value = false;
    console.log({ loading: loading.value }, "fininsh")
});
</script>