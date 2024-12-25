<template>
    <div class="min-h-screen">
        <h6 class="text-xl font-medium py-4">Giỏ hàng</h6>

        <div class="flex gap-4">
            <div class="w-3/4">
                <a-table :columns="columns" bordered :data-source="sortItemSelect ?? []" :row-key="record => record.id"
                    :pagination="false"
                    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }">
                    <template #bodyCell="{ record, column }">
                        <template v-if="column.dataIndex === 'title'">
                            <div class="gap-4 flex ">
                                <a-image class="object-cover" :width="100" :height="150" :src="record.cover_image" />
                                <div class="w-56">
                                    <h6 class="text-xl font-medium">{{ record.title }}</h6>
                                    <p v-html="record.short_description"></p>
                                    <p v-if="record.quantity && record.quantity>0">Số lượng trong kho : {{ record.quantity }}</p>
                                    <p v-else class="text-red-500 mt-2 text-sm">Sản phẩm này đã hết hàng !</p>
                                </div>
                            </div>
                        </template>

                        <template v-if="column.dataIndex === 'price'">
                            <div class="space-x-4">
                                <span class="text-red-500 text-xl font-medium">{{ formatCurrency(record.price *
                                    (100 - record.discount) / 100) }}</span>
                                <del>{{ formatCurrency(record.price) }}</del>
                            </div>
                            <div>
                                <span>Giảm: </span>
                                <span class="text-green-500 font-medium">{{ record.discount }}%</span>
                            </div>
                        </template>

                        <template v-if="column.dataIndex === 'quantity'">
                            <div class="flex gap-4">
                                <a-button class="border" @click="decreaseQuantity(record)">-</a-button>
                                <a-input v-model:value="record.pivot.quantity" :min="1" :max="10"
                                    @change="updateQuantity(record)" />
                                <a-button class="border" @click="increaseQuantity(record)">+</a-button>
                            </div>
                        </template>

                        <template v-if="column.dataIndex === 'total_price'">
                            {{ formatCurrency(record.price * (100 - record.discount) / 100 * record.pivot.quantity) }}
                        </template>

                        <template v-if="column.dataIndex === 'action'">
                            <div class="flex items-center gap-6">
                                <!--
                                    <a-button type="primary">Mua ngay</a-button>
                                -->
                                <a-popconfirm title="Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng ?" ok-text="Có"
                                    cancel-text="Không" @confirm="handleDelete(record.pivot.book_id)">
                                    <Icon class="text-2xl" name="i-material-symbols-delete-outline" />
                                </a-popconfirm>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>

            <div class="w-1/4 space-y-4">
                <div class="space-y-4">
                    <div class="flex justify-between p-4 bg-white">
                        <h6 class="">Giao hàng tới: </h6>
                        <span class="cursor-pointer text-blue-500 font-medium">Thay đổi</span>
                    </div>
                    <div class="border p-4 bg-white" v-if="defaultAddress">
                        <p class="font-medium">{{ defaultAddress?.receiver_name }}</p>
                        <p>{{ defaultAddress?.receiver_phone_number }}</p>
                        <p>{{ defaultAddress?.specific_address }}</p>
                        <p>{{ defaultAddress?.ward?.WardName }}, {{ defaultAddress?.district?.DistrictName }}, {{
                            defaultAddress?.province?.ProvinceName }}</p>
                    </div>
                    <div v-else class="flex justify-center items-center gap-2 bg-white p-4 
                                        cursor-pointer text-blue-500 font-medium"
                        @click="navigateTo('/customer/address')">
                        <Icon name="i-material-symbols-add" />
                        <span>Thêm địa chỉ nhận hàng</span>
                    </div>
                </div>

                <div class="bg-white p-4">
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span>Tổng tiền hàng: </span>
                            <span class="font-bold">{{ formatCurrency(totalItemSelect) }}</span>
                        </div>

                        <div class="flex justify-between">
                            <span>Giảm giá: </span>
                            <span class="text-green-500 font-bold">- {{ formatCurrency(totalItemSelect -
                                totalItemSelectDiscount)
                                }}</span>
                        </div>

                        <div class="flex justify-between">
                            <span>Tiền hàng:</span>
                            <span class="text-green
                                -500 font-bold"> {{ formatCurrency(totalItemSelectDiscount) }}</span>
                        </div>

                        <div class="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span class="text-green-500 font-bold"> {{ formatCurrency(totalShippingFee) }}</span>
                        </div>

                    </div>
                    <hr class="mb-6 mt-4">

                    <div class="flex justify-between items-start">
                        <span>Tổng cộng: </span>
                        <span class="text-xl font-medium text-red-600">{{ formatCurrency(totalItemSelectDiscount +
                            totalShippingFee)
                            }}</span>
                    </div>

                    <div class="text-end mt-4 text-green-600">
                        <span>Tiết kiệm </span>
                        <span>{{ formatCurrency(totalItemSelect - totalItemSelectDiscount) }}</span>
                    </div>

                    <!--Chọn hình thức thanh toán-->
                    <div class="flex flex-col gap-4 mt-4">
                        <h6 class="text-lg font-medium">Chọn hình thức thanh toán</h6>
                        {{ }}
                        <a-radio-group v-model:value="formCreateOrder.payment_method">
                            <a-radio v-for="(item, key) in paymentOptions" :key="item" :value="key"
                                class="block my-2">{{
                                    item
                                }}</a-radio>
                        </a-radio-group>
                    </div>

                    <!--Ghi chú-->
                    <div class="flex flex-col gap-4 mt-4">
                        <h6 class="text-lg font-medium">Ghi chú</h6>
                        <a-textarea v-model:value="formCreateOrder.note" :rows="4" placeholder="Ghi chú cho đơn hàng" />
                    </div>

                    <a-popconfirm :disabled="totalQuantity <= 0" title="Bạn có chắc chắn muốn mua sản phẩm này ?"
                        ok-text="Có" cancel-text="Không" @confirm="handlePurchase">
                        <button class="w-full p-2 mt-6 cursor-pointer bg-red-500 text text-white font-medium text-lg"
                            :class="{ 'cursor-not-allowed bg-red-300': totalQuantity <= 0 }"
                            :disabled="totalQuantity <= 0">
                            Mua
                            hàng ({{
                                itemBookSelect.length ?? 0 }})</button>
                    </a-popconfirm>


                    <p class="text-sm font-medium text-center mt-4 ">Mua thêm <span class="text-green-600">{{ 10 -
                        totalQuantity
                            }}</span> sản phẩm để được
                        <span class="text-green-600">free
                            ship</span>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
});

import { reactive, computed } from 'vue';
import { useFetch } from '#app';
import { useAuthStore } from '~/stores/auth';
import type { IShoppingCardItem } from '~/interfaces/shopping_card';
import { EPaymentMethod, EPaymentMethodText } from '~/enums/payment-method.enum';

const authStore = useAuthStore();
const access_token = computed(() => authStore.accessToken);
const user = computed(() => authStore.user);
const defaultAddress = computed(() => user.value?.shipping_addresses?.find((address) => address.is_default) ?? null);

const { data: shoppingCart, refresh: refreshShoppingCart } = await useFetch<IShoppingCardItem[]>('/shopping-carts', {
    method: 'GET',
    baseURL: useRuntimeConfig().public.apiBaseUrl,
    headers: {
        Authorization: `Bearer ${access_token.value}`
    }
});

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
        width: '25%'
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: '150px'
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
];

const state = reactive<{
    selectedRowKeys: (string | number)[];
    loading: boolean;
}>({
    selectedRowKeys: [],
    loading: true,
});

const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
};

const handleDelete = async (id: number) => {
    await $fetch(`/shopping-carts/${id}`, {
        method: 'DELETE',
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
            Authorization: `Bearer ${access_token.value}`
        },
        onResponse: ({ response }) => {
            if (response.ok) {
                refreshShoppingCart();
            } else {
                console.log(response);
            }
        }
    });
};

// const handleUpdateQuantity = async (id: number, quantity: number) => {
//     await $fetch(`/shopping-carts/${id}`, {
//         method: 'PATCH',
//         baseURL: useRuntimeConfig().public.apiBaseUrl,
//         headers: {
//             Authorization: `Bearer ${access_token.value}`
//         },
//         body: {
//             quantity
//         },
//         onResponse: ({ response }) => {
//             if (response.ok) {
//                 refreshShoppingCart();
//             } else {
//                 console.log(response);
//             }
//         }
//     });
// };

const decreaseQuantity = (record: any) => {
    if (record.pivot.quantity > 1) {
        record.pivot.quantity--;
        // handleUpdateQuantity(record.pivot.id, record.pivot.quantity);
    }
};

const increaseQuantity = (record: any) => {
    if (record.pivot.quantity < 10) {
        record.pivot.quantity++;
        // handleUpdateQuantity(record.pivot.id, record.pivot.quantity);
    }
};

const updateQuantity = (record: any) => {
    // handleUpdateQuantity(record.pivot.id, record.pivot.quantity);
};

//item selected 

const itemBookSelect = computed(() => {
    return shoppingCart?.value?.filter((item) => state.selectedRowKeys.includes(item.id)) ?? [];
});

//tống tiền item selected chưa giảm giá
const totalItemSelect = computed(() => {
    return itemBookSelect.value.reduce((total, item) => total + item.price * (item?.pivot?.quantity ?? 0), 0);
});

//tống tiền item selected đã giảm giá
const totalItemSelectDiscount = computed(() => {
    return itemBookSelect.value.reduce((total, item) => total + item.price * (100 - item.discount) / 100 * (item?.pivot?.quantity ?? 0), 0);
});

// sắp xếp hiển thịthị item được chọn hiện lên đầu
const sortItemSelect = computed(() => {
    return shoppingCart?.value?.sort((a, b) => {
        if (state.selectedRowKeys.includes(a.id) && !state.selectedRowKeys.includes(b.id)) {
            return -1;
        }
        if (!state.selectedRowKeys.includes(a.id) && state.selectedRowKeys.includes(b.id)) {
            return 1;
        }
        return 0;
    });
});

const totalShippingFee = ref(0);
const totalWeight = computed(() => itemBookSelect.value.reduce((total, item) => total + item.weight * (item?.pivot?.quantity ?? 0), 0));
const totalQuantity = computed(() => itemBookSelect.value.reduce((total, item) => total + (item?.pivot?.quantity ?? 0), 0));
const totalLength = computed(() => itemBookSelect.value.reduce((total, item) => total + item.dimension_length * (item?.pivot?.quantity ?? 0), 0));
const totalWidth = computed(() => itemBookSelect.value.reduce((total, item) => total + item.dimension_width * (item?.pivot?.quantity ?? 0), 0));
const totalHeight = computed(() => itemBookSelect.value.reduce((total, item) => total + item.height * (item?.pivot?.quantity ?? 0), 0));

const formGetShippingFee = reactive({
    'shop_id': 194655,
    "service_id": 53322,
    // "insurance_value": 500000,
    "coupon": null,
    "to_district_id": defaultAddress.value?.district?.DistrictID,
    "to_ward_code": defaultAddress.value?.ward?.WardCode,
    "service_type_id": 2,
    "height": 0,
    "length": 0,
    "weight": 0,
    "width": 0,
})

const formGetService = reactive({
    "shop_id": 194655,
    "from_district": 1490,
    "to_district": defaultAddress.value?.district?.DistrictID,
})

const handleGetShippingFee = async () => {
    await $fetch('/api/GHN/shipping_fee', {
        method: 'POST',
        body: formGetShippingFee,
        onResponse: ({ response }) => {
            if (response.ok) {
                totalShippingFee.value = response._data.data.total;
            }
        }
    })
}

const handleGetService = async () => {
    await $fetch('/api/GHN/get_service', {
        method: 'POST',
        body: formGetService
    })
}


watch(() => itemBookSelect.value, () => {
    if (itemBookSelect.value.length > 0) {
        formGetShippingFee.height = Math.ceil(totalHeight.value);
        formGetShippingFee.length = Math.ceil(totalLength.value);
        formGetShippingFee.weight = Math.ceil(totalWeight.value);
        formGetShippingFee.width = Math.ceil(totalWidth.value);

        if (totalQuantity.value <= 10) {
            handleGetShippingFee();
            handleGetService();
        }
    }
    else {
        totalShippingFee.value = 0;
    }
}, { immediate: true });

watch(() => defaultAddress.value, () => {
    if (defaultAddress.value) {
        formGetShippingFee.to_district_id = defaultAddress.value.district?.DistrictID;
        formGetShippingFee.to_ward_code = defaultAddress.value.ward?.WardCode;
    }
}, { immediate: true });

//Mua hàng

const paymentOptions = EPaymentMethodText;


const itemSelectSubmit = computed(() => {
    return itemBookSelect.value.map((item) => {
        return {
            book_id: item.id,
            quantity: item.pivot?.quantity ?? 0,
            price: item.price,
            discount: item.discount
        }
    })
})

import type { IShippingAddress } from '~/interfaces/shipping_address';

interface IFormCreateOrder {
    payment_method: string;
    items: any,
    note: string;
    shipping_address: IShippingAddress | undefined;
}

const formCreateOrder = reactive<IFormCreateOrder>({
    payment_method: EPaymentMethod.COD.toString(),
    items: itemSelectSubmit,
    note: '',
    shipping_address: undefined,
})

//Kiểm tra số lượng mua 1 sản phẩm có vượt quá số lượng sản phẩm của book không

const handleCheckQuantity = () => {
    return itemBookSelect.value.every(item => {
        if ((item.pivot?.quantity ?? 0) > (item?.quantity ?? 0)) {
            message.error(`Số lượng sản phẩm ${item.title} không đủ `);
            return false; // Dừng nếu điều kiện không thỏa mãn
        }
        return true;
    });
};

const handlePurchase = async () => {
    formCreateOrder.shipping_address = defaultAddress.value ?? undefined;

    let checkQuantity = handleCheckQuantity();

    if (!checkQuantity) {
        return ;
    }

    await $fetch('/orders', {
        method: 'POST',
        body: formCreateOrder,
        headers: {
            Authorization: `Bearer ${access_token.value}`
        },
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        onResponse: ({ response }) => {
            if (response.ok) {
                if (formCreateOrder.payment_method === EPaymentMethod.BANK_TRANSFER.toString()) {
                    window.location.href = response._data;
                }
                else {
                    message.success('Đặt hàng thành công, vui lòng chờ xác nhận từ admin');
                    // refreshShoppingCart();
                }
            }
            else {
                message.error(response._data.message || 'Có lỗi xảy ra vui lòng thử lại sau');
            }
        }
    })
    
}

</script>

<style scoped></style>