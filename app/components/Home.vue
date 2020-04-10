<template>
    <Page>
        <ActionBar title="Covid 19 Stats India">
<!--            <ActionItem text="Visualisation"  @tap="goToChart"/>-->
        </ActionBar>
        <PullToRefresh @refresh="refreshList">
        <StackLayout orientation="vertical" @tap="onTap">
            <GridLayout columns="*, *" rows="250, 250" >
                <StackLayout  row="0" col="0" backgroundColor="#FFCDD2" class="container" margin="5">
                    <Image src="~/image/virus.png" class="img"/>
                    <Label :text=this.confirmed color="#D32F2F" class="counter"/>
                    <Label text="Confirmed" class="labelText" color="#D32F2F" />
                </StackLayout>
                <StackLayout  row="0" col="1" backgroundColor="#BBDEFB" class="container" margin="5">
                    <Image src="~/image/patient.png" class="img"/>
                    <Label :text=this.active color="#1976D2" class="counter"/>
                    <Label text="Active" class="labelText" color="#1976D2" />
                </StackLayout>
                <
                <StackLayout  row="1" col="0" backgroundColor="#C8E6C9" class="container" margin="5">
                    <Image src="~/image/heart.png" class="img"/>
                    <Label :text=this.recovered color="#388E3C" class="counter"/>
                    <Label text="Recovered" class="labelText" color="#388E3C" />
                </StackLayout>
                <
                <StackLayout  row="1" col="1" backgroundColor="#FFECB3" class="container" margin="5">
                    <Image src="~/image/poison.png" class="img"/>
                    <Label :text=this.deaths color="#FBC02D" class="counter"/>
                    <Label text="Deaths" class="labelText" color="#FBC02D" />
                </StackLayout>
                <
            </GridLayout>


        </StackLayout>
        </PullToRefresh>

    </Page>
</template>

<script>
    import axios from "axios";
    import Detail from "./Detail.vue";
    import Chart from "./Chart";

    export default {

        data() {
            return {
                items: [],
                confirmed:'',
                active:'',
                recovered:'',
                deaths:''
            }
        },
        computed: {
            message() {
                return "Blank {N}-Vue app";
            }
        },
        methods:{
            onTap(){
                this.$navigateTo(Detail)
               // this.$navigateTo(App)
            }, goToChart(){
                this.$navigateTo(Chart)
               // this.$navigateTo(App)
            },
            callApi(){
                axios({
                    method: 'GET',
                    url: 'https://api.covid19india.org/data.json',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(result => {
                   //console.log(result.data.statewise[0].confirmed);
                    this.confirmed=result.data.statewise[0].confirmed;
                    this.active=result.data.statewise[0].active;
                    this.recovered=result.data.statewise[0].recovered;
                    this.deaths=result.data.statewise[0].deaths;
                    //console.log(this.confirmed);
                }, error => {
                    console.error(error);
                    alert(error)
                });
            },
            refreshList(args) {
                const pullRefresh = args.object;
                this.callApi();
                setTimeout(function() {

                    pullRefresh.refreshing = false;
                }, 1000);
            }
        },
        mounted(){
            this.callApi()
        }

    };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
    .labelText{
        horizontal-align: center;
        font-size: 20;
        font-family: regular;
    }

    .container {
        border-radius: 5;
    }

    .counter {
        font-size: 48;
       font-weight: bold;
        horizontal-align: center;
        margin-top: 20;
        font-family: "regular";
    }

    .img {
        height: 80;
        width: 80;
        margin-top: 20;
    }
    ActionBar.ActionItem{
        color: white;
    }
</style>
