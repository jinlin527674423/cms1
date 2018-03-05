<template>
    <div class="tmpl">
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>发起日期：{{info.addTime|format_date}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in imgs" :key="index">
                <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index,imgs)"  >
            </li>>
        </ul>
        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>
        <!-- 使用子组件 -->
        <comment :cid="cid"></comment>

    </div>
</template>
<script>
    export default{
        data(){
            return{
              info:{},
              imgs:[],
              cid:'',
            }
        },created(){
            this.cid = this.$route.params.id;
//            console.log(this.cid);
//            this.axios.get('api/getimageInfo/'+id)
//                .then(res=>{
//                   this.info=res.data.message[0];
//                }).catch(err=>{
//                    console.log('Shibai');
//            });
//            this.axios.get('api/getthumimages/'+id)
//                .then(res=>{
//                    this.imgs=res.data.message;
//                    console.log(res)
//                }).catch(err=>{
//                console.log('Shibai');
//            });
            this.axios.get('api/getimageInfo/'+this.cid).then(res=>{
                this.info=res.data.message[0];
                return this.axios.get('api/getthumimages/'+this.cid)
            }).then(res=>{
                console.log(this.cid+":"+res);
               this.imgs=res.data.message;
               for(var i=0;i<this.imgs.length; i++){
                   this.imgs[i].w=300;
                   this.imgs[i].h=300;
               }
            }).catch(err=>{
                console.log('失败');
            })
        }
    }
</script>
<style scoped>
    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    .photo-title {
        overflow: hidden;
    }

    .photo-title,
    .photo-desc {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    .photo-title p {
        color: #13c2f7;
        font-size: 20px;
        font-weight: bold;
    }

    .photo-title span {
        margin-right: 20px;
    }

    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: white;
        border: 0;
    }

    .mui-table-view.mui-grid-view.mui-grid-9 li {
        border: 0;
    }

    .photo-desc p {
        font-size: 18px;
    }

    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
        padding: 2 2;
    }
</style>

