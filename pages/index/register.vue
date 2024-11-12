<template>
    <div class="bg-[#02AAF5]">
        <div class="bg-white py-4 ">
            <div class="container mx-auto flex justify-between items-center">
                <div class="w-fit flex flex-col justify-center cursor-pointer "
                    @click="navigateTo('/')"
                >
                    <NuxtImg class="w-24 h-12" src="images/logo.png" />
                    <h4 class="text-base mt-2 font-medium text-[#003ea1]">Tốt & Nhanh</h4>
                </div>
                <span class="text-primary cursor-pointer">Bạn cần giúp đỡ ?</span>
            </div>
        </div>
        <div
            class="container bg-center bg-contain bg-no-repeat mx-auto bg-[url('assets/images/register-bg-1.jpeg')] pt-10  flex justify-end">
            <div class="bg-white pt-10 px-6 rounded-lg shadow-lg w-full max-w-[40%] ">
                <div class="text-center text-2xl font-bold mb-6">Đăng ký tài khoản doanh nghiệp</div>
                <a-form :model="registerCompanyForm" ref="formRef" @finish="handleSubmit" layout="vertical" class="">
                     <div class="grid grid-cols-1 md:grid-cols-2  gap-x-4" :noStyle="true">
                        <a-form-item label="Họ và tên" name="full_name"
                            :rules="[{ required: true, message: 'Vui lòng nhập họ và tên!' }]">
                            <a-input placeholder="Nhập họ và tên" v-model:value="registerCompanyForm.full_name" />
                        </a-form-item>
                        <a-form-item label="Email" name="email"
                            :rules="[{ required: true, message: 'Vui lòng nhập email!' }]">
                            <a-input placeholder="Nhập email" type="email" v-model:value="registerCompanyForm.email" />
                        </a-form-item>
                        <a-form-item label="Mật khẩu" name="password"
                            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]">
                            <a-input-password placeholder="Nhập mật khẩu"
                                v-model:value="registerCompanyForm.password" />
                        </a-form-item>
                        <a-form-item label="Xác nhận mật khẩu" name="password_confirmation"
                            :rules="[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]">
                            <a-input-password placeholder="Xác nhận mật khẩu"
                                v-model:value="registerCompanyForm.password_confirmation" />
                        </a-form-item>
                        <a-form-item label="Tên công ty" name="company_name"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên công ty!' }]">
                            <a-input placeholder="Nhập tên công ty" v-model:value="registerCompanyForm.company_name" />
                        </a-form-item>
                        <a-form-item label="Địa chỉ công ty" name="company_address"
                            :rules="[{ required: true, message: 'Vui lòng nhập địa chỉ công ty!' }]">
                            <a-input placeholder="Nhập địa chỉ công ty"
                                v-model:value="registerCompanyForm.company_address" />
                        </a-form-item>
                        <a-form-item label="Số điện thoại công ty" name="company_phone_number"
                            :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại công ty!' }]">
                            <a-input placeholder="Nhập số điện thoại công ty"
                                v-model:value="registerCompanyForm.company_phone_number" />
                        </a-form-item>
                        <a-form-item label="Mã số thuế công ty" name="company_tax_code"
                            :rules="[{ required: true, message: 'Vui lòng nhập mã số thuế công ty!' }]">
                            <a-input placeholder="Nhập mã số thuế công ty"
                                v-model:value="registerCompanyForm.company_tax_code" />
                        </a-form-item>
                        <a-form-item label="Tên người liên hệ" name="contact_person_name"
                            :rules="[{ required: true, message: 'Vui lòng nhập tên người liên hệ!' }]">
                            <a-input placeholder="Nhập tên người liên hệ"
                                v-model:value="registerCompanyForm.contact_person_name" />
                        </a-form-item>
                        <a-form-item label="Chức vụ người liên hệ" name="contact_person_position"
                            :rules="[{ required: true, message: 'Vui lòng nhập chức vụ người liên hệ!' }]">
                            <a-input placeholder="Nhập chức vụ người liên hệ"
                                v-model:value="registerCompanyForm.contact_person_position" />
                        </a-form-item>
                        <a-form-item label="CMND/CCCD người đại diện" name="representative_id_card"
                            :rules="[{ required: true, message: 'Vui lòng nhập CMND/CCCD người đại diện!' }]">
                            <a-input placeholder="Nhập CMND/CCCD người đại diện"
                                v-model:value="registerCompanyForm.representative_id_card" />
                        </a-form-item>
                        <a-form-item label="Ngày cấp CMND/CCCD" name="representative_id_card_date"
                            :rules="[{ required: true, message: 'Vui lòng nhập ngày cấp CMND/CCCD!' }]">
                            <a-date-picker v-model:value="registerCompanyForm.representative_id_card_date" value-format="DD-MM-YYYY" />
                        </a-form-item>
                    </div>
                    <a-form-item>
                        <a-checkbox>Đồng ý với các điều khoản và điều kiện</a-checkbox>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="w-full">Đăng ký</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUser } from '~/interfaces/user';

definePageMeta({
    layout: false,
});

useSeoMeta({
    title: 'Đăng ký tài khoản doanh nghiệp',
    description: 'Đăng ký tài khoản doanh nghiệp trên hệ thống của Minh Tâm Book',
});

interface IregisterCompanyForm {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    company_name: string;
    company_address: string;
    company_phone_number: string;
    company_tax_code: string;
    contact_person_name: string;
    contact_person_position: string;
    representative_id_card: string;
    representative_id_card_date: string;
}

const formRef = ref();
const registerCompanyForm = reactive<IregisterCompanyForm>({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_name: '',
    company_address: '',
    company_phone_number: '',
    company_tax_code: '',
    contact_person_name: '',
    contact_person_position: '',
    representative_id_card: '',
    representative_id_card_date: '',
});

const handleSubmit = async() => {
   await formRef.value.validate();
   await $fetch<{user:IUser, token:string, message:string}>('/register',{
        method: 'POST',
        body: registerCompanyForm,
        headers: {
            // 'Content-Type': 'application/json'
        },
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        onResponse:({response})=>{
            if(response.ok){
                message.success('Đăng ký tài khoản thành công');
                message.success('Tài khoản của bạn đang được chờ duyệt');
            }
            else{
                message.error(response._data.message ?? 'Đăng ký tài khoản thất bại');
            }
        }
    })
};
</script>

<style scoped></style>
