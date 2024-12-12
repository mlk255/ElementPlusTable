<template>
    <h1>通用列表 有分页</h1>
    <common-table :columns="columns" :options="options">
      <template #search-username="{ formSource, dataIndex }">
        <el-input
          v-model:value="formSource[dataIndex]"
          placeholder="item.placeholder"
        ></el-input>
      </template>
      <template #username="{ record }">基本面 {{ record.username }}</template>
    </common-table>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import userAPI from "@/api/user";
const statusData = ref<any[]>([]);
setTimeout(() => {
  statusData.value = [
    { label: "禁用", value: 1 },
    { label: "正常", value: 2 },
    { label: "异常", value: 0 },
  ];
}, 3000);

const options = {
  id: "member",
  pk: "id",
  operationColumn: true,
  operationColumnWidth: 180,
  api: userAPI.listPage2,
  add: {
    show: true,
    api: userAPI.add,
  },
  edit: {
    show: true,
    api: userAPI.edit,
  },
  delete: {
    show: true,
    api: userAPI.delete,
  },
  searchLabelWidth: "auto",
  searchLabelHide: true,
  btnBoxInline: false,
  selectChange: (e:any) => {
    console.log(e);
  },
  formIsCol: true,
  dialogWidth: 800
};
const columns = reactive([
  {
    type: "index",
    dataIndex: "index",
    title: "NO",
  },
  {
    type: "selection",
    dataIndex: "index",
    title: "",
  },
  {
    title: "头像",
    formType: "upload",
    dataIndex: "avatar",
    align: "center",
    addDisplay: true,
    editDisplay: true,
    // fixed: true,
    width: 100,
    upload: {
      api: userAPI.uploadImage,
    },
    colspan: 24
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
    defaultValue: "张三",
    allowClear: true,
    search: true,
    addDisplay: true,
    onChange: (a: any) => {
      console.log(a);
    },
  },
  {
    title: "用户名2",
    dataIndex: "username",
    formType: "input",
    align: "center",
    addDisplay: true,
    editDisplay: true,
  },
  {
    title: "部门",
    dataIndex: "deptId",
    formType: "input",
    align: "center",
    addDisplay: true,
    editDisplay: true,
  },
  {
    title: "性别",
    dataIndex: "sex",
    formType: "radio",
    align: "center",
    search: true,
    allowClear: true,
    addDisplay: true,
    editDisplay: true,
    defaultValue: 1,
    dict: {
      translation: true,
      data: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
    },
  },
  {
    title: "手机号",
    dataIndex: "phone",
    formType: "inputNumber",
    search: true,
    hide: false,
    addDisplay: true,
    editDisplay: true,
    required: true,
    sortable: true,
    extra: "extraextra extra",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    editDisplay: true,
    value: "123@123.com",
    rules: [
      { required: true, message: "请输入邮箱" },
      {
        validator: (rule: any, value: any, callback: any) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(value)) {
            callback(new Error("格式错误!"));
          } else {
            callback();
          }
        },
        trigger: "blur",
      },
    ],
  },
  {
    title: "状态",
    dataIndex: "status",
    formType: "switch",
    align: "center",
    search: true,
    addDisplay: true,
    editDisplay: true,
    searchDefaultValue: 1,
    dict: {
      translation: true,
      data: statusData,
      tagColors: {
        1: "#f00",
        0: "#0f0",
      },
    },
  },

  {
    title: "创建时间",
    dataIndex: "craeteTime",
    formType: "datePicker",
    width: 100,
    search: true,
    hide: true,
    bind: {
      showTime: true,
    },
  },
]);
</script>

<style scoped>

</style>