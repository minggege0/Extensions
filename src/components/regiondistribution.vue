<!--
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-06-09 15:40:40
 * @LastEditTime: 2021-06-09 16:01:11
 * @LastEditors: minggege
 * @FilePath: \extensions\src\components\regiondistribution.vue
-->
<template>
  <v-main>
    <v-dialog
      v-model="dialog"
      persistent
      :width="dialogWidth"
      :style="{ height: dialogHeight }"
    >
      <v-card>
        <v-card-title class="headline">
          <v-row justify="end">
            <v-col cols="12" sm="11">
              <div class="text-h6 mb-6">
              {{'地域分布_'+currentDate+'_所有终端_全部'}}
              </div>
            </v-col>
            <v-col cols="12" sm="1">
              <v-btn
                icon
                color="gray"
                style="margin-left: 4.8vw"
                @click="close"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <!--表格组件-->
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
          </mtable
        ></v-card-text>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
import mtable from "@/components/mtable.vue";
import utils from "@/common/utils";

export default {
  components: { mtable },
  data() {
    return {
      dialog: false,
      currentDate: "",
      dialogWidth: window.innerWidth - 100,
      dialogHeight: window.innerHeight - 50,
      tableData: {
        headers: [
          {
            text: "类目名",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "父行业类目名", value: "calories" },
          { text: "省", value: "fat" },
          { text: "卖家数", value: "carbs" },
          { text: "父行业卖家数", value: "protein" },
          { text: "父行业卖家数占比", value: "protein" },
          { text: "有交易卖家数", value: "iron" },
          { text: "父行业有交易卖家数", value: "iron" },
          { text: "父行业有交易卖家数占比", value: "iron" },
        ],
        dataList: [
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
          },
          {
            name: "笔类/书写工具",
            calories: "文具电教/文化用品/商务用品",
            fat: 16072637,
            carbs: 93117229,
            protein: "13.68%",
            iron: "17.27%",
            iron: "27.38%",
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
      }
    }
  },
  created() {
    //==初始化日期==//
    this.currentDate=this.getCurrnetDate()
  },
  methods: {
    //==获取当前日期 格式为yyyy-MM-dd==//
    getCurrnetDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      month = month > 10 ? month + 1 : "0" + (month + 1)
      day = day > 10 ? day : "0" + day
      date=year+'-'+month+'-'+day
      return date
    },
    //==打开模态框==//
    open() {
      this.dialog = true
      //==加载数据==//
      this.queryData()
    },
    //===关闭模态框=//
    close() {
      this.dialog = false
    },
    //==查询数据==//
    queryData() {
      let url = `https://sycm.taobao.com/mc/mq/supply/mkt/overview.json?dateType=recent30&cateId=${utils.getUrlParam(
        "cateId"
      )}`;
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
      utils.requestDataOnline(
        this,
        url,
        header,
        resposeData => {
          this.tableData.dataList = JSON.parse(
            this.$tools.AESDecrypt(resposeData)
          )
        },
        () => {
          this.loading = false;
        }
      )
    }
  }
}
</script>
<style scoped>
</style>>