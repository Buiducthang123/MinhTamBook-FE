<template>
    <div class="pt-4">
        <div class="p-4 ">
            <!--Quay lại trang chủ-->
            <span class="cursor-pointer block mt-4 mb-6" @click="navigateTo('/')">
                < Quay lại trang chủ</span>
                    <h1 class="text-xl font-medium">Mua hàng ngay</h1>

                    <div v-if="bookBuyNow">
                        <div class="flex gap-4 flex-nowrap mt-4">
                            <div class="w-2/3">
                                <div class="flex gap-5 p-4 bg-white">
                                    <div class="relative">
                                        <div v-if="bookBuyNow.quantity != null && bookBuyNow.quantity <= 0"
                                            class="absolute z-10 top-0 left-0 bg-white bg-opacity-90 flex items-center justify-center">
                                            <span>
                                                <Icon name="i-material-icons-error" class="" />
                                                <span
                                                    class=" font-medium bg-red-500 p-1 px-2 rounded-lg text-xs text-white">Hết
                                                    hàng</span>
                                            </span>
                                        </div>
                                        <a-image class="object-contain shadow-sm border" :height="200" :width="150"
                                            :src="bookBuyNow.cover_image" />
                                    </div>
                                    <div class="">
                                        <h6 class="text-xl font-medium mt-2">{{ bookBuyNow.title }}</h6>
                                        <p class="text-base text-gray-500">Tác giả:
                                            {{ bookBuyNow?.authors?.map(author => author.name).join(', ') }}</p>
                                        <p class="text-base text-gray-500">Nhà xuất bản: {{ bookBuyNow?.publisher?.name
                                            }}</p>
                                        <p class="text-base text-gray-500">Danh mục: {{ bookBuyNow?.category?.name }}
                                        </p>

                                        <div>
                                            <div class="space-x-4">
                                                <span class="text-red-500 text-xl font-medium">
                                                    {{ formatCurrency(priceShow) }}
                                                </span>
                                                <del>{{ formatCurrency(bookBuyNow.price) }}</del>
                                            </div>
                                            <div>
                                                <span>Giảm: </span>
                                                <span class="text-green-500 font-medium">{{ bookBuyNow.discount
                                                    }}%</span>

                                                <span
                                                    v-if="user?.role?.name == 'company' && bookBuyNow.discount_tiers && bookBuyNow.discount_tiers.length > 0"
                                                    class="text-red-500 text-sm font-medium">
                                                    ( Áp dụng cho sách chưa áp dụng chiết khấu)
                                                </span>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-5 mt-2">
                                            <p class="text-base font-medium">Số lượng:</p>
                                            <!--:max="bookBuyNow.quantity" -->
                                            <a-input-number v-model:value="bookSelect.quantity" :min="1" />
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 p-4 bg-white">
                                    Chọn phương thức mua hàng:

                                    <a-radio-group v-model:value="formCreateOrder.payment_method"
                                        class="mt-4 flex gap-6">
                                        <div v-for="(item, key) in EPaymentMethodText" class="p-4 rounded-lg border"
                                            :class="{ 'bg-blue-50 border-blue-500': formCreateOrder.payment_method === key.toString() }">
                                            <a-radio :value="key">
                                                {{ item }}
                                            </a-radio>
                                        </div>
                                    </a-radio-group>
                                </div>

                                <div class="bg-white mt-4 p-10" v-if="user?.role?.name == 'company'">
                                    <a-table class="w-2/3 mx-auto" :columns="discountTiersColumns"
                                        :dataSource="discountTiers" bordered :pagination="false" size="large">
                                        <template #title>
                                            <h6 class="text-xl font-medium">Bảng giá chiết khấu</h6>
                                        </template>

                                        <template #emptyText>
                                            <a-empty description="Sản phẩm chưa áp dụng chiết khấu" />
                                        </template>
                                    </a-table>
                                </div>
                            </div>
                            <div class="w-1/3 bg-white p-4">
                                <div class="space-y-4">
                                    <div class="flex justify-between p-4 bg-white">
                                        <h6 class="">Giao hàng tới: </h6>
                                        <span class="cursor-pointer text-blue-500 font-medium" @click="navigateTo('/customer/address')">Thay đổi</span>
                                    </div>
                                    <div class="border p-4 bg-white" v-if="defaultAddress">
                                        <p class="font-medium">{{ defaultAddress?.receiver_name }}</p>
                                        <p>{{ defaultAddress?.receiver_phone_number }}</p>
                                        <p>{{ defaultAddress?.specific_address }}</p>
                                        <p>{{ defaultAddress?.ward?.WardName }}, {{
                                            defaultAddress?.district?.DistrictName }}, {{
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
                                            <span class="font-bold">{{ formatCurrency(priceShow * bookSelect.quantity)
                                                }}</span>
                                        </div>

                                        <div class="flex justify-between">
                                            <span>Giảm giá: </span>
                                            <span class="text-green-500 font-bold">- {{ isApplyDiscountTiers ?
                                                formatCurrency(0)
                                                : formatCurrency(bookBuyNow.price
                                                    * bookBuyNow.discount / 100) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Tiền hàng:</span>
                                            <span class="text-green
                                -500 font-bold"> {{ formatCurrency(bookBuyNow.price * (100 - bookBuyNow.discount) /
                                                100) }}</span>
                                        </div>

                                        <div class="flex justify-between">
                                            <span>Phí vận chuyển:</span>
                                            <span class="text-green-500 font-bold"> {{ formatCurrency(totalShippingFee)
                                                }}</span>
                                        </div>

                                    </div>
                                    <hr class="mb-6 mt-4">

                                    <div class="flex justify-between items-start">
                                        <span>Tổng cộng: </span>
                                        <span class="text-xl font-medium text-red-600">{{
                                            formatCurrency(priceShow * bookSelect.quantity + totalShippingFee)
                                        }}</span>
                                    </div>

                                    <div class="text-end mt-4 text-green-600">
                                        <span>Tiết kiệm </span>
                                        <span>{{
                                            isApplyDiscountTiers ? formatCurrency(0) : formatCurrency(bookBuyNow.price *
                                                bookBuyNow.discount / 100)
                                        }}</span>
                                    </div>

                                    <!--Ghi chú-->
                                    <div class="flex flex-col gap-4 mt-4">
                                        <h6 class="text-lg font-medium">Ghi chú</h6>
                                        <a-textarea v-model:value="formCreateOrder.note" :rows="4"
                                            placeholder="Ghi chú cho đơn hàng" />
                                    </div>

                                    <a-popconfirm title="Bạn có chắc chắn muốn mua sản phẩm này ?" ok-text="Có"
                                        cancel-text="Không" @confirm="handlePurchase">
                                        <button
                                            class="w-full p-2 mt-6 cursor-pointer bg-red-500 text text-white font-medium text-lg">
                                            Mua
                                            hàng
                                        </button>
                                    </a-popconfirm>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div v-else>
                        <div class="flex items-center justify-center mt-6 min-h-[50vh]">
                            <div class="text-center space-y-6">
                                <h6 class="text-xl">Chưa có sản phẩm nào</h6>
                                <a-button @click="navigateTo('/')">Quay lại trang chủ</a-button>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EPaymentMethod, EPaymentMethodText } from '~/enums/payment-method.enum';
import type { IBook } from '~/interfaces/book';

interface IBookBuyNow {
    book_id: number | undefined;
    quantity: number;
}

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const accessToken = computed(() => authStore.accessToken);

const defaultAddress = computed(() => user.value?.shipping_addresses?.find((address) => address.is_default) ?? null);

const bookSelect = ref<IBookBuyNow>({ book_id: undefined, quantity: 1 })

const bookBuyNow = ref<IBook>();

const query = reactive({
    'with[]': ['category', 'authors', 'publisher', 'category.parent', 'discountTiers']
});

watch(bookSelect, async (newValue, oldValue) => {
    if (newValue) {
        await useFetch<IBook>(`/books/` + newValue.book_id, {
            method: 'get',
            baseURL: useRuntimeConfig().public.apiBaseUrl,
            query,
            onResponse: ({ response }) => {
                console.log(response._data);

                bookBuyNow.value = response._data;
            }
        });
    }
});

const totalShippingFee = ref(0);

const formGetShippingFee = reactive({
    'shop_id': 194655,
    "service_id": 53321,
    // "insurance_value": 500000,
    "coupon": null,
    "to_district_id": defaultAddress.value?.district?.DistrictID,
    "to_ward_code": defaultAddress.value?.ward?.WardCode,
    "service_type_id": 2,
    "height": 5,
    "length": 5,
    "weight": 5,
    "width": 5,
});

const handleGetShippingFee = async () => {

    if (bookBuyNow.value) {
        formGetShippingFee.weight = Math.ceil(bookBuyNow.value.weight * (bookSelect.value?.quantity ?? 1));
        formGetShippingFee.length = Math.ceil(bookBuyNow.value.dimension_length);
        formGetShippingFee.width = Math.ceil(bookBuyNow.value.dimension_width);
        formGetShippingFee.height = Math.ceil(bookBuyNow.value.height);
    }

    if (!defaultAddress.value) {
        message.error('Vui lòng chọn địa chỉ nhận hàng');
        return;
    }

    if (bookSelect.value.quantity >= 10) {
        totalShippingFee.value = 0;
        return;
    }

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

const formCreateOrder = reactive({
    quantity: bookSelect?.value?.quantity,
    payment_method: EPaymentMethod.COD.toString(),
    note: '',
    items: [
        {
            book_id: bookSelect?.value?.book_id,
            quantity: bookSelect?.value?.quantity,
            price: bookBuyNow?.value?.price,
            discount: bookBuyNow.value?.discount,
        }
    ],
    shipping_address: undefined as any,
});

onBeforeMount(() => {
    bookSelect.value = JSON.parse(localStorage.getItem('buyNow') || '{}') ?? {};
});

watch(() => defaultAddress.value, () => {
    if (defaultAddress.value) {
        formGetShippingFee.to_district_id = defaultAddress.value.district?.DistrictID;
        formGetShippingFee.to_ward_code = defaultAddress.value.ward?.WardCode;
        if (bookBuyNow.value) {
            handleGetShippingFee();
        }
    }
}, { immediate: true });

watch(() => bookBuyNow.value, () => {
    if (defaultAddress.value) {
        handleGetShippingFee();
    }
}, { immediate: true });

// kiểm tra số lượng sách mua không vượt quá số lượng sách còn lại
const handleCheckQuantity = () => {
    if (bookSelect.value?.quantity > (bookBuyNow.value?.quantity ?? 0)) {
        message.error('Số lượng sách mua không được vượt quá số lượng sách còn lại');
        return false;
    }
    return true;
}

const handlePurchase = async () => {
    formCreateOrder.shipping_address = defaultAddress.value ?? undefined;
    formCreateOrder.items = [
        {
            book_id: bookSelect?.value?.book_id,
            quantity: bookSelect?.value?.quantity,
            price: bookBuyNow?.value?.price,
            discount: bookBuyNow.value?.discount,
        }
    ]
    if (!handleCheckQuantity()) {
        return;
    }

    await $fetch('/orders', {
        method: 'POST',
        body: formCreateOrder,
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        },
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        onResponse: ({ response }) => {
            if (response.ok) {
                if (formCreateOrder.payment_method === EPaymentMethod.BANK_TRANSFER.toString()) {
                    window.location.href = response._data;
                }
                else {
                    message.success('Đặt hàng thành công, vui lòng chờ xác nhận từ admin');
                    navigateTo('/customer/orders')
                }
            }
            else {
                message.error(response._data.message || 'Có lỗi xảy ra vui lòng thử lại sau');
            }
        }
    })
}

const isApplyDiscountTiers = ref(false);

const discountTiersColumns = [
    {
        title: 'Số lượng',
        dataIndex: 'minimum_quantity',
        key: 'minimum_quantity',

    },
    {
        title: 'Giá bán (VNĐ)/sách',
        dataIndex: 'price',
        key: 'price',
    }
]

const discountTiers = computed(() => bookBuyNow.value?.discount_tiers?.sort((a: any, b: any) => a.minimum_quantity - b.minimum_quantity));

const priceShow = computed(() => {
    if (bookBuyNow.value) {
        if (user.value?.role?.name == 'company' && bookBuyNow.value.discount_tiers && bookBuyNow.value.discount_tiers.length > 0) {
            const discount_tiers = bookBuyNow.value?.discount_tiers ? JSON.parse(JSON.stringify(bookBuyNow.value.discount_tiers)).sort((a: any, b: any) => b.minimum_quantity - a.minimum_quantity) : [];
            if (discount_tiers && discount_tiers.length > 0) {
                const discount_tier = discount_tiers.find((tier: any) => Number(bookSelect.value.quantity) >= Number(tier.minimum_quantity));
                if (discount_tier) {
                    isApplyDiscountTiers.value = true;
                    return discount_tier.price;
                }
                isApplyDiscountTiers.value = false;
            }
            return bookBuyNow.value.discount ? bookBuyNow.value.price * (1 - bookBuyNow.value.discount / 100) : bookBuyNow.value.price;
        }
        isApplyDiscountTiers.value = false;
        return bookBuyNow.value.discount ? bookBuyNow.value.price * (1 - bookBuyNow.value.discount / 100) : bookBuyNow.value.price;
    }
    return 0;
});

watch(bookSelect, async (newValue, oldValue) => {
    await handleGetShippingFee();
},
    {
        deep: true
    });

useHead({
    title: 'Mua hàng ngay',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'This is my amazing site, let me tell you all about it.' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/icon-logo.png' }],
});

</script>

<style scoped></style>