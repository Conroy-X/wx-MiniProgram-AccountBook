import controller from './../controller/db_billFlowDetail.js'

class billFlowDetailModule {
  async add(query) {
    return await controller.onAdd(query)
  }
  async get(query) {
    return await controller.onGet(query)
  }
}


export default new billFlowDetailModule