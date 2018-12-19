<template>
  <div class="login-container"  style="margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title">医药管理系统</h3>
      <el-form-item prop="userCode">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="userCode" type="text" v-model="loginForm.userCode" autoComplete="on" placeholder="userCode" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="userPassWord" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.userPassWord" autoComplete="on"
                  placeholder="userPassWord"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userCode: 'test1',
          userPassWord: '123456'
        },
        loginRules: {
          userCode: [{ required: true, trigger: 'blur', validator: validateUsername }],
          userPassWord: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    mounted() {
      container = document.createElement('div')
      this.$refs.can.appendChild(container)
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
      camera.position.z = 1000
      scene = new THREE.Scene()
      particles = new Array()
      var PI2 = Math.PI * 2
      var material = new THREE.ParticleCanvasMaterial({
        color: 0x0078de,
        program: function(context) {
          context.beginPath()
          context.arc(0, 0, 1, 0, PI2, true)
          context.fill()
        }

      })

      var i = 0
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.Particle(material)
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
          scene.add(particle)
        }
      }

      renderer = new THREE.CanvasRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      document.addEventListener('mousemove', onDocumentMouseMove, false)
      //

      window.addEventListener('resize', onWindowResize, false)

      animate()
  },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }

  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50
var container
var camera, scene, renderer
var particles, particle, count = 0
var mouseX = 0, mouseY = 0
var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

function init() {
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault()
      mouseX = event.touches[0].pageX - windowHalfX
      mouseY = event.touches[0].pageY - windowHalfY
  }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault()
      mouseX = event.touches[0].pageX - windowHalfX
      mouseY = event.touches[0].pageY - windowHalfY
  }
  }

  function animate() {
    requestAnimationFrame(animate)
  render()
}

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)

  var i = 0

  for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++]
        particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
        particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
      }
    }

    renderer.render(scene, camera)

  count += 0.1
}

</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#ffffff;
  $light_gray:#ffffff;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }


  .login-container a{color:#0078de;}
  #canvascontainer{
    position: absolute;
    top: 0px;
  }
</style>
