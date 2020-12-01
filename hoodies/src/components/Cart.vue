<template>
    <v-container v-if="cartfull">
        <div class="background primary--text text-size--1" v-if="cartfull.length">
            <v-divider></v-divider>
            <div v-for="item in cartfull" :key="item.id">
                <v-flex class="py-1" style="width: 100%; height: 64px; align-items:center" v-if="item.count>0">
                    <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" class="smallpreview mx-2"/>
                    <div style="width: 50%">{{item.name}}</div>
                    <v-input-number class="mx-4" style="width: 30px" :rules="rules.count" hide-details="auto" v-model="item.count" label="" required :value=item.count :min=1 @input="update(item)"></v-input-number>
                    <div class="ml-4" style="width: 70px">{{item.price * item.count}}р.</div>
                    <v-btn icon @click="update(item, 0)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-flex>
            </div>
            <v-divider></v-divider>
            <div class="background v-sheet" style="width: 100%">
                <v-flex>
                    <v-spacer></v-spacer>
                    <div class="mr-8 my-4">
                        Сумма: {{cartfull.reduce((a, e) => a + e.count * e.price, 0)}}р.
                    </div>
                </v-flex>
                <div style="margin: 0 50px">
                    <v-text-field label="ФИО"></v-text-field>
                    <v-text-field label="Ваш Email"></v-text-field>
                    <v-text-field label="Ваш телефон"></v-text-field>
                    <v-text-field label="Адрес"></v-text-field>
                    <v-checkbox class="mt-4" label="Самовывоз"></v-checkbox>
                    <v-btn class="text-center primary background--text" style="margin: 16px 25%; width: 50%">
                        Оформить заказ
                    </v-btn>
                </div>
            </div>
        </div>
        <div class="text-center my-8 text-size--1-5" v-else>
            У вас нет ничего в корзине!
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'Cart',
        data: () => ({
            cartfull: null,
            rules: {
                count: [value => !!value || "Обязательно", value => parseInt(value) > 0 || "Количество должно быть положительным"],
            }
        }),
        methods: {
            update(item, force) {
                if (force !== undefined)
                    item.count = force;
                this.$emit('cart', item.id, item.count, !1, 1);
                if (item.count == 0)
                    this.cartfull = this.cartfull.filter(x => x.id != item.id);
            },
            reload() {
                this.cartfull = null;
                let cart = Object.entries(JSON.parse(localStorage['cart'] || "{}"));
                if (cart.length)
                {
                    this.axios.get(this.$me.apihost + "/items/multiple?items=" + cart.map(x => x[0]).join(','))
                        .then((res) => {
                            this.cartfull = res.data.map(x => {
                                x.count = JSON.parse(localStorage['cart'] || "{}")[x.id.toString()];
                                return x;
                            });
                        }).catch((err) => {
                            this.cartfull = [];
                        });
                }
                else this.cartfull = [];
            },
        },
        created() {
            this.reload();
        }
    }
</script>
