<template>
    <div>
        <div class="px-4">
            <h3 class="text-2xl mb-6">Đơn hàng của tôi</h3>
            <div>
                <a-radio-group v-model:value="orderQuery.filter.status" button-style="solid">
                    <a-radio-button value="0">Tất cả</a-radio-button>
                    <a-radio-button v-for="(item, key) in OrderStatusText" :key="key" :value="Number.parseInt(key.toString())">
                        {{ item }}
                    </a-radio-button>
                </a-radio-group>
            </div>
        </div>
        <section class="p-4 rounded-lg">
            <div v-if="orderData?.data?.length > 0 && orderData?.data">
                <div v-for="order in orderData?.data" :key="order.id" class=" my-4 bg-white p-5 border-gray-200 py-4">
                    <div class="space-y-4">
                        <div class="flex justify-between w-full">
                            <div class="text-lg font-semibold">Mã đơn hàng: {{ order.id }}</div>
                            <span class="text-lg font-semibold uppercase text-red-500">
                                {{ OrderStatusText[order.status as OrderStatus] }}
                            </span>
                        </div>
                        <hr>
                        <h6 class="font-bold">Danh sách sản phẩm: </h6>
                        <div v-for="item in order.order_items" :key="item.id">
                            <div class="flex justify-between">
                                <div class="flex gap-4">
                                    <img :src="item.book?.cover_image" alt="" class="w-20 h-20 object-cover">
                                    <div class="space-y-2">
                                        <div class="text-lg font-semibold">{{ item.book?.title }}
                                            <a class="text-blue-600 text-xs" target="_blank" :href="'/book/'+item.book?.slug">Xem chi tiết sản phẩm</a>

                                        </div>
                                        <div class="text-base font-semibold">Số lượng mua: {{ item.quantity }}</div>
                                        <div v-if="item.book?.authors && item.book.authors.length > 0"
                                            class="text-base font-semibold">Tác giả:
                                            {{ item.book?.authors?.map(author =>
                                                author.name).join(', ') }}</div>

                                        <div class="text-base font-semibold">Tổng tiền:
                                           
                                            <span class="text-red-500"> {{ formatCurrency((item.price * (100 - item.discount )/100)* item.quantity) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-start gap-4">
                                    <div class="flex items-center gap-2">
                                        <del class="text-gray-500">{{ formatCurrency(item.book?.price) }}</del>
                                      
                                        <div class="text-lg font-semibold text-red-500">{{ formatCurrency(item.price * (100 - item.discount)/100) }}</div>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-4">

                        </div>
                        <div class="flex justify-between">
                            <div>
                                <div class="text-base font-semibold">Ngày đặt hàng: <span class="text-red-500">{{
                                    dayjs(order.created_at).format('DD/MM/YYYY') }}</span>
                                </div>
                                <!--Địa chỉ-->
                                <div>
                                    <div class="text-base font-semibold">Địa chỉ nhận hàng: </div>
                                    <div class="text-sm font-semibold">Tên người nhận: <span
                                            class="text-gray-600">{{
                                                order.shipping_address?.receiver_name }}</span></div>
                                    <div class="text-sm font-semibold">Số điện thoại: <span
                                            class="text-gray-600">{{
                                                order.shipping_address?.receiver_phone_number }}</span></div>
                                    <div class="text-sm font-semibold">Địa chỉ: <span class="text-gray-600">{{
                                        order.shipping_address?.specific_address }}</span>, <span
                                            class="text-gray-600">{{
                                                order.shipping_address.ward.WardName }}</span>, <span
                                            class="text-gray-600">{{
                                                order.shipping_address.district.DistrictName }}</span>, <span
                                            class="text-gray-600">{{
                                                order.shipping_address.province.ProvinceName }}</span></div>
                                </div>
                            </div>
                            <div>
                                <!--Tính thanh toán-->
                                <div class=" font-semibold">Phí vận chuyển: <span class="text-red-500">{{
                                    formatCurrency(order.shipping_fee) }}</span></div>

                                <div>
                                    <div class=" font-semibold">Tiền hàng: <span class="text-red-500">{{
                                        formatCurrency(order.order_items?.reduce
                                            ((total, item) => total + (item.price * (100 - item.discount) /100 ) * item.quantity, 0)) }} 
                                        </span>
                                    </div>
                                </div>

                                <hr class="my-4">
                                <div class=" font-semibold">Tổng thanh toán: <span class="text-red-500">{{
                                    formatCurrency(order.final_amount) }}</span></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else class="mt-6">
                <a-empty description="Không có đơn hàng nào "></a-empty>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import dayjs from '#build/dayjs.imports.mjs';
import { OrderStatus, OrderStatusText } from '~/enums/orderStatus.enum';
import type { IOder } from '~/interfaces/order';
import type { IResponsePagination } from '~/interfaces/response';


const authStore = useAuthStore();

const accessToken = computed(() => authStore.accessToken);

const orderQuery = reactive({
    page: 1,
    paginate: 10,
    filter: {
        status: '0'
    },
    'with[]': ['orderItems', 'orderItems.book']
});

const { data: orderData } = await useFetch<IResponsePagination<IOder>>('/my-orders', {
    method: 'GET',
    query: orderQuery,
    headers: {
        Authorization: `Bearer ${accessToken.value}`
    },
    baseURL: useRuntimeConfig().public.apiBaseUrl
});


</script>

<style scoped></style>