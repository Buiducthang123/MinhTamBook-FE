<template>
     <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup lang="ts">
onMounted(() => {
    console.log('The component is mounted')
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