<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index)  in imgs" :key="index">
                <a :href="img.img">
                    <img :src="img.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },props:['imgs'],
    }
</script>
<style>
    .mint-swipe {
        height: 300px;
    }

    .mint-swipe img {
        height: 100%;
        width: 100%;
    }
</style>
