<template>
    <div class="tmpl">
        <nav-bar title="图文详情"></nav-bar>
        <div class="news-title">
            <p>{{news.title}}</p>
            <div>
                <span>{{news.click}}次点击</span>
                <span>分类：民生经济</span>
                <span>添加时间:{{news.addTime | format_date}}</span>
            </div>
        </div>
        <div class="news-content" v-html="news.content"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                news:{},            }
        },created(){
            let id=this.$route.params.cid;
            this.axios.get('/api/getnew/'+id)
                .then(res=>{
//                    this.news=res.data.message[0];
                    this.news=res.data.message;
//                    console.log(res);
                    console.log(this.news)
                })
                .catch(res=>{
                    console.log('失败');
                })

        }
    }
</script>

<style scoped>
    .news-title p {
        color: #0a87f8;
        font-size: 20px;
        font-weight: bold;
    }

    .news-title span {
        margin-right: 30px;
    }

    .news-title {
        margin-top: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }


    /*主体文章的左右距离*/

    .news-content {
        padding:10 5;
    }
</style>

