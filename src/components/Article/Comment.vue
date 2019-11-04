<template>
  <div>
    <div class="comments">
      <div class="comment-post row">
        <input
          type="hidden"
          name="_xsrf"
          value="2|45954acb|97963bbb778f3fc3f06189fef38f0b5e|1571631309"
        />
        <textarea v-model="content" class="comment-text fl" placeholder="说点什么吧！" name="detail"></textarea>
        <button @click="addComment" type="submit" class="comment-btn fr">评论</button>
      </div>
    </div>
    <div class="comment-list" data-pid="1030">
      <ul class="tab row">
        <li class="cur">
          最新评论（
          <span>{{comments.length}}</span>）
        </li>
      </ul>
      <div class="comments-dom">
        <div class="comments-loading">
          <img src="@/assets/picture/loading.gif" alt="正在加载 - 悦读FM" /> 正在加载……
        </div>
        <ul class="comments-list">
          <template v-if="comments.length">
            <li v-for="(comment,index) in comments" :key="comment.id">
              <div class="comment-avatar fl">
                <router-link :to="'/user/'+comment.user_id">
                  <img :src="comment.avatar" />
                </router-link>
              </div>
              <div class="comment-c">
                <div class="comment-meta">
                  <router-link
                    :to="'/user/'+comment.user_id"
                    class="comment-user"
                  >{{comment.nikiname}}</router-link>
                  <span>大家好啊，他像我们走来了</span>
                  <span>{{comment.reply_time}}</span>
                  <a v-if="comment.isDel" href="javascript:;" class="fr comment-delete">
                    <i @click="delComment(comment.id,index)" class="fa fa-remove"></i>
                  </a>
                </div>
                <div class="comment-p">{{comment.content}}</div>
              </div>
            </li>
          </template>
          <li v-else class="no-comment">暂无评论</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: ""
    };
  },
  props: {
    comments: Array
  },
  methods: {
    addComment() {
      axios
        .post("http://172.16.16.100:3000/api/comment", {
          article_id: this.$route.params.id,
          content: this.content
        })
        .then(res => {
          // console.log(res);
          if (res.data.res_code === 200) {
            this.$emit("sendComment", res.data.res);
            this.content = "";
          }
        });
    },
    delComment(id, index) {
      axios.delete("http://172.16.16.100:3000/api/comment/" + id).then(res => {
        // console.log(11);
        
        // console.log(res);
        if (res.data.res_code === 200) {
          this.$emit("sendIndex", index);
        }
      });
    }
  }
};
</script>

<style>
</style>