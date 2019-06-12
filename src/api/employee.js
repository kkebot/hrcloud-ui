import request from '@/utils/request'


export const queryEmployeesApi = (entityType, entityId, page, size) => {
  return request.get(`/api/employee/query`, { params: { entityType, entityId, page, size } })
};

export const getEmployeeApi = (employeeId) => {
  return request.get(`/api/employee/${employeeId}`)
}

// TODO phoneNumbers
export const importEmployeeApi = (formData) => {
  return request.post(`/api/employee`, formData)
};

export const queryOwnerApi = (params) => {
  return request.get(`/api/employee/owner`, { params })
};

export const restoreEmployeeApi = (employeeId) => {
  return request.post(`/api/employee/restore`, '', { params: { employeeId }})
}

export const updateEmployeeApi = (employeeId, formData) => {
  return request.post(`/api/employee/update`, formData, { params: { employeeId }})
};

export const getAttachmentsApi = (employeeId) => {
  return request.get(`/api/employee/${employeeId}/attachments`)
}

export const getContractsApi = (employeeId, page, size) => {
  return request.get(`/api/contract/`, { params: { page, size, employeeId }})
};

export const adjustmentApi = (employeeId, formData) => {
  return request.post(`/api/adjustment`, formData, { params: { employeeId }})
};

export const getAdjustmentHistoryApi = (employeeId, page, size) => {
  return request.get(`/api/adjustment`, { params: { page, size, employeeId }})
}

export const dischargeApi = (employeeId, formData) => {
  return request.post(`/api/adjustment/discharge`, formData, { params: { employeeId } })
}

export const updateAdjustmentApi = (adjustmentId, formData) => {
  return request.post(`/api/adjustment/${adjustmentId}`, formData)
};

export const changePasswordApi = (employeeId, formData) => {
    formData.set("employeeId", employeeId);
    return request.post(`/api/employee/password`, formData)
}
