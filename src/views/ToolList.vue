<template>
<div class="toolList">
    <CommonHead headerTitle="功能列表" icon="none"></CommonHead>
    <div class="toolItem" @click="goPage('/SignatureIndex')">手写签名</div>
</div>
</template>

<script>
 import CommonHead from "./common/CommonHead"
    export default {
        name: "ToolList",
        components: {
          CommonHead
        },
        created() {
        },
        mounted() {
        },
        watch: {},
        data() {
            return {
              list:[1,2,3,4,5,6,7]
            }
        },
        methods: {
            goPage(path,params){
                if(params){

                }
                else{
                    this.$router.push(path)
                }
            }
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
  .toolList{
    .toolTitle{
      width: 100%;
      text-align: center;
      font-size: .2rem;
      color: #414141;
      height: .48rem;
      line-height: .48rem;
    }
    .toolItem{
      width: 100%;
      text-align: center;
      font-size: .2rem;
      color: #414141;
      height: .4rem;
      line-height: .4rem;
      border-bottom: 1px solid #cacaca;
    }
  }
</style>
