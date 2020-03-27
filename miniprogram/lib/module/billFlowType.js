import controller from '../controller/db_billFlowType.js'

class billFlowTypeModule {
  async add(query) {
    return await controller.onAdd(query)
  }
  async get(query) {
    return await controller.onGet(query)
  }
}


export default new billFlowTypeModule