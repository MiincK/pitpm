<template>
    <v-app>
        <v-app-bar app color="background" dark>
            <v-btn
                :to="{ path: '/' }"
                text
                style="height: 100%"
                >
                <img alt="Hoodies" src="@/assets/img/logo.png" style="height: 70px" />
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn
                :to="{ path: '/catalog' }"
                text
                class="primary--text"
                >
                Каталог
            </v-btn>
            <v-btn
                :to="{ path: '/delivery' }"
                text
                class="primary--text"
                >
                Доставка и оплата
            </v-btn>
            <v-btn
                :to="{ path: '/contact' }"
                text
                class="primary--text"
                >
                Контакты
            </v-btn>
            <v-btn
                :to="{ path: '/faq' }"
                text
                class="primary--text"
                >
                FAQ
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                :to="{ path: '/favorites' }"
                icon
                class="primary--text"
                >
                <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn
                :to="{ path: '/cart' }"
                icon
                class="primary--text"
                >
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
        </v-app-bar>

        <v-container class="background primary--text" fluid style="margin: 64px 0 30vh 0">
            <router-view class="background primary--text" v-on:cart="cart"></router-view>
        </v-container>

        <v-footer align="top" absolute class="primary background--text">
            <div>
                <div class="text-center">+7 (999) 999-99-99</div>
                <div class="text-center">admin@example.com</div>
            </div>
            <v-spacer></v-spacer>
            <div v-for="linkcol in footer_links" :key="linkcol.id">
                <v-btn v-for="link in linkcol.data" :key="link.id" @click="link.action" dense text style="width: 100%">
                    <span class="background--text" style="text-align: left; width: 100%">{{link.text}}</span>
                </v-btn>
            </div>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        footer_links: [ 
            {
                id: 1,
                data: [
                    {
                        id: 1,
                        action: () => {},
                        text: "О нас"
                    }, {
                        id: 2,
                        action: () => {},
                        text: "Контакты"
                    },
                ]
            }, {
                id: 2,
                data: [
                    {
                        id: 1,
                        action: () => {},
                        text: "Доставка и оплата"
                    }, {
                        id: 2,
                        action: () => {},
                        text: "Таблица размеров"
                    }, {
                        id: 3,
                        action: () => {},
                        text: "Возврат"
                    }, {
                        id: 4,
                        action: () => {},
                        text: "Политика конфиденциальности"
                    }, {
                        id: 5,
                        action: () => {},
                        text: "Карта сайта"
                    },
                ]
            }
        ]
    }),
    methods: {
        cart(id) {
            // TODO: Add to cart
        }
    }

};
</script>

<style>
@font-face {
    font-family: "__Main";
    src: url('~@/assets/font/Golos-Regular.ttf');
}

.v-application {
    background: #FFF5F5 !important
}

body,
div,
span {
    font-family: '__Main', sans-serif !important;
}

.v-btn {
    text-transform: none;
    font-weight: bold;
    letter-spacing: 0;
}

img.placeholder {
    background: #e6e6e6;
    object-fit: contain;
    padding: 5%;
}

img.preview {
    width: 30%;
}

.container {
    padding: 0;
}

footer.v-footer {
    padding-bottom: 60px
}

footer > div {
    width: 25%;
    align-self: flex-start;
}

footer > div:first-child > div {
    margin: 10px 0;
}

.text-size--5 {
    font-size: 5rem !important;
}
.text-size--3 {
    font-size: 3rem !important;
}
.text-size--2 {
    font-size: 2rem !important;
}
.text-size--1-5 {
    font-size: 1.5rem;
}
.text-size--1-2 {
    font-size: 1.2rem;
    line-height: 105%;
}
.text-size--1 {
    font-size: 1rem;
}
.text-center {
    width:100%;
}
</style>
