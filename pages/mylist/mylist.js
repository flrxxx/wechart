// pages/mylist/mylist.js
const app = getApp();
const request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageshow:false,
    userimg: '',
    username: '',
    lasttime:'',
    total:'2',
    viplv:3,
    successtimes:'1',
    list:[]
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
    wx.showLoading({
      title: '加载中',
    })
   console.log(1);
    Promise.all([request.get('/mini/admin/getVipInfo', { openId: app.globalData.userInfo.openId, unionId: app.globalData.userInfo.unionId }, { "X-Auth-Token": app.globalData.xauthToken }), request.get('/mini/admin/groupbooking/list', { openId: app.globalData.userInfo.openId, unionId: app.globalData.userInfo.unionId, page: 0 }, { "X-Auth-Token": app.globalData.xauthToken })]).then(data =>{
      console.log(data);
      let sertime = '', viplv = '';
      viplv = parseInt(data[0].data.level) != NaN ? parseInt(data[0].data.level) : 0;
      if (data[0].data.expire == '') {
        sertime = '无期限'
      } else {
        sertime = data[0].data.expire - Date.parse(new Date());
        sertime = sertime / (3600 * 24 * 1000);
        sertime = Math.ceil(sertime) + '天后到期'
      }
      for (let i = 0; i < data[1].data.list.length; i++ ){
        data[1].data.list[i].createTime = request.timestampToTime(data[1].data.list[i].createTime)
        data[1].data.list[i].expireTime = request.timestampToTime(data[1].data.list[i].expireTime)
      }
      this.setData({
        username: app.globalData.userInfo.name,
        userimg: app.globalData.userInfo.headImg,
        total:data[1].data.total,
        successtimes:data[1].data.success,
        list:data[1].data.list,
        viplv: viplv,
        lasttime: sertime
      })



    },err =>{
      wx.hideLoading();
      request.failtips(err);
      }).catch(res => {
        console.log(res);
        wx.hideLoading();
        request.failtips('获取VIP信息超时，请检查网络连接');
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