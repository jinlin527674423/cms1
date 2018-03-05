<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newMsg"></textarea>
            </li>
                <li>
                    <mt-button size="large" type="primary" @click="sendComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(item,index) in msgs" :key="index">
                    {{item.user_name}}：{{item.content}} {{item.add_time | format_date}}
                </li>
            </ul>
            <mt-button plain type="danger" size="large" @click="getCommentsByPage(pageIndex)">加载更多{{pageIndex}}</mt-button>
        </div>
    </div>
</template>
<script>
    import {
        Indicator
    } from 'mint-ui';

    export default {
        data() {
            return {
                pageIndex: 1, //默认值是1,页码
                msgs: [], //存储评论数据
                newMsg: '' //发表的评论
            }
        }, props: ['cid'] //子组件的依赖由路由参数转换为父组件传递
        , created() {
            // //1:获取路由参数，查询字符串 ?id=123
            // this.cid = this.$route.query.id;

            //通过向父组件获取cid
            //页面加载       获取第1页的数据 -->  通过页码获取数据
            //点击加载更多  获取第x页的数据 --->
            this.getCommentsByPage(this.pageIndex);
        }, methods: {
            getCommentsByPage(page) {
                this.axios.get('/api/getcomments/' + this.$props.cid + '?pageindex=' + page)
                    .then(res => {
                        this.msgs = this.msgs.concat(res.data.message);
                        //请求成功
                        this.pageIndex++;
                    })
                    .catch(err => {
                        console.log('获取评论数据失败')
                    });
            },
            sendComment() {

                //显示加载中的信息
                Indicator.open({
                    text: '拼命加载中...',
                    spinnerType: 'fading-circle'
                });



                //发起请求
                this.axios.post('/api/postcomment/' + this.$props.cid, {
                    content: this.newMsg
                }, {
                    transformRequest: [function(data) {
                        let tmp = '';
                        for (var key in data) {
                            tmp += key + '=' + data[key] + '&';
                        }
                        return tmp; //aaa=bbb&ccc=dddd
                    }],
                    // `headers` are custom headers to be sent

                })
                    .then(res => {
                        //清空当前的数据
                        this.newMsg = '';


                        //响应回来之后的操作
                        //清空数组，便于以后的追加
                        this.msgs = [];
                        //清空当前页码
                        this.pageIndex = 1;
                        //数据发表成功以后 清除显示拼命发送中的图标
                        Indicator.close();
                        this.getCommentsByPage(this.pageIndex); //获取最新的第一页的数据

                    })
                    .catch(err => {
                        console.log('发表评论异常');
                        console.log(err);

                    })

            }
        }
    }
</script>
<style scoped>
    .photo-comment > div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;
    }

    .photo-comment > div span:nth-child(2) {
        float: right;
    }

    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }

    .txt-comment {
        padding: 5 5;
    }

    .txt-comment textarea {
        margin-bottom: 5px;
    }

    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }
</style>
