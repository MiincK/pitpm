import Vue from 'vue';
import Vuetify from 'vuetify/es5';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#7B3F3D',
                secondary: '#DDC1BE',
                third: '#A69292',
                background: '#FFF5F5',
                accent: '#0A0A0A',
            }
        }
    }
});
