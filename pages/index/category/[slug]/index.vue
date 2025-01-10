<template>
    <section class="">
        <section>
            <PromotionalSlider />
        </section>

        <section class="">
            <ExploreCategory />
        </section>

        <section class="mt-10">
            <Filter :filter="bookQuery" />
        </section>

        <section class=" bg-white p-6 mt-4">
            <div class="grid grid-cols-12 gap-4">
                <BookCard v-for="book in books?.data" :key="book.id" :book="book" class="col-span-3" />
            </div>
            <div class="mt-10 text-end">
                <a-pagination v-model:current="bookQuery.page" :total="books?.total" show-less-items />
            </div>
        </section>

    </section>

</template>

<script setup lang="ts">
import type { IBook } from '~/interfaces/book';
import type { IResponsePagination } from '~/interfaces/response';

const route = useRoute();

const categoryStore = useCategoryStore();

const categories = computed(() => categoryStore.categories);

const { getCategory } = useCategoryStore();

const currentCategory = computed(() => {
    return categories.value?.find(cate => cate.slug === route.params.slug || cate.id.toString() === route.params.slug);
});

// level tăng dần từ 0 nếu level 0 là cấp cha cao nhất
// các level sau là cấp con with = ['children', 'children.children'] và parent nếu có
// const withQuery = computed(() => {
//     let arr = ['children','books'];
//     if (currentCategory.value) {
//         for (let i = currentCategory.value?.level ?? 0; i > 0; i--) {
//             if (i > 0) {
//                 let parent = 'parent.'.repeat(i);
//                 if (parent.endsWith('.')) {
//                     parent = parent.slice(0, -1);
//                 }
//                 arr.push(parent);
//             }
//         }
//     }
//     return arr;
// });

watch(() => route.params.slug, () => {
    if (currentCategory.value) {
        categoryStore.handleSetCurrentCategory(currentCategory.value);
    }
});

onMounted(() => {
    if (currentCategory.value) {
        categoryStore.handleSetCurrentCategory(currentCategory.value);
    }
});
const bookQuery = reactive({
    'with[]': ['authors', 'publisher', 'category'],
    page: 1,
    sort: 'all',
    rating: 'all',
    paginate: 12,
    filter:{
        priceFrom: 0,
        priceTo: 10000000,
    }
});

const { data: books } = await useFetch<IResponsePagination<IBook>>('/book-by-category/' + currentCategory.value?.id, {
    method: 'GET',

    baseURL: useRuntimeConfig().public.apiBaseUrl,
    onResponse: ({ response }) => {
        if (response.ok) {
            console.log(response._data);

        }
        else {
            console.log(response);
        }
    },
    query: bookQuery
});
</script>

<style scoped></style>