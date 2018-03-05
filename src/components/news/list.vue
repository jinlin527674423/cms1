
<template>
    <!-- mui中的图文列表 -->
    <div class="tmpl">

        <nav-bar title="新闻资讯"></nav-bar>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newslist" :key="news.newid">
               <router-link :to="{name:'news.detail',query:{id:news.newid}}" >
                    <img class="mui-media-object mui-pull-left" :src="news.imgUrl" >
                    <div class="mui-media-body">
                        <span>{{news.title}}</span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.addTime | format_date}}</p>
                        </div>
                    </div>

               </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                newslist:[]
            }
        },created(){
            this.axios.get('api/getnewslist').then(res=>{
                this.newslist=res.data.message;
            }).catch(res=>{
                console.log('失败');
            })
        }
    }
</script>
<style scoped>
    .mui-media-body p {
        color: #0bb0f5;
    }

    .news-desc p:nth-child(1) {
        float: left;
    }

    .news-desc p:nth-child(2) {
        float: right;
    }
</style>

