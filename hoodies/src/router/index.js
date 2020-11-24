import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FAQ from '@/components/FAQ'
import Catalog from '@/components/Catalog'
import Item from '@/components/Item'
import Delivery from '@/components/Delivery'
import Cart from '@/components/Cart'

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
            path: '/delivery',
            name: 'delivery',
            component: Delivery
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart
        }, {
            path: '/item/:id',
            name: 'item',
            component: Item
        }
    ]
})
