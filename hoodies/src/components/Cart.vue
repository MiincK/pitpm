<template>
    <v-container style="max-width: 1200px;padding: 0 15%" v-if="cartfull">
        <div v-if="cartfull.length">
            <div v-for="item in cartfull" :key="item[0]">
                <span>
                    {{item.name}}x{{item[1]}}
                </span>
            </div>
        </div>
        <div v-else>
            У вас нет ничего в корзине
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'Cart',

        data: () => ({
            cartfull: null
        }),
        created() {
            let cart = this.cart;
            if (cart.length)
            {
                this.axios.get(this.$me.apihost + "/items/multiple?items=" + this.cart.map(x => x[0]).join(','))
                    .then((res) => {
                        this.cartfull = res.data.map(x => {
                            x.count = cartd[x.id.toString()];
                            return x;
                        });
                    }).catch((err) => {

                    });
            }
            else cartfull = [];
        },
        computed: {
            cartd() {
                return JSON.parse(localStorage['cart'] || "{}");
            },
            cart() {
                return Object.entries(this.cartd);
            }
        }
    }
</script>
