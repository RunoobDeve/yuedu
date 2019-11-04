<template>
  <div class="related-item">
    <h3>
      <span class="fr">
        <a href="javascript:;" @click="prev" :class="['scroll-prev',{none:index==0}]">
          <i class="fa fa-angle-left"></i>
        </a>
        <a href="javascript:;" @click="next" :class="['scroll-prev',{none:index==4}]">
          <i class="fa fa-angle-right"></i>
        </a>
      </span>其他相关节目
    </h3>
    <div class="related-list scroll-wp row" :style="'width:1650px;transform:translate3d('+(-index*330)+'px,0,0)'">
      <ul>
        <li v-for="article in articles" :key="article.id">
          <a href="/article/692/">
            <img :src="article.img_url" alt="但是你没有 - 悦读FM" />
            <span>{{article.title}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      index:0
    }
  },
  methods:{
    next(){
      if(this.index<4){
        this.index++
      }
    },
    prev(){
      if(this.index>0){
        this.index--
      }
    },
    // auto(){
    //   setInterval(()=>{
    //     if(this.index<4){
    //       this.next()
    //     }
    //   }, 2000);
    // }
  },
  created(){
    // this.auto()
  },
  props:{
    articles:Array
  }
};
</script>

<style>
  .related-list{
    transition: all .3s
  }
</style>