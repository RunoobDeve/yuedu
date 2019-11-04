<template>
  <div class="side fr">
    <div class="side-sponsor">
      <img src="http://yuedufm.com/static/website/images/yueduwx_2.jpg" />
    </div>
    <div class="channel-item channel-top10">
      <h3>{{type}}频道 TOP10</h3>
      <ul class="channel-list">
        <li v-for="article in articles" :key=article.id>
          <router-link :to="'/article/'+article.id">{{article.title}}</router-link>
          <div>
            <span>文：{{article.author}}</span>
            <span>主播：{{article.podcast}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="side-sponsor">
      <div class="fmad"></div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        articles:Array,
        type:String
    }
};
</script>

<style>
</style>