const queryUsreInfo = function(){
  //为方便测试，这里直接设置跳转到开通页面，接口调试完毕请删除此代码 begin
 
  wx.redirectTo({
    url: '/pages/index/index'
  })
  //为方便测试，这里直接设置跳转到开通页面，接口调试完毕请删除此代码 end
  wx.request({
    url: '这里换成自己后台的链接',
    data: {
      // 根据自己的需求传参数
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // 拿到自己后台传过来的数据，自己作处理
      // 如果登录跳转到tab首页
      wx.switchTab({
        url: '/pages/login_index/login_index'
      })
      //如果未开通，则跳转到开通页面
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  });
}

module.exports = {
  queryUsreInfo: queryUsreInfo
}
