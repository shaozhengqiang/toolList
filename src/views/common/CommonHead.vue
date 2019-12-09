<template>
    <div>
        <header class="myheader">
                <img  v-if="icon=='back'" @click="goLastPage" src="../../img/common/back.png" class="myheader-icon-bg" >
            <span class="myheader-title">{{headerTitle}}</span>
        </header>
        <div class="myheader-bg"></div>
    </div>
</template>
<script>
    export default{
        components: {},
        props: {
            headerTitle: {  //头部标题
                required: true
            },
            targetPath: {//目标路径（返回的路径）
                default:-1,
            },
            icon:{
                default:'back'
            },
            isreplace:{
                default:true
            }
        },
        created(){
        },
        mounted(){
        },
        data(){
            return {
            }
        },
        methods: {
            goLastPage(){
                if(this.targetPath==-1){
                    this.$router.go(-1);
                    return;
                }
                else{
                    if(this.isreplace){
                        this.$router.replace(this.targetPath);
                    }
                    else{
                        this.$router.push(this.targetPath);
                    }
                }
            }
        },
    }
</script>
<style lang="scss" scoped type="text/scss">
    .myheader{
        font-size: 16px;
        color: #414141;
        height: .44rem;
        position: fixed;
        width: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        box-shadow: inset 0 -1px 0 0 #F2F2F2;
        background: #7F7FD5;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
    .myheader-bg{
        width: 100%;
        height: .44rem;
    }
    .myheader-icon-bg{
        width: .23rem;
        height: .23rem;
        position: absolute;
        z-index: 1;
        left: .12rem;
    }
    .myheader-title{
        font-size:.16rem;
        position: absolute;
        display: block;
        top:.12rem;
        text-align: center;
        width: 100%;

    }
</style>
