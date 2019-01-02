//index.js
//获取应用实例

Page({
  data: {
    pageshow:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    h1text:"<p class='titletext'>一起拼团 即刻开通</p>",
    boldtext:"<p class='titletext boldtext'>开灯CRM管理系统</p>",
    cardimg:'../../images/card.png',
    contenttext: "<p class='contenttext'>点亮您的个人品牌</p><p class='contenttext'>打造自己的自媒体平台</p><p class='contenttext'>让专业服务更有温度</p><p class='contenttext'>经营高端客户的服务利器</p>"
  },
 
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
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
  }
})
