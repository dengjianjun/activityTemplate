<template>
  <div id="app">
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

    },
    data() {
      return {
        page: 'home'
      }
    },
    methods: {
      async getData() {
        // TODO: some code...
        const data = await this.request('/xxxx')
      }
    }
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
</style>
