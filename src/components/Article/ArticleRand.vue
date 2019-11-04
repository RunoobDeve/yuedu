<template>
  <div class="channel-item">
    <h3>
      <span class="fr">
        <router-link :to="'/channel/'+id">
          查看全部
          <i class="fa fa-angle-right"></i>
        </router-link>
      </span>悦读FM频道其他节目
    </h3>
    <ul class="channel-list">
      <li v-for="article in articles" :key="article.id">
        <router-link :to="'/article/'+article.id">{{article.title}}</router-link>
        <div>
          <span>文：{{article.author}}</span>
          <span>主播：{{article.podcast}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        articles:Array,
        id:[String,Number]
    }
};
</script>

<style>
</style>