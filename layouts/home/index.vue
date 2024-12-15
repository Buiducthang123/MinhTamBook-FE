<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item cursor-pointer">
          <a @click="navigateTo('/')">Trang chủ</a>
        </li>
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" class="breadcrumb-item cursor-pointer">
          <a @click="navigateTo('/category/' + (breadcrumb.slug ? breadcrumb.slug : breadcrumb.id))">{{ breadcrumb.name }}</a>
        </li>
      </ol>
    </nav>
    <div class="grid grid-cols-12 gap-6 ">
      <div class="col-span-2">
        <Menu />
      </div>
      <div class="col-span-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ICategory } from '~/interfaces/category';
import { useCategoryStore } from '~/stores/category';

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const query = reactive({
  with: ['children', 'children.children'],
});

const categories = computed(() => categoryStore.categories);

const currentCategory = computed(() => {
  return categories.value.find(cate => cate.slug === route.params.slug || cate.id.toString() === route.params.slug);
});

const buildBreadcrumbs = (category:ICategory|any) => {
  const breadcrumbs = [];
  let current = category;
  while (current) {
    breadcrumbs.unshift(current);
    current = current?.parent;
  }
  return breadcrumbs;
};

const breadcrumbs = computed(() => {
  if (currentCategory.value) {
    return buildBreadcrumbs(currentCategory.value);
  }
  return [];
});

const navigateTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  categoryStore.handleGetCategories(query);
});
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  padding: 0 0.5rem;
  color: #6c757d;
}
</style>