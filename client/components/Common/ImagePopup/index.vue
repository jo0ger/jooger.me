<template>
  <transition name="fade">
    <div class="img-popup" v-show="show">
      <div class="wrapper">
        <img class="popup-img" :src="src" alt="" ref="img">
      </div>
      <a class="close-btn" @click.stop.prevent="close">
        <i class="iconfont icon-close"></i>
      </a>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Common-ImagePopup',
    data () {
      return {
        src: '',
        elem: null,
        show: false
      }
    },
    methods: {
      open () {
        document.body.style.overflow = 'hidden'
        document.body.appendChild(this.$el)
        setTimeout(() => {
          this.show = true
        }, 0)
      },
      close (e) {
        // if (e.target.tarName === 'IMG' && e.target.className === 'popup-img') {
        //   return
        // }
        this.show = false
        setTimeout(() => {
          if (document.body.contains(this.$el)) {
            document.body.removeChild(this.$el)
            document.body.style.overflow = ''
          }
          this.src = ''
          this.$destroy()
        }, 300)
      }
    }
  }

  const propertiesToPrefix = {
    transform: true,
    transformOrigin: true,
    transition: true
  }

  const webkitPrefix = 'webkit'

  const unitKeyMap = ['left', 'top']

  export const prefix = styles => {
    const prefixedStyles = {}
    const styleProperties = Object.keys(styles || {})
    styleProperties.forEach(property => {
      if (propertiesToPrefix[property]) {
        const prefixedProperty = webkitPrefix + property[0].toUpperCase() + property.slice(1)
        prefixedStyles[prefixedProperty] = styles[property]
      }
      prefixedStyles[property] = styles[property]
    })
    return prefixedStyles
  }

  const camelize = function (str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
      return chr ? chr.toUpperCase() : ''
    })
  }

  export const setStyle = (element, styleName, value) => {
    if (!element || !styleName) {
      return
    }
    if (typeof styleName === 'object') {
      for (let key in styleName) {
        if (styleName.hasOwnProperty(key)) {
          setStyle(element, key, unitKeyMap.includes(key) ? `${styleName[key]}px` : styleName[key])
        }
      }
    } else {
      styleName = camelize(styleName)
      element.style[styleName] = value
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .img-popup {
    position fixed
    top 0
    right 0
    width 100%
    height @width
    z-index 9999
    background alpha($black, .8)

    &.show {
      opacity 1
      visibility visible
    }

    .wrapper {
      flexLayout()
      width 100%
      height @width
      .popup-img {
        max-width 90%
        max-height @max-width
      }
    }


    .close-btn {
      flexLayout()
      position absolute
      top 30px
      right 30px
      width 30px
      height @width
      color $white 
      border 1px solid $white
      border-radius 50%
      opacity .6

      &:hover {
        opacity .8
      }
    }
  }
</style>
