<template>
  <div class="video-page" v-show="showFlag">
    <div class="close" @click="hide">返回</div>
    <div class="player" v-if="link!==null">
      <embed
        height="415"
        width="544"
        quality="high"
        allowfullscreen="true"
        type="application/x-shockwave-flash"
        :src="flashLink"
        :flashvars="flashParam"
        pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>
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
        this.$emit('closed', null)
        this.showFlag = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .video-page
    .player
      clear both
</style>
