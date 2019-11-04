<template>
  <div class="item">
    <div class="item-base">
      <div class="item-name">{{article.title}}</div>
      <div class="item-meta">
        <span class="fr">
          播放
          <span class="f16">{{article.play_time}}</span> 次
        </span>
        <em>
          <i class="fa fa-pencil"></i>
          {{article.author}}
        </em>
        <em>
          <i class="fa fa-microphone"></i>
          {{article.podcast}}
        </em>
        <em>
          <i class="fa fa-clock-o"></i>
          {{article.duration}}
        </em>
      </div>
      <div class="item-pic">
        <img :src="article.img_url" alt="爱因斯坦的梦——因果不定的世界 - 悦读FM" />
      </div>
      <div id="yuedu_player"></div>
      <div id="jp_container_1" class="yd-player row">
        <div class="yd-controls jp-controls fl">
          <a href="javascript:;" class="jp-play" tabindex="1" data-pid="1030">
            <i class="fa fa-play"></i>
          </a>
          <a href="javascript:;" class="jp-pause" tabindex="1">
            <i class="fa fa-pause"></i>
          </a>
        </div>
        <div class="yd-duration jp-duration fr"></div>
        <div class="yd-progress jp-progress">
          <div class="yd-seek-bar jp-seek-bar">
            <div class="yd-play-bar jp-play-bar"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-intro row">
      <div :class="{open: show}">
        <span class="item-intro-hide" v-if="!show"></span>
        <div v-html="articleContent"></div>
      </div>
      <a href="javascript:;" @click="show = !show" class="item-intro-more fr">
        {{show ? '收起' : '展开全文'}}
        <i :class="['fa', show ? 'fa-angle-up' : 'fa-angle-down']"></i>
      </a>
    </div>
    <div class="item-f row">
      <div class="item-tags fl">
        <strong>标签：</strong>
        <router-link
          v-for="(label,index) in labels"
          :key="index"
          to="/tag/艾伦·莱特曼/"
          target="_blank"
        >{{label}}</router-link>
      </div>
      <div class="item-share fr">
        <div class="bdsharebuttonbox">
          <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
          <a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a>
          <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
          <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    articleContent() {
      return this.article.content
        ? this.article.content.replace(/\s/g, "<br>")
        : "";
    },
    labels() {
      return this.article.labels ? this.article.labels.split(",") : [];
    }
  },
  props: {
    article: Object
  }
};
</script>

<style>
</style>