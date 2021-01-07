<template>
    <v-container>
        <div class="text-size--3 text-center my-4">
            Активные заказы
        </div>
        <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            :single-select="false"
            show-select
            :loading="isLoading"
            :items-per-page="-1"
            class="background">
            <template v-slot:item.total="{ item }">
                {{ item.total }} ₽
            </template>
            <template v-slot:item.address="{ item }">
                {{ item.address ? "Почтой" : "Самовывоз" }}
            </template>
            <template v-slot:item.status="{ item }">
                {{ status(item.status) }}
            </template>
            <template v-slot:item.open="{ item }">
                <v-btn text class="primary my-2" @click="open(item.id)">К заказу</v-btn>
            </template>
        </v-data-table>
        <div class="text-size--3 text-center my-4">
            Все товары
        </div>
        <v-data-table
            :headers="headers2"
            :items="items2"
            hide-default-footer
            :single-select="false"
            show-select
            :loading="isLoading2"
            :items-per-page="-1"
            class="background">
            <template v-slot:item.price="{ item }">
                {{ item.price }} ₽
            </template>
            <template v-slot:item.discounted_price="{ item }">
                {{ item.discounted_price || "-" }} ₽
            </template>
            <template v-slot:item.address="{ item }">
                {{ item.address ? "Почтой" : "Самовывоз" }}
            </template>
            <template v-slot:item.image="{ item }">
                <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" class="smallpreview mx-2"/>
            </template>
            <template v-slot:item.open="{ item }">
                <v-btn text class="primary my-2" @click="edit(item)">Редактировать</v-btn>
            </template>
        </v-data-table>
        <v-flex>
            <v-btn text class="primary my-2" @click="edit({id: -1})">Добавить</v-btn>
        </v-flex>
        <v-row justify="center">
            <v-dialog
                v-model="editDialog"
                max-width="750"
                >
                <v-card
                    class="background primary--text">
                    <v-card-title class="headline">
                        <span>{{ edited.id > 0 ? "Товар " + edited.id : "Новый товар" }}</span>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="primary--text"
                            text
                            @click="editDialog = false;"
                        >
                            Закрыть
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="validEditForm" ref="formEdit" style="margin: 0 50px">
                            <v-text-field v-model="edited.name" :rules="rules.required" label="Название товара"></v-text-field>
                            <v-text-field v-model="edited.quantity" :rules="rules.count" label="Количество"></v-text-field>
                            <v-text-field v-model="edited.price" :rules="rules.price" label="Цена товара"></v-text-field>
                            <v-text-field v-model="edited.discounted_price" :rules="rules.price_discount" placeholder="Без скидки" label="Цена со скидкой"></v-text-field>
                            <v-text-field v-model="edited.description" label="Описание"></v-text-field>
                            <v-flex class="cbflex">
                                <v-checkbox v-model="editedsizes" label="One size" :value="1" hide-details class="mt-2"></v-checkbox>
                                <v-checkbox v-model="editedsizes" label="XS" :value="2" hide-details class="mt-2"></v-checkbox>
                                <v-checkbox v-model="editedsizes" label="S" :value="4" hide-details class="mt-2"></v-checkbox>
                                <v-checkbox v-model="editedsizes" label="M" :value="8" hide-details class="mt-2"></v-checkbox>
                                <v-checkbox v-model="editedsizes" label="L" :value="16" hide-details class="mt-2"></v-checkbox>
                                <v-checkbox v-model="editedsizes" label="XL" :value="32" hide-details class="mt-2"></v-checkbox>
                            </v-flex>
                            <v-btn class="text-center primary background--text" style="margin: 16px 25%; width: 50%" @click="doneEditing">
                                Сохранить
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
</v-container>
</template>

<script>
var $this = null;

    export default {
        name: 'Admin',
        data: () => ({
            isLoading: true,
            headers: [{
                text: '№',
                value: 'id',
            }, {
                text: 'ФИО клиента',
                value: 'fio',
                sortable: false,
            }, {
                text: 'Сумма',
                value: 'total',
                sortable: false,
            }, {
                text: 'Email',
                value: 'email',
                sortable: false,
            }, {
                text: 'Доставка',
                value: 'address',
                sortable: false,
            }, {
                text: 'Номер телефона',
                value: 'phone',
                sortable: false,
            }, {
                text: 'Статус',
                value: 'status',
            }, {
                text: '',
                value: 'open',
                sortable: false
            }],
            items: [],
            isLoading2: true,
            headers2: [{
                text: '',
                value: 'image',
                sortable: false,
            }, {
                text: '№',
                value: 'id',
            }, {
                text: 'Название',
                value: 'name',
            }, {
                text: 'Цена',
                value: 'price',
            }, {
                text: 'Цена со скидкой',
                value: 'discounted_price',
                sortable: false,
            }, {
                text: 'Количество',
                value: 'quantity',
            }, {
                text: '',
                value: 'open',
                sortable: false
            }],
            items2: [],

            validEditForm: true,
            editDialog: false,
            edited: {},
            editedsizes: [],
            rules: {
                count: [value => !!value || "Обязательно", value => parseInt(value) >= 0 || "Количество не должно быть отрицательным"],
                price: [value => !!value || "Обязательно", value => parseInt(value) > 0 || "Цена должна быть положительной"],
                price_discount: [value => !value || parseInt(value) > 0 || "Цена должна быть положительной", value =>!value || parseInt(value) < $this.edited.price || "Цена со скидкой должна быть меньше обычной цены"],
                required: [value => !!value || "Обязательно"],
            }
        }),
        created() {
            $this = this;
            this.axios.get(this.$me.apihost + "/orders")
                .then((res) => {
                    this.items = res.data;
                    this.isLoading = false;
                }).catch((err) => {
                    this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
            this.reloadItems();
        },
        methods: {
            open(id) {
                this.$router.push({name: 'adminorder', params: {id: id}})
            },
            edit(item) {
                this.editedsizes = [];
                if (item.size)
                {
                    for (var i = 0; i < 6; i++)
                        if (item.size & (1 << i))
                            this.editedsizes.push((1 << i));
                }
                this.edited = item;
                this.editDialog = true;
            },
            doneEditing() {
                this.$refs.formEdit.validate();
                if (!this.validEditForm) return;
                this.edited.size = this.editedsizes.reduce((a, e) => a | e, 0);
                if (this.edited.id > 0)
                    this.axios.put(this.$me.apihost + "/items/" + this.edited.id, this.edited)
                        .then((res) => {
                            this.editDialog = false;
                            this.$emit("showAlert", "Успех", "Товар успешно сохранён!");
                            this.reloadItems();
                        }).catch((err) => {
                            this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                        });
                else
                    this.axios.post(this.$me.apihost + "/items", this.edited)
                        .then((res) => {
                            this.editDialog = false;
                            this.$emit("showAlert", "Успех", "Товар успешно добавлен!");
                            this.reloadItems();
                        }).catch((err) => {
                            this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                        });
            },
            status: (s) => ({
                [-1]: 'Отменён',
                0: 'Создан',
                1: 'Обрабатывается',
                2: 'Отправлен',
                3: 'Доставлен',
                4: 'Завершён'
            }[s]),
            reloadItems(){
                this.items2 = [];
                this.isLoading2 = true;
                this.axios.get(this.$me.apihost + "/items")
                    .then((res) => {
                        this.items2 = res.data;
                        this.isLoading2 = false;
                    }).catch((err) => {
                        this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                    });
            }
        }
    }
</script>

<style scoped>
.cbflex > div {
    flex: auto;
}
</style>