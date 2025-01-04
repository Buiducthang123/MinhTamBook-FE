<template>
    <section class="p-10">
        <p class="mb-4 cursor-pointer " @click="navigateTo('/')">
            < Quay lại trang chủ
        </p>

        <section class="">
            <Filter :filter="bookQuery" />
        </section>
        <hr>

        <section class=" bg-white p-6 mt-4">
            <div class="grid grid-cols-12 gap-x-4 gap-y-8">
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

const searchStore = useSearchStore();

const searchKey = computed(() => searchStore.searchKey);

const apiUrl = '/books';

const route = useRoute();

const bookQuery = reactive({
    'with[]': ['authors', 'publisher', 'category', 'discountTiers'],
    page: 1,
    sort: 'all',
    rating: 'all',
    paginate: 12,
    filter: {
        priceFrom: 0,
        priceTo: 10000000,
        is_sale: 1,
    },
    search: {
        title: ''
    }
});

watch(searchKey, async (newVal) => {
    if (newVal) {
        bookQuery.search.title = newVal;
    }
    else {
        bookQuery.search.title = '';
    }
});

const { data: books } = await useFetch<IResponsePagination<IBook>>(apiUrl, {
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
    query: bookQuery,
    watch: [searchKey]
});

</script>

<style scoped></style>