<template>
  <div>
    <div class="my-head">
      <div class="my-bg">
        <img src="@/assets/picture/9.jpg" alt="浅草君的个人主页 - 悦读FM" />
      </div>
      <div class="my-base">
        <div class="my-avatar">
          <a href="/user/100/">
            <img src="@/assets/picture/12bed30e738c4a79b5809a943b82338d.gif" alt="浅草君的个人主页 - 悦读FM" />
          </a>
        </div>
        <div class="my-info">
          <h1 class="my-name">浅草君</h1>
          <div class="my-desc">
            2014年12月04日加入
            来自广东,深圳
          </div>
        </div>
        <div class="my-social">
          <a href="http://weibo.com/tylyly" class="social-weibo" target="_blank">
            <i class="fa fa-weibo"></i>
          </a>
          <a href="http://www.douban.com/people/tyly.hi/" class="social-douban" target="_blank">豆</a>
        </div>
        <div class="my-follow">
          <a href="/user/100/following/">关注 161</a>
          <span></span>
          <a href="/user/100/follower/">粉丝 22</a>
        </div>&nbsp;
        <a href="javascript:;" data-uid="100" class="follow-link">关注</a>
      </div>
    </div>
    <ArticleCollect :Articles="Articles"></ArticleCollect>
  </div>
</template>

<script>
import ArticleCollect from "@/components/ArticleCollect";
import axios from "axios";
import ArticleCollectVue from "../components/ArticleCollect.vue";
export default {
  components: { ArticleCollect },
  data() {
    return { Articles: [] };
  },
  methods: {
    getCollect() {
      axios.get("http://172.16.16.100:3000/api/articles/like").then(res => {
        // console.log(res);
        this.Articles=res.data.res
      });
    }
  },
  created(){
      this.getCollect()
  }
};
</script>

<style>
</style>