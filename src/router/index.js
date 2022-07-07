import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')

const Login = () => import('@/views/Login')
const Search = () => import('@/views/search')
const Article = () => import('@/views/Article')
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
        name: Home
      },
      {
        path: 'video',
        component: Video
      }, {
        path: 'my',
        component: My,
        name: 'My'
      }, {
        path: 'question',
        component: Question
      }
    ]
  },
  {
    path: '/article/:article_id',
    component: Article,
    name: 'article',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
