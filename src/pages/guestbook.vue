<template>
    <section class="guestbook-page">
      <Modal title="我的留言" v-model="showInputBox">
        <CommentInputBox style="box-shadow: none;" ref="inputBox" is-message @on-publish="publishSuccess"></CommentInputBox>
      </Modal>
      <div class="submit-field">
        <div class="welcome" v-if="setting.site.welcome">
          <i class="icon icon-quote-up"></i>
          {{ setting.site.welcome }}
          <i class="icon icon-quote-down"></i>
        </div>
        <div class="submit">
          <button class="submit-btn" @click="openBox">我要上墙</button>
        </div>
        <div class="count">
          <span>已有 {{ pageInfo.total }} 条留言</span>
        </div>
      </div>
      <transition-group tag="div" name="fade" mode="out-in" class="list-field">
        <transition-group tag="div" name="fade" mode="out-in" class="column" :style="columnStyle" v-for="(item, index) in columnData" :key="index">
          <MessageItem v-for="m in item" :key="m._id" :message="m"></MessageItem>
        </transition-group>
      </transition-group>
      <p class="no-data" v-if="pageInfo.total < 1 && !messageListFetching">空空如也</p>
      <transition name="fade" mode="out-in">
        <div class="indicator" v-if="messageListFetching || !hasNoMore">
          <Loading v-if="messageListFetching" no-text></Loading>
          <button class="loadmore" v-else-if="!hasNoMore && messageList.length" @click="loadmore">来，继续翻</button>
        </div>
      </transition>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'
import CommentInputBox from '@/components/common/Comment/CommentInputBox'
import { Modal, MessageItem, Loading } from '@/components/common'
import { namespace } from 'vuex-class'

const { Getter, Action } = namespace('comment')

@Component({
  name: 'Guestbook',
  components: {
    CommentInputBox,
    Modal,
    MessageItem,
    Loading
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
      type: 1,
      limit: 20
    })
  }
})
export default class extends Base {
  @Getter('list') private messageList!: WebApi.CommentModule.Comment[]
  @Getter('listFetching') private messageListFetching!: boolean
  @Getter private pageInfo!: WebApi.PageInfo
  @Action('like') private likeMessage
  @Action('fetchList') private fetchMessageList

  private showInputBox = false
  private columnNum = 3

  private get from () {
    return this.$route.query.from
  }

  private get columnData () {
    return this.mobileLayout ? [this.messageList] : this.messageList.reduce((sum, item, index) => {
      sum[index % this.columnNum].push(item)
      return sum
    }, new Array(this.columnNum).fill(null).map(() => [] as WebApi.CommentModule.Comment[]))
  }

  private get columnStyle () {
    return {
      flexBasis: (100 / this.columnNum) + '%'
    }
  }

  private get hasNoMore () {
    return this.pageInfo.total > 0 && this.pageInfo.current >= this.pageInfo.pages && this.pageInfo.pages >= 1
  }

  private mounted ()  {
    // FIX: 修复从文章详情页到留言墙没有清空article，导致留言发布到文章下了
    this.$store.commit('article/CLEAR_DETAIL')
    if (this.from === 'about') {
      this.openBox()
      this.$nextTick(() => {
        const inputBox = this.$refs.inputBox as any
        inputBox.content = `友链申请\n称呼：\n网站：\nGithub(如果有)：\n`
        inputBox.focus()
      })
    }
  }

  private openBox () {
    this.showInputBox = true
  }

  private async like (message) {
    const success = await this.likeMessage(message.id)
    if (success) {
      message.liked = true
    }
    window.gtagEvent('site_message_like', {
      event_category: 'site_message_like',
      event_label: '站内留言点赞',
      value: 1
    })
  }

  private loadmore () {
    if (this.messageListFetching) return
    this.fetchMessageList({
      page: this.pageInfo.current + 1,
      type: 1
    })
  }

  private publishSuccess () {
    this.showInputBox = false
    this.fetchMessageList({
      page: 1,
      type: 1
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.guestbook-page {
  width 100%

  .submit-field {
    margin 48px 0
    text-align center

    .welcome {
      position relative
      width 600px
      max-width calc(100% - 64px)
      line-height 1.8
      margin 0 auto
      font-size $font-size-lger
      text-shadow 0 5px 20px var(--light-color-light)

      .icon {
        position absolute
        font-size $font-size-sm
      }

      .icon-quote-up {
        top -12px
        left -12px
      }

      .icon-quote-down {
        bottom -12px
        right -12px
      }
    }

    .submit-btn {
      margin 36px 0 $padding-md
      padding 6px 32px
      background linear-gradient(135deg, #f21368 0%, #E80505 100%)
      color var(--light-color)
      border none
      box-shadow 0 4px 8px rgba(#E80505, .3)

      &:hover {
        box-shadow 0 4px 25px rgba(#E80505, .4)
      }
    }

    .count {
      color var(--text-color-secondary)
    }
  }

  .list-field {
    flexLayout(, flex-start, flex-start)
    margin 0 (0 - $padding-xs)

    .column {
      flex 1 0
      padding 0 $padding-xs
      overflow hidden
    }
  }

  .app.mobile-layout & {
    .slogan {
      font-size $font-size-base
    }

    .list-field {
      margin 0

      .column {
        padding 0 $padding-sm
      }
    }

    .indicator {
      padding 0 $padding-sm
    }
  }
}
</style>

