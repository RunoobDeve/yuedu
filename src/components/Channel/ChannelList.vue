<template>

    <div class="wp fl">
      <ul class="channels">
        <li v-for="article in articles" :key="article.id">
          <div class="channel-pic fl">
            <router-link :to="'/article/'+article.id">
              <img
                :src="article.img_url"
                alt="爱因斯坦的梦——因果不定的世界 - 悦读FM"
              />
            </router-link>
          </div>
          <div class="channel-body">
            <div class="channel-title">
              <router-link :to="'/article/'+article.id">{{article.title}}</router-link>
            </div>
            <div class="channel-meta">
              <span>
                <i class="fa fa-pencil"></i> {{article.author}}
              </span>
              <span>
                <i class="fa fa-microphone"></i> {{article.podcast}}
              </span>
              <span>
                <i class="fa fa-clock-o"></i> {{article.duration}}
              </span>
              <span>
                <i class="fa fa-headphones"></i> {{article.play_time}}次
              </span>
            </div>
            <div
              class="channel-desc"
            >{{article.content.slice(0,70)}}...</div>
          </div>
        </li>
      </ul>
      <Page :currentpage='currentpage' :total="total" @page-change="getpage"></Page>
    </div>  

</template>

<script>
import Page from './Page'
export default {
  data(){
    return {
      currentpage:1
    }
  },
	props:{
    articles:Array,
    total:Number
  },
  components:{
    Page
  },
  methods:{
    getpage(num){
      this.currentpage=num,
      this.$emit('changenum',num)
    }
  }
};
</script>

<style>
</style>