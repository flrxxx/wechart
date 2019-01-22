const apiHttp = "https://dev.bxzhiku.com";

const fun = function (url, method, data, header) {
  data = data || {};
  header = header || {};
  let sessionId = wx.getStorageSync("UserSessionId");
  if (sessionId) {
    if (!header || !header["SESSIONID"]) {
      header["SESSIONID"] = sessionId;
    }
  }
  wx.showNavigationBarLoading();
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: apiHttp + url,
      header: header,
      data: data,
      method: method,
      success: function (res) {
        if (typeof res.data === "object") {
          if (res.data.ret) {
            if (res.data.ret === 'ok' || res.data.ret === 'GetUserInfo') {
              resolve(res.data);
            } else{
              reject(res.data.msg);
            }
          }
        }
        resolve(res);
      },
      fail: reject,
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  });
  return promise;
}

const loginafter = function (data, globalData,callback){
  //登录后逻辑放在loginback处理
  globalData.userInfo = { ...data.data.userInfo, ...data.data.vipInfo, ret: data.ret};
  globalData.xauthToken = data.data.xauthToken;
  if (callback) {
    callback(globalData.userInfo);
  }
};

const loginback = function(userInfo) {
  console.log(userInfo);
  let type = '';
  if (userInfo.ret === 'ok'){
   
    if (userInfo.isVip === 1) {
      wx.switchTab({
        url: '/pages/login_index/login_index'
      })
      return false;
    }else{
      type = "NOVIP";
    }
  } else if (userInfo.ret === 'GetUserInfo'){
    type = "GetUserInfo";
  }else{
    errtips('获取用户登录态失败！');
    return false;
  }
  return type;
};


const failtips = function(data){
  wx.showToast({
    title: data,
    icon: "none"
  });
};
const errtips = function(errtext){
  console.log(errtext)
  wx.showToast({
    title: errtext,
    icon: "none"
  });
}

const timestampToTime = function (timestamp,type) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
  var D = date.getDate() < 10 ? '0' + date.getDate()  : date.getDate() ;
  var h = date.getHours() < 10 ? '0' + date.getHours()  : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ;
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  if (type == 'D'){
    return Y + '/' + M + '/' + D;
  }
  else if (type == 'm') {
    return Y + '/' + M + '/' + D + ' ' + h + ':' + m;
  }else{
    return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s;
  }
 
}

module.exports = {
  apiHttp: apiHttp,
  "get": function (url, data, header) {
    return fun(url, "GET", data, header);
  },
  "post": function (url, data, header) {
    return fun(url, "POST", data, header);
  },
  loginafter: loginafter,
  failtips: failtips,
  errtips: errtips,
  loginback: loginback,
  timestampToTime: timestampToTime
};

