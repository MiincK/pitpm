<template>
    <v-container>
        <v-row class="text1">
            <div class="text-size--3" style="width: 70%">
                Мы создаём универсальную моду
            </div>
            <div class="right" style="width: 20%; position: relative; right:0;">
                <img alt="none" :src="$me.assetshost + '/img/test/home_1.jpg'" style="width: 100%; z-index:-3" />
            </div>
            <div style="width: 20%; position:relative">
                <img alt="" :src="$me.assetshost + '/img/test/home_2.jpg'" style="width: 100%; z-index:-3" />
            </div>
                <div class="text-size--1-5 text-center" style="width: 50%; padding: 0 4%">
                    Создайте стильный образ с нашей коллекцией уютных и мягких толстовок.
                </div>
        </v-row>
        <v-row>
            <span class="text-size--3 text-center"><br/>
                Наши преимущества
            </span>
            <div v-for="item in good_sides" :key="item.id" style="width: 21%; margin: 0 6%" class="text-center">
                <div :style="'height: ' + item.offset + 'px'"></div>
                <img alt="none" :src="$me.assetshost + '/img/test/' + item.icon" style="width: 40%" />
                <div class="text-size--2 text-center mb-4">
                    {{item.title}}
                </div>
                <div class="text-size--1-2 text-center">
                    {{item.desc}}
                </div>
            </div>
        </v-row>
        <v-row>
            <span class="text-size--3 text-center"><br/>
                Актуальные товары
            </span>
            <div v-for="item in popular" :key="item.id" style="width: 17%; margin: 0 4%">
                <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" style="width: 100%;" />
                <v-btn class="third background--text" style="width: 90%; margin: 5%;" @click="$router.push({name:'item', params: {id: item.id}})">
                    Подробнее
                </v-btn>
                <v-btn class="primary--text secondary" style="width: 90%; margin: 5%;" @click="$emit('cart', item.id, 1, !0)">
                    В корзину
                </v-btn>
            </div>
            <v-btn class="third background--text" style="width: 20%; padding: 2%; margin: 0 40%" :to="{ path: '/catalog' }">
                Перейти в каталог
            </v-btn>
        </v-row>
        <v-row>
            <FAQ/>
        </v-row>
    </v-container>
</template>

<script>
import FAQ from '@/components/FAQ'
export default {
    name: 'Home',
    components: {
        FAQ
    },
    data: () => ({
        popular: [],
        good_sides: 
        [
            {
                id: 1,
                icon: 'icon-material.png',
                title: 'Материалы',
                desc: 'Мы используем только натуральные и экологически чистые материалы',
                offset: 0,
            }, {
                id: 2,
                icon: 'icon-comfort.png',
                title: 'Комфорт',
                desc: 'Мы проектируем и моделируем до тех пор, пока вещь не станет идеальной',
                offset: 100
            }, {
                id: 3,
                icon: 'icon-simple.png',
                title: 'Простота',
                desc: 'Мы верим, что простота в одежде максимально выражает индивидуальность человека'
            },
        ]
    }),
    created() {
        this.axios.get(this.$me.apihost + "/items/popular")
            .then((res) => {
                this.popular = res.data;
            }).catch((err) => {
            });
    },
}
</script>

<style scoped>
    .row {
        height: 70vh;
    }
    .text1 {
        padding: 10%
    }
</style>