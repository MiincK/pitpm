import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FAQ from '@/components/FAQ'
import Catalog from '@/components/Catalog'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/catalog',
            name: 'catalog',
            component: Catalog
        }, {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/faq',
            name: 'faq',
            component: FAQ
        }, {
            path: '/item/:id',
            name: 'item',
            component: Item
        }
    ]
})
