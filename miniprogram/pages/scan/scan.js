// pages/scan/scan.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCodeMsg: "",
    currentdate:"",
    bookingIds: [],
    //next: false,
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },
  
  getQRCode: function(){
    var _this = this;
    wx.scanCode({        //扫描API
      onlyFromCamera: true,
      success: function(res){
        console.log(res);    //输出回调信息
        _this.setData({
          qRCodeMsg: res.result,
          //next:true
        });
        wx.showToast({
          title: '扫描成功',
          duration: 2000
        })
      }
    })
  },
  getdate(){
    var date = new Date();
    //获取年  
    var Y = date.getFullYear();
    //获取月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取日 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var nowdate = Y + "-" + M + "-" + D;
    this.setData({
      currentdate : nowdate
    })
  },
  scanconfirm(a, b){
    if(a == b){
      this.setData({
        showOneButtonDialog: true
    })
    }
  },
  tapDialogButton(e) {
    this.setData({
        showOneButtonDialog: false
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdate();
    console.log("当前日期：" + this.data.currentdate);
    //从数据库获得预约记录
    let tmp = []
    db.collection('booking').where({
      bookingDate: this.data.currentdate
    }).get().then(res => {
      console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        tmp.push({
          'bookingId': res.data[i]._id
        })
      }
      this.setData({
        bookingIds: tmp
      })
      console.log(this.data.bookingIds)
    });
    //console.log(this.data.next)
    //if(this.data.next)
    //{
     // this.scanconfirm(data.qRCodeMsg, data.bookingIds)
    //}
    
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