<template>
  <div id="bd" class="row">
      <ChannelList :total="total" :articles="articles" @changenum="pageChange"></ChannelList>
      <ChannelTop10 :articles="articlesTop10" :type="type"></ChannelTop10>
  </div>
</template>

<script>
import axios from "axios";
import ChannelList from "@/components/Channel/ChannelList";
import ChannelTop10 from "@/components/Channel/ChannelTop10";
import { log } from "util";
import { get } from "http";
export default {
  data() {
    return {
      articles: [],
      articlesTop10: [],
      type: "",
      total:0,
    };
  },
  components: {
    ChannelList,
    ChannelTop10
  },
  methods: {
    getArticle(id,page=1) {
      axios
        .get(`http://localhost:3000/api/articles/${id}/page/${page}`)
        .then(res => {
          this.articles = res.data.res.articles;
          // console.log(this.articles);
          this.total=res.data.res.count
        });
    },

    getTop10(id) {
      axios
        .get(`http://localhost:3000/api/articles/${id}/top10`)
        .then(res => {
          // console.log(res);
          this.articlesTop10 = res.data.res.articles;
          this.type = res.data.res.type;
        });
    },
    pageChange(num){
      // console.log(num);
      const id = this.$route.params.id;
      this.getArticle(id,num)
    }
  },
  created() {
    {
      const id = this.$route.params.id;
      this.getArticle(id), this.getTop10(id);
    }
  }
};
</script>

<style>
</style>