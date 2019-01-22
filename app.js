//app.js
const request = require('/utils/request.js');

App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        if(res.code){
          that.globalData.code = res.code;
           // 发送 res.code 到后台换取 openId, sessionKey, unionId
          request.get('/mini/login',{code:res.code}).then(data => {
            request.loginafter(data, that.globalData, that.employIdCallback);
          },err => {
            request.failtips(err);
          }).catch(
            res => {
              request.errtips('获取用户登录态失败！');
            }
          )
        }else{
          console.log('获取用户登录态失败！' + res.errMsg);
          var res = {
            status: 300,
            data: '错误'
          }
          reject('error');
        }
       
      }
    })
  },
  globalData:{
    userInfo: null,
    code:null,
    tokentime:null,
    pagetype:null,
    xauthToken:null,
    activityDate:'活动截止时间：2019年2月28日'
  }
})