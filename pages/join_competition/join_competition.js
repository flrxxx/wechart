const app = getApp();

Page({
  data:{
    bannerbg:"../../images/bannerbg.png",
    useimg:"",
    usename:"",
    hasnum: '1',//参与人数，需赋值
    ActivityDate:"2019/01/01——2019/02/31",    //时间，需赋值
    lasttime: 32413, //剩余时间戳
    lasttimetext: "", //倒计时显示，此项不用赋值
    disabled: false,    //按钮禁用状态
    diologhide:'none', //diolog显示隐藏   显示 ‘block’  隐藏 ‘none’
    diologtype:1,   // diolog类型  1: 该团已结束  2: 该团已满  3：您已是VIP用户
    otherinfo:[
      {
      userimg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545904706273&di=162ecfef50c1f972a9eeb823e20c4fbd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F151003%2F258203-1510030RP894.jpg",
      username:'人寿刘总'
      }, {
        userimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545904706273&di=162ecfef50c1f972a9eeb823e20c4fbd&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F151003%2F258203-1510030RP894.jpg",
        username: '李淼淼李淼淼李淼淼'
      }
    ],
    
    contenttext: "<p class='contenttext'>点亮您的个人品牌</p><p class='contenttext'>打造自己的自媒体平台</p><p class='contenttext'>让专业服务更有温度</p><p class='contenttext'>经营高端客户的服务利器</p>"
  },
  imageLoad: function () {
    wx.hideLoading();
    this.setData({
      pageshow: true
    })
  },
  onLoad:function(){
    var that = this;
    this.setData({
      username: app.globalData.userInfo.nickName,
      userimg: app.globalData.userInfo.avatarUrl
    })
    const timer = function (tim) {
      var d = 0, h = 0, m = 0, s = 0, tempstr = '', time;        // 定义时间
      if (tim > 0) {
        d = Math.floor(tim / (60 * 60 * 24));                                    // 天
        h = Math.floor(tim / (60 * 60)) - (d * 24);                              // 小时
        m = Math.floor(tim / 60) - (d * 24 * 60) - (h * 60);                     // 分
        s = Math.floor(tim) - (d * 24 * 60 * 60) - (h * 60 * 60) - (m * 60);     // 秒
      }
      if (m <= 9) m = '0' + m;
      if (s <= 9) s = '0' + s;
     
      tempstr = '距离该团结束还有' + d + '天' + h + '时' + m + '分' + s + '秒';
      that.setData({
        lasttimetext:tempstr
      })
      if (d == 0 && h == 0 && m == '00' && s == '00') {
        that.setData({
          lasttimetext: "拼团已结束",
          disabled:true
        })
        return ;
      }
      else {
        tim--;
        time = setTimeout(function () {
          timer(tim)
        }, 1000)
      }
    };
    timer(this.data.lasttime);
  },
  //点击参与拼团
  participateIn:function(){
    this.setData({
      diologhide: 'block', //diolog显示隐藏   显示 ‘block’  隐藏 ‘none’
      diologtype: 3,   // diolog类型  1: 该团已结束  2: 该团已满  3：您已是VIP用户
    });
  }
})