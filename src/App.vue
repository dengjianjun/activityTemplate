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
      async getDetail() {
        const id = this.getQuery('userId')
        await getZepeto()
        // TODO:先定死
        const userId = id || (window.ZEPETO ? window.ZEPETO.userInfo.userId : '5eb37b3f12918c418d9956ba')
            this.request('https://api-zepeto-beta.kajicam.com/zepeto/activity/refund/api/refund/detail?userId=' + userId)
            .then(({data}) => {
              const {result} = data
              if (result) {
                result.status = +result.status
                if (result.refuseReason) {
                  result.refuseReason = result.refuseReason.split(',')
                }
                this.detail = result
                this.status = result.status
                this.$nextTick(()=>{
                  this.page = 'result'
                })
              }else{
                this.page = 'home'
              }
            }).catch(err => {
          this.page = 'home'
          // eslint-disable-next-line
          console.error(err)
        })
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
