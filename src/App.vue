<template>
  <div id="app" @click="ChangeState">
      <router-view></router-view>
  </div>
</template>

<script>
import Index from "./views/Index";
import bus from './bus'

export default {
  name: "app",
  components: {
    Index
  },
  methods:{
    ChangeState(){
      bus.$emit('changeMenu',true)
    }
  }
};
</script>

<style>
</style>
