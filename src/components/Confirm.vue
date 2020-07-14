<template>
  <div class="mask" v-show="isShow">
    <div :class="['toast',{'show':isShow}]">
      <p class="title">{{title}}</p>
      <p class="sheet">
        <button @click="cancel">取消</button>
        <button @click="submit">确认</button>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'confirm',
    props: ['isShow','title'],
    data(){
      return {

      }
    },
    methods:{
      cancel(){
        this.$emit('close')
      },
      submit(){
        this.$emit('submit')
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
      height: 380px;
      margin-top: -200px;
      background-color: #fff;
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 50px 50px;
      box-sizing: border-box;
      .title {
        font-size: 34px;
        line-height: 50px;
        font-weight: 500;
        color: #000;
        .num{
          color: #5c46ff;
        }
      }
      .sheet {
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        button {
          width: 256px;
          height: 100px;
          border-radius: 50px;
          font-size: 30px;
        }
        button:nth-of-type(1) {
          font-weight: 400;
          background-color: #f0eff3;
          color: #323232;
        }
        button:nth-of-type(2) {
          font-weight: 600;
          color: #fff;
          background-color: #5c46ff;
        }
      }
    }
  }

  .show1{
    animation: dance 1.3s;
    animation-delay: 500ms;
  }
  @keyframes dance{
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    20% {
      opacity: 1;
      transform: translateY(0);
    }
    80% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
</style>
