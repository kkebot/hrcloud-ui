import Mock from 'mockjs'
import { getParams } from '@/utils'

const { Random } = Mock;

const status = { success: true, data: null, code: 20000, message: '请求成功' }

const getDepartmentApi = req => {
  console.log(req.url)
  const path = req.url.split("/");
  return {
    ...status,
    data: {
      id: parseInt(path[path.length-1]),
      name: Random.string(7),
      fullname: Random.string(14),
      subordinates: [
        {
          id: Random.integer(60, 100),
          name: Random.string(7),
        }
      ],
      positions: [
        {
          id: Random.integer(60, 100),
          name: Random.string(5),
          type: Random.string(3),
        },
        {
          id: Random.integer(60, 100),
          name: Random.string(5),
          type: Random.string(3),
        }
      ]
    }
  }
};

const getHeadOfficeApi = req => {
  return {
    ...status,
    data: {
      id: Random.integer(60, 100),
      name: Random.string(5)
    }
  }
};

const setupDepartmentApi = req => {
  req = JSON.parse(req.body);
  return {
    ...status, data: {
      id: Random.integer(10,50),
      name: req.name
    }
  }
};

const shutdownDepartmentApi = req => {
  return status
};

const renameDepartmentApi = req => {
  return status
};

export default {
  getHeadOfficeApi,
  getDepartmentApi,
  setupDepartmentApi,
  shutdownDepartmentApi,
  renameDepartmentApi,
}
