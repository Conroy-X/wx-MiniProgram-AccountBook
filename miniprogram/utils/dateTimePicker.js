function withData(param, type){
  param = param < 10 ? '0' + param : '' + param;
  type = type || ''
  return param + type
}
function getLoopArray(start,end,type){
  var type = type || ''
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i, type));
  }
  return array;
}
function getMonthDay(year,month,type){
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;
    let Month = parseInt(month)
  switch (Month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      array = getLoopArray(1, 31, type)
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      array = getLoopArray(1, 30, type)
      break;
    case 2:
      array = flag ? getLoopArray(1, 29, type) : getLoopArray(1, 28, type)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}
function getNewDateArry(){
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear(), "年"),
      mont = withData(newDate.getMonth() + 1, "月"),
      date = withData(newDate.getDate(), "日"),
      hour = withData(newDate.getHours()),
      minu = withData(newDate.getMinutes()),
      seco = withData(newDate.getSeconds());

  return [year, mont, date, hour, minu, seco];
}
function dateTimePicker(startYear,endYear,date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/ 
  dateTimeArray[0] = getLoopArray(start,end, '年');
  dateTimeArray[1] = getLoopArray(1, 12, '月');
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1], '日');
  dateTimeArray[3] = getLoopArray(0, 23);
  dateTimeArray[4] = getLoopArray(0, 59);
  dateTimeArray[5] = getLoopArray(0, 59);

  dateTimeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}
module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay
}