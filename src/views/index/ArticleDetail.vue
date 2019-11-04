<template>
  <div id="bd" class="row">
    <div class="wp fl">
      <Article :article="article"></Article>
      <div class="item-pg row">
        <span v-if="(+$route.params.id>1)" class="fl">
          <router-link :to="'/article/'+($route.params.id-1)" class="podcast-prev">
            <i class="fa fa-angle-left"></i> 上一篇
          </router-link>
        </span>
        <span class="fr">
          <router-link :to="'/article/'+(+$route.params.id+1)" class="podcast-prev">
            下一篇
            <i class="fa fa-angle-right"></i>
          </router-link>
        </span>
      </div>
      <!-- 评论 -->
      <Comment :comments="comments" @sendComment="getComment" @sendIndex="getIndex"></Comment>
    </div>
    <div class="side fr">
      <div class="s-user">
        <div class="s-user-base row">
          <div class="s-user-avatar fl">
            <a href="/user/187/" target="_blank">
              <img src="@/assets/picture/a44d13f4b21841698fa3198509923eb7.gif" alt="薇薇 - 悦读FM" />
            </a>
          </div>
          <div class="s-user-c">
            <div class="s-user-name">
              <a href="/user/187/" target="_blank">{{article.podcast}}</a>
              <a href="/join/" title="悦读FM主播" target="_blank" class="gray-link">
                <i class="fa fa-microphone"></i>
              </a>
            </div>
            <div class="s-user-info row">
              <div class="s-user-status fl">
                作品：31
                <br />粉丝：
                <span class="fans-count">117</span>
              </div>
              <div class="s-user-follow fr">
                <a href="javascript:;" data-uid="187" class="follow-link">关注</a>
              </div>
            </div>
          </div>
        </div>
        <div class="item-status">
          <a href="javascript:;" data-pid="1030" class="item-s-btn" id="item_digg" title="点个赞！">
            <span class="item-s-b">
              <i class="fa fa-thumbs-up"></i>
              <span class="item-s-tip">赞</span>
            </span>
            <span id="digg_num">1</span>
          </a>
          <a
            href="javascript:;"
            data-pid="1030"
            :class="['item-s-btn',{cur:article.isLiked}]"
            id="item_collect"
            title="收藏本文"
          >
            <span @click="collect($route.params.id)" class="item-s-b">
              <i class="fa fa-heart"></i>
              <span class="item-s-tip">{{article.isLiked?"取消":'点赞'}}</span>
            </span>
            <span id="collect_num">{{article.like_count}}</span>
          </a>
          <a href="#" class="item-s-btn shang" title="打赏主播">
            <span class="item-s-b">
              <i class="fa">
                <strong>赏</strong>
              </i>
              <span class="item-s-tip">打赏</span>
            </span>
            <span class="item-s-img">
              <img src="@/assets/picture/54f6d44175b0483f9c55faf70eeb6e34.gif" />
            </span>
          </a>
        </div>
      </div>

      <!-- 轮播 -->
      <ArticleCarousel :articles="articles"></ArticleCarousel>

      <!-- 五篇 -->
      <ArticleRand :articles="articlesRand" :id="article.type_id"></ArticleRand>
      <!--<div class="side-sponsor">
                <img src="@/assets/picture/yueduwx_2.jpg">
            </div>
      -->
      <div class="side-sponsor">
        <div class="fmad"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Article from "@/components/Article/Article";
import ArticleCarousel from "@/components/Article/ArticleCarousel";
import ArticleRand from "@/components/Article/ArticleRand";
import Comment from "@/components/Article/Comment";
export default {
  data() {
    return {
      article: {},
      articles: [],
      articlesRand: [],
      comments: []
    };
  },
  components: {
    Article,
    ArticleCarousel,
    ArticleRand,
    Comment
  },
  methods: {
    getArticle(id) {
      axios
        .get(`http://172.16.16.100:3000/api/article/${id}`)
        .then(res => {
          // console.log(res);
          this.article = res.data.res;
          const typeId = this.article.type_id;
          return axios.get(
            `http://172.16.16.100:3000/api/articles/${typeId}/rand`
          );
        })
        .then(res => {
          this.articlesRand = res.data.res;
        });
    },
    getArticleCarousel() {
      axios.get("http://172.16.16.100:3000/api/articles/rand").then(res => {
        this.articles = res.data.res;
      });
    },
    getComments(id) {
      axios
        .get(`http://172.16.16.100:3000/api/comments/${id}/page/1`)
        .then(res => {
          if (res.data.res_code === 200) {
            this.comments = res.data.res;
          }
        });
    },
    collect(id) {
      // console.log(id);
      if (this.article.isLiked) {
        axios
          .delete(`http://172.16.16.100:3000/api/article/${id}/like `)
          .then(res => {
            if (res.data.res_code === 200) { 
              (this.article.isLiked = false), this.article.like_count--;
            }
          });
      } else {
        axios
          .post(`http://172.16.16.100:3000/api/article/${id}/like `)
          .then(res => {
            if (res.data.res_code === 200) {
              (this.article.isLiked = true), this.article.like_count++;
            }
          });
      }
    },
    getComment(comment) {
      this.comments.unshift(comment);
    },
    getIndex(index) {
      this.comments.splice(index, 1);
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getArticle(id);
    this.getArticleCarousel();
    this.getComments(id);
  }
};
</script>

<style>
</style>