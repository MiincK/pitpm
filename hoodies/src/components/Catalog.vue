<template>
    <v-container style="max-width: 1200px">
        <div class="text-size--3 text-center my-4">
            Каталог
        </div>
        <div v-for="item in items" :key="item.id">
            {{item.name}} {{item.description}} {{item.price}} {{item.quantity}}
        </div>
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
        }
    }
</script>
