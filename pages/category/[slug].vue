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

const currentCategory = computed(() => {
    return categories.value?.find(cate => cate.slug === route.params.slug || cate.id.toString() === route.params.slug);
});

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

useHead({
  title: '' + currentCategory.value?.name,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'This is my amazing site, let me tell you all about it.' },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/icon-logo.png' }],
});

</script>

<style scoped></style>