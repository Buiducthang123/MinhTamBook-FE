<template>
    <div>
        <h3 class="text-2xl mb-6">Thông tin tài khoản</h3>
        <section class="bg-white p-4 rounded-lg">
            <div class=" grid grid-cols-12 gap-6">
                <div class="col-span-7 border-r">
                    <h6 class="mb-4 text-lg">Thông tin cá nhân</h6>
                    <a-form class="flex gap-10" :model="formUserUpdate" ref="updateUserForm" :label-col="labelCol"
                        :wrapper-col="wrapperCol" @finish="handleUpdateUser">
                
                        <UploadImg @handle-change-image="handleChangeImage">
                            <template #main>
                            
                                <div v-if="!formUserUpdate.avatar"
                                    class="h-28 w-28 border-4 bg-blue-50 rounded-full border-blue-200 relative flex items-center justify-center">
                                    <Icon class="text-5xl text-blue-500" name="i-clarity-avatar-line" />
                                    <div class="absolute right-0 bottom-3 w-12 bg-gray-600">
                                        <Icon class="text-2xl text-white" name="" />
                                        <div
                                            class="absolute -right-2 bottom-0 w-6 h-6 flex justify-center items-center cursor-pointer rounded-full bg-gray-500">
                                            <Icon class="text-xl text-white"
                                                name="i-material-symbols-light-edit-outline" />
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="relative cursor-pointer">
                                        <NuxtImg :src="formUserUpdate.avatar"
                                            class="h-28 min-w-28 rounded-full object-cover border-4 border-blue-200" />
                                        <div class="absolute right-0 bottom-3 w-12 bg-gray-600">
                                            <Icon class="text-2xl text-white" name="" />
                                            <div
                                                class="absolute -right-1 bottom-1 w-6 h-6 flex justify-center items-center cursor-pointer rounded-full bg-gray-500">
                                                <Icon class="text-xl text-white"
                                                    name="i-material-symbols-light-edit-outline" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </UploadImg>
                        <div class="w-full">
                            <a-form-item name="fullName"
                                :rules="[{ required: true, message: 'Vui lòng nhập họ tên của bạn' }]">
                                <template #label>
                                    <span class="font-semibold">Họ và tên</span>
                                </template>
                                <a-input class="w-full" v-model:value="formUserUpdate.fullName" />
                            </a-form-item>

                            <a-form-item name="email">
                                <template #label>
                                    <span class="font-semibold">Email</span>
                                </template>
                                <a-input :value="user?.email" disabled class="disabled:text-black" />
                                <p class="text-xs text-yellow-600 flex items-center gap-1 mt-2">
                                    <Icon name="i-ep-warning" />
                                    Email của bạn chưa được xác minh !
                                </p>
                            </a-form-item>

                            <a-form-item>
                                <div class="text-end w-full">
                                    <a-button class="" type="primary" html-type="submit">Cập nhật</a-button>
                                </div>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
                <div class="col-span-5">
                    <h6 class="mb-4 text-lg">Bảo mật</h6>
                    <div class="mt-4 space-y-6">
                        <div class="flex justify-between items-center">
                            <div class="space-x-2 flex items-center">
                                <Icon name="i-carbon-password" />
                                <span>Đổi mật khẩu</span>
                            </div>
                            <a-button class="border-blue-500 text-blue-500">Thay đổi</a-button>
                        </div>

                        <div class="flex justify-between items-center">
                            <div class="space-x-2 flex items-center">
                                <Icon name="i-carbon-password" />
                                <span>Yêu cầu xóa tài khoản</span>
                            </div>
                            <a-button html-type="submit" class="border-blue-500 text-blue-500">Yêu cầu</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const accessToken = computed(() => authStore.accessToken);
const updateUserForm = ref();
const labelCol = { style: { width: '100px', } };
const wrapperCol = { span: 14 };

interface FormUserUpdate {
    fullName: string;
    // email: string;
    avatar?: File | string | any;
}

const formUserUpdate = reactive<FormUserUpdate>({
    fullName: user.value?.full_name ?? '',
    // email: user.value?.email ?? '',
    avatar: user.value?.avatar,
});

watch(user, (newVal) => {
    if (newVal) {
        formUserUpdate.fullName = newVal.full_name;
        formUserUpdate.avatar = newVal.avatar;
    }
});

const handleChangeImage = (url:string) => {
    console.log(url);
    formUserUpdate.avatar = url;
    console.log(formUserUpdate.avatar);
    
};

const handleUpdateUser = async () => {
    await updateUserForm.value.validate();
    await $fetch('/user/update-me', {
        method: 'patch',
        body: formUserUpdate,
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken.value}`,
            'Accept': 'application/json',
        },
        onResponse:({response}) => {
            if(response.ok){
                message.success('Cập nhật thành công');
            }
            else{
                message.error('Cập nhật thất bại');
            }
        }
    });


}
</script>

<style scoped></style>