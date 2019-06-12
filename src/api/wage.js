import request from '@/utils/request'
import {obj2form} from "./common";

export const updateWageApi = (wageId, wageTerms) => {
  return request.post(`/api/wage/update`, wageTerms, { params: { wageId }})
};
export const updateStatisticApi = (departmentId, period) => {
  return request.post(`/api/wage/statistic/update`, '', {params: { period, departmentId }})
};
export const queryWagesApi = (condition) => {
  return request.get(`/api/wage`, {params: condition })
}

export const getEarningsDistributionApi = (departmentId, period) => {
  return request.get(`/api/wage/distribute`, { params: { departmentId, period }})
};

export const uploadWageApi = (departmentId, file) => {
  return request.post(`/api/wage/upload/current`, obj2form({ departmentId, file }))
};

export const uploadRawWageApi = (file) => {
  return request.post(`/api/wage/upload/raw`, obj2form({ file }))
};

export const getUploadResultApi = (importTimestamp, page, size) => {
  return request.get(`/api/wage/upload/result`, { params: { importTimestamp, page, size }})
}