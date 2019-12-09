<template>
    <div>
        <van-button type="primary" size="large" @click="open()">打开签名</van-button>
        <div style="margin-top: .2rem;margin-bottom:.2rem;text-align: center" v-show="isSign">
            <img ref="myImg" width="80%" style="border:1px solid #414141" >
        </div>
        <div class="textWarp">
            <p>功能描述：该功能主要针对微信中手写签名使用，因在移动端竖屏签字用户体验较差，故开发该功能，
                用户在竖屏中使用可以有效提示用户横至手机，同时针对了手机中自动旋转做了处理。
            </p>
            <p>在子组件中监听 了一些默认事件，并且阻止了默认事件的触发（防止在滑动时显示网页有XXX提供），故写下面一堆代码验证关闭子组件后是否父组件事件依然生效</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>++++++++++++++</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>-----------------------------------------------</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>++++++++++++++</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>-----------------------------------------------</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>++++++++++++++</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>
            <p>-----------------------------------------------</p>
            <p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p><p>只是为了验证滚动事件是否依然有效</p>

        </div>

        <SignatureCore :openStatus="openStatus" v-on:updateImg="updateImg"></SignatureCore>
    </div>
</template>

<script>
    import SignatureCore from "./SignatureCore";
    import { Button } from 'vant';
    export default {
        name: "SignatureIndex",
        components: {
            SignatureCore,
            [Button.name]: Button,
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        data() {
            return {
                openStatus:false,
                isSign:false
            }
        },
        methods: {
            open(){
                this.openStatus=true;
            },
            updateImg(data){
                this.isSign=true;
                this.openStatus=false;
                this.$refs.myImg.src=data;
            }
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
.textWarp{
    margin: .1rem;
    p{
        font-size: .16rem;
        line-height: .22rem;
    }
}
</style>
