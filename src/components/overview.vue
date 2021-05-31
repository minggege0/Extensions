<template>
  <v-main style="z-index: 1001">
    <v-row justify="center">
      <v-dialog
        v-model="isShow"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="gray" style="position:relative;">
            <v-btn icon dark @click="isShow = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title
              >大盘趋势合并_2021-05-11_所有终端_全部_对比行业</v-toolbar-title
            >
          </v-toolbar>
          <v-row style="margin-top: 20px">
            <span style="padding-left: 40px; color: gray; font-size: 14px"
              >生意参谋5月11日市场大盘，行业客群模块指数改版（其他模块正常）现已支持改版后指数转化</span
            >
          </v-row>
          <v-sheet
            :style="loading?'display:block;':'display:none;'"
            :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
            class="pa-3"
          >
            <v-skeleton-loader
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="image"
            ></v-skeleton-loader>
          </v-sheet>
          <div
            :style="loading?'display:none;':'display:block;'"
          >
            <v-row justify="center">
              <v-col cols="8">
                <v-item-group mandatory>
                  <v-row>
                    <v-col
                      v-for="box in dashboardbox"
                      :key="box.index"
                      cols="12"
                      md="2"
                    >
                      <v-item v-slot="{ active,toggle}">
                        <div
                          :style="
                            active
                              ? 'border:2px solid #5ca7f1;width:160px;height:80px;cursor:pointer;border-radius:4px;position:relative;'
                              : 'border:1px solid gray;width:160px;height:80px;cursor:pointer;border-radius:4px;position:relative;'
                          "
                          class="align-center"
                          dark
                          @click="toggle();loadChart()"
                        >
                          <v-scroll-y-transition>
                            <div>
                              <span
                                :style="
                                  active
                                    ? 'color:black;padding:8px 0 0 20px;font-size:14px;display:block;'
                                    : 'color:gray;padding:8px 0 0 20px;font-size:14px;display:block;'
                                "
                                >{{ box.title }}</span
                              >
                              <span
                                :style="
                                  active
                                    ? 'color:black;padding:0px 0 0 20px;font-size:18px;display:block;'
                                    : 'color:gray;padding:0px 0 0 20px;font-size:18px;display:block;'
                                "
                                >{{ box.value }}</span
                              >
                              <div
                                style="
                                  color: gray;
                                  padding: 0 15px 0 20px;
                                  font-size: 12px;
                                  display: flex;
                                  justify-content: space-between;
                                "
                              >
                                <span> 较前一日: </span>
                                <span style="display: flex; align-items: center">
                                  {{ box.cycleCrc }}
                                  <v-icon
                                    style="margin-left: 3px"
                                    small
                                    :color="
                                      box.cycleCrc.indexOf('-') == -1 && active
                                        ? 'green'
                                        : ''
                                    "
                                    v-if="box.cycleCrc.indexOf('-') == -1"
                                  >
                                    mdi-arrow-up
                                  </v-icon>
                                  <v-icon
                                    style="margin-left: 3px"
                                    small
                                    :color="
                                      box.cycleCrc.indexOf('-') == -1 && active
                                        ? 'green'
                                        : ''
                                    "
                                    v-else
                                  >
                                    mdi-arrow-down
                                  </v-icon>
                                </span>
                              </div>
                            </div>
                          </v-scroll-y-transition>
                        </div>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-item-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <v-row>
                  <div id="charts" style="width:100vw;height:400px;"></div>
                </v-row>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-row justify="end">
                <v-col cols="2">
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                </v-col>
                <v-col cols="2">
                  <v-card-title>
                    <v-select :items="items" label="复制"></v-select>
                  </v-card-title>
                </v-col>
                <v-col cols="2">
                  <v-card-title>
                    <v-select :items="items" label="导出"></v-select>
                  </v-card-title>
                </v-col>
              </v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :search="search"
                ></v-data-table>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data() {
    return {
      isShow: false,
      attrs: {
        boilerplate: true,
        elevation: 2,
      },
      fill: false,
      loading:false,
      selectedGradient: ["#42b3f4"],
      search: "",
      items: ["模式一", "模式二", "模式三", "模式四", "模式五"],
      headers: [
        {
          text: "类目名",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "日期", value: "calories" },
        { text: "访问人数", value: "fat" },
        { text: "浏览量", value: "carbs" },
        { text: "收藏人数", value: "protein" },
        { text: "收藏次数", value: "iron" },
        { text: "加购人数", value: "iron" },
        { text: "加购次数", value: "iron" },
        { text: "加购率", value: "iron" },
        { text: "收藏率", value: "iron" },
        { text: "收藏加购率", value: "iron" },
      ],
      desserts: [
        {
          name: "文具电教/文化用品/商务用品",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "文具电教/文化用品/商务用品",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      xAxis:[
        "04-06","04-11","04-16","04-21","04-26","05-01"
      ],
      yAxis:{cltHits:[150, 230, 224, 218, 135, 147]},
      dashboardbox: [
        {index:0,name:"cltHits",value:"273,731",cycleCrc:"-2.3%",title:this.$tools.NameValueConllection["cltHits"]},
        {index:1,name:"cltHot",value:"205,498",cycleCrc:"-2.11%",title:this.$tools.NameValueConllection["cltHot"]},
        {index:2,name:"pvHot",value:"2,819,517",cycleCrc:"-4.98%",title:this.$tools.NameValueConllection["pvHot"]},
        {index:3,name:"cartHot",value:"980,937",cycleCrc:"-4.70%",title:this.$tools.NameValueConllection["cartHot"]},
        {index:4,name:"uvHits",value:"817,423",cycleCrc:"-4.01%",title:this.$tools.NameValueConllection["uvHits"]},
        {index:5,name:"cartHits",value:"204,732",cycleCrc:"-4.70%",title:this.$tools.NameValueConllection["cartHits"]}
      ],
      loadash:[]
    };
  },
  methods: {
    drawCharts(xAxis,yAxis){
      let charts = this.$echarts.init(document.getElementById("charts"));
      charts.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: yAxis,
            type: 'line'
        }]
      });
    },
    loadAll() {
      this.isShow = !this.isShow;
      this.loading = true;
      if(this.dashboardbox != 0){
        this.loadChart(this.dashboardbox[0].name);
        this.loading = false;
        return;
      }
      var url = `https://sycm.taobao.com/mc/mq/supply/mkt/overview.json?dateType=recent30&dateRange=${this.getBeforeDate(30)}%7C${this.getBeforeDate(1)}&cateId=${this.GetQueryString("cateId")}&device=0&sellerType=-1&_=${Date.parse(new Date())}&token=${window.comm.token}`;
      var header = {
        authority: "sycm.taobao.com",
        method: "GET",
        path: url.replace("https://sycm.taobao.com", ""),
        scheme: "https",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "bx-ua": window.comm.overview.headers.bx_ua,
        "bx-umidtoken": window.comm.overview.headers.bx_umidtoken,
        "onetrace-card-id": window.comm.overview.headers.Onetrace_Card_Id,
        "sycm-referer": "/mc/mq/overview",
        "transit-id": window.comm.overview.headers.Transit_Id,
      };
      axios.get(url,{
        headers:header
      }).then((success) => {
        var overview = JSON.parse(this.$tools.AESDecrypt(success.data.data))
        this.dashboardbox = [];
        this.loadash = [];
        var key = 0;
        for(var item in overview){
          var result = {
            index: key,
            title: this.$tools.NameValueConllection[item],
            name:item,
            value: overview[item].value,
            cycleCrc: overview[item].cycleCrc,
          }
          this.loadash.push(result);
          key += 1;
        }
        this.loadChart(this.loadash[0].name);
      }).catch((error) =>{
        console.log(error)
      });
    },
    async loadChart(target){
      console.log(target);
      this.loading = true;
      if(this.dashboardbox.length != 0){
        this.drawCharts(this.xAxis,this.yAxis[target]);
        this.loading = false;
        return;
      }
      try {
        var header = {
          authority: "sycm.taobao.com",
          method: "GET",
          scheme: "https",
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "bx-ua": window.comm.overview.headers.bx_ua,
          "bx-umidtoken": window.comm.overview.headers.bx_umidtoken,
          "onetrace-card-id": window.comm.overview.headers.Onetrace_Card_Id,
          "sycm-referer": "/mc/mq/overview",
          "transit-id": window.comm.overview.headers.Transit_Id,
        };
        var key = 0;
        var dash_conllection = [];
        for (var item in this.loadash) {
          item = this.loadash[item].name;
          var url = `https://sycm.taobao.com/mc/mq/supply/mkt/trend/cate.json?dateType=day&dateRange=${this.getBeforeDate(1)}%7C${this.getBeforeDate(1)}&indexCode=${item}&cateId=${this.GetQueryString("cateId")}&device=0&sellerType=-1&_=${Date.parse(new Date())}&token=${window.comm.token}`;
          header.path = url.replace("https://sycm.taobao.com", "");
          var cateJson = (await this.sendGet(url,header)).self[item];
          this.yAxis[item] = [];
          for (let index = 5; index >= 0; index--) {
            this.xAxis.push(this.getBeforeDate(index*5+1).substring(5,this.getBeforeDate(index*5+1).length));
            this.yAxis[item].push(cateJson[index*5+1]);
          }
          var result = {
            index: key,
            title: this.$tools.NameValueConllection[item],
            value: eval(cateJson.join("+")),
            cycleCrc: this.loadash[key].cycleCrc,
          };
          dash_conllection.push(result);
          this.drawCharts(this.xAxis,this.yAxis[item])
          key += 1;
        }
        this.dashboardbox = dash_conllection;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    },
    getBeforeDate(offset) {
      var n = offset;
      var d = new Date();
      var year = d.getFullYear();
      var mon = d.getMonth() + 1;
      var day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      var s =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    },
    sendGet(url,header){
      return axios
        .get(url, {
          headers: header,
        })
        .then((success) => {
          var response = success.data;
          var data = this.$tools.AESDecrypt(response.data);
          response.data = JSON.parse(data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
  },
};
</script>
<style scoped>
  a{
    color: #d3d3d3;
  }
</style>