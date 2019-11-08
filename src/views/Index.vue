<template>
  <div>
    <Type :menu="menu"></Type>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <Foot></Foot>
  </div>
</template>

<script>
import axios from "axios";
import Type from "../components/Type";
import Foot from "../components/Foot";
export default {
  data() {
    return {
      menu: []
    };
  },
  components: {
    Type,
    Foot
  },
  methods: {
    getTypes() {
      axios.get("http://localhost:3000/api/types").then(res => {
        this.menu = res.data.res;
      });
    }
  },
  created() {
    this.getTypes();
  }
};
</script>

<style>
</style>