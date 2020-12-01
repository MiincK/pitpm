<template>
    <v-container style="max-width: 1200px">
        <div class="text-size--3 text-center my-4">
            Каталог
        </div>
        <v-row>
            <v-col cols=3>
                <v-navigation-drawer
                    floating
                    permanent
                    class='secondary'
                    style="height: 700px;margin:0"
                >
                    <div class="font-weight-bold mb-2">Фильтр</div>
                    <div class="text-size--1-2">Цена</div>
                    <v-row>
                        <v-col cols=5>
                            <v-text-field name="price_from" label="От" v-model="price_from" />
                        </v-col>
                        <v-col cols=5>
                            <v-text-field name="price_to" label="До" v-model="price_to" />
                        </v-col>
                    </v-row>
                    <div class="text-size--1-2">Размер</div>
                    <div class="pl-2 pr-8">
                        <v-checkbox v-model="sizes" label="One size" value="1" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="sizes" label="XS" value="2" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="sizes" label="S" value="4" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="sizes" label="M" value="8" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="sizes" label="L" value="16" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="sizes" label="XL" value="32" hide-details class="mt-2"></v-checkbox>
                        <v-btn style="width: 100%" class="my-4 primary--text" @click="$emit('dialog', 'sizes')">Таблица размеров</v-btn>
                    </div>
                    <div class="text-size--1-2">Коллекции</div>
                    <div class="pl-2 pr-8">
                        <v-checkbox v-model="collections" label="Collection 1" value="1" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="collections" label="Collection 2" value="2" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="collections" label="Collection 3" value="3" hide-details class="mt-2"></v-checkbox>
                        <v-checkbox v-model="collections" label="Collection 4" value="4" hide-details class="mt-2"></v-checkbox>
                    </div>
                </v-navigation-drawer>
            </v-col>
            <v-col>
                <v-row>
                    <div v-for="item in itemscalc" :key="item.id" style="width: 17%; margin: 0 4%">
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
                        <v-btn class="primary--text secondary" style="width: 100%"  @click="$emit('cart', item.id, 1)">
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
            items: [],
            sizes: [],
            collections: [],
            price_from: "",
            price_to: "",
        }),
        created() {
            this.axios.get(this.$me.apihost + "/items")
                .then((res) => {
                    this.items = res.data;
                }).catch((err) => {

                });
        },
        methods: {
            open(id) {
                this.$router.push({name: 'item', params: {id: id}})
            }
        },
        computed: {
            itemscalc() {
                return this.items.filter(x => {
                    let price = x.discounted_price ? x.discounted_price : x.price;
                    if (this.price_from && price < this.price_from)
                        return false;
                    if (this.price_to && price > this.price_to)
                        return false;
                    if (this.sizes.length && !this.sizes.find(y => (parseInt(y) & x.size) != 0))
                        return false;
                    return true;
                })
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