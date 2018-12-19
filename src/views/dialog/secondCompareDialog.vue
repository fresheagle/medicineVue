<template>
  <!-- 版本比对结果弹框 -->
  <div>
    <el-dialog
      title="版本比对结果"
      v-bind="$attrs"
      v-on="$listeners"
      :append-to-body="true"
      width="80%">
      <div>
        <el-row>
          <el-col :span="12">
            <div >
              <div style="margin-bottom: 10px;font-size: 18px;font-weight: 600;">变更前：</div>
              <el-form label-width="120px" >
                <el-row>
                  <el-col :span="12" v-for="key in versionKeyArr" v-if="beforejson[key]!==afterjson[key]">
                    <el-form-item :label="i18n[key]" :prop="key"  >
                      <el-input placeholder="请输入内容" :disabled="true" v-model="beforejson[key]" class="input-with-select">
                        <el-button slot="append" icon="el-icon-more" @click="showDetailLeft(key)"></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div >
              <div style="margin-bottom: 10px;font-size: 18px;font-weight: 600;">变更后：</div>
              <el-form label-width="120px" >
                <el-row>
                  <el-col :span="12" v-for="key in versionKeyArr" v-if="beforejson[key]!==afterjson[key]">
                    <el-form-item :label="i18n[key]" :prop="key"  >
                      <el-input placeholder="请输入内容" :disabled="true" :v-model="afterjson[key]" class="input-with-select">
                        <el-button slot="append" icon="el-icon-more" @click="showDetailright(key)"></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">关闭</el-button>
      </span>
    </el-dialog>

    <quill-editor-dialog :visible.sync="isShowquillEditorDialog"  :cur-input-content="curInputContent"></quill-editor-dialog>
  </div>


</template>
<script>
  import quillEditorDialog from '../dialog/quillEditorDialog'
  import i18n from '../../i18n/local'

  export default {
    props: {
      rowData: {}
    },
    components: {
      quillEditorDialog
    },
    data() {
      return {
        i18n: i18n.zh.i18nView,
        multipleVersionData: [],
        beforejson: {},
        afterjson: {},
        versionKeyArr: [],
        isShowquillEditorDialog: false,
        curInputContent: ''
      }
    },
    created() {
    },
    methods: {
      init() {
      },
      cancelDelete() {
        this.$emit('update:visible', false)
      },
      showDetailLeft(key) {
        this.curInputKey = key
        this.curInputContent = this.beforejson[key]
        this.isShowquillEditorDialog = true
      },
      showDetailright(key) {
        this.curInputKey = key
        this.curInputContent = this.afterjson[key]
        this.isShowquillEditorDialog = true
      }

    },
    watch: {
      rowData(newVal, oldVal) {
        const missionDetails = newVal
        if (missionDetails.jsonStr.taskchangebeforejson && missionDetails.jsonStr.taskchangeafterjson) {
          this.beforejson = missionDetails.jsonStr.taskchangebeforejson[missionDetails.taskMenuType]
          this.afterjson = missionDetails.jsonStr.taskchangeafterjson[missionDetails.taskMenuType]
          for (const key in this.afterjson) {
            this.versionKeyArr.push(key) // 属性
          }
        }
      }
    }
  }
</script>
