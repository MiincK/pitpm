<template>
    <v-container v-if="item" style="padding: 0 10%">
        <div class="text-size--3 text-center my-4">
            Информация о заказе
        </div>
        <div class="text-size--1-2 px-4 py-4">
            Номер заказа: {{ item.id }}
        </div>
        <div v-for="item in cartfull" :key="item.id">
            <v-flex class="py-1" style="width: 100%; height: 64px; align-items:center" v-if="item.count>0">
                <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" class="smallpreview mx-2"/>
                <div style="width: 50%">{{item.name}}</div>
                <div class="ml-4" style="width: 200px;text-align:right;flex:auto">{{item.discounted_price || item.price}} ₽ * {{item.count}} = {{(item.discounted_price || item.price) * item.count}} ₽</div>
            </v-flex>
        </div>
        <div class="text-size--1-2 px-4 py-4">
            Сумма заказа: {{item.total}} ₽
        </div>
        <div class="text-size--1-2 px-4 py-4">
            Доставка: {{ item.address ? "Почтой на адрес " + item.address : "Самовывоз" }}
        </div>
        <v-flex class="text-size--1-2 px-4 py-4" style="align-items:center;">
            <span>Статус заказа: {{ status(item.status) }}</span>
            <v-btn class="mx-4 primary background--text" @click="ustatus(1)" v-if="!(item.status)">Отправить в обработку</v-btn>
            <v-form v-if="!(item.status - 1) && item.address" ref="frmTrack" v-model="trackValid" style="display:flex;align-items:center;flex: auto;">
                <v-text-field class="mx-4" label="Трек-номер" :rules="rules.required" v-model="track" />
                <v-btn class="mx-4 primary background--text" @click="ondelivery">Прикрепить трек-номер</v-btn>
            </v-form>
            <v-btn class="mx-4 primary background--text" @click="ustatus(3)" v-if="!(item.status - 2) || !(item.status - 1) && !item.address">Пометить как доставленный</v-btn>
            <v-btn class="mx-4 primary background--text" @click="ustatus(4)" v-if="!(item.status - 3)">Завершить заказ</v-btn>
        </v-flex>
        <v-divider></v-divider>
    </v-container>
</template>

<script>
    export default {
        name: 'Item',

        data: () => ({
            item: null,
            cartfull: null,
            track: "",
            trackValid: false,
            rules: {
                required: [value => !!value || "Обязательно"],
            }
        }),
        created() {
            this.reload();
        },
        methods: {
            status: (s) => ({
                0: 'Создан',
                1: 'Обрабатывается',
                2: 'Отправлен',
                3: 'Доставлен',
                4: 'Завершён',
            }[s]),
            ustatus(s) {
                this.axios.put(this.$me.apihost + "/orders/" + this.item.id, {status: s})
                    .then((res) => {
                        this.reload();
                    }).catch((err) => {
                        this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                    });
            },
            ondelivery() {
                this.$refs.frmTrack.validate();
                if (!this.trackValid) return;
                this.axios.put(this.$me.apihost + "/orders/" + this.item.id, {track: this.track})
                    .then((res) => {
                        this.ustatus(2);
                    }).catch((err) => {
                        this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                    });
            },
            reload() {
                this.axios.get(this.$me.apihost + "/orders/" + this.$route.params.id)
                    .then((res) => {
                        this.item = res.data;
                        let jcart = JSON.parse(this.item.what);
                        let cart = Object.entries(jcart);
                        if (cart.length)
                        {
                            this.axios.get(this.$me.apihost + "/items/multiple?items=" + cart.map(x => x[0]).join(','))
                                .then((res) => {
                                    this.cartfull = res.data.map(x => {
                                        x.count = jcart[x.id.toString()];
                                        return x;
                                    });
                                }).catch((err) => {
                                    this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                                    this.cartfull = [];
                                });
                        }
                        else this.cartfull = [];
                    }).catch((err) => {
                        this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                    });
            }
        },
    }
</script>
