import request from '@/utils/request'

//分类
export const artGetChannelsService = () => request.get('/my/cate/list')

export const artAddChannelService = (data) => request.post('/my/cate/add', data)

export const artPutChannelService = (data) => request.put('/my/cate/info', data)

export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', { params: { id } })

// 管理
export const artGetArticleService = (params) =>
  request.get('/my/article/list', { params })

export const artPublishService = (data) => request.post('/my/article/add', data)

export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })

export const artEditService = (data) => request.put('my/article/info', data)

export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
