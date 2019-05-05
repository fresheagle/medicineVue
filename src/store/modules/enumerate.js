/**
 * 主要保存枚举数据
 * */
const enumerate = {
  infectivityList: [{ id: 1, value: '有传染性' }, { id: 2, value: '无传染性' }],
  diseaseTypeList: [{ id: '1', value: '中医' }, { id: '2', value: '西医' }, { id: '3', value: '中西结合' }],
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
  createRoleList: [{ label: '已结算', value: '0' }, { label: '未结算', value: '1' }],
  departmentLevel: [{ label: '国家级', value: '0' }, { label: '省级', value: '1' }, { label: '市级', value: '2' }, { label: '院级', value: '3' }, { label: '非重点专科', value: '4' }],
  institutionMenu: [{ title: '概述' }, { title: '基本信息' }, { title: '领导团队' }, { title: '医院环境' }, { title: '科室设置' }, { title: '特色专科' }, { title: '医疗优势' },
    { title: '医疗设施' }, { title: '历史发展' }, { title: '乘车路线' }, { title: '临床教学与科研机构' }, { title: '研究成果' }, { title: '学术专注' }, { title: '学术活动' },
    { title: '获奖情况' }, { title: '就诊须知' }],
  hospitalType: [
    { id: '1', value: '综合医院' }, { id: '2', value: '其他医院' }, { id: '3', value: '妇产医院' }, { id: '4', value: '中医医院' },
    { id: '5', value: '肿瘤医院' }, { id: '6', value: '传染病医院' }, { id: '7', value: '精神病医院' }, { id: '8', value: '口腔医院' },
    { id: '9', value: '胸科医院' }, { id: '10', value: '康复医院' }, { id: '11', value: '骨科医院' }, { id: '12', value: '三级甲等' },
    { id: '13', value: '儿童医院' }, { id: '14', value: '美容医院' }, { id: '15', value: '肛肠医院' }, { id: '16', value: '五官医院' }
  ],
  sexList: [{ id: '0', value: '男' }, { id: '1', value: '女' }],
  medicalTypeList: [{ id: 1, value: '中药' }, { id: 2, value: '西药' }],
  chineseDrugsType: [
    { id: '1', value: '解表剂' }, { id: '2', value: '清热剂' }, { id: '3', value: '泻下剂' }, { id: '4', value: '祛湿剂' },
    { id: '5', value: '化湿剂' }, { id: '6', value: '温里剂' }, { id: '7', value: '理气剂' }, { id: '8', value: '散结剂' },
    { id: '9', value: '消导剂' }, { id: '10', value: '止血剂' }, { id: '11', value: '活血化瘀剂' }, { id: '12', value: '祛瘀剂' },
    { id: '13', value: '化痰止咳平喘剂' }, { id: '14', value: '止咳剂' }, { id: '15', value: '安神剂' }, { id: '16', value: '治风剂' },
    { id: '17', value: '开窍剂' }, { id: '18', value: '扶正剂' }, { id: '19', value: '固涩剂' }, { id: '20', value: '调脂剂' },
    { id: '21', value: '温经理气活血剂' }, { id: '22', value: '理血剂' }, { id: '23', value: '耳鼻喉口腔' }
  ],
  chineseDrugsDepartment: [
    { id: '1', value: '内科用药' }, { id: '2', value: '外科用药' }, { id: '3', value: '妇科用药' }, { id: '4', value: '儿科用药' },
    { id: '5', value: '眼科用药' }, { id: '6', value: '耳鼻喉科用药' }, { id: '7', value: '骨伤科用药' }, { id: '8', value: '其它' }
  ],
  westernDrugsDepartment: [
    { id: '1', value: '常用药' }, { id: '2', value: '心脑血管用药' }, { id: '3', value: '呼吸科用药' }, { id: '4', value: '消化科用药' },
    { id: '5', value: '肿瘤科用药' }, { id: '6', value: '妇产科用药' }, { id: '7', value: '儿科用药' }, { id: '8', value: '泌尿科用药' },
    { id: '9', value: '男科用药' }, { id: '10', value: '老年科用药' }, { id: '11', value: '其它' }, { id: '12', value: '血液科用药' },
    { id: '13', value: '内分泌科用药' }, { id: '14', value: '风湿免疫用药' }, { id: '15', value: '神经科用药' }, { id: '16', value: '精神科用药' },
    { id: '17', value: '感染科用药' }, { id: '18', value: '骨科用药' }, { id: '19', value: '创伤外科用药' }, { id: '20', value: '眼科用药' },
    { id: '21', value: '耳鼻喉科用药' }, { id: '22', value: '口腔科用药' }, { id: '23', value: '皮肤科用药' }, { id: '24', value: '美容保健药品' },
    { id: '25', value: '激素药品' }, { id: '26', value: '抗生素药品' }, { id: '27', value: '抗过敏药品' }
  ]
}

export default enumerate

