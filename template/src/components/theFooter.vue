<template>
  <ms-footer-tab class="define-footer" v-model="activated"
                    @change="handleFooterTabChange">
      <ms-tab-item value="index">
          <div slot="icon"
              class="normal-div index-icon"></div>
          首页</ms-tab-item>
      <ms-tab-item value="page1">
          <div slot="icon"
              class="normal-div course-icon"></div>
          课程</ms-tab-item>
      <ms-tab-item value="page2">
        <div slot="icon"
              class="normal-div mine-icon"></div>
        我的
      </ms-tab-item>
  </ms-footer-tab>
</template>

<script>
export default {
  name: 'TheFooter',
  data () {
    return {
      activated: 'index'
    };
  },
  watch: {
    $route () {
      this.initRouterActived();
    }
  },
  created () {
    this.initRouterActived();
  },
  methods: {
    initRouterActived () {
      this.$nextTick(() => {
        this.activated = this.$route.name;
      });
    },
    handleFooterTabChange (val) {
      this.activated = val;
      this.$router.push({name: val});
    }
  },
  components: {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/scss/index";
  .normal-div{
    height: 25px;
  }
  .index-icon{
    background: url('./img/icon_bottom-tab_home_n@2x.png') no-repeat center top;
    @include backgroundSize(25px, 25px);
  }
  .course-icon{
    background: url('./img/icon_bottom-tab_course_n@2x.png') no-repeat center top;
    @include backgroundSize(25px, 25px);
  }
  .mine-icon{
    background: url('./img/icon_bottom-tab_mine_n@2x.png') no-repeat center top;
    @include backgroundSize(25px, 25px);
  }
  .is-activated{
    .index-icon{
      background: url('./img/icon_bottom-tab_home_hl@2x.png') no-repeat center top;
      @include backgroundSize(25px, 25px);
    }
    .course-icon{
      background: url('./img/icon_bottom-tab_course_hl@2x.png') no-repeat center top;
      @include backgroundSize(25px, 25px);
    }
    .mine-icon{
      background: url('./img/icon_bottom-tab_mine_hl@2x.png') no-repeat center top;
      @include backgroundSize(25px, 25px);
    }
  }
</style>
