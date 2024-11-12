<template>
    <div class="bg-white rounded-lg">
        <h1 class="p-4 font-semibold">Khám phá theo danh mục</h1>
        <hr>
        <div>
            <a-collapse v-model:activeKey="activeKey" ghost>
                <a-collapse-panel :showArrow="false" key="1">
                    <template #header>
                        <span class="hover:text-primary hover:underline font-medium">English Books</span>
                    </template>
                    <ul class="pl-4 space-y-4">
                        <li>
                            <a href="#" class="hover:text-primary hover:underline">Action and Adventure</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary hover:underline">Anthology</a>
                        </li>
                    </ul>
                    <template #extra>
                        <Icon :class="{ 'rotate-180': activeKey.includes('1') }" name="mdi:chevron-down" />
                    </template>
                </a-collapse-panel>
                <a-collapse-panel :showArrow="false" key="2">
                    <template #header>
                        <span class="hover:text-primary hover:underline font-medium">Sách tiếng việt</span>
                    </template>
                    <ul class="pl-4 space-y-4">
                        <li>
                            <a href="#" class="hover:text-primary hover:underline">Vì cậu là bạn nhỏ của tớ </a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary hover:underline">Trước bình minh</a>
                        </li>
                    </ul>
                    <template #extra>
                        <Icon :class="{ 'rotate-180': activeKey.includes('2') }" name="mdi:chevron-down" />
                    </template>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
    
    <!-- chuong trình khuyến mãi -->
    <div class="mt-6 mb-6">
        <a-card hoverable style="width: 100%" class="overflow-hidden ">
            <template #cover>
                <div class="relative overflow-hidden">
                    <div
                        class="w-full h-60 bg-cover relative 
                        bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                        blur-lg bg-center bg-no-repeat">
                    </div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                            src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                    </div>
                </div>

            </template>
            <a-card-meta>
                <template #title>
                    <h6 class="text-wrap text-center text-base">Top sách bán chạy</h6>
                </template>
                <template #description>
                    <div class="mt-10 text-center">
                        <p class="text-primary text-center font-medium">Giảm 5%</p>
                        <a-button type="primary" class="mt-4 ">Xem thêm</a-button>
                    </div>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const activeKey = ref(['1']);

watch(activeKey, val => {
    console.log(val);
});
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s;
}
</style>