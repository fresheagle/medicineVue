<template>
  <!-- 删除弹框 -->
  <el-dialog
    title="文本编辑"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="50%">

    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>

    <span slot="footer" class="dialog-footer">
        <el-button  @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'editor',
    props:{
      curInputContent:""
    },
    data: function() {
      return {
        content: '',
        editorOption: {
          placeholder: 'Hello World'
        }
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        this.content = html
      },
      cancelBtn(){
        this.$emit("update:visible",false);
      },
      submit() {
        this.$emit("update:visible",false);
        this.$emit("listenToChildquillEditor",this.content);
      }
    },
    watch:{
      curInputContent(newVal,oldVal){
        this.content=newVal;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .editor-btn{
    margin-top: 20px;
  }
  .crumbs,.plugins-tips {
    margin-bottom: 20px
  }
  .container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px
  }
</style>
