<template>
    <v-container style="max-width: 1200px">
        <v-row>
            <img alt="none" src="@/assets/img/placeholder.png" class="placeholder" style="height: 70vh; width: 100%;" />
        </v-row>
        <v-row class="text1">
            <div class="left" style="width: 80%">
                <span class="text-size--2">
                    Мы создаём универсальную моду
                </span><br/>
                <span class="text-size--1-2">
                    Создайте стильный образ с нашей коллекцией уютных и мягких толстовок.
                </span>
            </div>
            <div class="right" style="width: 20%">
                <img alt="none" src="@/assets/img/placeholder.png" class="placeholder" style="width: 100%; height: 70%" />
            </div>
        </v-row>
        <v-divider style="margin: 0 5%"></v-divider>
        <v-row>
            <span class="text-size--3 text-center"><br/>
                Актуальные товары
            </span>
            <div v-for="item in [1, 2, 3, 4]" :key="item" style="width: 17%; margin: 0 4%">
                <img alt="none" src="@/assets/img/placeholder.png" class="placeholder" style="width: 100%" />
                <v-btn class="third background--text" style="width: 90%; margin: 5%;">
                    Подробнее
                </v-btn>
                <v-btn class="primary--text secondary" style="width: 90%; margin: 5%;">
                    В корзину
                </v-btn>
            </div>
            <v-btn class="third background--text" style="width: 20%; padding: 2%; margin: 0 40%" :to="{ path: '/catalog' }">
                Перейти в каталог
            </v-btn>
        </v-row>
        <v-row>
            <span class="text-size--3 text-center"><br/>
                Наши преимущества
            </span>
            <div v-for="item in good_sides" :key="item.id" style="width: 21%; margin: 0 6%">
                <div :style="'height: ' + item.offset + 'px'"></div>
                <v-icon class="text-size--5 text-center" style="margin: 10%; width: 80%">{{item.icon}}</v-icon>
                <div class="text-size--2 text-center mb-4">
                    {{item.title}}
                </div>
                <div class="text-size--1-2 text-center">
                    {{item.desc}}
                </div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Home',

        data: () => ({
            good_sides: 
            [
                {
                    id: 1,
                    icon: 'mdi-barley',
                    title: 'Материалы',
                    desc: 'Мы используем только натуральные и экологически чистые материалы',
                    offset: 0,
                }, {
                    id: 2,
                    icon: 'mdi-balloon',
                    title: 'Комфорт',
                    desc: 'Мы проектируем и моделируем до тех пор, пока вещь не станет идеальной',
                    offset: 100
                }, {
                    id: 3,
                    icon: 'mdi-adjust',
                    title: 'Простота',
                    desc: 'Мы верим, что простота в одежде максимально выражает индивидуальность человека'
                },
            ]
        }),
    }
</script>

<style scoped>
    .row {
        height: 70vh;
    }
    .text1 {
        padding: 10%
    }
    .text1 > .left {
        padding: 10%;
    }
</style>