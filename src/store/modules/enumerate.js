import errLog from '../errLog'

/**
 * 主要保存枚举数据
 * */
const enumerate = {
  infectivityList: [{ id: 1, value: '有传染性' }, { id: 2, value: '无传染性' }],
  diseaseTypeList: [{ id: '1', value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  locationPidList: [{ id: 1, value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  locationDiseaseList: [{ id: 1, value: '中医' }, { id: 2, value: '西医' }, { id: 3, value: '中西结合' }],
  taskStatus: [{ key: 'drafts', value: '创建中' }, { key: 'toFirAudited', value: '待一审' }, { key: 'toSecAudited', value: '待二审' },
    { key: 'toFinalAudited', value: '待终审' }, { key: 'finished', value: '已完成' }, { key: 'discarded', value: '已废止' }],
  taskMenuType: [
    { key: 'institutionPublic', value: '公立医疗结构' },
    { key: 'institutionPrivate', value: '非公立医疗结构' },
    { key: 'institutionSpecial', value: '非公特性立医疗结构' },
    { key: 'institutionMedical', value: '非公医美机构' },
    { key: 'institutionInformation', value: '医院科室信息参数维护' }
  ], // 菜单类型
  institutionLevel: [
    { id: 0, level: '未定级' }, { id: 1, level: '一级' }, { id: 2, level: '一级丙等' },
    { id: 3, level: '一级乙等' }, { id: 4, level: '一级甲等' }, { id: 5, level: '二级' },
    { id: 6, level: '二级丙等' }, { id: 7, level: '二级乙等' }, { id: 8, level: '二级甲等' },
    { id: 9, level: '三级' }, { id: 10, level: '三级丙等' }, { id: 11, level: '三级乙等' }, { id: 12, level: '三级甲等' }
  ], // 机构级别
  sexList: [{ id: 0, value: '男' }, { id: 1, value: '女' }],
  medicalTypeList: [{ id: 1, value: '中药' }, { id: 2, value: '西药' }]
}

export default enumerate

