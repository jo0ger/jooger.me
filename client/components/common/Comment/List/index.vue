<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="comment-list" :class="{ 'sub-comment-list': child , loading, empty: !list.length }">
    <template v-if="!child || list.length">
      <div class="list-header" slot="header">
        <div class="total">
          共
          <span class="count">{{ total || pagination.total || 0 }}</span>
          个{{ listType }}
        </div>
        <div class="sort">
          <a class="sort-type" :class="{ active: latestSort }" @click="handleSort('createdAt', -1)">最新排序</a>
          <i class="seprate"></i>
          <a class="sort-type" :class="{ active: hottestSort }" @click="handleSort('ups', -1)">最热排序</a>
        </div>
      </div>
      <div class="list-content">
        <CommentItem v-for="(item, index) in list"
          :key="item._id"
          :comment="item"
          :child="child"
          :index="index"
          @on-reply="handleSetReply">
        </CommentItem>
        <div class="indicator" v-if="loading || !hasNoMore">
          <Loading v-if="loading"></Loading>
          <button class="loadmore" v-else-if="!hasNoMore && list.length" @click="handleLoadmore">来，继续翻</button>
          <p class="no-data" v-else>暂无{{ listType }}</p>
        </div>
      </div>
    </template>
    <CommentInputBox v-if="child"
      child
      placeholder="回复点儿什么"
      :parent="parent"
      :reply="replyTarget"
      @on-publish="handleReplyPublish"
      @on-clear-reply="handleClearReply">
    </CommentInputBox>
  </Card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Card from '../../Card'
  import CommentItem from '../Item'
  import CommentInputBox from '../InputBox'
  import Loading from '../../Loading'

  export default {
    name: 'CommentList',
    components: {
      Card,
      CommentInputBox,
      CommentItem,
      Loading
    },
    props: {
      parent: {
        type: String,
        default: ''
      },
      sort: {
        type: Object,
        validator (val) {
          return ['by', 'order'].every(item => val.hasOwnProperty(item))
        },
        default () {
          return {
            by: 'createdAt',
            order: -1
          }
        }
      },
      child: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        replyTarget: null
      }
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail'
      }),
      latestSort () {
        const { by, order } = this.sort
        return by === 'createdAt' && order === -1
      },
      hottestSort () {
        const { by, order } = this.sort
        return by === 'ups' && order === -1
      },
      hasNoMore () {
        const { cur_page, total_page, total } = this.pagination
        return total > 0 && cur_page >= total_page && total_page >= 1
      },
      listType () {
        return this.child ? '回复' : this.articleDetail ? '评论' : '留言'
      }
    },
    methods: {
      handleSort (by, order) {
        if (by === this.sort.by && order === this.sort.order || this.loading) {
          return
        }
        this.$emit('on-sort', { by, order })
      },
      handleLoadmore () {
        if (this.loading) {
          return
        }
        this.$emit('on-loadmore', this.pagination.cur_page + 1)
      },
      handleSetReply (index) {
        this.replyTarget = this.list[index]
      },
      handleClearReply () {
        this.replyTarget = null
      },
      handleReplyPublish (reply) {
        this.$emit('on-reply-publish', reply)
      }
    }
  }
</script>

