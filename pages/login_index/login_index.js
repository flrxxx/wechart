// pages/login_index/login_index.js
const app = getApp();
const request = require('../../utils/request.js');

var pagestep = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageshow:false,
    pagestep:0,
    userimg: '',
    username: '',
    viplv:5,
    serviceDate:"",
    activityDate: app.globalData.activityDate
  },

  /**
   * 生命周期函数--监听页面加载
   */
  imageLoad: function () {
    pagestep = pagestep +1 ;
    if (pagestep == 2) {
      wx.hideLoading();
      this.setData({
        pageshow: true
      })
    }
  },
  onLoad: function (options) {
    request.get('/mini/admin/getVipInfo', { openId: app.globalData.userInfo.openId, unionId: app.globalData.userInfo.unionId }, { "X-Auth-Token": app.globalData.xauthToken}).then(data => {
      let sertime = '',viplv = '';
      viplv = parseInt(data.data.level) != NaN ? parseInt(data.data.level) : 0;
      if(data.data.expire == ''){
        sertime ='无期限'
      }else{
        sertime = request.timestampToTime(data.data.expire,'m');
      }
      this.setData({
        viplv: viplv,
        serviceDate: sertime
      })
     
      pagestep = pagestep + 1;
      if (pagestep == 2){
        wx.hideLoading();
        this.setData({
          pageshow: true
        })
      }
      
    },err => {
      wx.hideLoading();
      request.failtips(err);
    }).catch(res => {
      console.log(res);
      wx.hideLoading();
      request.failtips(res);
    })
    this.setData({
      username:app.globalData.userInfo.name,
      userimg:app.globalData.userInfo.headImg,
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  clickAssemble:function(){
    wx.navigateTo({
      url: '../join_competition/join_competition'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})