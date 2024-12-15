<template>
    <NuxtPage/>    
</template>

<script setup lang="ts">

onMounted(async() => {
const authStore = useAuthStore();
const { setUser } = authStore;
const accessToken = useCookie('access_token');
if (accessToken) {
    await $fetch('user-me', {
        method: 'GET',
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        },
        onResponse: ({ response }) => {
            if (response.ok) {
                setUser(response._data);
            }
            else {
                accessToken.value = null
            }
        }
    })

}
})

useHead({
    title: 'Minh Tâm Book',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'This is my amazing site, let me tell you all about it.' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/icon-logo.png' },
    ]
})
</script>

<style scoped>

</style>