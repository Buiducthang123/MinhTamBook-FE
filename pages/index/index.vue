<template>
    <section class="">
        <div class="py-5">
            <a-breadcrumb separator=">" class="text-base font-medium">
                <a-breadcrumb-item>Trang chủ</a-breadcrumb-item>
                <a-breadcrumb-item href="">đường dẫn 1</a-breadcrumb-item>
                <a-breadcrumb-item href="">đường dẫn 2</a-breadcrumb-item>
                <a-breadcrumb-item>An Application</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="grid grid-cols-12 gap-10">
            <section class="col-span-2">
                <Menu />
            </section>
            <section class="col-span-10">
                <div class="p-6 bg-white  rounded-lg">
                    <span class="text-3xl font-semibold">Nhà sách TiKi</span>
                </div>

                <section>
                    <PromotionalSlider class="mt-6" />
                </section>

                <section class="mt-10 ">
                    <ExploreCategory />
                </section>

                <section class="mt-10">
                    <Filter/>
                </section>
            </section>
            
        </div>
    </section>

</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/auth';

</script>

<style scoped></style>