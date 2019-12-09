<template>
    <div v-show="openStatus">
        <div class="warpDiv" ref="warpDiv">
            <div class="btnWarp">
                <div class="clearBtn" @click="clearCanvas">清屏</div>
                <div class="sureBtn" @click="submitImg">确定</div>
            </div>
            <canvas ref="canvas" style=""></canvas>
        </div>
    </div>
</template>
<script>
    export default {
        components: {},
        props: {
            openStatus: {
                default: false
            }
        },
        watch: {
            openStatus(newVal) {
                if (newVal) {
                    document.addEventListener('touchmove', this.preventTouchmove, {passive: false});

                } else {
                    document.removeEventListener('touchmove', this.preventTouchmove, {passive: false});

                }
            }
        },
        mounted() {
            window.addEventListener('onorientationchange' in global ? 'orientationchange' : 'resize',this.listenerResize(), false)
            if (window.orientation === 180 || window.orientation === 0) {
                this.isVertical = true;
            }
            if (window.orientation === 90 || window.orientation === -90) {
                this.isVertical = false;
            }
            this.initCanvas();
            this.detectOrient();
        },
        destroyed(){
            window.removeEventListener('onorientationchange' in global ? 'orientationchange' : 'resize',this.listenerResize(), false)
        },
        data() {
            return {
                isClear: true,
                isVertical: true,
                cxt: ""
            }
        },
        methods: {
            //清除画布
            clearCanvas(){
                this.cxt.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
                this.cxt.fillStyle = 'rgba(255,255,255,1)';
                this.cxt.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
                this.isClear = true;
            },
            //提交canvas中的内容
            submitImg(){
                if (this.isClear) {
                            this.$toast("请签字");
                        }
                        else {
                            let imgBase64 = this.$refs.canvas.toDataURL();
                            this.$emit("updateImg",imgBase64);
                        }
            },
            //阻止默认滚动事件，主要针对微信端
            preventTouchmove(event) {
                event.preventDefault();
            },
            //监听页面尺寸改变事件（针对横竖屏切换）
            listenerResize(){
                //竖屏
                if (window.orientation === 180 || window.orientation === 0) {
                    setTimeout(() => {
                        this.isVertical = true;
                        this.detectOrient();
                    }, 200)
                }
                //横屏
                if (window.orientation === 90 || window.orientation === -90) {
                    setTimeout(() => {
                        this.isVertical = false;
                        this.detectOrient();
                    }, 200)
                }
            },
            //更新canvas的宽高，以及清除屏幕
            updateCanvas(canvas, cxt) {
                if (this.isVertical) { // 竖屏
                    canvas.width = document.documentElement.clientHeight;
                    canvas.height = document.documentElement.clientWidth;
                    // }
                } else {
                    //横屏
                    canvas.width = document.documentElement.clientWidth;
                    canvas.height = document.documentElement.clientHeight;
                }
                //清空canvs
                cxt.clearRect(0, 0, canvas.width, canvas.height);
                //设置背景色
                cxt.fillStyle = 'rgba(255,255,255,1)';
                cxt.fillRect(0, 0, canvas.width, canvas.height);
                //设置画笔颜色
                cxt.strokeStyle =  "#414141";
                //设置线宽
                cxt.lineWidth = 3;
                //设置线条样式
                cxt.lineCap = "round";
            },
            //初始化canvas
            initCanvas() {
                let canvas = this.$refs.canvas;
                this.cxt = canvas.getContext("2d");
                let cxt = this.cxt;
                //开始绘制
                canvas.addEventListener("touchstart", function (e) {
                    cxt.beginPath();
                    this.isClear = false;
                    let position = this.getXY(e);
                    cxt.moveTo(position.x, position.y);

                }.bind(this), false);
                //绘制中
                canvas.addEventListener("touchmove", function (e) {
                    let position = this.getXY(e);
                    cxt.lineTo(position.x, position.y);
                    cxt.stroke();
                }.bind(this), false);
                //结束绘制
                canvas.addEventListener("touchend", function () {
                    cxt.closePath();
                }.bind(this), false);
            },
            //获取XY 的定位，根据横竖屏不同，定位不同
            getXY(e) {
                let et = e.touches ? e.touches[0] : e;
                if (this.isVertical) {
                    return {
                        x: et.clientY,
                        y: document.documentElement.clientWidth - et.clientX
                    }
                } else {
                    return {
                        x: et.clientX,
                        y: et.clientY
                    }
                }


            },
            //重绘canvas大小，并且清屏，改变外层容器样式
            detectOrient() {
                let width = document.documentElement.clientWidth,
                    height = document.documentElement.clientHeight,
                    wrapper = this.$refs.warpDiv,
                    style = "";
                if (this.isVertical) { // 竖屏
                    style += "width:" + height + "px;";// 注意旋转后的宽高切换
                    style += "height:" + width + "px;";
                    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
                    style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
                    style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";


                } else { // 横屏
                    style += "font-size:0";
                    style += "overflow: hidden;";
                    style += "transform-origin: 0 0;";
                    style += "width:" + width + "px;";// 注意旋转后的宽高切换
                    style += "height:" + height + "px;";
                    style += "-webkit-transform: rotate(0); transform: rotate(0);";
                    style += "-webkit-transform-origin: 0 0;";
                    style += "transform-origin: 0 0;";
                }
                wrapper.style.cssText = style;
                this.$nextTick(() => {
                    this.updateCanvas(this.$refs.canvas, this.cxt)
                })
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .warpDiv {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .btnWarp {
        font-size: .2rem;
        height: .28rem;
        z-index: 999;
        background: #fff;
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: space-between
    }

    .clearBtn {
        margin-left: .3rem;
    }

    .sureBtn {
        margin-right: .3rem;
    }
</style>
