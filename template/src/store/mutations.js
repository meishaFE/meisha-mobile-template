export default {
  changeFooterActived(state, type) {
    state.footActived = type;
  },
  // 用户信息
  updateUserInfo(state, data) {
    this.state.userInfo = data;
  }
};
