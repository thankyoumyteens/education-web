<template>
  <div class="video-page" v-show="showFlag">
    <div class="close" @click="hide">返回</div>
    <div class="player" id="player" v-if="link!==null">
      <video :src="link" controls>请升级浏览器</video>
      <!--<embed-->
        <!--height="415"-->
        <!--width="544"-->
        <!--quality="high"-->
        <!--allowfullscreen="true"-->
        <!--type="application/x-shockwave-flash"-->
        <!--:src="flashLink"-->
        <!--:flashvars="flashParam"-->
        <!--pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        showFlag: false,
        link: null,
        flashLink: null,
        flashParam: null
      }
    },
    methods: {
      init (link) {
        this.link = link
        this.flashLink = '//' + link.substring(0, link.indexOf('?'))
        this.flashParam = link.substring(link.indexOf('?') + 1)
      },
      show () {
        this.showFlag = true
      },
      hide () {
        this.link = null
        this.$emit('closed', null)
        this.showFlag = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .video-page
    .player
      width 800px
      clear both
      video
        width 100%
      video::-webkit-media-controls-enclosure {
        overflow:hidden;
      }
      video::-webkit-media-controls-panel {
        width: calc(100% + 30px);
      }
</style>
