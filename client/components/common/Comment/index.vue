<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="comment-pane">
    <CommentInputBox />
    <CommentList />
  </div>
</template>

<script>
  import CommentInputBox from './InputBox'
  import CommentList from './List'

  export default {
    name: 'Comment',
    components: {
      CommentInputBox,
      CommentList
    },
    data () {
      return {}
    }
  }
</script>

