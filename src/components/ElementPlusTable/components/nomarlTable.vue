<template>
  <el-table
    ref="tableRef"
    :row-key="options.pk"
    :data="dataSource"
    v-loading="loading"
    :height="options.height"
    :tree-props="options.treeProps"
    border
    stripe
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    default-expand-all
  >
    <template v-for="(column, idx) in tableColumns" :key="idx + 'tablerow'">
      <el-table-column
        v-if="column.type"
        :type="column.type"
        :label="column.title"
        :align="column.align || 'center'"
        width="55"
      ></el-table-column>
      <el-table-column
        v-else
        :label="column.title"
        :sortable="column.sortable"
        :align="column.align || 'center'"
        :prop="column.dataIndex"
        show-overflow-tooltip
        :fixed="column.fixed"
        :width="column.width"
      >
        <template #default="{ row: record }">
          <template v-if="$slots[column.dataIndex]">
            <slot
              v-if="$slots[column.dataIndex]"
              :name="column.dataIndex"
              :column="column"
              :record="record"
            />
          </template>

          <template v-else>
            <template v-if="column.formType === 'upload'">
              <el-button @click="handleOpenLink(record[column.dataIndex])">
                <template #icon>
                  <el-icon><Search /></el-icon>
                </template>
              </el-button>
            </template>

            <template v-else-if="column.dict?.data && column.dict?.translation">
              <el-tag
                v-for="item in column.dict?.data.filter(
                    (item: any) =>
                      item[dictValueKey(column)] === record[column.dataIndex]
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
            <template v-else>
              {{ record[column.dataIndex] }}
            </template>
          </template>
        </template>
      </el-table-column>
    </template>

    <el-table-column
      v-if="options.operationColumn"
      :align="options.operationColumnAlign"
      :label="options.operationColumnText"
      :fixed="options.operationColumnFixed"
      :width="options.operationColumnWidth"
    >
      <template #default="{ row }">
        <el-space class="operation" align="center">
          <slot
            v-if="$slots['operationBeforeExtend']"
            name="operationBeforeExtend"
            :record="row"
          />
          <el-button
            v-if="options.edit?.show"
            v-auth="options.edit?.auth || []"
            type="primary"
            text
            @click="openHandle(1, row)"
          >
            {{ options.editText }}
          </el-button>
          <el-popconfirm
            :title="options.deleteTip"
            :ok-text="options.okText"
            :cancel-text="options.cancelText"
            @confirm="deleteHandle(row)"
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
            :record="row"
          />
        </el-space>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import { columnsType, optionsType } from "../js/type";
import { Search } from "@element-plus/icons-vue";

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

const openHandle = (type: number, row: any) => {
  emit("openHandle", type, row);
};

const deleteHandle = (row: any) => {
  emit("deleteHandle", row);
};

const dictLabelKey = (column: columnsType) => {
  // console.log(111);
  return column.dict?.prop?.label ?? "label";
};

const dictValueKey = (column: columnsType) => {
  // console.log(222);
  return column.dict?.prop?.value ?? "value";
};

const handleSortChange = (e: any) => {
  emit("sortChange", e);
};

const handleSelectionChange = (selectedRows: any) => {
  emit("selectionChange", selectedRows);
};

// console.log(useSlots())
</script>

<style scoped></style>
