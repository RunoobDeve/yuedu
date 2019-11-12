# yuedu1
`vue` + `vue-router`实现悦读网站


## install
+ 下载代码: `git clone https://github.com/RunoobDeve/shopping.git`
+ 安装依赖: `npm install`
+ 启动项目: `npm run dev`
> 运行环境: [node v9.11.1](https://nodejs.org/zh-cn/download/ 'Node.js') *npm 5.6.0*

## 需求分析
1. 登录页面、文章列表页（网站首页）、文章详情页、文章分页
2. 可按文章类型对商品进行筛选
3. 点击收藏可以收藏
4. 添加评论、删除评论
5. 个人主页以及个人收藏



*** axios配置 ***

```javascript
// 请求拦截
axios.interceptors.request.use(config=>{
  // console.log(config)
  if(localStorage.getItem('token')){
    config.headers.Authorization='Bearer ' +localStorage.getItem('token')
  }
  return config
})


// 响应拦截

axios.interceptors.response.use(res=>{
  // console.log(res);
  if(res.data.res_code===401){
    alert('请登录')
    bus.$emit('logout')
  }
  return res
})
```


***路由配置***
```javascript
  {
        path: '/',
        redirect: 'channel/1',
        component: Index,
        children: [
            {
                path: 'channel/:id',
                component: () => import('@/views/index/Channel')
            },
            {
                path: 'article/:id',
                component: () => import('@/views/index/ArticleDetail')
            },
        ]
    },
    {
        path: '/user/:id',
        component: User
    }
````


***API设置***

配置PHPstudy、mysql,将db文件导入到MySQL中,
安装node.js 在API文件中打开命令窗口输入npm i安装依赖包，然后输入npm run dev启动接口


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

## 参考资料
[phpstudy下载、安装、配置、网站部署](https://jingyan.baidu.com/article/335530dafae53519ca41c37a.html)

[MySQL 教程](https://www.runoob.com/mysql/mysql-database-import.html)

