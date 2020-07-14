<template>
  <div class="container">
    <img src="../assets/zaizai_logo.png" class="logo" alt="logo">
    <div class="content">
      <p>请按实际需求修改本文件<p/><br>
      <p>本脚手机架提供基本的Confirm、Dialog、Loading、Toast组件</p>
    </div>
    <div class="bottom">
      <a href="javascript:;" class="btn active" @click="showDialog">点击弹窗</a>
    </div>
    <Dialog :is-show="isShow" title="标题" content="<p>这是一个弹窗<p/><br><p>这是一个弹窗</p>" @close="isShow=false"/>
  </div>
</template>

<script>
  import Dialog from '../components/Dialog'
  export default {
    name: 'home',
    components:{
      Dialog
    },
    data(){
      return {
        isShow: false
      }
    },
    methods:{
      showDialog(){
        this.isShow = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    padding-left: 60px;
    padding-right: 60px;
    .logo{
      width: 110px;
      margin-top: 20px;
    }
    .content{
      margin-top: 48px;
      font-weight:400;
      line-height:42px;
    }
  }
  .bottom{
    position: fixed;
    left: 60px;
    right: 60px;
    bottom: 0;
    height: 196px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn{
      width:360px;
      height:100px;
      line-height: 100px;
      color: #a7a7b3;
      background:#f0eff3;
      border-radius:56px;
      text-align: center;
      font-weight: 400;
      &.active{
        color: #fff;
        background: #5c46ff;
        font-weight: 600;
      }
    }
  }
</style>
