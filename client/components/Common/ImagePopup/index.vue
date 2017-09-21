<template>
  <transition name="fade">
    <div class="img-popup" v-show="show" @click.stop.prevent="close">
      <img class="popup-img" :src="src" alt="" ref="img">
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
      close () {
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
    flexLayout()
    position fixed
    top 0
    right 0
    width 100%
    height @width
    z-index 9999
    background alpha($black, .6)

    &.show {
      opacity 1
      visibility visible
    }

    .popup-img {
      max-width 90%
      max-height @max-width
    }
  }
</style>
