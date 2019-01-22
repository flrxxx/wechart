//index.js
//获取应用实例
// pages/login/login.js
const app = getApp();
const request = require('../../utils/request.js');

Page({
  data: {
    pageshow:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pagetype:false,
    getUserInfo:false,
    h1text:"<p class='titletext'>一起拼团 即刻开通</p>",
    boldtext:"<p class='titletext boldtext'>开灯CRM管理系统</p>",
    cardimg:'../../images/card.png',
    contenttext: "<p class='contenttext'>点亮您的个人品牌</p><p class='contenttext'>打造自己的自媒体平台</p><p class='contenttext'>让专业服务更有温度</p><p class='contenttext'>经营高端客户的服务利器</p>",
    activityDate: app.globalData.activityDate
  },
 
  onLoad: function () {
    let type = '',that = this;
    wx.showLoading({
      title: '加载中',
    });
    if (app.globalData.userInfo) {
      //信息请求结束，判断是否VIP
      type =  request.loginback(app.globalData.userInfo);
      if (type === 'NOVIP') {
        that.setData({
          pagetype: true,
        })
      } else if (type === 'GetUserInfo') {
        that.setData({
          pagetype: true,
          getUserInfo: true,
        })
      }
    } else {
      app.employIdCallback = userInfo => {
        if (userInfo) {
          //信息请求结束，判断是否VIP
          type = request.loginback(app.globalData.userInfo);
          if (type === 'NOVIP'){
            that.setData({
              pagetype:true,
            })
          } else if (type === 'GetUserInfo'){
            that.setData({
              pagetype: true,
              getUserInfo: true,
            })
          }
        }
      }
    }
    
  },
  imageLoad: function () {
    wx.hideLoading();
    this.setData({
      pageshow: true
    })
  },
 
  joinVIP:function(){
    console.log('点击开通拼团');
    wx.switchTab({
      url: '../login_index/login_index'
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      let data = {
        "openId": app.globalData.userInfo.openId,
        "unionId": app.globalData.userInfo.unionId,
        "name": e.detail.userInfo.nickName,
        "head": e.detail.userInfo.avatarUrl,
        "sex": e.detail.userInfo.gender,
        "city": e.detail.userInfo.city,
        "prov": e.detail.userInfo.province,
        "cty" : e.detail.userInfo.country,
        "lang" : e.detail.userInfo.language
      };
      console.log(data);
      request.post('/mini/admin/groupbooking/saveUserInfo', data, { 'content-type': 'application/json', "X-Auth-Token": app.globalData.xauthToken }).then(data => {
        if (app.globalData.userInfo.isVip == 1){
          wx.switchTab({
            url: '/pages/login_index/login_index'
          })
        }else{
          that.setData({
            pagetype: true,
            getUserInfo: false,
          })
        }
      }, err => {
        request.failtips(err);
      }).catch(
        res => {
          request.errtips('用户信息保存发生错误:'+res);
        }
      );
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
})
