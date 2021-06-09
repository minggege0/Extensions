<!--
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-29 22:34:50
 * @LastEditTime: 2021-06-09 16:19:45
 * @LastEditors: minggege
 * @FilePath: \extensions\src\App.vue
-->
<template>
  <v-app>
    <v-main>
      <overview ref="ovw" />
      <industrycomposition ref="composition"></industrycomposition>
      <industrydistribution ref="distribution"></industrydistribution>
      <regiondistribution ref="region"></regiondistribution>
      <hotsearchterms ref="search"></hotsearchterms>
    </v-main>
  </v-app>
</template>

<script>
import overview from "@/components/overview"
import industrycomposition from "@/components/industrycomposition"
import industrydistribution from "@/components/Industrydistribution.vue"
import regiondistribution from "@/components/regiondistribution.vue"
import hotsearchterms from "@/components/hotsearchterms.vue"
export default {
  name: "App",
  components: {
    overview,
    industrycomposition,
    industrydistribution,
    regiondistribution,
    hotsearchterms
  },
  data: () => ({
    overview_isShow: false
  }),
  mounted() {
    window.extensions = this
  },
  methods: {
    click(func_name) {
      if (func_name === "overview") {
        this.$refs.ovw.loadAll()
      } else if (func_name === "composition") {
        this.$refs.composition.open()
      } else if (func_name === "distribution") {
        this.$refs.distribution.open()
      }else if(func_name === "region"){
        this.$refs.region.open()
      }else if(func_name === "search"){
        this.$refs.search.open()
      }
    },
    test() {
      this.$refs.ovw.test()
    }
  },
}
</script>