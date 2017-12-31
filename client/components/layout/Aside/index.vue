<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="aside">
    <Affix offsetTop="80">
      <Tags></Tags>
    </Affix>
  </div>
</template>

<script>
  import Calendar from './widgets/Calendar'
  import Hots from './widgets/Hots'
  import Tags from './widgets/Tags'
  import { Affix } from '@/components/common'

  export default {
    name: 'Aside',
    components: {
      Calendar,
      Hots,
      Tags,
      Affix
    },
    data () {
      return {}
    }
  }
</script>

