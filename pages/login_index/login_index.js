// pages/login_index/login_index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageshow:false,
    userimg: "",
    username: "",
    ServiceDate:"2019/01/01 12:00",
    ActivityDate:"2019/01/01——2019/01/31"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  imageLoad: function () {
    wx.hideLoading();
    this.setData({
      pageshow: true
    })
  },
  onLoad: function (options) {
    this.setData({
      username:app.globalData.userInfo.nickName,
      userimg:app.globalData.userInfo.avatarUrl
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  clickAssemble:function(){
    wx.redirectTo({
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