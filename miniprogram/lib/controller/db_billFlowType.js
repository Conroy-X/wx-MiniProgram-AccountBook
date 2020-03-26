import baseController from './db_baseController.js'
const db = wx.cloud.database()

class billFlowType extends baseController {
  constructor() {
    super()
    this.tableName = 'billFlowType'
    this.db = db
  }
}

export default new  billFlowType