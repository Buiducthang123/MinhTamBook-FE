<template>

    <AccountNotActiveNoti v-if="user?.status === EUser.NOT_ACTIVATED"/>

    <NuxtLayout name="home" v-else>
        <section class="">
            <section>
                <PromotionalSlider/>
            </section>
    
            <section class="">
                <ExploreCategory />
            </section>
    
            <section class="mt-10">
                <Filter :filter="bookQuery" />
            </section>
            <hr>
    
            <section class=" bg-white p-6 mt-4">
                <div class="grid grid-cols-12 gap-x-4 gap-y-8">
                    <BookCard v-for="book in books?.data" :key="book.id" :book="book" class="col-span-3"/>
                </div>
                <div class="mt-10 text-end">
                    <a-pagination v-model:current="bookQuery.page" :total="books?.total" show-less-items />
                </div>
            </section>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AccountNotActiveNoti from '~/components/AccountNotActiveNoti.vue';
import { EUser } from '~/enums/user.enum';
import type { IBook } from '~/interfaces/book';
import type { IResponsePagination } from '~/interfaces/response';

definePageMeta({
  layout: 'default'
});

const route = useRoute();

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);
const currentCategory = computed(() => {
    return categories.value?.find(cate => cate.slug === route.params.slug || cate.id.toString() === route.params.slug);
});

const bookQuery = reactive({
    'with[]': ['authors', 'publisher', 'category'],
    page:1,
    sort: 'all',
    rating: 'all',
    paginate: 12,
    filter:{
        priceFrom: 0,
        priceTo: 10000000,
    }
});

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const apiUrl = route.params.slug ? `/books/category/${currentCategory.value?.id}` : '/books';

const { data:books } = await useFetch<IResponsePagination<IBook>>(apiUrl, {
    method: 'GET',
    baseURL:useRuntimeConfig().public.apiBaseUrl,
    onResponse: ({response}) => {
        if (response.ok) {
           console.log(response._data);
        }
        else {
            console.log(response);
        }
    },
    query:bookQuery
});

</script>

<style scoped>

</style>