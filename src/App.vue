<!--
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-29 22:34:50
 * @LastEditTime: 2021-05-31 09:44:12
 * @LastEditors: minggege
 * @FilePath: \extensions\src\App.vue
-->
<template>
  <v-app>
    <v-main>
      <overview ref="ovw" />
      <industrycomposition></industrycomposition> 
    </v-main>
  </v-app>
</template>

<script>
import overview from "./components/overview";
import industrycomposition from "./components/industrycomposition";
export default {
  name: "App",
  components: {
    overview,
    industrycomposition
  },
  data: () => ({
    overview_isShow: false,
  }),
  mounted() {
    window.extensions = this;
  },
  methods: {
    click(func_name) {
      if (func_name == "overview") {
        this.$refs.ovw.loadAll();
      }
    },
    test(){
      this.$refs.ovw.test();
    },
    minggege(){

    }
  },
};
</script>