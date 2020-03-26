import controller from '../controller/db_billFlowType.js'

class billFlowTypeModule {
  async add(query) {
    console.log(query,'------herhe222')
    return await controller.onAdd(query)
  }
  async get(query) {
    console.log(query,'------herhe333')
    return await controller.onQuery(query)
  }
}


export default new billFlowTypeModule