<template>
  <div class="my-wp">
    <div class="my-list">
      <h3>
        <strong>浅草君的收藏</strong>（
        <router-link to="/user/100/collected/">
          全部
          <span class="red">{{Articles.length}}</span>个
        </router-link>）
      </h3>
      <ul class="row">
        <li v-for="article in Articles" :key="article.id">
          <router-link :to="'/article/'+article.id">
            <div class="my-list-pic">
              <span class="item-play">
                <i class="fa fa-play"></i>
              </span>
              <img
                :src="article.img_url"
                :alt="article.title+ '- 悦读FM'"
              />
            </div>
            <div class="my-list-name">{{article.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Articles: Array
  }
};
</script>

<style>
</style>