<template>
    <v-container style="max-width: 1200px">
        <div class="text-size--3 text-center my-4">
            Каталог
        </div>
        <v-row>
            <div v-for="item in items" :key="item.id"  style="width: 17%; margin: 0 4%">
                <a @click="open(item.id)">
                    <img alt="none" src="@/assets/img/placeholder.png" class="placeholder" style="width: 100%" />
                    <div class="text-size--2">
                        {{item.name}}
                    </div>
                </a>
                <div class="text-size--1-2">
                    {{item.price}} ₽
                </div>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Catalog',

        data: () => ({
            items: []
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
        }
    }
</script>
