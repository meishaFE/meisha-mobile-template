<template>
  <section class="not-found">
    <div class="tip-txt">找不到了，请点击到首页~</div>
    <div class="mt-48 btn-zone">
      <ms-button @click="$router.push({name: 'index'})" size="normal" type="primary">返回首页</ms-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'notFound'
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/scss/index";
  .not-found{
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

