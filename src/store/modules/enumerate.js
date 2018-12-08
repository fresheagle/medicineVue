import errLog from "../errLog";

/**
 * 主要保存枚举数据
 * */
const enumerate = {
    infectivityList:[{id:1,value:"有传染性"},{id:2,value:"无传染性"}],
    diseaseTypeList:[{id:"chinese",value:"中医"},{id:"western",value:"西医"},{id:"combine",value:"中西结合"}],
    locationPidList:[{id:1,value:"中医"},{id:2,value:"西医"},{id:3,value:"中西结合"}],
    locationDiseaseList:[{id:1,value:"中医"},{id:2,value:"西医"},{id:3,value:"中西结合"}],
    taskStatus:[{key:"drafts",value:"创建中" },{key:"toFirAudited",value:"待一审" },{key:"toSecAudited",value:"待二审" },
      {key:"toFinalAudited",value:"待终审" },{key:"finished",value:"已完成" },{key:"discarded",value:"已废止" }],
    taskMenuType:[
      {key:"institution_public",value:"公立医疗结构" },
      {key:"institution_private",value:"非公立医疗结构" },
      {key:"institution_special",value:"非公特性立医疗结构" },
      {key:"institution_medical",value:"非公医美机构" },
      {key:"institution_information",value:"医院科室信息参数维护" },
    ]  //菜单类型
}

export default enumerate

