import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import request from 'axios'

Vue.config.productionTip = false
request.defaults.baseURL = process.env.VUE_APP_BASE_API
Vue.prototype.request = request
Vue.prototype.getQuery = getQuery

new Vue({
  render: h => h(App),
}).$mount('#app')


function getQuery(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

if (process.env.NODE_ENV !== 'production') {
  showDebugger()
}

function showDebugger () {
  const script = document.createElement('script');
  script.src="//cdn.jsdelivr.net/npm/eruda";
  document.body.appendChild(script);
  script.onload = ()=> { eruda.init() }

  const button = document.createElement('button')
  button.onclick = () => {
    window.location.reload()
  }
  button.style.cssText = `
    display:block;
    font-size: 14px;
    position:fixed;
    left:0.769em;
    bottom:0.769em;
    color:#fff;
    background-color:#04BE02;
    height: 2.4em;
    line-height:1;
    font-size:14px;
    padding:0.61538462em 1.23076923em;
    z-index:10000;
    border-radius:0.30769231em;
    box-shadow:0 0 0.61538462em rgba(0,0,0,0.4);
  `
  button.innerText = 'reload-2010'
  button.addEventListener('touchmove', function (e) {
    e.preventDefault();
    const moveEndX = e.changedTouches[0].pageX;
    const moveEndY = e.changedTouches[0].pageY;

    const $this = e.target
    const xMM = moveEndX - $this.clientWidth / 2;
    const yMM = moveEndY - $this.clientHeight / 2;
    if (xMM < document.documentElement.clientWidth - $this.clientWidth && xMM > 0) {
      $this.style.left = xMM + 'px'
    }

    if (yMM < document.documentElement.clientHeight - $this.clientHeight && yMM > 0) {
      $this.style.top = yMM + 'px'
    }
  })
  document.body.append(button)
}
