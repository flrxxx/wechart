// pages/components/diolog/diolog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    diologtype:{
      type:Number,
      value:1
    },
    diologhide:{
      type:'string',
      value:'none'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    closediolog:function(){
      this.setData({
        diologhide:'none'
      })
      if (this.data.diologtype ===1){
        console.log("该团已结束的确认回调")
      }
      else if (this.data.diologtype === 2) {
        console.log("该团已满的确认回调")
      }
      else if (this.data.diologtype === 3) {
        console.log("您已是VIP的确认回调")
      }
     
    }
  }
})
