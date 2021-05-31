<!--
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-31 09:15:51
 * @LastEditTime: 2021-05-31 11:40:35
 * @LastEditors: minggege
 * @FilePath: \extensions\src\components\mtable.vue
-->

<template>
  <v-main>
    <v-container>
      <v-row justify="end">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="搜索"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="copyItem"
            label="复制"
            @change="copyChange"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            :items="exportItem"
            label="导出"
            @change="exportChange"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :loading="loading"
      :loading-text="loadingText"
      :height="tableHeight"
      :headers="headers"
      :items="dataList"
      :items-per-page="pageSize"
      :search="searchText"
      class="elevation-1"
      :style="{ width: tableWidth }"
    ></v-data-table>
  </v-main>
</template>

<script>
export default {
  name: "mtable",
  props: {
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
    pageSize: {
      type: Number,
      default() {
        return 0;
      },
    },
    copyItem: {
      type: Array,
      default() {
        return [];
      },
    },
    exportItem: {
      type: Array,
      default() {
        return [];
      },
    },
    searchText: {
      type: String,
      default() {
        return "";
      },
    },
    tableHeight: {
      type: String,
      default() {
        return "";
      },
    },
    tableWidth: {
      type: String,
      default() {
        return "";
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    loadingText: {
      type: String,
      default() {
        return "加载中······";
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    //==复制下拉框值改变事件==//
    copyChange(val) {
      console.log(val);
    },
    //==导出下拉框值改变事件==//
    exportChange(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped>
</style>