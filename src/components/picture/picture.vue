<template>
    <div class="tmpl">
        <nav-bar title="图片分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="item in categorys" :key="item.id">
                    <a href="javascript:;" @click="getImgById(item.id)">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="item in imgs" :key="item.id">
                    <router-link :to="{name:'pic.detail',params:{id:item.id}}">
                        <img v-lazy="item.imgUrl">
                        <p>
                            <span>{{item.title}}</span>
                            <br>
                            <span>{{item.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
          return{
              categorys:[],
              imgs:[],
          }
        },methods:{
            getImgById(id){
                this.axios.get('api/getimages/'+id).then(res=>{
                    this.imgs=res.data.message;
                }).catch(err=>{
                    consloe.log('失败');
                })
            }
        },created(){
//            this.axios.get('api/getimgcategory').then(res=>{
//                this.categorys=res.data.message;
//                this.categorys.unshift({
//                    id:0,
//                    title:'全部',
//                })
//            }).catch(err=>{
//                console.log('图片失败');
//            });
//            this.getElementById(0);
            this.axios.all([
                this.axios.get('api/getimgcategory'),
                this.axios.get('api/getimages/'+0),
            ]).then(
                this.axios.spread((res1,res2)=>{
                    this.categorys=res1.data.message;
                    this.imgs=res2.data.message;
                    this.categorys.unshift({
                        id:0,
                        title:'全部',
                    })
                })).catch(
                console.log('图片或图标获取失败'),
            )
        }
    }
</script>
<style>
    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }

    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0px;
        margin: 5;
    }


    /*下面的图片*/

    .photo-list li {
        list-style: none;
        position: relative;
    }

    .photo-list li img {
        width: 100%;
        height: 350px;
        vertical-align: top;
    }

    .photo-list ul {
        padding-left: 0px;
        margin: 0;
    }
    image[lazy=loading]{
        width: 40px;
        height: 300px;
        margin: auto;
    }

    .photo-list p {
        position: absolute;
        bottom: 0px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0px;
    }

    .photo-list p span:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
    }
</style>

