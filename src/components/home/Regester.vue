<template>
  <div class="register-bg" v-show="showregester">
   <div class="Regester" >
     <div class="regester-user">{{title}}</div>
     <div class="text">
       <span> 用户名：</span>
      <input type="text" name="text" placeholder="请输入电话，邮箱等账户名" v-model="text" @blur.prevent="judge()">
      </div>
      <div class="text">
        <span> 密  码：</span>
       <input type="password" name="password" placeholder="请输入密码，不少于6位" v-model="password" @blur.prevent="judgep()"> 
      </div>
      <div class="text" v-if="zhuce">
        <span> 确认密码：</span>
       <input type="password" name="password" placeholder="请输入密码，不少于6位" v-model="password2">
      </div>
      <div class="regester-remind">{{remind}}</div>
      <button @click="put" class="regester-button" :class="{clickoff: true}">{{rege}}</button>
      <div @click="Check" class="regester-check">{{check}}</div>
   </div>
   <div class="close-btn-wrapper" @click="close">
    <span class="icon-close"></span>
</div>
  </div>
  </template>
  
  <script >
import { storeHomeMixin } from '../../utils/mixin'
import { login } from '../../api/store'
    export default {
      mixins: [storeHomeMixin],
      data() {
        return {
           title: '用户登录',
           rege: '登录',
           remind: '',
           zhuce: false,
           check: '注册',
           type: 1,
           text: null,
           password: null,
           password2: null,
           judget: true
        }
      },
      methods: {
        judge() {
          if (this.text.length < 6) {
            this.remind = '账号不能少于6位'
            this.judget = false
          } else {
            this.judget = true
            this.remind = ''
          }
        },
        judgep() {
           if (this.password.length < 6) {
            this.remind = '密码不能少于6位'
            this.judget = false
          } else {
            this.judget = true
            this.remind = ''
          }
        },
        put() {
          if (this.type === 1 && this.judget) {
            this.$router.push({
                path: '/store/home',
                params: {
                 text: this.text,
                 password: this.password,
                 type: this.type
                }
            })
            login({ text: this.text, password: this.password, type: this.type }).then(
              response => {
                if (response.data.type === 200) {
                  alert(response.data.msg)
                  this.changeUser(this.text)
                  this.close()
                } else {
                  alert(response.data.msg)
                }
              }
            )
          } else if (this.judget) {
            if (this.password === this.password2) {
            this.$router.push({
              path: '/store/home',
                params: {
                 text: this.text,
                 password: this.password,
                 type: this.type
                }
            })
            this.remind = ''
            login({ text: this.text, password: this.password, type: this.type }).then(response => {
                if (response.data.type === 200) {
                   alert(response.data.msg)
                 this.Clear()
                  this.Check()
                } else {
                  alert(response.data.msg)
                }
            })
          } else {
            this.remind = '两次密码不一致'
          }
          } else {
            this.remind = '账号密码不能少于6位'
          }
        },
        Clear() {
          this.text = ''
          this.password = ''
          this.password2 = ''
        },
        Check() {
          if (this.type === 1) {
            this.zhuce = true
          this.title = '用户注册'
          this.rege = '注册'
          this.check = '登录'
          this.type = 2
          } else {
            this.zhuce = false
          this.title = '用户登录'
          this.rege = '登录'
          this.check = '注册'
          this.type = 1
          }
        }
      }
    }
  </script>
  
  <style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/styles/global";
    .register-bg{
      z-index: 500;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    @include absCenter;
    .Regester{
      border-radius: px2rem(10);
      width: px2rem(350);
      height: auto;
      top: px2rem(100);
      left: 0;
      right: 0;
      margin: auto;
      position: fixed;
      z-index: 2000;
      display: block;
      background: white;
      text-align: center;
      .regester-user{
      text-align: center;
      color: #666;
      margin-top: px2rem(20);
      }
      .clickoff {
        background: #4aabff;
       }
        .clickoff:active {
          background: #666666;
        }
     .regester-button {
        width: px2rem(200);
        height: px2rem(35);
        border: none;
        color: white;
        border-radius: px2rem(10);
        margin-top: px2rem(15) ;
        outline:none;
      }
      .regester-remind{
        color:red;
        font-weight: lighter;
        font-size: px2rem(10);
        margin-top: px2rem(20);
      }
      .regester-check{
        color: #666;
        font-size: px2rem(15);
        margin: px2rem(20) 0 px2rem(30) 0;
      }
   .text span{
    color: #666;
    display: inline-block;
    font-size: px2rem(15);
    width: px2rem(80);
    font-weight: bold;
    margin: px2rem(30) 0 0 px2rem(20);
   }
   .text input{
     width: px2rem(200);
     height: px2rem(25);
     background: #f4f4f4;
     border-radius: px2rem(8);
     border: none;
     padding: px2rem(5) px2rem(5);
     font-size: px2rem(13);
     color: #666;
   }
      }
      .close-btn-wrapper{
        position: absolute;
        left: 0;
        bottom: px2rem(30);
        z-index: 600;
        width: 100%;
        @include center;
        .icon-close {
            width: px2rem(45);
            height: px2rem(45);
            border-radius: 50%;
            background: #333;
            font-size: px2rem(25);
            color: white;
            @include center;
        }
    }
    }
  </style>
