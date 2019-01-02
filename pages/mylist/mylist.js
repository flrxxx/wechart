// pages/mylist/mylist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageshow:false,
    userimg: "",
    username: "",
    lasttime:'1032',
    total:'2',
    successtimes:'1',
    list:[{
      number:'009877612',
      time:'2019/02/09 15:34:50',
      numberpeople:'2',
      type:0
      }, {
        number: '009877613',
        time: '2019/02/09 15:34:50',
        numberpeople: '3',
        type: 1
      },
      {
        number: '009877614',
        time: '2019/02/09 15:34:50',
        numberpeople: '1',
        type: 2
      }]
  },
  imageLoad: function () {
    wx.hideLoading();
    this.setData({
      pageshow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: app.globalData.userInfo.nickName,
      userimg: app.globalData.userInfo.avatarUrl
    })
    wx.showLoading({
      title: '加载中',
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