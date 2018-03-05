<template>
    <mt-loadmore :bottom-method="loadTop" @bottom-status-change="handleTopChange">
        <ul>
            <li v-for="item in list">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
    </mt-loadmore>
</template>
<script>
    export default {
        data() {
            return {
                list:[],
                autoFill: false, //不需要在没有填充满的情况下默认就调用下拉刷新的函数
                allLoaded: false,
                topStatus: '',
            };
        },
        methods: {
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(){

            }
            // ...
        },created(){
            let i=0;let len=11;
            for(;i<len;i++){
                this.list.push('item'+i);
            }
        }
        // ...
    };
</script>
<style scoped>

</style>
