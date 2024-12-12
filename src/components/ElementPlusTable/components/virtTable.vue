<template>
  <el-auto-resizer :style="{ height: options.height }">
    <template #default="{ height, width }">
      <el-table-v2
        ref="tableRef"
        :row-key="options.pk"
        :columns="myTableColumns"
        :data="dataSource"
        v-loading="loading"
        :width="width"
        :height="height"
        border
        stripe
        @column-sort="handleSortChange"
        default-expand-all
        :sort-state="sortState"
        fixed
      >
        <template #header-cell="{ column }">
          <div v-if="column.type === 'selection'">
            <el-checkbox
              v-model="isAllChecked"
              @change="handleSelectionChange(1)"
            ></el-checkbox>
          </div>
          <div v-else>{{ column.title }}</div>
        </template>
        <template
          #cell="{ column, rowData, rowIndex }"
          v-for="(_, idx) in myTableColumns"
          :key="idx + 'tablerow'"
        >
          <slot
            v-if="$slots[column.dataIndex]"
            :name="column.dataIndex"
            :column="column"
            :record="rowData"
          />
          <template v-else>
            <template v-if="column.type === 'index'">
              {{ rowIndex + 1 }}
            </template>
            <template v-if="column.type === 'selection'">
              <el-checkbox
                v-model="rowData._checked"
                @change="handleSelectionChange(2)"
              ></el-checkbox>
            </template>
            <template v-if="column.formType === 'upload'">
              <el-button @click="handleOpenLink(rowData[column.dataIndex])">
                <template #icon>
                  <el-icon><Search /></el-icon>
                </template>
              </el-button>
            </template>
            <template v-else-if="column.dict?.data && column.dict?.translation">
              <el-tag
                v-for="item in column.dict?.data.filter(
                                (item: any) =>
                                item[dictValueKey(column)] === rowData[column.dataIndex]
                            ) || []"
                :key="item[dictValueKey(column)]"
                :color="
                  column.dict?.tagColors
                    ? column.dict?.tagColors[item[dictValueKey(column)]]
                    : ''
                "
                :style="{
                  color:
                    column.dict?.tagColors &&
                    column.dict?.tagColors[item[dictValueKey(column)]]
                      ? '#fff'
                      : undefined,
                }"
                :bordered="false"
              >
                {{ item[dictLabelKey(column)] }}
              </el-tag>
            </template>
            <span v-else>{{ rowData[column.dataIndex] }}</span>
            <template v-if="column.key === 'operation'">
              <el-space class="operation" align="center">
                <slot
                  v-if="$slots['operationBeforeExtend']"
                  name="operationBeforeExtend"
                  :record="rowData"
                />
                <el-button
                  v-if="options.edit?.show"
                  v-auth="options.edit?.auth || []"
                  type="primary"
                  text
                  @click="openHandle(1, rowData)"
                >
                  {{ options.editText }}
                </el-button>
                <el-popconfirm
                  :title="options.deleteTip"
                  :ok-text="options.okText"
                  :cancel-text="options.cancelText"
                  @confirm="deleteHandle(rowData)"
                >
                  <template #reference>
                    <el-button
                      v-if="options.delete?.show"
                      v-auth="options.delete?.auth || []"
                      type="danger"
                      text
                    >
                      {{ options.deleteText }}
                    </el-button>
                  </template>
                </el-popconfirm>
                <slot
                  v-if="$slots['operationAfterExtend']"
                  name="operationAfterExtend"
                  :record="rowData"
                />
              </el-space>
            </template>
          </template>
        </template>
      </el-table-v2>
    </template>
  </el-auto-resizer>
</template>

<script setup lang="tsx">
import { computed, ref } from "vue";
import { columnsType, optionsType } from "../js/type";
import { Search } from "@element-plus/icons-vue";
import { SortBy, SortState, TableV2SortOrder } from "element-plus";

const props = withDefaults(
  defineProps<{
    options: optionsType;
    loading: boolean;
    dataSource: any[];
    tableColumns: columnsType[];
    handleOpenLink: (e: any) => void;
  }>(),
  {
    loading: false,
    dataSource: () => [],
    tableColumns: () => [],
    handleOpenLink: () => {},
  }
);

const emit = defineEmits([
  "openHandle",
  "deleteHandle",
  "sortChange",
  "selectionChange",
]);

// const myTableColumns = ref([])
const myTableColumns = computed(() => {
  const arr = props.tableColumns.map((item) => ({
    ...item,
    key: item.dataIndex,
    dataKey: item.dataIndex,
    width: item.type ? 50 : (item.width ?? 150),
    align: item.align || "center",
  }));
  if (props.options.operationColumn) {
    arr.push({
      title: props.options.operationColumnText,
      key: "operation",
      dataKey: "operation",
      width: props.options.operationColumnWidth ?? 180,
      fixed: props.options.operationColumnFixed,
      align: props.options.operationColumnAlign ?? "center",
    });
  }
  return arr;
});

const openHandle = (type: number, row: any) => {
  emit("openHandle", type, row);
};

const deleteHandle = (row: any) => {
  emit("deleteHandle", row);
};

const dictLabelKey = (column: columnsType) => {
  return column.dict?.prop?.label ?? "label";
};

const dictValueKey = (column: columnsType) => {
  return column.dict?.prop?.value ?? "value";
};

const isAllChecked = ref(false);

const sortState = ref<SortState>({});
myTableColumns.value
  .filter((item) => item.sortable)
  .map((item) => {
    sortState.value[item.dataIndex] = TableV2SortOrder.ASC;
  });

const handleSortChange = ({ key, order }: SortBy) => {
  sortState.value[key] = order;
  emit("sortChange", {
    prop: key,
    order: order === TableV2SortOrder.ASC ? "ascending" : "descending",
  });
};

const handleSelectionChange = (type: number) => {
  let ids = [];
  if (type === 1) {
    if (isAllChecked.value) {
      props.dataSource.forEach((item) => {
        item._checked = true;
      });
    } else {
      props.dataSource.forEach((item) => {
        item._checked = false;
      });
    }
    ids = isAllChecked.value
      ? props.dataSource.map((item) => item[props.options.pk])
      : [];
  } else {
    ids = props.dataSource
      .filter((item) => item._checked)
      .map((item) => item[props.options.pk]);
  }
  emit("selectionChange", ids);
};
</script>

<style scoped></style>
