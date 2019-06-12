import request from '@/utils/request'


export const setupPositionApi = (departmentId, formData) => {
  return request.post(`/api/position`, formData, {params: { departmentId }})
};

export const getPositionApi = (positionId) => {
  return request.get(`/api/position/${positionId}`)
};

export const getPositionDetailsApi = (positionId) => {
  return request.get(`/api/position/${positionId}/details`)
};

export const getPositionAdjustmentsApi = (positionId, page, size) => {
  return request.get(`/api/position/${positionId}/adjustments`, { params: { page, size }})
}

export const cancelPositionApi = (positionId) => {
  return request.post(`/api/position/cancel`, "", { params: { positionId }})
};

export const updatePositionApi = (positionId, formData) => {
  return request.post(`/api/position/update`, formData, { params: { positionId }})
};
