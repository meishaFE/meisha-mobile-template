<template>
  <div id="MainView" :class="{'has-footer': $route.meta.hasFooter}">
    <MsFooter v-if="$route.meta.hasFooter" ref="theFooterRef"></MsFooter>
    <router-view class="main-view"/>
  </div>
</template>

<script>
import MsFooter from '@/components/theFooter';
export default {
  name: 'Home',
  data () {
    return {
    };
  },
  components: {
    MsFooter
  },
  methods: {
    changeFooterActive (type) {
      this.$refs['theFooterRef'].handleFooterTabChange(type);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-view{
    min-height: 100vh;
  }
  .has-footer .main-view{
    min-height: calc(100vh - 50px);
  }
  .middle-show{
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    width: 100%;
    z-index: 1000;
    margin-left: -20px;
    margin-top: -20px;
  }
  .hidden-bg{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #e2e2e2;
    z-index: -1;
    text-align: center;
    padding-top: 140px;
    span{
      font-size: 12px;
    }
  }
  .has-footer{
    padding-bottom: 50px;
  }
</style>
