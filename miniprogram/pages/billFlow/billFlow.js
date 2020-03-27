// miniprogram/pages/statistical/BillFlow.js
import billFlowDetail from "../../lib/module/billFlowDetail"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flowListData:[]
  },
  async getBillFlow () {
    let res = await billFlowDetail.get()
    console.log(res,'this is billFlow.js result ')
    if(res && res.success){
      this.setData({flowListData:res.result})
    } else {
      this.setData({flowListData:[]})
    }
    console.log(this.data.flowListData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBillFlow()
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