<template>
    <!--Khám phá theo danh mục-->
    <div class="bg-white p-4">
        <h1 class="text-xl font-medium">Khám phá theo danh mục con</h1>
        <div class="px-10">
            <div class="mt-6 flex gap-20">
                <div v-for="item in route.path == '/' ? parentCategories : currentCategory?.children " :key="item.id" class="space-y-2 cursor-pointer"  @click="navigateTo('/category/' + (item.slug ? item.slug : item.id))">
                    <NuxtImg v-if="item.avatar" class="aspect-square rounded-full max-w-24 border"
                        :src="item.avatar" />
                    
                    <NuxtImg v-else class="aspect-square rounded-full max-w-24 border"
                        src="https://via.placeholder.com/150" />
                    <h6 class="font-medium text-center">{{ item.name }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute();

const categoryStore = useCategoryStore();

const categories = computed(() => categoryStore.categories);

const currentCategory = computed(() => {
    return categories.value?.find(cate => cate.slug === route.params.slug || cate.id.toString() === route.params.slug);
});

const parentCategories = computed(() => categories.value?.filter(cate => cate.level === 0));
</script>

<style scoped></style>