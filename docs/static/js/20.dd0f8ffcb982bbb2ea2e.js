webpackJsonp([20],{J0LI:function(e,t,a){var n=a("hf41");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("55b4edc3",n,!0)},UPIV:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.mixin-components-container[data-v-6215e5e8] {\r\n  background-color: #f0f2f5;\r\n  padding: 30px;\r\n  min-height: calc(100vh - 84px);\n}\n.component-item[data-v-6215e5e8]{\r\n  min-height: 100px;\n}\r\n",""])},YVvD:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("kCe2"),r={name:"nxMdInput",props:{icon:String,name:String,type:{type:String,default:"text"},value:[String,Number],placeholder:String,readonly:Boolean,disabled:Boolean,min:String,max:String,step:String,minlength:Number,maxlength:Number,required:{type:Boolean,default:!0},autoComplete:{type:String,default:"off"},validateEvent:{type:Boolean,default:!0}},computed:{computedClasses:function(){return{"material--active":this.focus,"material--disabled":this.disabled,"material--raised":Boolean(this.focus||this.currentValue)}}},watch:{value:function(e){this.currentValue=e}},data:function(){return{currentValue:this.value,focus:!1,fillPlaceHolder:null}},methods:{handleModelInput:function(e){var t=e.target.value;this.$emit("input",t),"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.change",[t]),this.$emit("change",t)},handleMdFocus:function(e){this.focus=!0,this.$emit("focus",e),this.placeholder&&""!==this.placeholder&&(this.fillPlaceHolder=this.placeholder)},handleMdBlur:function(e){this.focus=!1,this.$emit("blur",e),this.fillPlaceHolder=null,"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.blur",[this.currentValue])}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"material-input__component",class:e.computedClasses},[a("div",{class:{iconClass:e.icon}},[e.icon?a("i",{staticClass:"el-input__icon material-input__icon",class:["el-icon-"+e.icon]}):e._e(),e._v(" "),"email"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"email",name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"url"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"url",name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"number"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"number",name:e.name,placeholder:e.fillPlaceHolder,step:e.step,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,max:e.max,min:e.min,minlength:e.minlength,maxlength:e.maxlength,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"password"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"password",name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,max:e.max,min:e.min,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"tel"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"tel",name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"text"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{type:"text",name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autoComplete:e.autoComplete,minlength:e.minlength,maxlength:e.maxlength,required:e.required},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),a("span",{staticClass:"material-input-bar"}),e._v(" "),a("label",{staticClass:"material-label"},[e._t("default")],2)])])},staticRenderFns:[]};var i=a("VU/8")(r,l,!1,function(e){a("J0LI")},"data-v-72ec5369",null).exports,o=a("woOf"),s=a.n(o),c=(a("ctMr"),{bind:function(e,t){e.addEventListener("click",function(a){var n=s()({},t.value),r=s()({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),l=r.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var i=l.getBoundingClientRect(),o=l.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":((o=document.createElement("span")).className="waves-ripple",o.style.height=o.style.width=Math.max(i.width,i.height)+"px",l.appendChild(o)),r.type){case"center":o.style.top=i.height/2-o.offsetHeight/2+"px",o.style.left=i.width/2-o.offsetWidth/2+"px";break;default:o.style.top=a.pageY-i.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=a.pageX-i.left-o.offsetWidth/2-document.body.scrollLeft+"px"}return o.style.backgroundColor=r.color,o.className="waves-ripple z-active",!1}},!1)}}),u=function(e){e.directive("waves",c)};window.Vue&&(window.waves=c,Vue.use(u)),c.install=u;var p=c,d={name:"componentMixin-demo",components:{PanThumb:n.a,MdInput:i},directives:{waves:p},data:function(){return{demo:{title:""},demoRules:{title:[{required:!0,trigger:"change",validator:function(e,t,a){6!==t.length?a(new Error("请输入六个字符")):a()}}]},articleList:[{title:"Vue2.0实现的用户权限控制",href:"http://blog.csdn.net/qq_32340877/article/details/79416344"},{title:"elementui换肤自定义主题",href:"https://blog.csdn.net/qq_32340877/article/details/80176987"},{title:"Vue国际化 vue-i18n 中英文",href:"https://blog.csdn.net/qq_32340877/article/details/80148913"},{title:"单元测试环境",href:"https://juejin.im/post/5b051519f265da0b8f62e94e"},{title:"Vue实现首屏加载等待动画",href:"https://juejin.im/post/5b336699e51d4558a846dcc2"},{title:"Vue项目中添加锁屏功能",href:"https://juejin.im/post/5b35e05ee51d4558a75ea159"}]}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mixin-components-container"},[a("el-row",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("Buttons")])]),e._v(" "),a("div",{staticStyle:{"margin-bottom":"50px"}},[a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn blue-btn",attrs:{to:"/components/index"}},[e._v("Components")])],1),e._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn light-blue-btn",attrs:{to:"/charts/index"}},[e._v("Charts")])],1),e._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn pink-btn",attrs:{to:"/excel/download"}},[e._v("Excel")])],1),e._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn green-btn",attrs:{to:"/example/table/complex-table"}},[e._v("Table")])],1),e._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn tiffany-btn",attrs:{to:"/form/edit-form"}},[e._v("Form")])],1),e._v(" "),a("el-col",{staticClass:"text-center",attrs:{span:4}},[a("router-link",{staticClass:"pan-btn yellow-btn",attrs:{to:"/theme/index"}},[e._v("Theme")])],1)],1)])],1),e._v(" "),a("el-row",{staticStyle:{"margin-top":"50px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("Material Design 的input")])]),e._v(" "),a("div",{staticStyle:{height:"100px"}},[a("el-form",{attrs:{model:e.demo,rules:e.demoRules}},[a("el-form-item",{attrs:{prop:"title"}},[a("md-input",{attrs:{icon:"search",name:"title",placeholder:"输入标题"},model:{value:e.demo.title,callback:function(t){e.$set(e.demo,"title",t)},expression:"demo.title"}},[e._v("标题")])],1)],1)],1)])],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("图片hover效果")])]),e._v(" "),a("div",{staticClass:"component-item"},[a("pan-thumb",{attrs:{width:"100px",height:"100px",image:"https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"}},[e._v("\n            nx-admin\n          ")])],1)])],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("水波纹 waves v-directive")])]),e._v(" "),a("div",{staticClass:"component-item"},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary"}},[e._v("水波纹效果")])],1)])],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("hover text")])]),e._v(" "),a("div",{staticClass:"component-item"},[a("mallki",{attrs:{className:"mallki-text",text:"nx-admin"}})],1)])],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(d,m,!1,function(e){a("m8iH")},"data-v-6215e5e8",null);t.default=v.exports},ctMr:function(e,t,a){var n=a("z4F4");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("6077c87a",n,!0)},hf41:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.material-input__component .material-input-bar[data-v-72ec5369]:before, .material-input__component .material-input-bar[data-v-72ec5369]:after {\n  content: '';\n  height: 1px;\n  width: 0;\n  bottom: 0;\n  position: absolute;\n  -webkit-transition: 0.2s ease all;\n  transition: 0.2s ease all;\n}\n.material-input__component[data-v-72ec5369] {\n  margin-top: 36px;\n  position: relative;\n}\n.material-input__component *[data-v-72ec5369] {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.material-input__component .iconClass .material-input__icon[data-v-72ec5369] {\n    position: absolute;\n    left: 0;\n    line-height: 16px;\n    color: #2196F3;\n    top: 12px;\n    width: 30px;\n    height: 16px;\n    font-size: 16px;\n    font-weight: normal;\n    pointer-events: none;\n}\n.material-input__component .iconClass .material-label[data-v-72ec5369] {\n    left: 30px;\n}\n.material-input__component .iconClass .material-input[data-v-72ec5369] {\n    text-indent: 30px;\n}\n.material-input__component .material-input[data-v-72ec5369] {\n    font-size: 16px;\n    padding: 12px 12px 2px 6px;\n    display: block;\n    width: 100%;\n    border: none;\n    line-height: 1;\n    border-radius: 0;\n}\n.material-input__component .material-input[data-v-72ec5369]:focus {\n      outline: none;\n      border: none;\n      border-bottom: 1px solid transparent;\n}\n.material-input__component .material-label[data-v-72ec5369] {\n    font-weight: normal;\n    position: absolute;\n    pointer-events: none;\n    left: 0px;\n    top: 0;\n    -webkit-transition: 0.2s ease all;\n    transition: 0.2s ease all;\n    font-size: 18px;\n}\n.material-input__component .material-input-bar[data-v-72ec5369] {\n    position: relative;\n    display: block;\n    width: 100%;\n}\n.material-input__component .material-input-bar[data-v-72ec5369]:before {\n      left: 50%;\n}\n.material-input__component .material-input-bar[data-v-72ec5369]:after {\n      right: 50%;\n}\n.material-input__component.material--disabled .material-input[data-v-72ec5369] {\n    border-bottom-style: dashed;\n}\n.material-input__component.material--raised .material-label[data-v-72ec5369] {\n    top: -28px;\n    left: 0;\n    font-size: 16px;\n    font-weight: bold;\n}\n.material-input__component.material--active .material-input-bar[data-v-72ec5369]:before, .material-input__component.material--active .material-input-bar[data-v-72ec5369]:after {\n    width: 50%;\n}\n.material-input__component[data-v-72ec5369] {\n  background: white;\n}\n.material-input__component .material-input[data-v-72ec5369] {\n    background: none;\n    color: black;\n    text-indent: 0px;\n    border-bottom: 1px solid #E0E0E0;\n}\n.material-input__component .material-label[data-v-72ec5369] {\n    color: #9E9E9E;\n}\n.material-input__component .material-input-bar[data-v-72ec5369]:before, .material-input__component .material-input-bar[data-v-72ec5369]:after {\n    background: #2196F3;\n}\n.material-input__component.material--active .material-label[data-v-72ec5369] {\n    color: #2196F3;\n}\n.material-input__component.material--has-errors.material--active .material-label[data-v-72ec5369] {\n    color: #F44336;\n}\n.material-input__component.material--has-errors .material-input-bar[data-v-72ec5369]:before, .material-input__component.material--has-errors .material-input-bar[data-v-72ec5369]:after {\n    background: transparent;\n}\n",""])},m8iH:function(e,t,a){var n=a("UPIV");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("5d6b1bf6",n,!0)},z4F4:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,".waves-ripple {\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    background-color: rgba(0, 0, 0, 0.15);\r\n    background-clip: padding-box;\r\n    pointer-events: none;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    -webkit-transform: scale(0);\r\n    transform: scale(0);\r\n    opacity: 1;\r\n}\r\n\r\n.waves-ripple.z-active {\r\n    opacity: 0;\r\n    -webkit-transform: scale(2);\r\n    transform: scale(2);\r\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\r\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\r\n}",""])}});