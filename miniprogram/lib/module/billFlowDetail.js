import controller from './../controller/db_billFlowDetail.js'

class billFlowDetailModule {
  async add(query) {
    controller.onAdd(query)
  }
  async get(query) {
    controller.onAdd(query)
  }
}


export default new billFlowDetailModule