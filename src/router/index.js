import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import User from '@/views/User'
Vue.use(VueRouter)


const routes = [
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
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router