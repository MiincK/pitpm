<template>
    <v-container style="max-width: 1200px">
        <div class="text-size--3 text-center my-4">
            Избранное
        </div>
        <v-row v-if="items">
            <div v-if="!itemscalc.length" class="text-size--1-5 text-center my-4">
                У вас нет ничего в избранном!
            </div>
            <v-col>
                <v-row>
                    <div v-for="item in itemscalc" :key="item.id" style="width: 17%; margin: 10px 4%">
                        <a @click="open(item.id)">
                            <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" style="width: 100%;" />
                            <div class="text-size--1-5">
                                {{item.name}}
                            </div>
                        </a>
                        <div class="text-size--1-2 my-2" v-if="item.discounted_price">
                            <a class="text-size--0-8 text-strike">{{item.price}} ₽</a> {{item.discounted_price}} ₽
                        </div>
                        <div class="text-size--1-2 my-2" v-else>
                            {{item.price}} ₽
                        </div>
                        <v-btn class="primary--text secondary" style="width: 100%"  @click="$emit('cart', item.id, 1, !0)">
                            В корзину
                        </v-btn>
                    </div>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Catalog',

        data: () => ({
            items: null,
        }),
        created() {
            var favs = JSON.parse(localStorage['fav'] || '[]');
            if (!favs.length)
            {
                this.items = [];
                return;
            }
            this.axios.get(this.$me.apihost + "/items/multiple?items=" + favs.join(','))
                .then((res) => {
                    this.items = res.data;
                }).catch((err) => {
                    this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
        },
        methods: {
            open(id) {
                this.$router.push({name: 'item', params: {id: id}})
            }
        },
        computed: {
            itemscalc() {
                return this.items
            }
        }
    }
</script>

<style scoped>
.v-navigation-drawer {
    margin: 40px 0;
    padding: 16px 0 30px 22px;
}
</style>