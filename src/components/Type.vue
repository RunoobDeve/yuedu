<template>
  <div id="hd">
    <div class="hd-wp row">
      <div class="logo fl">
        <a href="/">
          <span class="mlogo fl row">
            <span class="logo-a fl"></span>
            <span class="logo-b fl"></span>
            <span class="logo-c fl"></span>
          </span>悦读 FM
        </a>
      </div>
      <div class="mine fr">
        <!-- v-if="!userInfo" -->
        <div v-if="!userInfo.id" class="login">
          <a href="javascript:;" @click="show=true;login_show=true" data-pop="login">登录</a>
          <a href="javascript:;" data-pop="register" @click="show=true;register_show=true">注册</a>
        </div>
        <div v-else class="loged">
          <a href="javascript:;" class="my" @click.stop="menushow=false">
            {{userInfo.nikiname}}
            <i class="fa fa-angle-down"></i>
          </a>
          <div :class="['user-menu',{hide:menushow}]">
            <ul>
              <li>
                <router-link :to="'/user/'+userInfo.id">个人主页</router-link>
              </li>
              <li>
                <a href="/setting/base/" target="_blank">设置</a>
              </li>
              <li>
                <a href="javascript:;" id="signOut" rel="nofollow">退出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="search fr row">
        <form method="POST" target="_blank" action="/search/">
          <input
            type="hidden"
            name="_xsrf"
            value="2|45954acb|97963bbb778f3fc3f06189fef38f0b5e|1571631309"
          />
          <input type="text" class="key fl" name="searchStr" />
          <button type="submit" class="sbtn fr">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div class="menu">
        <router-link
          exact-active-class="cur"
          v-for="item in menu"
          :key="item.id"
          :to="'/channel/' + item.id"
        >{{item.type}}</router-link>
      </div>
    </div>

    <transition name="fade">
      <div v-if="show" class="pop" id="login" style></div>
    </transition>

    <!-- 注册 -->

    <transition name="register_move">
      <div v-if="register_show" class="pop-wp" style="z-index: 1000;">
        <a
          href="javascript:;"
          rel="nofollow"
          @click="register_show=false;show=false"
          title="关闭"
          class="pop-close"
        >×</a>
        <div class="pop-title">注册</div>
        <div id="registerForm">
          <input
            type="hidden"
            name="_xsrf"
            value="2|46abc462|9a00b223a675180dd09915b02a5d800f|1572318533"
          />
          <div class="account-form">
            <input
              type="text"
              v-model="register_info.nikiname"
              class="account-input"
              placeholder="昵称"
            />
            <div id="error_tip_rusername" class="error-tip"></div>

            <div class="account-line"></div>
            <input
              type="password"
              v-model="register_info.username"
              class="account-input"
              placeholder="用户名"
            />
            <div class="account-line"></div>
            <input type="email" v-model="register_info.email" class="account-input" placeholder="邮箱" />
            <div id="error_tip_remail" class="error-tip"></div>
            <div class="account-line"></div>
            <input
              type="password"
              v-model="register_info.password"
              id="rpassword"
              class="account-input"
              placeholder="密码"
            />
            <div id="error_tip_rpassword" class="error-tip"></div>
          </div>
          <div class="account-other">
            <label>
              <input @click="agree=!agree" type="checkbox" id="angree" value="1" /> 我已认真阅读并同意悦读FM的
              <a href="/agreement/" class="red-link" target="_blank">《使用协议》</a>
            </label>
            <div id="error_tip_angree" class="error-tip"></div>
          </div>
          <button class="account-btn" @click="register">注册</button>
        </div>
      </div>
    </transition>
    <!-- 登录 -->
    <transition name="login_move">
      <div v-if="login_show" class="pop-wp" style="z-index: 1000;">
        <a
          href="#"
          rel="nofollow"
          title="关闭"
          @click="login_show=false;show=false"
          class="pop-close"
        >×</a>
        <div class="pop-title">登录</div>

        <div id="loginForm">
          <input
            type="hidden"
            name="_xsrf"
            value="2|da659d7d|c55cd6e8a88c8617441fd756c2430f67|1571972419"
          />
          <div class="account-form">
            <input type="text" class="account-input" v-model="login_info.email" placeholder="邮箱" />
            <div id="error_tip_email" class="error-tip"></div>
            <div class="account-line"></div>
            <input
              type="password"
              class="account-input"
              v-model="login_info.password"
              placeholder="密码"
            />
            <div id="error_tip_lpassword" class="error-tip"></div>
          </div>
          <div class="account-other">
            <span class="fr">
              <a href="/retrieve/" class="red-link" target="_blank">忘记密码</a>
            </span>
            <label>
              <input type="checkbox" value="1" name="nextauto" /> 下次自动登录
            </label>
          </div>
          <button type="submit" @click="login" class="account-btn">登 录</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import bus from "@/bus.js";
export default {
  data() {
    return {
      login_info: {
        email: "",
        password: ""
      },
      register_info: {
        nikiname: "",
        username: "",
        email: "",
        password: ""
      },
      show: false,
      login_show: false,
      register_show: false,
      userInfo: JSON.parse(localStorage.getItem("user") || "{}"),
      menushow: true,
      agree: false
    };
  },
  props: {
    menu: Array
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/user/login", this.login_info)
        .then(res => {
          // console.log(res.data.res.token);
          if (res.data.res_code === 200) {
            localStorage.setItem("token", res.data.res.token);
            localStorage.setItem("user", JSON.stringify(res.data.res.user));
            this.userInfo = res.data.res.user;
            this.show = false;
            this.login_show = false;
          } else {
            alert("用户名或密码错误");
          }
        });
    },
    register() {
      if (this.agree) {
        axios
          .post("http://localhost:3000/api/user", this.register_info)
          .then(res => {
            // console.log(res.data.res.token);
            if (res.data.res_code === 200) {
              console.log(res.data);
              this.show = false;
              this.register_show = false;
            }else{
              alert("邮箱被占用")
            }
          });
      }else{
        alert("未同意协议")
      }
    }
    // changeState(){
    //   // console.log(1);

    //   this.menushow=!this.menushow
    // }
  },
  created() {
    bus.$on("logout", () => {
      localStorage.removeItem("user");
      this.userInfo = {};
    });
    bus.$on("changeMenu", show => {
      this.menushow = show;
    });
  }
};
</script>

<style scoped>
.fade-leave-to,
.fade-enter {
  opacity: 0;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active {
  transition: all 0.5s 0.4s;
}
.fade-enter-active {
  transition: all 0.5s;
}

.login_move-enter {
  left: -50%;
}

.login_move-enter-to {
  left: 50%;
}
.login_move-leave {
  left: 50%;
}

.login_move-leave-to {
  left: 150%;
}

.login_move-enter-active {
  transition: all 0.5s 0.4s;
}

.login_move-leave-active {
  transition: all 0.5s;
}

.register_move-enter {
  left: -50%;
}

.register_move-enter-to {
  left: 50%;
}
.register_move-leave {
  left: 50%;
}

.register_move-leave-to {
  left: 150%;
}

.register_move-enter-active {
  transition: all 0.5s 0.4s;
}

.register_move-leave-active {
  transition: all 0.5s;
}
</style>
