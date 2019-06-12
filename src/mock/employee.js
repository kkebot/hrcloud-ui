import Mock from 'mockjs'
import { getParams } from '@/utils'

const { Random } = Mock;

const status = { success: true, data: null, code: 20000, message: '请求成功' }

const getEmployeesApi = req => {
  const params = getParams(req.url);
  console.log(params);
  return {
    ...status,
    data: [
      {
        id: Random.integer(60,100),
        name: Random.string(5),
        positions: [
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          },
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          }
        ]
      },
      {
        id: Random.integer(60,100),
        name: Random.string(5),
        positions: [
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          },
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          }
        ]
      },
      {
        id: Random.integer(60,100),
        name: Random.string(5),
        positions: [
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          },
          {
            id: Random.integer(160,200),
            name: Random.string(5),
            type: Random.string(3),
          }
        ]
      }
    ]
  }
}

export default {
  getEmployeesApi
}
