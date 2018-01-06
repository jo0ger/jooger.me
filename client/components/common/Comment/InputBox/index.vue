<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="comment-input-box" :class="{ 'child-input-box': child }">
    <div class="box">
      <div class="author" v-show="!child || (child && !authInfo)">
        <div class="login">
          <div class="avatar">
            <img :src="avatar" alt="">
          </div>
          <div class="form">
            <div class="name">
              <input type="text" placeholder="昵称" required="required" name="name" v-model.trim="model.name">
            </div>
            <div class="email">
              <input type="email" placeholder="邮箱" required="required" name="email" v-model.trim="model.email">
            </div>
            <div class="site">
              <input type="text" placeholder="站点" required="required" name="site" v-model.trim="model.site">
            </div>
            <div class="clear" v-show="authInfo">
              <button @click="handleClear" title="退出">
                <i class="icon icon-clear"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="reply" v-if="reply">
        <div class="target">
          回复：{{ reply.author.name }}
        </div>
        <div class="clear">
          <button @click="handleClearReply" title="取消回复">
            <i class="icon icon-clear"></i>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="wrapper">
          <textarea ref="comment" name="comment" id="comment" :placeholder="placeholder" cols="45" :rows="child ? 4 : 8" required="required" aria-required="true" v-model.trim="content"></textarea>
          <div class="tool-bar"></div>
        </div>
      </div>
      <div class="action">
        <div class="action-item submit">
          <button class="submit-btn" @click="handleSubmit">
            <Loading
              v-if="loading"
              size="mini"
              dark>
            </Loading>
            <span v-else>{{ child ? '回复' : '发表评论' }}</span>
          </button>
        </div>
        <div class="action sns-login" v-show="!authInfo">
          <button class="github-login" @click="handleSnsLogin('github')">
            <i class="icon icon-github"></i>
            GitHub登录
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Card from '../../Card'
  import Loading from '../../Loading'
  import config from '@@/app.config'
  import defaultAvatar from '@/static/images/logo.svg'

  export default {
    name: 'CommentInputBox',
    props: {
      child: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '说点儿什么'
      },
      loading: {
        type: Boolean,
        default: false
      },
      parent: {
        type: String,
        default: ''
      },
      reply: {
        type: Object,
        default () {
          return null
        }
      }
    },
    components: {
      Card,
      Loading
    },
    data () {
      return {
        roleMap: config.auth.roleMap,
        model: {
          name: '',
          email: '',
          site: '',
        },
        avatar: defaultAvatar,
        content: '',
        editMode: false
      }
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        authInfo: 'auth/info'
      })
    },
    watch: {
      reply (val) {
        this.$refs.comment[val ? 'focus' : 'blur']()
      }
    },
    mounted () {
      this.initUser()
    },
    methods: {
      ...mapActions({
        publish: 'comment/publish',
        clearInfo: 'auth/clearInfo'
      }),
      initUser () {
        if (this.authInfo) {
          this.model.name = this.authInfo.name
          this.model.email = this.authInfo.email
          this.model.site = this.authInfo.site
          this.avatar = this.authInfo.avatar
        }
      },
      checkUserInfoChange () {
        const model = this.model
        for (let key in model) {
          if (model.hasOwnProperty(key)) {
            if (model[key] !== this.authInfo[key]) {
              return true
            }
          }
        }
        return false
      },
      handleSnsLogin (type) {
        if (this.authInfo) {
          return
        }
      },
      async handleSubmit (params = {}) {
        if (this.loading) {
          return
        }
        if (!this.content) {
          return this.$message('请填写内容')
        }
        if (!this.model.name) {
          return this.$message('请填写昵称')
        }
        if (!this.model.email) {
          return this.$message('请填写邮箱')
        }
        if (!this.model.site) {
          return this.$message('请填写站点')
        }
        params = Object.assign({
          type: this.articleDetail ? 0 : 1,
          content: this.content,
        }, params)
        if (this.authInfo) {
          params.author = this.authInfo._id
          if (this.checkUserInfoChange()) {
            params.author = {
              id: this.authInfo._id,
              ...this.model
            }
          }
        } else {
          params.author = {
            ...this.model
          }
        }
        if (this.articleDetail) {
          params.article = this.articleDetail._id
        }
        if (this.parent) {
          params.parent = this.parent
        }
        if (this.reply) {
          params.forward = this.reply._id
        } else {
          params.forward = this.parent
        }
        const { success, data } = await this.publish(params)
        if (success) {
          this.initUser()
          this.content = ''
          // TODO: 滚动到评论最上面？
        }
        this.$message(this.child ? '回复成功' : '评论成功')
        this.$emit('on-publish', data)
      },
      handleClear () {
        this.clearInfo()
        this.model.name = ''
        this.model.email = ''
        this.model.site = ''
        this.avatar = defaultAvatar
      },
      handleClearReply () {
        this.$emit('on-clear-reply')
      }
    }
  }
</script>

