import request from '@/utils/request'

export const getPayScaleApi = () => {
  return request.get('/api/scale')
};
