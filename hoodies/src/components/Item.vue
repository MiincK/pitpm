<template>
    <v-container style="padding: 0 15%" v-if="item">
        <v-row>
            <img :alt="item.name" :src="$me.assetshost + '/img/test/' + item.image.replace('$$', '1')" class="preview"/>
            <div style="padding: 3%; width: 40%">
                <div class="text-size--2">
                    {{item.name}}
                </div>
                <div class="text-size--1-2" v-if="item.discounted_price">
                    {{item.discounted_price}} ₽<br/><a class="text-size--0-8 text-strike">{{item.price}} ₽</a> 
                </div>
                <div class="text-size--1-2" v-else>
                    {{item.price}} ₽
                </div>
                <v-input-number :rules="rules.count" hide-details="auto" v-model="count" label="" required value=1 :min=1></v-input-number>
                <v-btn class="primary--text secondary" style="width: 100%" @click="$emit('cart', item.id, count, !0)">
                    В корзину
                </v-btn>
                <v-btn v-if="!isFavorite" class="primary--text secondary mt-4" style="width: 100%" @click="favchange(true)">
                    Добавить в избранное
                </v-btn>
                <v-btn v-else class="primary--text secondary mt-4" style="width: 100%" @click="favchange(false)">
                    Убрать из избранного
                </v-btn>
            </div>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <div class="text-size--1-5" style="width:100%">
                Описание:
            </div>
            <div class="text-size--1-2">
                {{item.description}}
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Item',

        data: () => ({
            item: null,
            isFavorite: false,
            count: 1,
            rules: {
                count: [value => !!value || "Обязательно", value => parseInt(value) > 0 || "Количество должно быть положительным"],
            }
        }),
        created() {
            this.axios.get(this.$me.apihost + "/items/" + this.$route.params.id)
                .then((res) => {
                    this.item = res.data;
                    this.isFavorite = JSON.parse(localStorage['fav'] || '[]').indexOf(this.item.id) !== -1;
                }).catch((err) => {
                    this.$emit("showAlert", "Ой-ой...", "Произошла какая-то ошибка... Детали:\n" + err);
                });
        },
        methods: {
            favchange(to) {
                var favs = JSON.parse(localStorage['fav'] || '[]');
                if (to) favs.push(this.item.id);
                else favs = favs.filter(x => x != this.item.id);
                localStorage['fav'] = JSON.stringify(favs);
                this.isFavorite = to;
            }
        }
    }
</script>
