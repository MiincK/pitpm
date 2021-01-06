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
                {{ item.total }} р.
            </template>
            <template v-slot:item.address="{ item }">
                {{ item.address ? "Почтой" : "Самовывоз" }}
            </template>
            <template v-slot:item.open="{ item }">
                <v-btn flat class="primary my-2" @click="open(item.id)">К заказу</v-btn>
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
                sortable: false,
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
                text: '',
                value: 'open',
                sortable: false
            }],
            items: [{
                id: 1,
                fio: "Иванов Иван Иванович",
                email: "test@email.com",
                phone: "+71112223344",
                address: '12 123 123',
                what: '[]',
                comment: 'SALE20',
                total: 10000,
                status: 0,
                tracking: null,
            }, {
                id: 2,
                fio: "Петров Пётр Петрович",
                email: "test2@email.com",
                phone: "+75556667788",
                address: null,
                what: '[]',
                comment: 'SALE20',
                total: 6000,
                status: 0,
                tracking: null,
            }, ]
        }),
        created() {
            this.axios.get(this.$me.apihost + "/orders")
                .then((res) => {
                    this.items = res.data;
                    this.isLoading = false;
                }).catch((err) => {
                    this.$emit("showAlert", "Ошибка", err);
                });
        }
    }
</script>
