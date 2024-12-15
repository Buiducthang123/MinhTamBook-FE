<template>
    <NuxtLayout name="default">
        <!-- Chon-->
        <div class="min-h-screen">
            <h6 class="text-xl font-medium py-4" >Giỏ hàng</h6>

            <div>
                <a-table :columns="columns" :data-source="shoppingCart ?? []" :row-selection="rowSelection" bordered>
                    <template #bodyCell="{record, column}">

                        <template v-if="column.dataIndex === 'title'">
                            <div class="flex gap-4">
                                <a-image class="object-cover" :width="100" :height="150" :src="record.cover_image"/>
                                <div>
                                    <h6 class="text-xl font-medium">{{ record.title }}</h6>
                                    <p class="">{{ record.short_description }}</p>
                                </div>
                            </div>
                        </template>

                        <template v-if="column.dataIndex === 'quantity'">
                            <div class="flex gap-4">
                                <a-button class="border" @click="">-</a-button>
                                <a-input v-model:value="record.pivot.quantity" :min="1" :max="10" />
                                <a-button class="border" @click="">+</a-button>
                            </div>
                        </template>
                        
                        <template v-if="column.dataIndex === 'total_price'">
                            {{formatCurrency()}}
                        </template>

                    </template>
                </a-table>
            </div>
        </div>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { IShoppingCardItem } from '~/interfaces/shopping_card';

const authStore = useAuthStore();

const access_token = computed(()=>authStore.accessToken)

const { data:shoppingCart } = useFetch<IShoppingCardItem[]>('/shopping-carts',{
    method: 'GET',
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    headers: {
        Authorization: `Bearer ${access_token.value}`
    }
})

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'title',
        key: 'product_name',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        width: '15%'
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Thành tiền',
        dataIndex: 'total_price',
        key: 'total_price',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    },
]

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: IShoppingCardItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: IShoppingCardItem, selected: boolean, selectedRows: IShoppingCardItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: IShoppingCardItem[], changeRows: IShoppingCardItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});

</script>

<style scoped>

</style>