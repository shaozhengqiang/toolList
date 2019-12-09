<template>
  <div id="app" style="height: 100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" ></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" ></router-view>

  </div>
</template>

<script>
  import "./styles/style.css";

  export default {
    components: {
    },
    mounted: function () {
      let indexLoadingWarp=document.getElementById("indexLoadingWarp");
      let indexLoading=document.getElementById("indexLoading");
      if(indexLoading){
        indexLoadingWarp.removeChild(indexLoading);
      }
    },
    data(){
      return {
      }
    },
    methods:{

    }

  }
</script>

<style scoped lang="scss" type="text/scss">
  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
</style>
