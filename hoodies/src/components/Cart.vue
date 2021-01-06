<template>
    <v-container v-if="cartfull">
        <div class="background primary--text text-size--1" v-if="cartfull.length">
            <v-divider></v-divider>
            <div v-for="item in cartfull" :key="item.id">
                <v-flex class="py-1" style="width: 100%; height: 64px; align-items:center" v-if="item.count>0">
                    <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" class="smallpreview mx-2"/>
                    <div style="width: 50%">{{item.name}}</div>
                    <v-input-number class="mx-4" style="width: 30px" :rules="rules.count" hide-details="auto" v-model="item.count" label="" required :value=item.count :min=1 @input="update(item)"></v-input-number>
                    <div class="ml-4" style="width: 70px">{{item.price * item.count}} ₽</div>
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
                        Сумма: {{cartfull.reduce((a, e) => a + e.count * e.price, 0)}} ₽
                    </div>
                </v-flex>
                <v-form v-model="validForm" ref="formCart" style="margin: 0 50px">
                    <v-text-field v-model="info.fio" :rules="rules.required" placeholder="Иванов Иван Иванович" label="ФИО"></v-text-field>
                    <v-text-field v-model="info.email" :rules="rules.email" placeholder="email@example.com" label="Ваш Email"></v-text-field>
                    <v-text-field v-model="info.phone" :rules="rules.phone" placeholder="+79001234567" label="Ваш телефон"></v-text-field>
                    <v-text-field v-if="!info.self" v-model="info.address" :rules="rules.required" placeholder="ул. Пушкина, дом 1" label="Адрес"></v-text-field>
                    <v-checkbox v-model="info.self" class="mt-4" label="Самовывоз"></v-checkbox>
                    <v-text-field v-model="info.comment" label="Комментарий"></v-text-field>
                    <v-btn class="text-center primary background--text" style="margin: 16px 25%; width: 50%" @click="done">
                        Оформить заказ
                    </v-btn>
                </v-form>
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
                required: [value => !!value || "Обязательно"],
                address: [value => info.self || !!value || "Обязательно"],
                email: [value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Введён некорректный email-адрес'],
                phone: [value => !value || /^\+7\d{10}$/.test(value) || 'Введён некорректный номер телефона'],
            },
            info: {
                fio: "",
                email: "",
                phone: "",
                address: "",
                comment: "",
                self: false,
            },
            validForm: false,
            allowForm: false
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
                this.allowForm = true;
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
            done() {
                this.$refs.formCart.validate();
                if (!this.validForm) return;

                let cart = JSON.parse(localStorage['cart'] || "{}");
                if (Object.entries(cart).length == 0) return;

                var info1 = this.info;
                info1.cart = cart;
                info1.total = this.cartfull.reduce((a, e) => a + e.count * e.price, 0);

                this.axios.post(this.$me.apihost + "/cart", info1)
                    .then((res) => {
                        this.showAlert("Готово!", "Ваш заказ размещён, скоро наш менеджер свяжется с вами по телефону. Письмо с подтверждением заказа выслано вам на электронную почту.");
                        localStorage['cart'] = "{}";
                        this.$emit("closeCart");
                    }).catch((err) => {
                        this.showAlert("Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                        this.$emit("closeCart");
                    });
            },
            showAlert(text, data)
            {
                this.$emit("showAlert", text, data);
            }
        },
        created() {
            this.reload();
        }
    }
</script>
