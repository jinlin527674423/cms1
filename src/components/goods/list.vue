<template>
    <div class="tmpl" style="height:100%">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleTopChange"
                     :auto-fill="autoFill" ref="loadmore" :bottom-all-loaded="allLoaded">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in products" :key="item.id">
                    <router-link :to="{name:'goods.detail',params:{id:item.id}}">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{item.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div>
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <mt-spinner v-show="topStatus === 'loading'" type="triple-bounce" color="#26a2ff"></mt-spinner>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                pageIndex: 1, //当前页码
                products: [], //存储商品数组
                autoFill: false, //不需要在没有填充满的情况下默认就调用下拉刷新的函数
                allLoaded: false, //是否不允许下拉的行为，->允许
                topStatus: '', //记录当前组件上下拉Pull drop状态
            };
        },
        created() {
            //发起请求的时候需要传递参数
            this.getProductsByPage(); //默认pageindex=1

        },
        methods: {
            handleTopChange(status) {
                this.topStatus = status;

            },
            loadBottom() { //子盒子向上拖拽多少个px触发该函数->    70
                //发起请求，将数据追加到数组后面
                this.getProductsByPage();

            },
            getProductsByPage() {
                this.axios.get('/api/goods/getGoods?pageIndex=' + this.pageIndex)
                    .then(res => {
                        this.products = this.products.concat(res.data.message);
                        this.pageIndex++;
                        //判断当前返回的数据是不是一整页的数据 10条、
                        if (res.data.message.length != 6) {
                            //以后没有数据了,禁止上拉刷10
                            this.allLoaded = true;
                            //通知loading状态结束
                            this.$refs.loadmore.onBottomLoaded();//进入到pull 初始状态
                        }
                    })
                    .catch(err => {
                        console.log('获取商品列表失败')
                    })
            }
        }
    }
</script>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
        margin: 0px;
        padding: 0px;
        border: 1px solid #5c5c5c;
        box-shadow: 0 0 4px #666;
    }

    .sell > span {
        float: left;
        color: red;
        text-align: left;
    }

    .detail >.hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .detail >.count {
        float: right;
        text-align: right;
        font-size: 15px;
    }


    /*撑开，去除浮动没有的高度*/

    .detail {
        overflow: hidden;
    }

    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }


    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object{
        height: 75px;
    }

</style>