import request from '@/utils/request'

export const renewContractApi = (contractId, formData) => {
  return request.post(`/api/contract/renew`, formData, { params: { contractId } })
};

export const getRenewHistoryApi = (contractId, page, size) => {
  return request.get(`/api/contract/renew`, { params: { contractId, page, size } })
}
export const signContractApi = (employeeId, formData) => {
  return request.post(`/api/contract/sign`, formData, { params: { employeeId }})
}

export const updateContractRenewApi = (contractRenewId, formData) => {
  return request.post(`/api/contract/renew/update`, formData, { params: { contractRenewId }})
}

