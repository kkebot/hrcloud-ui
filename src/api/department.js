import request from '@/utils/request'


export const getDepartmentApi = id => {
  return request.get(`/api/department/${id}`)
};

export const getDepartmentDetailsApi = id => {
  return request.get(`/api/department/${id}/details`)
};

export const getHeadOfficeApi = () => {
  return request.get(`/api/department`)
};

export const getPositionsOfApi = (departmentId) => {
  return request.get(`/api/department/${departmentId}/positions`)
};

export const getSubordinatesApi = (departmentId) => {
  return request.get(`/api/department/${departmentId}/subordinates`)
};

// period + page, size
// from, to + page, size
export const getWageStatisticsApi = (departmentId, period) => {
  return request.get(`/api/department/${departmentId}/statistics`, { params: { period }})
}

// https://stackoverflow.com/a/38013585
export const setupDepartmentApi = (departmentId, formData) => {
  return request.post(`/api/department`, formData, { params: { departmentId }})
};

export const shutdownDepartmentApi = departmentId => {
  return request.post(`/api/department/shutdown`, "" , { params: { departmentId }})
};

export const updateDepartmentApi = (departmentId, formData) => {
  return request.post(`/api/department/update`, formData, { params: { departmentId }})
};

export const queryAdminApi = (entityType, entityId) => {
  return request.get(`/api/department/admin`, { params: { entityType, entityId }})
};

export const searchDepartmentApi = (params) => {
  return request.get('/api/department/search', { params })
}
