<template>
  <div id="app" :class="{'big-screen':isBigScreen}">
    <Home v-if="page==='home'"/>
  </div>
</template>

<script>
  import Home from './views/Home'

  export default {
    name: 'App',
    components: {
      Home
    },
    mounted() {
      this.isBigScreen = judgeBigScreen()
    },
    data() {
      return {
        page: 'home',
        isBigScreen: false
      }
    },
    methods: {
      async getData() {
        // TODO: some code...
        const data = await this.request('/xxxx')
      }
    }
  }

  /**
   * 判断是否全面屏
   */
  function judgeBigScreen(){
    let result = false;
    const rate = window.screen.height / window.screen.width;
    let limit =  window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
    // window.screen.height为屏幕高度
    //  window.screen.availHeight 为浏览器 可用高度
    if (rate > limit) {
      result = true;
    }
    return result;
  }
</script>

<style>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    font-size: 30px;
  }
  #app.big-screen {
    padding-top: 180px;
  }
</style>
