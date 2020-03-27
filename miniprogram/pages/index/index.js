// miniprogram/pages/index/index.js
import billFlowDetail from "../../lib/module/billFlowDetail"
import billFlowType from "../../lib/module/billFlowType"

var dateTimePicker = require('../../utils/dateTimePicker.js');
// const computedBehavior = require('miniprogram-computed')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      money:0
    },
  /**
   * 分类相关变量
   * @param {*} e 
   */
    flowTime:new Date().toLocaleString(),
    objectMultiShow: [],
    objectMultiArray: [],
    multiArray: [],
    multiIndex: [],
    checkeIndex: [],

  /**
   * 日期变动相关变量
   * @param {*} e 
   */
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,

    /**
     * 
     */
    showInputErr:false,
  },

  /**
   * 分类级联选择相关函数
   * @param {*} e 
   */
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    // billFlowDetail.add({"multiIndex":this.data.multiIndex})
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    // 初始化数据
    var data = {
      objectMultiShow: this.data.objectMultiShow,
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
  
    for (let i =0; i < e.detail.column; i++) {
      data.multiIndex[i] = data.multiIndex[i] || 0
    }
    // 改变第i列数据之后，后几列选择第0个选项（重置）
    data.multiIndex[e.detail.column] = e.detail.value;
    for (let i = e.detail.column; i < data.objectMultiShow.length - 1; i++) {
      data.multiIndex[i + 1] = 0
    }
    /**
     * 改变第i列数据之后，后几列数据更新
     **/
    let arry = this.data.objectMultiArray
    for (let i = e.detail.column; i < data.multiIndex.length - 1; i++) {
      data.multiArray[i + 1] = arry[data.multiIndex[i]].subNode.map(item => item.name)
      arry = arry[data.multiIndex[i]].subNode
    }
    // 数据更新
    this.setData(data);
  },

/**
 * 日期变动相关函数
 * @param {*} e 
 */

  changeDate(e){
    this.setData({ date:e.detail.value});
  },
  changeTime(e){
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },



  async initInfo () {
    let res = await billFlowType.get({where:{type:"支出"}})
    let data = {
      objectMultiShow: this.data.objectMultiShow,
      objectMultiArray: this.data.objectMultiArray,
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      checkeIndex: this.data.checkeIndex
    }
    data.objectMultiArray = res.result
    data.multiIndex = (new Array(data.objectMultiArray.length)).fill(0)
    data.objectMultiShow = [data.objectMultiArray, data.objectMultiArray[0].subNode]
    data.multiArray = data.objectMultiShow.map((item, index) => {
      item = item.map(i => i.name)
      return item
    })
    this.setData(data)
  },
  initTime () {
        // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  formReset (e) {
    console.log(e)
    this.initInfo()
    this.initTime()
  },
  formSubmit (e) {
    let timeIndex = e.detail.value.time
    let typeIndex = e.detail.value.type
    e.detail.value
    let time =  parseInt(this.data.dateTimeArray1[0][timeIndex[0]]) + '/'
              + parseInt(this.data.dateTimeArray1[1][timeIndex[1]]) + '/'
              + parseInt(this.data.dateTimeArray1[2][timeIndex[2]]) + ' ' 
              + parseInt(this.data.dateTimeArray1[3][timeIndex[3]]) + ':' 
              + parseInt(this.data.dateTimeArray1[4][timeIndex[4]])
    time = new Date(time).toUTCString()
    let type = this.data.multiArray[0][typeIndex[0]]
    let subType = this.data.multiArray[1][typeIndex[1]]
    let money = e.detail.value.money

    let query = {}
    query = Object.assign({}, {data:{"money":money,"type":type,"subType":subType,"time":time}})
    billFlowDetail.add(query)
    // 获取所有data,
    console.log(e.detail.value, this.data.dateTimeArray1, this.data.multiArray)
  },

  formInputChange (e) {
    let money = this.chechNumber(e.detail.value)
    e.detail.value = money
  },
  chechNumber(str){
    let regstr = str.match(/[0-9]*[.]{0,1}[0-9]{0,2}/)
    console.log(regstr)
    if(regstr[0] != ''){
      if(regstr[0][0] == '.'){
        regstr[0] = '0' + regstr[0]
      }
      this.setData({showInputErr:false})
      return regstr[0]
    }
    this.setData({showInputErr:true})
    return str
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initInfo()
    this.initTime()
    return 
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