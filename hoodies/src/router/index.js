import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FAQ from '@/components/FAQ'
import Catalog from '@/components/Catalog'
import Favorite from '@/components/Favorite'
import Item from '@/components/Item'
import Delivery from '@/components/Delivery'
import Contact from '@/components/Contact'
import About from '@/components/About'
import Return from '@/components/Return'
import Admin from '@/components/Admin'
import AdminOrder from '@/components/AdminOrder'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/catalog',
            name: 'catalog',
            component: Catalog
        }, {
            path: '/favorites',
            name: 'favorite',
            component: Favorite
        }, {
            path: '/faq',
            name: 'faq',
            component: FAQ
        }, {
            path: '/delivery',
            name: 'delivery',
            component: Delivery
        }, {
            path: '/contact',
            name: 'contact',
            component: Contact
        }, {
            path: '/about',
            name: 'about',
            component: About
        }, {
            path: '/admin',
            name: 'admin',
            component: Admin
        }, {
            path: '/admin/:id',
            name: 'adminorder',
            component: AdminOrder
        }, {
            path: '/returnpolicy',
            name: 'returnpolicy',
            component: Return
        }, {
            path: '/item/:id',
            name: 'item',
            component: Item
        }
    ]
})
