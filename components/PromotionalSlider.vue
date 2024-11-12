<template>
    <a-carousel arrows :slides-to-show="2" class="carousel" dots-class="slick-dots" >
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <left-circle-outlined />
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
                <right-circle-outlined />
            </div>
        </template>
        <div class="">
            <div class="rounded-lg overflow-hidden mr-6 bg-white flex gap-4">
                <div class="w-1/3">
                    <div class="relative overflow-hidden">
                        <div class="w-full h-48 bg-cover relative 
                            bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                            blur-lg bg-center bg-no-repeat">
                        </div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                                src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                        </div>
                    </div>
                </div>
                <div class="p-3 text-start space-y-5">
                    <h6 class="text-xl font-semibold">Top sách bán chạy nhất</h6>
                    <p>Mô tả abcd .....</p>
                </div>
            </div>
        </div>
        <div class="">
            <div class="rounded-lg overflow-hidden mr-6 bg-white">
                <div class="w-1/3">
                    <div class="relative overflow-hidden">
                        <div class="w-full h-48 bg-cover relative 
                            bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                            blur-lg bg-center bg-no-repeat">
                        </div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                                src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="rounded-lg overflow-hidden mr-6 bg-white">
                <div class="w-1/3">
                    <div class="relative overflow-hidden">
                        <div class="w-full h-48 bg-cover relative 
                            bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                            blur-lg bg-center bg-no-repeat">
                        </div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                                src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="rounded-lg overflow-hidden mr-6 bg-white">
                <div class="w-1/3">
                    <div class="relative overflow-hidden">
                        <div class="w-full h-48 bg-cover relative 
                            bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                            blur-lg bg-center bg-no-repeat">
                        </div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                                src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="rounded-lg overflow-hidden mr-4 bg-white">
                <div class="w-1/3">
                    <div class="relative overflow-hidden">
                        <div class="w-full h-48 bg-cover relative 
                            bg-[url('https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png')] 
                            blur-lg bg-center bg-no-repeat">
                        </div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img width="100%" class="mx-auto rounded-lg overflow-hidden " alt="example"
                                src="https://salt.tikicdn.com/ts/tka/1c/a1/00/3574c4dce736eb3ef0f4f371f358660e.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-carousel>
</template>
<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
</script>
<style>
/* For demo */
.slick-slide{
    text-align: center;
    height: 192px;
    /* line-height: 160px; */
    overflow: hidden;
}

.slick-arrow.custom-slick-arrow{
    width: 35px;
    height: 35px;
    background-color: #000000;
    border-radius: 50%;
    font-size: 35px;
    color: #ffffff;
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}

.slick-arrow.custom-slick-arrow:before{
    display: none;
}

.slick-arrow.custom-slick-arrow:hover{
    color: #ffffff;
    opacity: 0.5;
}

.slick-slide h3{
    color: #fff;
}

.slick-dots.slick-dots-bottom{
    bottom: -20px;
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-carousel .slick-dots li.slick-active button {
    background-color: #207cd3 !important;
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-carousel .slick-dots li button{
    background-color: #7c8191 !important;
}
</style>