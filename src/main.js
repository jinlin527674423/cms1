/**
 * Created by 琳琳π on 2018/1/2.
 */
'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
let router =new VueRouter({
    linkActiveClass:'mui-active',

});
import Axios from 'axios';
Axios.defaults.baseURL='http://192.168.31.157:1212';
Vue.prototype.axios=Axios;

import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);

import'./static/vendor/mui-master/dist/css/mui.css';
import './static/css/global.css';
import Moment from 'moment';

import VuePreview from 'vue-preview';
Vue.use(VuePreview);


import App from './app.vue';
import Home from './components/home/home.vue';


import MyHeader from './components/partials/myHeader.vue';
import MyFooter from './components/partials/myFooter.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/goods/shopcart.vue';
import Search from './components/search/search.vue';
import News from './components/news/list.vue';
import NewsDetail from './components/news/detail.vue';
import PicList from './components/picture/picture.vue';
import GoodsList from './components/goods/list.vue';
import GoodsDetail from './components/goods/detail.vue';
import ProdComment from './components/goods/prodComment.vue';
import PicTextDetail from './components/goods/PicTextDetail.vue';

import NavBar from './components/commons/navbar.vue';
import PicDetail from './components/picture/detail.vue';
import Comment from './components/commons/comment.vue';

import Good from './1.vue';
import MySwipe from './components/commons/mySwipe.vue';



router.addRoutes([
    {name:'home',path:'/home',component:Home},
    {name:'default',path:'/',redirect:'/home'},
    {name:'member',path:'/member',component:Member},
    {name:'shopcar',path:'/shopcart',component:Shopcart},
    {name:'search',path:'/search',component:Search},
    {name:'news.list',path:'/news/list',component:News},
    {name:'news.detail',path:'/news/detail',component:NewsDetail},
    {name:'pic.list',path:'/pic/list',component:PicList},
    {name:'pic.detail',path:'/pic/detail/:id',component:PicDetail},
    {name:'test',path:'/test',component:Comment},
    {name:'goods.list',path:'/goods/list',component:GoodsList},
    {name:'goods.detail',path:'/goods/detail',component:GoodsDetail},
    {name:'goods.comment',path:'/goods/prodComment/:cid',component:ProdComment},
    {name:'goods.PicDetail',path:'/goods/PicDetail/:cid',component:PicTextDetail},
    {name:'ha',path:'/ha',component:Good},


]);

router.beforeEach((to,from,next)=>{
    next();
});

Vue.filter('format_date',function (time) {
    return Moment(time).format('YYYY-MM-DD');
});

Vue.component('navBar',NavBar);
Vue.component('myHeader',MyHeader);
Vue.component('myFooter',MyFooter);
Vue.component('comment',Comment);
Vue.component('mySwipe',MySwipe);

new Vue({
    el:'#app',
    router:router,
    render:c=>c(App),
});


