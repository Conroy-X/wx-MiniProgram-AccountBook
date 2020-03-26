// pages/databaseGuide/databaseGuide.js


export default class baseController {
  constructor(db, tableName){
      this.db = db
      this.tableName = tableName
  }
  async onAdd (query) {
    let query_data = query.data
    let result = await this.db.collection(this.tableName).add({
      data: query_data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id  
        console.log(this.tableName, ' [新增记录] 成功，记录 _id: ', res._id)
        return {success : true, result : res}._id
      },
      fail: err => {
        console.error(this.tableName, ' [新增记录] 失败：', err)
        return {success : false, result : err}
      }
    })
    return result
  }

   async onQuery (query) {
    console.log('--------------here',query)
    let query_limit = query.limit || 20       // 条数
    let query_skip = query.skip || 0          // 跳过条数
    let query_where = query.where || {}       // 查询限制条件
    let query_field = query.field || {}       // 查询feild
    let query_sort = query.sort || {'_id':'asc'}
    let query_sort_field = query_sort.length==0 ? '_id' : Object.keys(query_sort)[0]
    let query_sort_sort = query_sort.length==0 ? 'asc' : query_sort[query_sort_field]
    let result = await this.db.collection("billFlowType")
      .where(query_where)
      .skip(query_skip)
      .limit(query_limit)
      .field(query_field)
      .orderBy(query_sort_field, query_sort_sort)
      .get()
      .then(res => {
        if(res.errMsg == 'collection.get:ok'){
          return {success:true, result:res.data}
        } else {
          return {success:false, result:res}
        }
      })
    return result
  }

  async onUpdate (query) {
    let query_where = query.where || {}       // 查询限制条件
    let query_data = query.data || {}
    let result = this.db.collection(this.tableName).where(query_where).update({
      data: query_data,
      success: res => {
        console.log(this.tableName, '[更新记录] 成功：', res)
        return {success : true, result : res}
      },
      fail: err => {
        console.error(this.tableName, ' [更新记录] 失败：', err)
        return {success : false, result : err}
      }
    })
    return result
  }

  async onCount (query) {
    let query_where = query.where || {}       // 查询限制条件
    let result = await this.db.collection(this.tableName).where(query_where).count({
      success: res => {
        console.log(this.tableName, '[计数] 成功：', res)
        return {success : true, result : res}
      },
      fail: err => {
        console.error(this.tableName, '[计数] 失败：', err)
        return {success : false, result : err}
      }
    })
    return result
  }

  async onRemove (query) {
    let query_where = query.where || {}
    if (query_where.length) {
      let result = await this.db.collection(this.tableName).where(query_where).remove({
        success: res => {
          console.log(this.tableName, ' [删除记录] 成功：', res)
          return {success : true, result : res}
        },
        fail: err => {
          console.error(this.tableName, ' [删除记录] 失败：', err)
          return {success : false, result : err}
        }
      })
      return result
    } else {
      return {success : false, result : '删除条件缺失'} 
    }
    
    
  }
}