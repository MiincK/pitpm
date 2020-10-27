<template>
    <v-container style="max-width: 1200px">
        <v-row style="padding: 0 15%">
            <img alt="none" src="@/assets/img/placeholder.png" class="placeholder preview"/>
            <div style="padding: 20px">
                <div class="text-size--2">
                    {{item.name}}
                </div>
                <div class="text-size--1-2">
                    {{item.price}} ₽
                </div>
                <div class="text-size--1-5">
                    {{item.quantity > 0 ? (item.quantity >= 10 ? "Много" : "Всего " + item.quantity + " осталось!") : "Под заказ"}}
                </div>
                <v-btn class="primary--text secondary" style="width: 100%">
                    В корзину
                </v-btn>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Item',

        data: () => ({
            item: {}
        }),
        created() {
            this.axios.get(this.$me.apihost + "/items/" + this.$route.params.id)
                .then((res) => {
                    this.item = res.data;
                }).catch((err) => {

                });
        },
    }
</script>
