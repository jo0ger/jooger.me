<template>
    <section class="guestbook-page">
      <button @click="openBox">click</button>
      <Modal v-model="showInputBox">
        <CommentInputBox is-message></CommentInputBox>
      </Modal>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'
import CommentInputBox from '@/components/common/Comment/CommentInputBox'
import { Modal } from '@/components/common'

@Component({
  name: 'Guestbook',
  components: {
    CommentInputBox,
    Modal
  },
  head () {
    return {
      title: '留言墙'
    }
  },
  fetch ({ store }) {
    store.commit('app/SET_FULL_COLUMN', true)
    store.commit('comment/CLEAR_LIST')
    return store.dispatch('comment/fetchList', {
      type: 1
    })
  }
})
export default class extends Base {
  private showInputBox = false

  private openBox () {
    this.showInputBox = true
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.guestbook-page {}
</style>

