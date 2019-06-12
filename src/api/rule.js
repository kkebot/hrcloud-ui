import request from '@/utils/request'


export const getRulesApi = (status, page, size) => {
  return request.get(`/api/rule`, { params: { status, page, size}})
};

export const disableRuleApi = (ruleId) => {
  return request.post(`/api/rule/unregister`, '', { params: { ruleId }})
};

export const registerRuleApi = (formData) => {
  return request.post(`/api/rule/register`, formData)
}
