import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Canteen from '@/components/Canteen'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      	path: '/',
      	name: 'welcome',
  		component: Hello
    },
    {
    	path: '/canteen',
    	name: 'canteen',
    	component: Canteen
    },
    {
    	path: '/home',
    	name: 'home',
    	component: Home
    }
  ]
})
