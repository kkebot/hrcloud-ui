import request from '@/utils/request'

export const getNotificationsApi = (params) => {
  return request.get(`/api/notify`, { params })
}

export const scanNotificationsApi = () => {
  return request.post(`/api/notify/scan`)
}

export const markNotificationApi = (notificationId) => {
  return request.post(`/api/notify/read`,'', { params: { notificationId }} )
}


