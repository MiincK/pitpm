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
                <v-btn text class="primary my-2" @click="edit(item.id)">Редактировать</v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
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
        }),
        created() {
            this.axios.get(this.$me.apihost + "/orders")
                .then((res) => {
                    this.items = res.data;
                    this.isLoading = false;
                }).catch((err) => {
                    this.showAlert("Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
            this.axios.get(this.$me.apihost + "/items")
                .then((res) => {
                    this.items2 = res.data;
                    this.isLoading2 = false;
                }).catch((err) => {
                    this.showAlert("Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
        },
        methods: {
            open(id) {
                this.$router.push({name: 'adminorder', params: {id: id}})
            },
            edit(id) {

            },
            status: (s) => ({
                [-1]: 'Отменён',
                0: 'Создан',
                1: 'Обрабатывается',
                2: 'Отправлен',
                3: 'Доставлен',
                4: 'Завершён'
            }[s]),    
        }
    }
</script>
