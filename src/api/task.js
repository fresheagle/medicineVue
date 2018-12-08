import request from '../utils/request'

//基础疾病查询
export function getDisBasicsList(params) {
  return request({
    url: '/api/disease/page',
    method: 'get',
    params
  })
}
//基础疾病任务新增、编辑、提交、删除
export function doCreateDisBasics(data) {
  return request({
    url: '/api/mission/saveMission',
    method: 'post',
    data
  })
}
//科室基本信息查询
export function getDepartmentList(params) {
  return request({
    url: '/api/department/page',
    method: 'get',
    params
  })
}

//发病部位
export function getDislocationList(params) {
  return request({
    url: '/api/dislocation/param',
    method: 'get',
    params
  })
}
//版本明细
export function getMissionDetailsList(params) {
  return request({
    url: '/api/mission/missionDetails/page?',
    method: 'get',
    params
  })
}




//任务查询
export function getMissionList(params) {
  return request({
    url: '/api/mission/data/page',
    method: 'get',
    params
  })
}

//草稿箱
export function getDraftMissionList(params) {
  return request({
    url: '/api/MissionList/findDraftMissionList',
    method: 'get',
    params
  })
}
//我的任务
export function getMyMissionList(params) {
  return request({
    url: '/api/MissionList/findMyMissionList',
    method: 'get',
    params
  })
}
//待初审任务接口
export function getFirstTrailList(params) {
  return request({
    url: '/api/MissionList/findFirstTrailList',
    method: 'get',
    params
  })
}
//待二审任务接口
export function getSecondTrailList(params) {
  return request({
    url: '/api/MissionList/findSecondTrailList',
    method: 'get',
    params
  })
}
//待终审发布任务接口
export function getFinalTrailList(params) {
  return request({
    url: '/api/MissionList/findFinalTrailList',
    method: 'get',
    params
  })
}
//已完成任务接口
export function getFinishMissionList(params) {
  return request({
    url: '/api/MissionList/findFinishMissionList',
    method: 'get',
    params
  })
}
//已废止任务接口
export function getDesdroyMissionList(params) {
  return request({
    url: '/api/MissionList/findDesdroyMissionList',
    method: 'get',
    params
  })
}
export function getMonth(params) {
  return request({
    url: '/api/schedule/month',
    method: 'post',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
