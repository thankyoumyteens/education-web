<template>
  <div class="home">
    <div class="wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}" @mouseover="stop" @mouseout="play">
      <div class="wrapper-content" :class="{wrapper_trans:isTrans}" :style="{width:originalData.img_width*(originalData.num+2)+'px',height:originalData.img_height+'px',left:-originalData.img_width+'px'}" ref="wrapperContent">
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="4" src="./images/a4.png" />
        </div>
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="1" src="./images/a1.jpg"/>
        </div>
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="2" src="./images/a2.jpg"/>
        </div>
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="3" src="./images/a3.jpg"/>
        </div>
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="4" src="./images/a4.png"/>
        </div>
        <div class="img-wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}">
          <p class="img-text">
            标语标语标语标语标语标语
          </p>
          <img class="wrapper-content_img" alt="1" src="./images/a1.jpg"/>
        </div>
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
    <div class="introduce">
      <h1>什么是经济师?</h1>
      <div class="desc">
        <p>经济师，是我国职称之一。要取得“经济师”职称，需要参加“经济专业技术资格考试”。
          由人事部统一发放合格证书。</p>
        <p>经济专业技术资格实行全国统一考试制度，由全国统一组织、
          统一大纲、统一试题、统一评分标准。资格考试设置两个级</p>
        <p>别：经济专业初级资格、经济专业中级资格。参加考试并成绩合格者，
          获得相应级别的专业技术资格，由人事部统一发放合格证书。</p>
      </div>
    </div>
    <div class="introduce bgc">
      <h1>如何报考经济师?</h1>
      <div class="card-wrapper">
        <div class="card">
          <div class="icon"><img src="./images/1.png" alt=""></div>
          <div class="title">学历</div>
          <div class="content">
            经济师考生须取得高中毕业以上学历
          </div>
        </div>
        <div class="card">
          <div class="icon"><img src="./images/1.png" alt=""></div>
          <div class="title">专业</div>
          <div class="content">
            相关专业包括工商管理、农业、商业、财政税收、金融等专业
          </div>
        </div>
        <div class="card">
          <div class="icon"><img src="./images/1.png" alt=""></div>
          <div class="title">工作</div>
          <div class="content">
            经济师报考，需要提供本人开具所在单位的相关工作证明
          </div>
        </div>
        <div class="card">
          <div class="icon"><img src="./images/1.png" alt=""></div>
          <div class="title">年限</div>
          <div class="content">
            从事相关工作年限是指取得规定学历前、后从事该项工作时间的总和
          </div>
        </div>
      </div>
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
      position relative
      overflow hidden
      &:hover
        .wrapper-arrow
          display block
          background-color rgba(0,0,0,.7)
      .wrapper-content
        position absolute
        left 0
        z-index 1
        .img-wrapper
          border none
          outline none
          float left
          position relative
          .img-text
            color #fff
            font-size 3em
            display inline-block
            width 50%
            text-align center
            position absolute
            top 30%
            right 0
          .wrapper-content_img
            width 100%
            height 100%
            border none
            outline none
      .wrapper-buttons
        position absolute
        width 100px
        height 20px
        text-align center
        bottom 3px
        z-index 2
        .wrapper-button
          float left
          width 10px
          height 10px
          border-radius 50%
          background #fff
          border 1px solid #337ab7
          margin 0 5px
          cursor pointer
        .wrapper_on
          background-color #337ab7
      .wrapper-arrow
        position absolute
        width 40px
        height 40px
        cursor pointer
        background-color rgba(0,0,0,.3)
        color #fff
        display none
        top 50%
        line-height 40px
        font-size 36px
        text-align center
        z-index 2
      .wrapper-prev
        left 10px
      .wrapper-next
        right 10px
      .wrapper_trans
        transition left .3s ease
    .introduce
      h1
        color #337ab7
        font-size 50px
        font-weight bold
      .desc
        font-size 20px
        font-weight bold
        margin-left 20px
    .bgc
      .card-wrapper
        text-align center
        .card
          width 210px
          height 270px
          margin-right 1%
          margin-bottom 10px
          display inline-block
          border 1px solid #ccc
          vertical-align top
          box-shadow 6px 6px 2px #dfdbda
          transition all .3s
          &:hover
            background #337ab7
            .title
              color #fff
            .content
              color #fff
          .icon
            width 88px
            height 88px
            margin 20px auto
            img
              width 100%
              height 100%
          .title
            color #000
            font-size 17px
            font-weight bold
          .content
            font-size 15px
            color #777
            width 60%
            margin 10px auto
</style>
