<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(item,index) in viewProds" :key="item.id">
                    <mt-switch v-model="item.isSelected"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="pay-calc">
                        <p v-text="item.title"></p>
                        <div class="calc">
                            <span>￥{{item.sell_price}}</span>
                            <span @click="substract(item)">-</span>
                            <span>{{item.pickNum}}</span>
                            <span @click="add(item)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.totalPrice}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large" @click="show">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import prodTools from '../commons/prodTools.js';
    export default{
        data(){
            return {
                viewProds: [],
            }
        }, created(){
            let prods = prodTools.getProds();
            let tmp = '';
            for (let key in prods) {
                tmp += key + ',';
            }
            tmp = tmp.substr(0, tmp.length - 1);
            this.axios.get('/api/goods/getshopcarlist/' + tmp)
                .then(res => {
                    //官方提供添加属性方式
//                    this.viewProds=res.data.message;
//                    for(var i;i<this.viewProds.length;i++){
//                        //this.viewProds[i].pickNum=prods[this.viewProds[i].id];
//                        this.$set(this.viewProds[i],'pickNum',prod[this.viewProds[i].id]);
//                        //this.viewProds[i].isSelected=false;
//                        this.$set(this.viewProds[i],'isSelected',false);
//                    }
                    //默认使用方式 vue在对于双向数据绑定的操作，实际上是通过this.xxx=xx的时候完成的，此时会去触发对象的setter，
                    //进入到之后，就会去給新赋值对象遍历所有属性及子属性，来完成双向数据绑定
                    let tmp = res.data.message;
                    for (var i = 0; tmp.length; i++) {
                        tmp[i].pickNum = prod[tmp[i]].id;
                        tmp[i].isSelected = false;
                    }
                    this.viewProds = tmp;


                })
                .catch(err => {
                    console.log(err);
                })
        },
        computed: {
            payment(){
                let count = 0;
                let totalPrice = 0;
                for (var i = 0; i < this.viewProds.length; i++) {
                    let tmp = this.viewProds[i];
                    if (tmp.isSelected) {
                        count++;
                        totalPrice += tmp.sell_price * tmp.pickNum;
                    }
                }
                return {
                    count,
                    totalPrice
                }
            },
            methods: {
                show(){
                    console.log(this.viewProds);
                },
                add(prod){
                    prod.pickNum++;
                },
                substract(prod){
                    if (prod.pickNum <= 1) return;
                    prod.pickNum--;
                },
                del(index){
                    if (confirm('亲，确定要删除吗')) {
                        this.viewProds.splice(index, 1);
                        this.saveProds();
                    }
                },
                saveProds(){
                    let obj = {};
                    for (let i = 0; i < this.viewProds.length; i++) {
                        let tmp = this.viewProds[i];
                        obj[tmp.id] = tmp.pickNum;
                    }
                    this.saveProds();
                }
            },
            beforeRouteLeave(to,from,next){
                if(confirm('离开吗?')){
                    next();
                    this.saveProds();
                }else {
                    next(false);
                }
            }
        }
    }
</script>
<style scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li >:nth-child(1),
    .pay-detail ul li >:nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li >:nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
