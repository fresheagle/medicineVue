<template>
  <el-dialog title="新增基础疾病"
             v-bind="$attrs"
             v-on="$listeners"
             :append-to-body="true" width="80%" top="10vh">
    <el-form label-width="100px" :model="formData" ref="formData">
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务标题" prop="taskTitle">
            <el-input v-model="formData.taskTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中文名称" prop="chineseName">
            <el-input v-model="formData.jsonStr.missDisease.chineseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名称" prop="englishName">
            <el-input v-model="formData.jsonStr.missDisease.englishName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="拉丁名称" prop="latinName">
            <el-input v-model="formData.jsonStr.missDisease.latinName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他名称" prop="otherName">
            <el-input v-model="formData.jsonStr.missDisease.otherName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="相关疾病" prop="relatedDiseases">
            <el-input v-model="formData.jsonStr.missDisease.relatedDiseases"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="疾病分类">
            <el-select v-model="formData.jsonStr.missDisease.diseaseType" >
              <el-option
                v-for="item in enumerate.diseaseTypeList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主发病部位">
            <el-select v-model="formData.jsonStr.missDisease.locationPid" >
              <el-option
                v-for="item in enumerate.locationPidList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <!--<el-input v-model="formData.jsonStr.location_pid"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="次发病部位" >
            <el-select v-model="formData.jsonStr.missDisease.locationDisease" >
              <el-option
                v-for="item in enumerate.locationDiseaseList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <!--<el-input v-model="formData.jsonStr.location_disease"></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="主要病因" prop="mainCauses">
            <el-input v-model="formData.jsonStr.missDisease.mainCauses"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="常见症状" prop="commonSymptom">
            <el-input v-model="formData.jsonStr.missDisease.commonSymptom"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="多发群体" prop="multiplePopulation">
            <el-input v-model="formData.jsonStr.missDisease.multiplePopulation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="传染性" >
            <el-select v-model="formData.jsonStr.missDisease.infectivity" >
              <el-option
                v-for="item in enumerate.infectivityList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <!--<el-input v-model="formData.jsonStr.infectivity"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季节特点" prop="seaCharacteristic">
            <el-input v-model="formData.jsonStr.missDisease.seaCharacteristic"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科室父级" prop="departmentPid">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="formData.jsonStr.missDisease.departmentPid"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect">
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.id }}</div>
                <span class="addr">{{ item.departmentName }}</span>
              </template>
            </el-autocomplete>





            <!--<el-select v-model="formData.jsonStr.missDisease.departmentPid" >-->
              <!--<el-option-->
                <!--v-for="item in enumerate.infectivityList"-->
                <!--:key="item.id"-->
                <!--:label="item.value"-->
                <!--:value="item.id">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-input v-model="formData.jsonStr.missDisease.departmentPid"></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="就诊科室" prop="departmentId" @change>
            <el-select v-model="formData.jsonStr.missDisease.departmentId" >
              <el-option
                v-for="item in enumerate.infectivityList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <!--<el-input v-model="formData.jsonStr.missDisease.departmentId"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="临床类型" prop="clinicalTypesClass">
            <el-input v-model="formData.jsonStr.missDisease.clinicalTypesClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="临床表现" prop="clinicalManifestation">
            <el-input v-model="formData.jsonStr.missDisease.clinicalManifestation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="体征" prop="sign">
            <el-input v-model="formData.jsonStr.missDisease.sign"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实验室检查" prop="laboratoryExamination">
            <el-input v-model="formData.jsonStr.missDisease.laboratoryExamination"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊断要点" prop="diagnosticPoints">
            <el-input v-model="formData.jsonStr.missDisease.diagnosticPoints"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="鉴别诊断" prop="differentialDiagnosis">
            <el-input v-model="formData.jsonStr.missDisease.differentialDiagnosis"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="并发症及防治" prop="preventionTreatment">
            <el-input v-model="formData.jsonStr.missDisease.preventionTreatment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="治疗与预后" prop="treatmentPrognosis">
            <el-input v-model="formData.jsonStr.missDisease.treatmentPrognosis"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预防调护" prop="preventiveNursing">
            <el-input v-model="formData.jsonStr.missDisease.preventiveNursing"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="护理" prop="nursing">
            <el-input v-model="formData.jsonStr.missDisease.nursing"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="防治措施" prop="preventionMeasures">
            <el-input v-model="formData.jsonStr.missDisease.preventionMeasures"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="膳食调理" prop="dietaryConditioning">
            <el-input v-model="formData.jsonStr.missDisease.dietaryConditioning"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="耐药性" prop="drugResistance">
            <el-input v-model="formData.jsonStr.missDisease.drugResistance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注意事项" prop="attentionMatter">
            <el-input v-model="formData.jsonStr.missDisease.attentionMatter"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelBtn">取消</el-button>
      <el-button type="primary" @click="createOK" class="title1">保存</el-button>
      <el-button type="primary" @click="submitOK" class="title1">提交</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import {doCreateDisBasics } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  export default {
    props:{
      rowData:{},
      curTaskType:"",
    },
    data() {
      return {
        enumerate:enumerate,
        formData: {
          "taskStatus": "",
          "taskType": "",
          "taskMenuType": "missDisease",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId":"",
          "jsonStr": {
            "symptomMapDTO": {
              "symptomId": "",
              "symptomChineseName": "",
              "symptomEnglishName": "",
            },
            "missDisease": {
              "taskId":"",
              "id": "",
              "chineseName": "",
              "englishName": "",
              "otherName": "",
              "latinName": "",
              "relatedDiseases": "",
              "diseaseType": "chinese",
              "locationPid": "",
              "locationDisease": "",
              "mainCauses": "",
              "commonSymptom": "",
              "multiplePopulation": "",
              "infectivity": 1,
              "seaCharacteristic": "",
              "departmentPid": "",
              "departmentId": "",
              "clinicalTypesClass": "",
              "clinicalManifestation": "",
              "sign": "",
              "laboratoryExamination": "",
              "diagnosticPoints": "",
              "differentialDiagnosis": "",
              "preventionTreatment": "",
              "treatmentPrognosis": "",
              "preventiveNursing": "",
              "nursing": "",
              "preventionMeasures": "",
              "dietaryConditioning": "",
              "drugResistance": "",
              "attentionMatter": "",
              "picturePath": "",
              "thumbnail": "",
              "dataStatus": "",
            }
          },
        },
        restaurants: [],
      }
    },
    created() {
      this.init();
    },
    methods: {
      init(){
        const params={
          currentPage:1,
          pageSize:1000,
        }
        debugger
        this.$store.dispatch('getDepartment', params).then((respones) => {
          this.restaurants=respones.data.params;
        }).catch(() => {
        })
      },
      cancelBtn(){
        this.$emit("update:visible",false)
      },
      doCreate(){
        this.isShowCreateVisible=true;
      },
      createOK(){
        this.formData.taskStatus="drafts";
        this.formData.taskType=this.curTaskType;
        doCreateDisBasics(this.formData).then(response => {
          this.$emit("update:visible",false)
        })

      },
      submitOK(){
        if(this.rowData.taskStatus==="drafts"){
          this.formData.taskStatus="toFirAudited";
        } else if(this.rowData.taskStatus==="toFirAudited"){
          this.formData.taskStatus="toSecAudited";
        } else if(this.rowData.taskStatus==="toSecAudited"){
          this.formData.taskStatus="toFinalAudited";
        } else if(this.rowData.taskStatus==="toFinalAudited"){
          this.formData.taskStatus="finished";
        } else {
          this.formData.taskStatus="drafts";
        }
        //this.formData.taskStatus="toFirAudited";//此处需要判断当前的状态，然后将下一步的值付给taskStatus
        this.formData.taskType=this.curTaskType;
        doCreateDisBasics(this.formData).then(response => {
          // this.isShowCreateVisible=false;
          this.$emit("update:visible",false)
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.jsonStr.departmentName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      debugger
      this.restaurants = this.departmentList();
    },
    computed:{
      departmentList(){
        return this.$store.getters.departmentList;
      }
    },
    watch:{
      rowData(newVal,oldVal)
      {
        this.formData=Object.assign({}, newVal)
      },
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
