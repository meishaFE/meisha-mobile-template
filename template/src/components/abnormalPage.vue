<template>
  <section class="abnormal-page">
    <div class="tip-txt">{{isAbnormal.abnormalDes}}</div>
    <div class="mt-48 btn-zone">
      <ms-button @click="goBack" size="normal" type="primary">{{getAbnormalBtnText}}</ms-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'abnormalPage',
  props: {
    isAbnormal: {
      required: true,
      type: Object,
      default: () => {
        return {
          visible: false,
          abnormalDes: '网络故障'
        };
      }
    }
  },
  methods: {
    goBack () {
      if (window.history.length === 1) {
        this.$router.push({name: 'index'});
      } else {
        this.$router.go(-1);
      }
    }
  },
  computed: {
    getAbnormalBtnText () {
      return window.history.length === 1 ? '返回首页' : '返回';
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss"   scoped>
  @import "../assets/scss/index";
  .abnormal-page{
    height: 100vh;
    .tip-txt{
      padding-top: pxtorem(280px);
      text-align: center;
      background: url('../assets/img/image_none_404.png') no-repeat 50%  pxtorem(130px);
      @include backgroundSize(pxtorem(115px), pxtorem(132px));
      @include font-style(15px, $fontColorLast, 15px);
    }
    .btn-zone{
      padding:0 pxtorem(98px);
    }
  }
</style>
