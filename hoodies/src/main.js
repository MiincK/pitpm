// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VuetifyNumberInput from '@jzolago/vuetify-number-input'
import router from './router'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VuetifyNumberInput);

((v) => {
    function plugin(Vue, obj) {
        if (plugin.installed) {
            return
        }
        plugin.installed = true
        if (!obj) {
            console.error('You have to install axios')
            return
        }

        Vue.$me = obj
        Object.defineProperties(Vue.prototype, {
            $me: {
                get() {
                    return obj
                }
            },
        })
    }
    var obj = {};
    v.use(plugin, obj);
})(Vue);

Vue.$me.apihost = "https://pitpm.miinc.ru/api/1";
Vue.$me.assetshost = "https://pitpm.miinc.ru/assets";
Vue.prototype.$forceCompute= function(computedName, forceUpdate /* default: true */) {
	if (this._computedWatchers[computedName]) {
		this._computedWatchers[computedName].run();
		if (forceUpdate || typeof forceUpdate == 'undefined') this.$forceUpdate()
	}
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    vuetify,
    template: '<App/>'
})
