<template>
  <div class="pg">
    <a @click="changepage(currentpage11)" href="javascript:;" v-if="currentpage>1">上一页</a>
    <template v-for="num in pages">
      <a
        href="javascript:;"
        @click="changepage(num)"
        :class="{cur:num===currentpage}"
        v-if="num<=end&&num>=start"
        :key="num"
      >{{num}}</a>
    </template>
    <a @click="changepage(currentpage+1)" href="javascript:;" v-if="currentpage<pages">下一页</a>
  </div>
</template>

<script>
export default {
  //   data() {
  //     return {
  //       pages: 0,
  //       interval: 3,
  //       currentpage: 1
  //     };
  //   },
  props: {
    currentpage: { type: Number, default: 1 },
    total: { type: Number, default: 500 },
    interval: { type: Number, default: 3 }
  },
  methods: {
    changepage(num) {
      //   console.log(num);
      this.$emit("page-change", num);
    }
  },
  computed: {
    start() {
      if (this.currentpage + this.interval >= this.pages) {
        return this.pages - this.interval * 2;
      }
      return this.currentpage >= this.interval + 1
        ? this.currentpage - this.interval
        : 1;
    },
    end() {
      return this.currentpage >= this.interval + 1
        ? this.currentpage + this.interval
        : 7;
    },
    pages() {
      return Math.ceil(this.total / 10);
    }
  }
};
</script>

<style>
</style>