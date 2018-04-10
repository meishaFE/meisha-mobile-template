<template>
  <section class="bindingPhoneNo-wrap">
    <div class="logo-wrap"></div>
    <div class="form-wrap">
      <div>
        <input
          v-model="phoneNo"
          class="bindingPhoneNo-input bindingPhoneNo-phoneNo"
          placeholder="请输入手机号"
          type="tel">
      </div>
      <div class="display-flex mt-10">
        <input
          v-model="verificationCode"
          class="bindingPhoneNo-input bindingPhoneNo-verificationCode"
          placeholder="请输入验证码"
          type="text">
        <span @click="toGetVerificationCode" class="verificationCode-button" :class="canGetVerificationCode ? '' :'verificationCode-button-unable'">
          <span v-show="canGetVerificationCode">
            获取验证码
          </span>
          <span v-show="!canGetVerificationCode">{{`${countdown}秒`}}</span>
        </span>
      </div>
      <div class="mt-10">
        <input
          v-model="inviteCode"
          class="bindingPhoneNo-input"
          placeholder="邀请码(选填)">
          <p v-show="isShowInviteCodeTip" class="bindingPhoneNo-input__tip--des">已自动获取并填入你好友的邀请码，点击可修改</p>
      </div>
    </div>
    <div class="bingdingButton-wrap">
      <span
        @click="toBingding"
        class="bingdingButton-button"
        :class="canBingding ? 'bingdingButton-button-able' : ''">
        立即绑定
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'bindingPhoneNo',
  data () {
    return {
      // 手机号码
      phoneNo: '',
      // 验证码
      verificationCode: '',
      // 邀请码
      inviteCode: window.sessionStorage.getItem('inviteCode') || '',
      // 倒计时
      countdown: 60,
      // 是否可以获取验证码
      canGetVerificationCode: true,
      // 是否已经获取过验证码
      canBingding: false,
      // 绑定后重定向地址
      redirect: decodeURI($tool.getUrlParam('redirect')) || '',
      // 微信登陆的key
      wechatInfoKey: $tool.getUrlParam('wechatInfoKey') || ''
    };
  },
  methods: {
    // 验证手机号码
    validatePhoneNo: function () {
      let flag = /^1\d{10}$/.test(this.phoneNo);
      if (flag) {
        return flag;
      } else {
        this.$toast.success('请输入正确的手机号码');
        return flag;
      }
    },
    // 获取验证码
    toGetVerificationCode: function () {
      if (!this.validatePhoneNo()) {
        return false;
      }
      this.canBingding = true;
      if (!this.canGetVerificationCode) {
        return false;
      }
      this.canGetVerificationCode = false;
      let timer = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown === 0) {
          this.canGetVerificationCode = true;
          this.countdown = 60;
          clearInterval(timer);
        }
      }, 1000);
      this.toGetCaptcha();
    },
    // 检查是否可以绑定手机
    toBingding: function () {
      // 是否已经获取过验证码
      if (!this.canBingding) {
        return false;
      }
      // 检查手机号码
      if (this.validatePhoneNo()) {
        // 检查验证码是否填写
        if ((this.verificationCode + '').length < 4) {
          this.$toast('请输入正确的验证码');
        } else {
          this.toSubmit();
        }
      }
    },
    // 提交
    toSubmit () {
      let api = CONFIG.API.USER.BIND_PHONE;
      let params = {
        data: JSON.stringify({
          phoneNo: this.phoneNo,
          captcha: this.verificationCode,
          inviteCode: this.inviteCode,
          wechatInfoKey: this.wechatInfoKey
        })
      };
      $http.get(api, {params}).then(res => {
        let cityName = $tool.saveUrlCityName();
        window.localStorage.setItem(`${cityName}auth`, res.data.auth);
        if (this.$route.query.jumpFlag) { // 跳回评价学生中心
          $tool.goToEvaluateStudentCenter(res.data.auth);
        } else {
          window.location.replace(this.redirect);
        }
      }).catch(error => {
        this.$toast((error && error.msg) || CONFIG.WARN_TIP);
      });
    },
    // 获取验证码
    toGetCaptcha () {
      let api = CONFIG.API.USER.GET_CAPTCHA;
      let params = {
        data: JSON.stringify({
          phoneNo: this.phoneNo
        })
      };
      $http.get(api, {params})
      .then(res => {})
      .catch(error => {
        this.$toast((error && error.msg) || CONFIG.WARN_TIP);
      });
    }
  },
  computed: {
    isShowInviteCodeTip () {
      return this.inviteCode === window.sessionStorage.getItem('inviteCode');
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/scss/index";

.bindingPhoneNo-wrap{
  overflow: hidden;
  background-color: $bgColorWhite;
  .logo-wrap{
    width: pxtorem(140px);
    height: pxtorem(140px);
    margin: pxtorem(20px) auto 0;
    background: url(../assets/img/logo.png) no-repeat center center;
    background-size: cover;
  }
  .form-wrap{
    width: pxtorem(295px);
    margin: pxtorem(20px) auto pxtorem(50px);
  }
  .bindingPhoneNo-input{
    width: 100%;
    height: pxtorem(50px);
    padding: 0 pxtorem(15px);
    @include font-dpr(17px);
    color: $fontColorMain;
    border: 1px solid $borderGreyColor;
    outline: 0;
    @include rounded(6px);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-user-modify: read-write-plaintext-only;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .bindingPhoneNo-input__tip--des{
    margin-top: pxtorem(6px);
    @include font-style(13px, $fontColorFourth, 18px);
  }
  .verificationCode-button{
    width: pxtorem(110px);
    height: pxtorem(50px);
    display: inline-block;
    margin-left: pxtorem(10px);
    flex-shrink: 0;
    @include font-dpr(17px);
    line-height: pxtorem(50px);
    text-align: center;
    @include rounded(6px);
    color: $fontColorWhite;
    background-color: $fontColorGreen;
  }
  .verificationCode-button-unable{
    color: $fontColorNormal;
    background-color: $bgColorDisabled;
  }
  .bingdingButton-wrap{
    margin: 0 pxtorem(40px);
    .bingdingButton-button{
      width: 100%;
      height: pxtorem(50px);
      display: block;
      @include rounded(50px);
      background-color: red;
      @include font-dpr(17px);
      line-height: pxtorem(50px);
      text-align: center;
      $mixColor: mix($fontColorGreen, transparent, 40%);
      background-color: $mixColor;
      color: $fontColorWhite;
    }
    .bingdingButton-button-able{
      background-color: $fontColorGreen;
    }
  }
  input::-webkit-input-placeholder {
      color: $fontColorFourth;
  }
  input:-moz-placeholder {
      color: $fontColorFourth;
  }
  input::-moz-placeholder {
      color: $fontColorFourth;
  }
  input:-ms-input-placeholder {
      color: $fontColorFourth;
  }
}
</style>
