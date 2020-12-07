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
                @click="showcart()"
                icon
                class="primary--text"
                >
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container class="background primary--text content-div" fluid>
            <router-view class="background primary--text" style="max-width: 1200px" v-on:cart="cart" v-on:dialog="dialog"></router-view>
        </v-container>

        <v-footer align="top" absolute class="primary background--text">
            <div>
                <div class="text-center">+7 (911) 516-84-85</div>
                <div class="text-center">info@hoodies.ru</div>
            </div>
            <v-spacer></v-spacer>
            <div v-for="linkcol in footer_links" :key="linkcol.id">
                <v-btn v-for="link in linkcol.data" :key="link.id" @click="link.action" dense text style="width: 100%">
                    <span class="background--text" style="text-align: left; width: 100%">{{link.text}}</span>
                </v-btn>
            </div>
        </v-footer>
        <v-row justify="center">
            <v-dialog
                v-model="cartDialog"
                max-width="750"
                >
                <v-card
                    class="background primary--text">
                    <v-card-title class="headline">
                        <span>Ваш заказ:</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="primary--text"
                            text
                            @click="cartDialog = false;"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <Cart ref="cartComponent" v-on:cart="cart" v-on:showAlert="showAlert" v-on:closeCart="cartDialog = false"></Cart>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="newItemDialog"
                max-width="750"
                >
                <v-card
                    class="background primary--text">
                    <v-card-title class="headline">
                        <span>Товар добавлен в корзину:</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="primary--text"
                            text
                            @click="newItemDialog = false;"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="background primary--text" v-if="newItem">
                        <v-flex class="py-1 text-size--1-5" style="width: 100%; height: 64px; align-items:center">
                            <img :alt="newItem.name" :src="$me.assetshost + '/img/test/' + newItem.image.replace('$$', '1')" class="smallpreview mx-2"/>
                            <div style="width: 50%">{{newItem.name}}</div>
                            <v-spacer></v-spacer>
                        </v-flex>
                        <v-flex class="py-1 text-size--1-5" style="width: 100%; height: 64px; align-items:center">
                            <v-spacer></v-spacer>
                            <v-btn
                                class="primary background--text"
                                @click="newItemDialog = false; showcart();"
                                >
                                Перейти в корзину
                            </v-btn>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="sizesDialog"
                max-width="750"
                >
                <v-card
                    class="background primary--text">
                    <v-card-title class="headline">
                        <span>Таблица размеров</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="primary--text"
                            text
                            @click="sizesDialog = false;"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-item-group class="background">
                            <v-sheet
                                class="overflow-y-auto background"
                                max-height="600"
                                >
                                <v-item>
                                    <template v-slot="{ active, toggle }">
                                        <v-sheet
                                            class="px-4 pt-4 background"
                                            tile
                                            style="cursor: pointer;"
                                            @click="toggle"
                                        >
                                            <a class="text-size--1-5">Размеры женской одежды</a>
                                            <v-divider></v-divider>
                                            <v-expand-transition>
                                                <v-responsive v-if="active">
                                                    <v-data-table
                                                        :headers="sizeTable.headers1"
                                                        :items="sizeTable.items1"
                                                        hide-default-footer
                                                        dense
                                                        class="background">
                                                    </v-data-table>
                                                    <v-divider></v-divider>
                                                </v-responsive>
                                            </v-expand-transition>
                                        </v-sheet>
                                    </template>
                                </v-item>
                                <v-item>
                                    <template v-slot="{ active, toggle }">
                                        <v-sheet
                                            class="px-4 pt-4 background"
                                            tile
                                            style="cursor: pointer;"
                                            @click="toggle"
                                        >
                                            <a class="text-size--1-5">Размеры мужской одежды</a>
                                            <v-divider></v-divider>
                                            <v-expand-transition>
                                                <v-responsive v-if="active">
                                                    <v-data-table
                                                        :headers="sizeTable.headers2"
                                                        :items="sizeTable.items2"
                                                        hide-default-footer
                                                        dense
                                                        class="background">
                                                    </v-data-table>
                                                </v-responsive>
                                            </v-expand-transition>
                                        </v-sheet>
                                    </template>
                                </v-item>
                            </v-sheet>
                        </v-item-group>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="alertDialog"
                max-width="350"
                >
                <v-card>
                    <v-card-title class="primary--text">
                        {{alertTitle}}
                    </v-card-title>
                    <v-card-text class="text-size--1">{{alertText}}</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="alertDialog = false;"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-app>
</template>

<script>
import Cart from '@/components/Cart'
var $router = null;
var $this = null;

export default {
    name: "App",
    components: {
        Cart
    },

    data: () => ({
        footer_links: [ 
            {
                id: 1,
                data: [
                    {
                        id: 1,
                        action() { $router.push({path: '/about'}) },
                        text: "О нас"
                    }, {
                        id: 2,
                        action() { $router.push({path: '/contact'}) },
                        text: "Контакты"
                    },
                ]
            }, {
                id: 2,
                data: [
                    {
                        id: 1,
                        action() { $router.push({path: '/delivery'}) },
                        text: "Доставка и оплата"
                    }, {
                        id: 2,
                        action() { $this.dialog('sizes') },
                        text: "Таблица размеров"
                    }, {
                        id: 3,
                        action() { $router.push({path: '/returnpolicy'}) },
                        text: "Возврат"
                    }, {
                        id: 4,
                        action() { $router.push({path: '/legal'}) },
                        text: "Политика конфиденциальности"
                    }
                ]
            }
        ],
        alertTitle: "",
        alertText: "",
        alertDialog: false,
        cartDialog: false,
        newItemDialog: false,
        sizesDialog: false,
        newItem: null,
        sizeTable: {
            headers1: [
                {
                    text: 'Размер',
                    value: 'name',
                    sortable: false,
                },
                {
                    text: 'Грудь (см)',
                    value: 'chest',
                    sortable: false,
                },
                {
                    text: 'Талия (см)',
                    value: 'waist',
                    sortable: false,
                },
                {
                    text: 'Бёдра (см)',
                    value: 'hips',
                    sortable: false,
                },
                {
                    text: 'Российский размер',
                    value: 'rus_size',
                    sortable: false,
                },
            ],
            items1: [
                {
                    name: 'S',
                    chest: '81-86',
                    waist: '58-64',
                    hips: '86-91',
                    rus_size: '42-44',
                },
                {
                    name: 'M',
                    chest: '86-94',
                    waist: '64-71',
                    hips: '91-99',
                    rus_size: '44-46',
                },
                {
                    name: 'L',
                    chest: '94-99',
                    waist: '71-79',
                    hips: '99-104',
                    rus_size: '46-48',
                },
                {
                    name: 'XL',
                    chest: '99-107',
                    waist: '79-86',
                    hips: '104-112',
                    rus_size: '48-50',
                },
                {
                    name: '2XL',
                    chest: '107-117',
                    waist: '87-94',
                    hips: '112-119',
                    rus_size: '50-52',
                },
                {
                    name: '3XL',
                    chest: '117-122',
                    waist: '94-102',
                    hips: '119-124',
                    rus_size: '52-54',
                },
                {
                    name: '4XL',
                    chest: '122-127',
                    waist: '102-107',
                    hips: '124-129',
                    rus_size: '54-56',
                },
                {
                    name: '5XL',
                    chest: '127-132',
                    waist: '107-112',
                    hips: '129-134',
                    rus_size: '56-58',
                },
                {
                    name: '6XL',
                    chest: '132-137',
                    waist: '112-117',
                    hips: '134-139',
                    rus_size: '58-60',
                },
            ],
            headers2: [
                {
                    text: 'Размер',
                    value: 'name',
                    sortable: false,
                },
                {
                    text: 'Грудь (см)',
                    value: 'chest',
                    sortable: false,
                },
                {
                    text: 'Талия (см)',
                    value: 'waist',
                    sortable: false,
                },
                {
                    text: 'Бёдра (см)',
                    value: 'hips',
                    sortable: false,
                },
                {
                    text: 'Длина рукава (см)',
                    value: 'sleeve',
                    sortable: false,
                },
                {
                    text: 'Российский размер',
                    value: 'rus_size',
                    sortable: false,
                },
            ],
            items2: [
                {
                    name: '2XS',
                    chest: '88',
                    waist: '70',
                    hips: '92',
                    sleeve: '59',
                    rus_size: '44',
                },
                {
                    name: 'XS',
                    chest: '92',
                    waist: '76',
                    hips: '96',
                    sleeve: '60',
                    rus_size: '46',
                },
                {
                    name: 'S',
                    chest: '96',
                    waist: '82',
                    hips: '100',
                    sleeve: '61',
                    rus_size: '48',
                },
                {
                    name: 'M',
                    chest: '100',
                    waist: '88',
                    hips: '104',
                    sleeve: '62',
                    rus_size: '50',
                },
                {
                    name: 'L',
                    chest: '104',
                    waist: '94',
                    hips: '108',
                    sleeve: '63',
                    rus_size: '52',
                },
                {
                    name: 'XL',
                    chest: '108',
                    waist: '100',
                    hips: '112',
                    sleeve: '63',
                    rus_size: '54',
                },
                {
                    name: '2XL',
                    chest: '112',
                    waist: '106',
                    hips: '116',
                    sleeve: '64',
                    rus_size: '56',
                },
                {
                    name: '3XL',
                    chest: '116-124',
                    waist: '112-120',
                    hips: '120-128',
                    sleeve: '64-65',
                    rus_size: '58-62',
                },
                {
                    name: '4XL',
                    chest: '128-132',
                    waist: '124-128',
                    hips: '132-134',
                    sleeve: '66',
                    rus_size: '64-66',
                },
                {
                    name: '5XL',
                    chest: '136-140',
                    waist: '132-136',
                    hips: '136-138',
                    sleeve: '66',
                    rus_size: '68-70',
                },
            ],
        }
    }),
    created() {
        $router = this.$router;
        $this = this;
    },
    methods: {
        cart(id, count, notify, type=0) {
            if (!localStorage['cart'])
                localStorage['cart'] = "{}";
            let cart = JSON.parse(localStorage['cart']);
            if (!cart[id])
                cart[id] = count;
            else
            {
                if (type == 0)
                    cart[id] += count;
                else
                    cart[id] = count;
            }
            if (cart[id] == 0)
                delete cart[id];
            if (type == 0 && count > 0 && notify) {
                this.newItem = null;
                this.axios.get(this.$me.apihost + "/items/" + id)
                    .then((res) => {
                        this.newItem = res.data;
                        this.newItemDialog = true;
                    }).catch((err) => {

                    });
            }
            localStorage['cart'] = JSON.stringify(cart);
        },
        dialog(type) {
            switch(type.toLowerCase())
            {
                case 'sizes':
                    this.sizesDialog = true;
                    break;
            }
        },
        showcart() {
            this.cartDialog = true;
            if (this.$refs.cartComponent)
                this.$refs.cartComponent.reload();
        },
        hidecart() {
            cartDialog=false
        },
        showAlert(title, data)
        {
            this.alertTitle = title;
            this.alertText = data;
            this.alertDialog = true;
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

.content-div {
    margin: 64px 0 30vh 0
}

.flex {
    display: flex;
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
    width: 50%;
}

img.smallpreview {
    height: 100%
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
.text-size--0-8 {
    font-size: 0.8rem;
}
.text-center {
    width:100%;
}
.text-strike {
    text-decoration: line-through;
}
</style>
