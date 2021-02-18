// pages/myBookings/myBookings.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookingDates: [{
      'date': '无'
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        text: '详情',
        src: '../../../pages/myBookings/info.png',
        
      }, {
        type: 'warn',
        text: '删除',
        src: '../../../pages/myBookings/delete.png',
        
      }],
    });
    //从数据库获得预约记录
    let tmp = []
    db.collection('booking').where({
      _openid: getApp().globalData.openid
    }).get().then(res => {
      for(var i=0;i<res.data.length;i++)
      {
        tmp.push({'date':res.data[i].bookingDate})
      }
      this.setData({
        bookingDates:tmp
      })
    })
  },
  showDetail(){
   /* console.log("参数为："+this.data.bookingDates);
    let data = this.data.bookingDates*/
    wx.navigateTo({
    url: '../BookingDetails/BookingDetails'/* + encodeURI(JSON.stringify(data))*/
  })},
  deleteBooking(){console.log('call deleteBooking')},
  slideButtonTap(e) {
    console.log('slide button tap', e.detail)
    if(e.detail.index==0)this.showDetail();
    else this.deleteBooking();
  }
})