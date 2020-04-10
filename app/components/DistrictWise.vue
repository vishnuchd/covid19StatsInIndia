<template>

    <Page>
        <ActionBar title="Covid 19 Stats India">

        </ActionBar>
        <StackLayout orientation="vertical">
            <TextView hint="Filter" @textChange="onTextChange"/>
            <RadListView ref="listView" for="item in this.items"
                         margin="5"
                         @itemTap="this.onItemTap">
                <v-template>
                    <CardView class="cardStyle" elevation="3" ios:shadowRadius="3" margin="5" radius="5">
                        <StackLayout>
                            <Label :text="item.district" class="stateName"/>

                            <GridLayout columns="*, *" rows="80, 80">
                                <StackLayout row="0" col="0" backgroundColor="#FFCDD2" class="container" margin="5">
                                    <Label text="Confirmed" class="labelText"/>
                                    <Label :text="item.confirmed" class="counter"/>

                                </StackLayout>
                                <StackLayout row="0" col="1" backgroundColor="#BBDEFB" class="container" margin="5">
                                    <Label text="Active" class="labelText"/>
                                    <Label :text="item.active" class="counter"/>
                                </StackLayout>
                                <StackLayout row="1" col="0" backgroundColor="#C8E6C9" class="container" margin="5">

                                    <Label text="Recovered" class="labelText"/>
                                    <Label :text="item.recovered" class="counter"/>
                                </StackLayout>
                                <StackLayout row="1" col="1" backgroundColor="#FFECB3" class="container" margin="5">

                                    <Label text="Deaths" class="labelText"/>
                                    <Label :text="item.deaths" class="counter"/>
                                </StackLayout>

                            </GridLayout>
                        </StackLayout>
                    </CardView>

                </v-template>
            </RadListView>
        </StackLayout>
    </Page>
</template>

<script>
    import axios from "axios";

    export default {
        props: ['state'],
        data() {
            return {
                items: [],
                filteredItem: [],
            }
        },
        methods: {
            callApi() {
                axios({
                    method: 'GET',
                    url: 'https://api.covid19india.org/v2/state_district_wise.json',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(result => {
                    this.items = result.data.find((o) => o.state === this.$props.state).districtData;
                }, error => {
                    //console.error(error);
                    alert(error)
                });
            },
            refreshList(args) {
                const pullRefresh = args.object;
                this.callApi();
                setTimeout(function () {

                    pullRefresh.refreshing = false;
                }, 1000);
            },
            onTextChange(args) {
                let view = args.object;
                if (this.filteredItem.length === 0) {
                    this.filteredItem = this.items;
                }
                if (view.text !== '') {
                    this.items = this.items.filter(c => c.district.toLowerCase().indexOf(view.text.toLowerCase()) > -1);
                } else {
                    this.items = this.filteredItem;
                    this.filteredItem = [];
                }
                console.log(this.items)
            }

        },
        mounted() {
            this.callApi()
            console.log(this.$props.state)
        }

    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .container {
        border-radius: 5;
    }

    .labelText {
        font-size: 14;
        font-family: regular;
        color: "black";
    }

    .stateName {
        horizontal-align: left;
        font-size: 14;
        font-family: regular;
        font-weight: bold;
    }

    .lastUpdate {
        horizontal-align: left;
        font-size: 12;
        font-family: regular;
        font-weight: normal;
    }


    .counter {
        font-size: 16;
        font-weight: bold;
        color: black;
    }

    TextView {

        font-size: 14;
        height: 34;
        padding: 5;
        margin: 5;
        border-color: lightgrey;
        border-width: 2;
        border-radius: 5;
        font-weight: bold;
        font-family: regular;
        text-align: left;
        vertical-align: center;


    }


</style>
