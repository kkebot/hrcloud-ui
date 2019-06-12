import Mock from 'mockjs'
import { getParams } from '@/utils'

const { Random } = Mock

const status = { success: true, data: null, code: 20000, message: '请求成功' }

const setupPositionApi = req => {
  req = JSON.parse(req.body)
  return {
    ...status, id: Random.integer(100, 200), name: req.name, type: req.type
  }
};

const cancelPositionApi = req => {
  return status
};

const renamePositionApi = (positionId, name) => {
  return status
}

export default {
  setupPositionApi,
  cancelPositionApi,
  renamePositionApi
}
