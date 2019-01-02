//app.js
const util = require('/utils/util.js');
App({
  onLaunch: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'] ) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.globalData.userInfo = res.userInfo;
              util.queryUsreInfo();
            }
          });
        }else{
          //从未授权的用户，踢到授权页面去
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  globalData:{
    userInfo: null
  }
})