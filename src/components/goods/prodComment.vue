<template>
    <div class="tmpl">
        <nav-bar title="提交评价"></nav-bar>
        <comment :cid="cid"></comment>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                cid:'',
            }
        },created(){
            this.cid=this.$route.params.cid;
        }
    }
</script>
<style></style>
