import baseController from './db_baseController.js'
const db = wx.cloud.database()

class billFlowDetail extends baseController {
  constructor() {
    super()
    this.tableName = 'billFlowDetail'
    this.db = db
  }
}

export default new  billFlowDetail