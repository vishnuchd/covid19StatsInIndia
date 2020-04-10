<template>
  <Page>
    <ActionBar title="Visualisation"> </ActionBar>
    <StackLayout>
      <RadCartesianChart>
        <DateTimeContinuousAxis
          v-tkCartesianHorizontalAxis
          majorStep="1"
          majorStepUnit="Month"
          :dateFormat="getDateFormat"
          labelFitMode="Rotate"
          labelRotationAngle="1.2"
        >
        </DateTimeContinuousAxis>
        <LinearAxis v-tkCartesianVerticalAxis></LinearAxis>
        <LineSeries
          v-tkCartesianSeries
          :items="data"
          categoryProperty="date"
          valueProperty="totalconfirmed"
        ></LineSeries>
      </RadCartesianChart>
      <!--            <RadCartesianChart stackMode="stack">-->
      <!--&lt;!&ndash;                <CategoricalAxis v-tkCartesianHorizontalAxis />&ndash;&gt;-->
      <!--&lt;!&ndash;                <LinearAxis v-tkCartesianVerticalAxis />&ndash;&gt;-->
      <!--                <LineSeries v-tkCartesianSeries-->
      <!--                            :items="this.data"-->
      <!--                            categoryProperty="TimeStamp"-->
      <!--                            valueProperty="Amount" >-->
      <!--                    <CategoricalAxis v-tkCartesianHorizontalAxis labelTextColor="#cb4b16" labelSize="10" lineThickness="3" lineColor="Red"></CategoricalAxis>-->
      <!--                    <LinearAxis v-tkCartesianVerticalAxis labelTextColor="Green" lineColor="Blue" lineThickness="5" horizontalLocation="left" lineHidden="false"></LinearAxis>-->
      <!--                </LineSeries>-->
      <!--            </RadCartesianChart>-->
    </StackLayout>
  </Page>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      data: []
    };
  },
  computed: {
    message() {
      return "Blank {N}-Vue app";
    },
    //How to pass param to computed method https://stackoverflow.com/a/58848671/3118707
    getDateFormat: function() {
      return "dd-MMM";
    }
  },
  methods: {
    onTap() {
      //  this.$navigateTo(App)
    },
    // onItemTap({ index, object }){
    //     const itemSelected = this.itemList.getItem(index);
    //     console.log(`Item selected: ${itemSelected.name}`);
    // },
    callApi() {
      axios({
        method: "GET",
        url: "https://api.covid19india.org/data.json",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(
        result => {
          let d = result.data.cases_time_series;
          for (const argumentsKey in d) {
            let day = d[argumentsKey].date.trim().split(" ")[0];
            let month = d[argumentsKey].date.trim().split(" ")[1];
            let monthno = parseInt(
              moment()
                .month(month)
                .format("M")
            );
            let dateeee = d[argumentsKey].date.trim() + " 2020";
            let t = moment(dateeee, "D MMMM YYYY")
              .utcOffset("+05:30")
              .format();
            let time = new Date(
              2020,
              parseInt(monthno),
              parseInt(day)
            ).getTime();
            d[argumentsKey].date = time;
            d[argumentsKey].totalconfirmed = parseInt(
              d[argumentsKey].totalconfirmed
            );
          }

          this.data = d;
        },
        error => {
          console.error(error);
          alert(error);
        }
      );
    },
    refreshList(args) {
      const pullRefresh = args.object;
      this.callApi();
      setTimeout(function() {
        pullRefresh.refreshing = false;
      }, 1000);
    }
  },
  mounted() {
    this.callApi();
    // console.log(this.$props.state)
  }
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

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
