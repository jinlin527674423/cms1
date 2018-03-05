<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-huiyuan"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcar'}">
                <span class="mui-icon icon-gouwuche"><span class="mui-badge">{{buyNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>

    </div>
</template>
<script>
    import MyBus from '../commons/myBus.js';
    import prodsTools from '../commons/prodTools';
    export default{
        data(){
            return {
                buyNum:prodsTools.getProdsCount(),
            }
        },created(){

            MyBus.$on('prodsNumChange',(num)=> {
                console.log('我成功',num);
//                console.log(this);
               this.buyNum+=num;
            });
        }
    }
</script>
<style></style>
