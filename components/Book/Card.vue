<template>
  <article class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300" 
  @click="navigateTo(props.book.slug? '/book/'+props.book.slug: '/book/'+props.book.id.toString())">
    <header>
      <NuxtImg class="w-full h-48 object-cover" :alt="props.book.title" :src="props.book.cover_image" />
    </header>
    <section class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ props.book.title }}</h2>
      <div class="flex items-center justify-between mb-2">
        <div>
          <span>Giá gốc: </span>
          <del class="text-base">{{ formatCurrency(props.book.price) }}</del>
          <span class="text-sm text-red-500"> - {{ props.book.discount }} % </span>
        </div>

      </div>
      <div class="">
        <span>Mua ngay với: </span>
        <span class="text-xl font-medium text-red-500">
          {{ formatCurrency(props.book.price * (1 - props.book.discount / 100)) }}
        </span>
      </div>
      <div class="mt-3">
        <span class="block">Đánh giá:</span>
        <div class="flex items-center">
          <span v-for="star in 5" :key="star" class="text-xl">
            <Icon name="i-material-symbols-star" v-if="star <= 5" class="text-yellow-500" />
            <Icon name="i-material-symbols-star-outline" v-else class="text-gray-400" />
          </span>
        </div>
      </div>
      <div class="text-gray-500">
        <span class="text-sm">Đã bán: </span>
        <span class="text-black">9000 sản phẩm</span>
      </div>
    </section>
    <footer class="p-4 border-t border-gray-200">
      <div>
        <span class="font-medium">Nhà xuất bản:</span> {{ props.book.publisher?.name }}
      </div>
      <div v-if="(props.book?.authors ?? []).length > 0">
        <span class="font-medium">Tác giả:</span>
        <span v-for="(author, index) in props.book.authors" :key="index">
          {{ author.name }}{{ index < (props.book.authors?.length ?? 0) - 1 ? ', ' : '' }} </span>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { IBook } from '~/interfaces/book';

const props = defineProps<{
  book: IBook
}>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>

<style scoped>
.text-yellow-500 {
  color: #f59e0b;
}

.text-gray-400 {
  color: #9ca3af;
}
</style>