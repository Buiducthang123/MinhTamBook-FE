<template>
    <div class="bg-white p-4">
        <h6 class="font-medium text-xl">Sản phẩm</h6>
        <div class="mt-6">
            <div class="flex gap-6 items-center">
                <div>
                    <span>Sắp xếp: </span>
                    <a-select v-model:value="props.filter.sort" style="width: 200px">
                        <a-select-option value="asc">Giá từ thấp đến cao</a-select-option>
                        <a-select-option value="desc">Giá từ cao đến thấp</a-select-option>
                        <!-- chữ cái -->
                        <a-select-option value="az">A-Z</a-select-option>
                        <a-select-option value="za">Z-A</a-select-option>
                        <!--Giảm giá sâu nhất -->
                        <a-select-option value="discount_max">Giảm giá sâu nhất</a-select-option>
                        <!--Mới nhất -->
                        <a-select-option value="new">Mới nhất</a-select-option>
                    </a-select>
                </div>

                <div>
                    <span>Hiển thị số sản phẩm: </span>
                    <a-select v-model:value="props.filter.paginate" style="width: 100px">
                        <a-select-option value="12">12</a-select-option>
                        <a-select-option value="24">24</a-select-option>
                        <a-select-option value="36">36</a-select-option>
                    </a-select>
                </div>

                <div class="flex items-center gap-4">
                    <span>Khoảng giá: </span>
        
                    <a-input-number v-model:value="props.filter.priceFrom" style="width: 100px" />
                    <span>-</span>
                    <a-input-number v-model:value="props.filter.priceTo" style="width: 100px" />

                </div>

            </div>
            <div class="mt-4 flex items-center gap-4">
                <span class="mt-4">Lọc theo đánh giá: </span>
                <a-radio-group v-model:value="props.filter.rating" class="mt-4">
                    <a-radio value="all">Đánh giá</a-radio>
                    <a-radio value="5">Đánh giá 5 sao</a-radio>
                    <a-radio value="4">Đánh giá 4 sao trở lên</a-radio>
                    <a-radio value="3">Đánh giá 3 sao trở lên</a-radio>
                </a-radio-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    filter: any;
}>();


</script>

<style scoped></style>