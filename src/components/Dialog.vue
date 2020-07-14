<template>
  <div class="mask" v-show="isShow">
    <div :class="['toast',{'show':isShow}]">
      <div class="header">
        <span class="title">{{title}}</span>
        <a href="javascript:;" class="close" @click="close"></a>
      </div>
      <div class="content" v-html="content">
      </div>
      <div class="sheet">
        <button @click="close">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['isShow','title','content'],
    name: 'dialog',
    data(){
      return {

      }
    },
    methods:{
      close(){
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="scss">
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .toast {
      width: 630px;
      max-height: 960px;
      margin-top: -200px;
      background-color: #fff;
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 40px;
      box-sizing: border-box;
      .header{
        position: relative;
        height: 100px;
        text-align: center;
      }
      .title {
        display: inline-block;
        margin-top: 35px;
        font-size: 30px;
        font-weight: 600;
      }
      .close{
        position: absolute;
        right: -24px;
        top: 16px;
        display: inline-block;
        width: 36px;
        height: 36px;
        padding: 10px;
        background: url(../assets/ex_popup.png) no-repeat center;
        background-size: cover;
        background-origin: content-box;
      }
      .content{
        line-height: 1.1;
        /deep/ p{
          font-size: 26px;
          line-height: 1.1;
          color: #686675;
          font-weight:400;
          line-height:40px;
        }
      }
      .sheet {
        display: flex;
        height: 112px;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        button {
          font-size: 30px;
          color: #5c46ff;
          background: transparent;
        }
      }
    }
  }
</style>
