<template>
    <v-container style="max-width: 1200px">
        <div class="text-size--3 text-center my-4">
            Часто задаваемые вопросы
        </div>
        <v-item-group class="background">
            <v-sheet
            class="overflow-y-auto background"
            max-height="600"
            >
                <v-item
                    v-for="item in faq"
                    :key="item.q"
                >
                    <template v-slot="{ active, toggle }">
                        <v-sheet
                            class="px-4 pt-4 pb-3 background"
                            tile
                            style="cursor: pointer;"
                            @click="toggle"
                        >
                            <div
                                :class="[active && `mb-1`]"
                                class="transition-swing text-size--2 v-toolbar__content"
                                >
                                <a class="text-size--2">{{item.q}}</a>
                                <v-spacer></v-spacer>
                                <v-icon class="text-size--3" style="align-self: right">mdi-chevron-{{active ? "down" : "right"}}</v-icon>
                            </div>

                            <v-expand-transition>
                                <v-responsive v-if="active">
                                    <a class="text-size--1-5" style="padding: 20px">{{item.a}}</a>
                                </v-responsive>
                            </v-expand-transition>
                            <v-divider></v-divider>
                        </v-sheet>
                    </template>
                </v-item>
            </v-sheet>
        </v-item-group>
    </v-container>
</template>

<script>
    export default {
        name: 'FAQ',

        data: () => ({
            faq: [
                {
                    q: 'Вопрос 1',
                    a: 'Ответ 1'
                }, {
                    q: 'Вопрос 2',
                    a: 'Ответ 2'
                }, {
                    q: 'Вопрос 3',
                    a: 'Ответ 3'
                }, {
                    q: 'Вопрос 4',
                    a: 'Ответ 4'
                }, 
            ]
        }),
    }
</script>
