<!--
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-31 09:28:39
 * @LastEditTime: 2021-05-31 12:17:31
 * @LastEditors: minggege
 * @FilePath: \extensions\src\components\Industrycomposition.vue
-->
<template>
  <mtable
    :headers="tableData.headers"
    :dataList="tableData.dataList"
    :pageSize="tableData.pageSize"
    :copyItem="tableData.copyItem"
    :exportItem="tableData.exportItem"
    :searchText="tableData.searchText"
    :loading="tableData.loading"
    :loading-text="tableData.loadingText"
    :tableHeight="tableData.height"
    :tableWidth="tableData.width"
  >
  </mtable>
</template>
<script>
import mtable from "@/components/mtable.vue";
import utils from "@/common/utils";

export default {
  components: { mtable },
  data() {
    return {
      tableData: {
        headers: [
          {
            text: "名字",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" },
        ],
        dataList: [
          {
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%",
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%",
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%",
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%",
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%",
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
          },
        ],
        copyItem: ["模式一", "模式二", "模式三", "模式四", "模式五"],
        exportItem: ["模式一", "模式二", "模式三", "模式四", "模式五"],
        searchText: "",
        pageSize: 5,
        height: "",
        width: "",
        loading: false,
        loadingText: "加载数据中······",
      },
    };
  },
  created() {
      this.queryData()
  },
  methods: {
    queryData() {
      let url = `https://sycm.taobao.com/mc/mq/supply/mkt/overview.json?dateType=recent30&cateId=${utils.getUrlParam("cateId")}`;
      let header = {
        authority: "sycm.taobao.com",
        method: "GET",
        path: url.replace("https://sycm.taobao.com", ""),
        scheme: "https",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sycm-referer": "/mc/mq/overview",
      };
      this.loading = true;
      utils.requestDataOnline(this,
        url,
        header,
        (resposeData) => {
          let data = JSON.parse(resposeData);
        },
        () => {
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
</style>>

