import 'babel-polyfill'
import 'zepto/src/zepto'
import 'zepto/src/event'
// import 'zepto/src/ajax'
import '@/static/css/page.scss'
import Swiper from 'swiper/src/idangerous.swiper'//2.7.6
// import Swiper from '@/static/js/swiper' //2.7.6
import 'swiper/src/idangerous.swiper.css'
import handlers from '@/static/js/handlers'
import * as _ajax from '@/static/js/ajaxSupport'
import imgSupport from '@/bag/utils/imgSupport'
import {hideErrMsg} from '@/bag/vueCommon/errMsg/1/e'
import utils from '@/bag/utils/index'
import {config} from '@/config/commonConfig'
import {showErrMsg} from '@/bag/vueCommon/errMsg/1/e'

import '@/bag/plugins/ext'
import '@/bag/plugins/EZGesture'
import '@/bag/plugins/canvas2image'
// import QRCode from 'qrcode'
import loading from '@/bag/vueCommon/loading/1/loading'


import BrowserChecker from '@/bag/utils/BrowserChecker'
import BridgeFactory from '@/bag/bridge/BridgeFactory'

// config.imagePrefix,

let myApp = {
  isIos: BrowserChecker.isIos(),
  isAnd: BrowserChecker.isAndroid(),
  inState: '-outApp',
  isInApp: false,
  version: '',
  eventName: 'splicePic'
}
let cid = utils.getQueryString('cid')
setTimeout(() => {
  cid = !!cid ? cid : false
  console.log('cid=', cid);
}, 1000)
myApp.cid = !!cid ? cid : false

handlers.mySwiper = new Swiper('.swiper-container',{
  // loop: true,
  pagination : '.pagination',
  calculateHeight : true,
  autoplay:2600,
  speed:800,
  loop:true,
  autoplayDisableOnInteraction: false,
})

// 如果是扫描二维码进来的
if(myApp.cid) {
  _ajax.getResult(myApp.cid).then(res => {
    let url = config.imagePrefix + res.data.uri
    handlers.circleNum = res.data.circleNum
    handlers.circleName = res.data.circleName
    handlers.circleId = res.data.circleId
    handlers.toJoin = true
    handlers.circleIsFull = res.data.circleIsFull

    if(res.data.model != null) {
      handlers.photoIsFull = '1'
      setTimeout(async () => {
        imgSupport.createQr($("#qrcode")[0], `${handlers.siteUrl}?cid=${res.data.circleId}`)
        await handlers.preImages(res.data.model.locationList)
        let arr = []
        arr[0] = res.data.model
        await handlers.preStartDrawCanvas(arr, res.data.model.thisTimeNum)
      }, 0)

    } else if(res.data.id) {
      $('#distImg').css('opacity',0)
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = url
      img.onload = function() {
        $('#distImg')[0].src = this.src
        $('#distImg').css('opacity',1)
        loading(0)

        let canvas = document.createElement("canvas");
        canvas.style.width = this.width + 'px'
        canvas.style.height = this.height + 'px'
        var context = canvas.getContext('2d')
        var scale = 1;
        canvas.width = this.width * scale//定义canvas 宽度 * 缩放
        canvas.height = this.height * scale//定义canvas 高度 *缩放
        // context.scale(scale, scale)//获取context,设置scale
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
        context.drawImage(this, 0, 0, this.width , this.height);
        let _img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
        console.log('分享的图片长度', _img.src.length);
        // 如果猜测是空白页 强制从心画图
        if(_img.src.length < 40000) {
          setTimeout(async () => {
            imgSupport.createQr($("#qrcode")[0], `${handlers.siteUrl}?cid=${res.data.circleId}`)
            _ajax.getPictures({
              "circleId": handlers.circleId
            }).then(async res => {
              if(res.code == 200 && res.msg == '成功'){
                console.log(res);
                handlers.landmarks = res.data
                // 1 这次换模板的人数与上次不同  2 加入时人数与本次不同
                await handlers.preImages(res.data[0].locationList)
                setTimeout(async () => {
                  await handlers.preStartDrawCanvas(res.data,res.data[0].thisTimeNum)
                }, 100)
              }else {
                showErrMsg('出了点小问题 服务器正在修复')
                console.log('getPictures api err:', res.code)
              }
            })

          }, 0)
        }
      }
      img.onerror = function() {
        loading(0)
        showErrMsg('图片加载失败 请重新尝试哦')
      }
      handlers.qrEnterShow()
    } else {
      showErrMsg('无效的合拍id')
      loading(0)
      handlers.pagePre('#p1')
    }
  })
} else {
  handlers.pagePre('#p1')
  handlers.mySwiper.reInit()
  handlers.mySwiper.swipeTo(0, 0, false)
  handlers.init()
}

handlers.assignMyApp(myApp)

BridgeFactory.getBridge().appInfo(res => {
  if (res.app) {
    myApp.isInApp = true
    myApp.version = res.app
    myApp.isInApp = true
    myApp.inState = '-inApp'
    handlers.assignMyApp(myApp)
  }
})
setTimeout(() => {
  $('.log').text(JSON.stringify(myApp))
  if(myApp.cid) {
    _hmt.push(['_trackEvent', myApp.eventName + myApp.inState + '-qr', 'pv', 'page1-pv'])
  } else {
    _hmt.push(['_trackEvent', myApp.eventName + myApp.inState, 'pv', 'page1-pv'])
  }
}, 600)

setTimeout(() => {$('.log').text(JSON.stringify(myApp))}, 500)


$('#p2 #exmpAreaMask, #p2 #reChoose').on('click', () => {
  handlers.pickImg()
})
// 确认上传
$('#confirmUpload').on('click', () => {
  handlers.confirmUpload()
})

// 生成二维码
// $('.createQrBtn').off('click').on('click', () => {
//   window.location.reload()
//   // imgSupport.createQr($("#qrcode")[0], "http://jindo.dev.naver.com/collie")
// })

$('#startBtn').on('click', () => {
  if(myApp.isInApp) {
    $('.isInApp').show()
    $('.isOutApp').hide()
  } else {
    $('.isInApp').hide()
    $('.isOutApp').show()
  }
  handlers.showPage('#p2')
  // handlers.mySwiper.destroy()
})

$('.errMsg .close').on('click', () => {
  hideErrMsg()
})

// 长按图片
$('#distImg').off('touchstart')
let timeout;
$('#distImg').on('touchstart', (e) => {
  timeout = setTimeout(() => {
    _hmt.push(['_trackEvent', 'splicePic' + myApp.inState, 'longTap', '长按图片'])
    setTimeout(() => {
      clearTimeout(timeout)
    },200)
  }, 600)
  e.stopPropagation()
}).on('touchmove', () => {
  clearTimeout(timeout)
}).on('touchend', () => {
  clearTimeout(timeout)
})

$('#p2 .userInfo input').on('focus',() => {
    keyboardBounce(false)
}).on('blur', () => {
    keyboardBounce(true)
})

function keyboardBounce(stat){
  if (BrowserChecker.isAndroid()) {
      let sh = $('#p2')
      if(stat){
        sh.css('top',0)
        setTimeout(() => {window.scrollTo(0,0)}, 200)
      } else {
        sh.css('top',-(sh[0].offsetHeight / 3 - 20) + 'px')
      }
  }
}
