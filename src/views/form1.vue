<template>
    <div>
        <h1>通用表单</h1>
        <common-form
        ref="formRef"
        :columns="formColumns"
        :model="formData"
        @finish="submit"
        >
        <template #name="{ formSource, dataIndex }">
            <el-input
            v-model:value="formSource[dataIndex]"
            placeholder="item.placeholder123"
            ></el-input>
        </template>
        </common-form>
        <el-button @click="handleFormItem('email', 'hide')">
        隐藏email表单项
        </el-button>
        <el-button @click="handleFormItem('email', 'disabled')">
        禁用email表单项
        </el-button>
        <el-button @click="handleFormItem('email', 'readonly')">
        只读email表单项
        </el-button>
    </div>
</template>

<script setup lang="ts">
import userAPI from "@/api/user";
import { reactive, ref } from "vue";
const formRef = ref();
const formData = reactive({
  avatar:
    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  file: [
    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  ],
  name: "张三",
  phone: "123456789",
  email: "123@123.com",
  status: true,
  sex: 1,
  status2: [1],
  content: "<p>123</p>",
});

const formColumns = reactive([
  {
    title: "头像",
    formType: "upload",
    dataIndex: "avatar",
    align: "center",
    add: true,
    edit: true,
    width: 200,
    upload: {
      api: userAPI.uploadImage,
    },
  },
  {
    title: "图片",
    formType: "upload",
    dataIndex: "img",
    align: "center",
    width: 100,
    upload: {
      api: userAPI.uploadImage,
      type: "image",
      isSigle: false,
      maxCount: 3,
    },
    onChange: (a: any) => {
      console.log(a);
    },
  },
  {
    title: "文档",
    formType: "upload",
    dataIndex: "file",
    align: "center",
    width: 100,
    upload: {
      api: userAPI.uploadImage,
      type: "file",
      accept: ".doc,.docx,.pdf,.xls,.xlsx",
      isSigle: false,
      maxCount: 2,
    },
  },
  {
    title: "用户名",
    dataIndex: "nickname",
    align: "center",
    defaultValue: "张三",
    fixed: "left",
    search: true,
  },
  {
    title: "手机号",
    dataIndex: "phone",
    formType: "inputNumber",
    search: true,
    hide: false,
    required: true,
    sortable: true,
    width: "200px",
    extra: "extraextra extra",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    edit: true,
    value: "123@123.com",
  },
  {
    title: "状态",
    dataIndex: "status",
    formType: "switch",
    width: 100,
    search: true,
    onChange: (a: any) => {
      console.log(a);
    },
  },
  {
    title: "checkbox",
    dataIndex: "status2",
    formType: "checkbox",
    width: 100,
    defaultValue: [1, 0],
    dict: {
      data: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
    },
  },
  {
    title: "性别",
    dataIndex: "sex",
    formType: "radio",
    width: 100,
    search: true,
    defaultValue: 1,
    dict: {
      data: [
        { label: "男", value: 1 },
        { label: "女", value: 0 },
      ],
    },
  },
  {
    title: "性别2",
    dataIndex: "sex2",
    formType: "select",
    width: 100,
    search: true,
    defaultValue: 1,
    dict: {
      data: [
        { label: "男", value: 1 },
        { label: "女", value: 0 },
      ],
    },
  },
  {
    title: "时间",
    dataIndex: "craeteTime",
    formType: "datePicker",
    width: 100,
    search: true,
    hide: false,
    bind: {
      showTime: true,
    },
  },
  {
    title: "时间范围",
    dataIndex: "craeteTime2",
    formType: "dateTimeRange",
    width: 100,
    search: true,
    hide: false,
    bind: {
      showTime: true,
    },
  },
  {
    title: "内容",
    formType: "editor",
    dataIndex: "content",
    align: "center",
    onChange: (a: any) => {
      console.log(a);
    },
  },
  {
    title: "内容2",
    formType: "editor",
    dataIndex: "content2",
    align: "center",
  },
]);

const submit = (e: any) => {
  console.log(e);

  // formRef.value.submitLoading = true;

  // setTimeout(() => {
  //     formRef.value.submitLoading = false;
  // },3000);
};

const handleFormItem = (
  dataIndex: string,
  key: "hide" | "disabled" | "readonly"
) => {
  formRef.value.setColumn(dataIndex, key, true);
};
</script>

<style scoped>

</style>