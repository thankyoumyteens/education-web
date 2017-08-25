<template>
  <div class="home">
    <div class="wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}" @mouseover="stop" @mouseout="play">
      <div class="wrapper-content" :class="{wrapper_trans:isTrans}" :style="{width:originalData.img_width*(originalData.num+2)+'px',height:originalData.img_height+'px',left:-originalData.img_width+'px'}" ref="wrapperContent">
        <img class="wrapper-content_img" alt="4" src="./images/4.jpg" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
        <img class="wrapper-content_img" alt="1" src="./images/1.png" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
        <img class="wrapper-content_img" alt="2" src="./images/2.png" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
        <img class="wrapper-content_img" alt="3" src="./images/3.jpg" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
        <img class="wrapper-content_img" alt="4" src="./images/4.jpg" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
        <img class="wrapper-content_img" alt="1" src="./images/1.png" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
      </div>
      <div class="wrapper-buttons" :style="{left:(originalData.img_width-100)/2+'px'}">
        <span :class="['wrapper-button',{'wrapper_on':index==1}]"  @click="turnTo(1)"></span>
        <span :class="['wrapper-button',{'wrapper_on':index==2}]"  @click="turnTo(2)"></span>
        <span :class="['wrapper-button',{'wrapper_on':index==3}]"  @click="turnTo(3)"></span>
        <span :class="['wrapper-button',{'wrapper_on':index==4}]"  @click="turnTo(4)"></span>
      </div>
      <a class="wrapper-arrow wrapper-prev" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="prev">&lt;</a>
      <a class="wrapper-arrow wrapper-next" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="next">&gt;</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted () {
      // 下面是判断过渡动画是否完成
      let node = this.$refs.wrapperContent
      let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      }
      let self = this
      let transitionEvent
      for (let t in transitions) {
        if (node.style[t] !== undefined) {
          transitionEvent = transitions[t]
        }
      }
      transitionEvent && node.addEventListener(transitionEvent, function () {
        self.clickdelay = false
      })
      this.play()
    },
    data () {
      return {
        originalData: {
          img_width: 1311,
          img_height: 400,
          btn_width: 40,
          btn_height: 40,
          num: 4,
          delay: 300
        },
        isTrans: true, // 因为到最后一张图片，index为1时，需要立即跳到第二张index也为1的图片，这个用来是否给出transition
        index: 1,
        timer: null, // setInterval
        clickdelay: false // 用来防止连续点击
      }
    },
    methods: {
      next () {
        if (this.clickdelay) {
          return
        }
        this.clickdelay = true
        if (this.index === this.originalData.num) {
          this.index = 1
        } else {
          this.index += 1
        }
        this.animate(this.originalData.img_width)
      },
      prev () {
        if (this.clickdelay) {
          return
        }
        this.clickdelay = true
        if (this.index === 1) {
          this.index = this.originalData.num
        } else {
          this.index -= 1
        }
        this.animate(-this.originalData.img_width)
      },
      animate (offset) {
        let node = this.$refs.wrapperContent
        let self = this
        let left = parseInt(node.style.left) - offset
        this.isTrans = true
        node.style.left = left + 'px'
        setTimeout(function () {
          if (left < -(self.originalData.num * self.originalData.img_width)) {
            self.isTrans = false
            node.style.left = -self.originalData.img_width + 'px'
            self.clickdelay = false // 当到达最后一张图片时
          }
          if (left > -100) {
            self.isTrans = false
            node.style.left = -self.originalData.num * self.originalData.img_width + 'px'
            self.clickdelay = false // 当到达第一张图片时
          }
        }, this.originalData.delay)
      },
      play () {
        let self = this
        this.timer = setInterval(function () {
          self.next()
        }, 2000)
      },
      stop () {
        this.clickdelay = false // 用来防止连续点击
        clearInterval(this.timer)
        this.timer = null
      },
      turnTo (flag) {
        if (flag === this.index) {
          return
        } else {
          var offset = (flag - this.index) * this.originalData.img_width
          this.index = flag
          this.animate(offset)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    .wrapper
      position: relative
      overflow: hidden
      &:hover
        .wrapper-arrow
          display: block
          background-color: rgba(0,0,0,.7)
      .wrapper-content
        position: absolute
        left: 0
        z-index: 1
        .wrapper-content_img
          border: none
          outline: none
          float: left
      .wrapper-buttons
        position: absolute
        width: 100px
        height: 20px
        text-align: center
        bottom: 3px
        z-index: 2
        .wrapper-button
          float: left
          width: 10px
          height: 10px
          border-radius: 50%
          background: #fff
          border 1px solid #337ab7
          margin: 0 5px
          cursor: pointer
        .wrapper_on
          background-color: #337ab7
    .wrapper-arrow
      position: absolute
      width: 40px
      height:40px
      cursor: pointer
      background-color: rgba(0,0,0,.3)
      color: #fff
      display: none
      top:50%
      line-height: 40px
      font-size: 36px
      text-align: center
      z-index: 2
    .wrapper-prev
      left: 10px
    .wrapper-next
      right: 10px
    .wrapper_trans
      transition: left .3s ease
</style>
