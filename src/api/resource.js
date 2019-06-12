import request from '@/utils/request'

var mime = require('mime-types');

export const downloadResourceApi = (resourceId) => {
  return request.get(`/api/download/`, { params: { resourceId }, responseType: 'blob'}).then(res => {
    if (!res.data)
      return;
    console.log() // Windows
    const blob = new Blob([res.data]);
    console.log("blob size=", blob.size);

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;

    const contentType = res.headers['content-type']
    link.download = "temp" + ( ('.' + mime.extension(contentType)) || '')

    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href)
  })
};

export const getResourceUrlApi = (resourceId) => {
  return `${process.env.VUE_APP_BASE_API}/api/download/?resourceId=${resourceId}`
}
