import Vue from "nativescript-vue";

import Home from "./components/Home";
import RadListView from 'nativescript-ui-listview/vue'
import RadChart from 'nativescript-ui-chart/vue';



Vue.use(RadListView);
Vue.use(RadChart);


Vue.registerElement(
    'PullToRefresh',
    () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);
Vue.registerElement(
    'CardView',
    () => require('@nstudio/nativescript-cardview').CardView
);
new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
