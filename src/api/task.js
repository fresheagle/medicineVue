import request from '../utils/request'

/**
 * 创建检测
 * */
// 医疗机构
export function doCheck(params) {
  return request({
    url: '/api/institution/check',
    method: 'get',
    params
  })
}
// 西医疾病创建检测
export function doWestDiseaseCheck(params) {
  return request({
    url: '/api/westDisease/check',
    method: 'get',
    params
  })
}
// 中医疾病创建
export function doChineseDiseaseCheck(params) {
  return request({
    url: '/api/chineseDisease/check',
    method: 'get',
    params
  })
}
// 医生检查
export function doDoctorCheck(params) {
  return request({
    url: '/api/doctor/check',
    method: 'get',
    params
  })
}
// 药品检查
export function doMedicalCheck(params) {
  return request({
    url: '/api/medical/check',
    method: 'get',
    params
  })
}
// 文章检查
export function doArtcileCheck(params) {
  return request({
    url: '/api/artcile/check',
    method: 'get',
    params
  })
}
// 症状检查
export function doSymptomCheck(params) {
  return request({
    url: '/api/symptom/check',
    method: 'get',
    params
  })
}


// 批量审批
export function doApproval(data) {
  return request({
    url: '/api/mission/batch/saveMission',
    method: 'put',
    data
  })
}
// 文件上传
export function fileUpload(data) {
  return request({
    url: '/api/file/upload',
    method: 'post',
    data
  })
}
export function getDistrict(params) {
  return request({
    url: 'api/district/query',
    method: 'get',
    params
  })
}
// 基础疾病查询
export function getDisBasicsList(params) {
  return request({
    url: '/api/disease/page',
    method: 'get',
    params
  })
}
// 基础疾病任务新增、编辑、提交、删除
export function doCreateDisBasics(data) {
  return request({
    url: '/api/mission/saveMission',
    method: 'post',
    data
  })
}
// 科室基本信息查询
export function getDepartmentList(params) {
  return request({
    url: '/api/department/page',
    method: 'get',
    params
  })
}

// 发病部位
export function getDislocationList(params) {
  return request({
    url: '/api/dislocation/param',
    method: 'get',
    params
  })
}
// 版本明细
export function getMissionDetailsList(params) {
  return request({
    url: '/api/mission/missionDetails/page?',
    method: 'get',
    params
  })
}
// 任务查询
export function getMissionList(params) {
  return request({
    url: '/api/mission/data/page',
    method: 'get',
    params
  })
}

// 任务查询
export function getTaskList(data) {
  return request({
    url: '/api/mission/data/page',
    method: 'post',
    data
  })
}
// 草稿箱
export function getDraftMissionList(params) {
  return request({
    url: '/api/MissionList/findDraftMissionList',
    method: 'get',
    params
  })
}
// 我的任务
export function getMyMissionList(params) {
  return request({
    url: '/api/MissionList/findMyMissionList',
    method: 'get',
    params
  })
}
// 待初审任务接口
export function getFirstTrailList(params) {
  return request({
    url: '/api/MissionList/findFirstTrailList',
    method: 'get',
    params
  })
}
// 待二审任务接口
export function getSecondTrailList(params) {
  return request({
    url: '/api/MissionList/findSecondTrailList',
    method: 'get',
    params
  })
}
// 待终审发布任务接口
export function getFinalTrailList(params) {
  return request({
    url: '/api/MissionList/findFinalTrailList',
    method: 'get',
    params
  })
}
// 已完成任务接口
export function getFinishMissionList(params) {
  return request({
    url: '/api/MissionList/findFinishMissionList',
    method: 'get',
    params
  })
}
// 已废止任务接口
export function getDesdroyMissionList(params) {
  return request({
    url: '/api/MissionList/findDesdroyMissionList',
    method: 'get',
    params
  })
}

// 中医疾病查询
export function getChineseDiseaseList(params) {
  return request({
    url: '/api/chineseDisease/page',
    method: 'get',
    params
  })
}

// 西医疾病查询
export function getWestDiseaseList(params) {
  return request({
    url: '/api/westDisease/page',
    method: 'get',
    params
  })
}

// 中西医疾病查询
export function getCombinationDiseaseList(params) {
  return request({
    url: '/api/combinationDisease/page',
    method: 'get',
    params
  })
}

// 公立医疗机构
export function getInstitutionList(params) {
  return request({
    url: '/api/institution/page',
    method: 'get',
    params
  })
}

// 医生信息
export function getDoctorList(params) {
  return request({
    url: '/api/doctor/page',
    method: 'get',
    params
  })
}

// 药品信息
export function getEdicilList(params) {
  return request({
    url: '/api/medical/page',
    method: 'get',
    params
  })
}

// 药品企业
export function getMedicalCompanyList(params) {
  return request({
    url: '/api/medicalCompany/page',
    method: 'get',
    params
  })
}

// 药品企业
export function getSymptomList(params) {
  return request({
    url: '/api/symptom/page',
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

// 认领任务
export function toClaimTask(data) {
  return request({
    url: '/api/mission/claimTask',
    method: 'post',
    data
  })
}
// 结算
export function getAccounts(data) {
  return request({
    url: '/api/mission/batch/acounts',
    method: 'put',
    data
  })
}
// 重置进度
export function resetBatch(data) {
  return request({
    url: '/api/mission/batch/reset',
    method: 'put',
    data
  })
}
// 指派新作者
export function createuser(data) {
  return request({
    url: '/api/mission/batch/new/createuser',
    method: 'put',
    data
  })
}

// 删除
export function deleteTask(data) {
  return request({
    url: '/api/mission/deleteMission',
    method: 'delete',
    data
  })
}
// 查询用户列表
export function getUserCodeList(params) {
  return request({
    url: 'api/user/userCode',
    method: 'get',
    params
  })
}
// 结算
export function doExport(data) {
  return request({
    url: '/api/mission/data/page/export',
    method: 'post',
    data
  })
}
