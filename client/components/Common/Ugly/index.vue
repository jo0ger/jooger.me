<template>
  <div class="ugly">
    <svg width="200" height="200">
      <polygon :points="points"></polygon>
      <circle cx="100" cy="100" r="90"></circle>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'Common-Ugly',
    data () {
      const defaultSides = 10
      const stats = Array.apply(null, { length: defaultSides })
        .map(function () { return 100 })
      return {
        stats: stats,
        points: generatePoints(stats),
        sides: defaultSides,
        minRadius: 50,
        interval: null,
        updateInterval: 500
      }
    }
  }

  function valueToPoint (value, index, total) {
    var x     = 0
    var y     = -value * 0.9
    var angle = Math.PI * 2 / total * index
    var cos   = Math.cos(angle)
    var sin   = Math.sin(angle)
    var tx    = x * cos - y * sin + 100
    var ty    = x * sin + y * cos + 100
    return { x: tx, y: ty }
  }

  function generatePoints (stats) {
    var total = stats.length
    return stats.map(function (stat, index) {
      var point = valueToPoint(stat, index, total)
      return point.x + ',' + point.y
    }).join(' ')
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .ugly {
    svg {
      display block
    }

    polygon {
      fill $base-color
    }
  }
</style>
