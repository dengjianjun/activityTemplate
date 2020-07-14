<template>
  <transition name="fade-transform" mode="out-in">
    <div v-if="flag" :class="['toast',{'show':flag}]">
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    props: ['flag', 'text']
  }
</script>

<style lang='less' scoped>
  .big-screen {
    .toast {
      top: 100px;
    }
  }

  .toast {
    width: 694px;
    height: 112px;
    border-radius: 56px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    position: fixed;
    line-height: 112px;
    top: 28px;
    left: 28px;
    opacity: 0;
    transform: translateY(-100%);
    background-color: #fff;
    text-align: center;
    z-index: 99;
    &::before{
      content: '';
      position: absolute;
      left: 28px;
      top: 28px;
      display: inline-block;
      width: 56px;
      height: 56px;
      background: url(../assets/ic_fail_toast.png) no-repeat center;
      background-size: cover;
    }
    img {
      width: 56px;
      height: 56px;
      position: absolute;
      left: 28px;
      top: 28px;
    }

    p {
      font-size: 30px;
      color: #f60000;;
    }

    button {
      width: 340px;
      height: 100px;
      background-color: #5c46ff;
      font-size: 30px;
      color: #fff;
      border-radius: 50px;
    }
  }

  .show {
    animation: dance 1.3s;
    animation-delay: 500ms;
  }

  @keyframes dance {
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
