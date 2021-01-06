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
    </v-container>
</template>

<script>
    export default {
        name: 'Admin',
        data: () => ({
            isLoading: true,
            headers: [{
                text: 'Номер заказа',
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
                text: 'Статус',
                value: 'status',
            }, {
                text: '',
                value: 'open',
                sortable: false
            }],
            items: []
        }),
        created() {
            this.axios.get(this.$me.apihost + "/orders")
                .then((res) => {
                    this.items = res.data;
                    this.isLoading = false;
                }).catch((err) => {
                    this.showAlert("Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
        },
        methods: {
            open(id) {
                this.$router.push({name: 'adminorder', params: {id: id}})
            },
            status: (s) => ({
                0: 'Создан',
                1: 'Обрабатывается',
                2: 'Отправлен',
                3: 'Доставлен',
                4: 'Завершён'
            }[s]),
            
        }
    }
</script>
