/**
 * 主要保存枚举数据
 * */
const enumerate = {
  infectivityList: [{ id: 1, value: '有传染性' }, { id: 2, value: '无传染性' }],
  diseaseTypeList: [{ id: '1', value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  locationPidList: [{ id: 1, value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  locationDiseaseList: [{ id: 1, value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  taskStatus: [{ key: 'drafts', value: '草稿' }, { key: 'toFirAudited', value: '待初审' }, { key: 'firAuditeding', value: '初审中' },
    { key: 'firAuditedFailed', value: '初审未通过' }, { key: 'toSecAudited', value: '待二审' }, { key: 'secAuditeding', value: '二审中' },
    { key: 'secAuditedFailed', value: '二审未通过' }, { key: 'toFinalAudited', value: '待终审' }, { key: 'finalAuditeding', value: '终审中' },
    { key: 'finalAuditedFailed', value: '终审未通过' }, { key: 'finished', value: '终审通过' }],
  trialUserList: [{ key: 'firstTrialUser', value: '初审者' }, { key: 'secondTrialUser', value: '二审者' }, { key: 'finalTrialUser', value: '终审者' }],
  taskMenuType: [
    { key: 'institutionPublic', value: '公立医疗结构' },
    { key: 'institutionPrivate', value: '非公立医疗结构' },
    { key: 'institutionSpecial', value: '非公特性立医疗结构' },
    { key: 'institutionMedical', value: '非公医美机构' },
    { key: 'institutionInformation', value: '医院科室信息参数维护' }
  ], // 菜单类型
  institutionLevel: [
    { id: '0', level: '未定级' }, { id: '1', level: '一级' }, { id: '2', level: '一级丙等' },
    { id: '3', level: '一级乙等' }, { id: '4', level: '一级甲等' }, { id: '5', level: '二级' },
    { id: '6', level: '二级丙等' }, { id: '7', level: '二级乙等' }, { id: '8', level: '二级甲等' },
    { id: '9', level: '三级' }, { id: '10', level: '三级丙等' }, { id: '11', level: '三级乙等' }, { id: '12', level: '三级甲等' }
  ], // 机构级别
  hospitalType: [
    { id: '1', value: '综合医院' }, { id: '2', value: '其他医院' },{ id: '3', value: '妇产医院' }, { id: '4', value: '中医医院' },
    { id: '5', value: '肿瘤医院' },{ id: '6', value: '传染病医院' }, { id: '7', value: '精神病医院' }, { id: '8', value: '口腔医院' },
    { id: '9', value: '胸科医院' }, { id: '10', value: '康复医院' }, { id: '11', value: '骨科医院' }, { id: '12', value: '三级甲等' },
    { id: '13', value: '儿童医院' }, { id: '14', value: '美容医院' }, { id: '15', value: '肛肠医院' }, { id: '16', value: '五官医院' }
  ],
  sexList: [{ id: 0, value: '男' }, { id: 1, value: '女' }],
  medicalTypeList: [{ id: 1, value: '中药' }, { id: 2, value: '西药' }]
}

export default enumerate

