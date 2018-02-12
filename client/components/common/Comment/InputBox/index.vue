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
              <input type="text" placeholder="昵称（必填）" required="required" name="name" v-model.trim="model.name">
            </div>
            <div class="email">
              <input type="email" placeholder="邮箱（必填）" required="required" name="email" v-model.trim="model.email">
            </div>
            <div class="site">
              <input type="text" placeholder="站点（eg: https://jooger.me）" required="required" name="site" v-model.trim="model.site">
            </div>
            <div class="clear" v-show="authInfo">
              <button @click="handleClear" title="退出">
                <i class="icon icon-clear"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="reply" v-if="reply">
          <div class="target">
            回复：
            <a class="name" :href="reply.author.site || 'javascript:;'" target="_blank" rel="noopener">@{{ reply.author.name }}</a>
          </div>
          <div class="clear">
            <button @click="handleClearReply" title="取消回复">
              <i class="icon icon-clear"></i>
            </button>
          </div>
        </div>
      </transition>
      <div class="content">
        <Editor
          ref="editor"
          :rows="child ? 4 : 8"
          :placeholder="placeholder"
          v-model="content">
        </Editor>
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
            <span v-else>{{ type }}</span>
          </button>
        </div>
        <!-- TODO: sns login -->
        <!-- <div class="action sns-login" v-show="!authInfo">
          <button class="github-login" @click="handleSnsLogin('github')">
            <i class="icon icon-github"></i>
            GitHub登录
          </button>
        </div> -->
      </div>
    </div>
  </Card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Card from '../../Card'
  import Loading from '../../Loading'
  import Editor from '../../Editor'
  import config from '@@/app.config'
  import defaultAvatar from '@/static/images/logo.svg'
  import { isEmail, isSiteUrl } from '@/utils'

  export default {
    name: 'CommentInputBox',
    components: {
      Card,
      Loading,
      Editor
    },
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
    data () {
      return {
        roleMap: config.auth.roleMap,
        model: {
          name: '',
          email: '',
          site: ''
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
      }),
      type () {
        return this.child ? '回复' : this.articleDetail ? '评论' : '留言'
      }
    },
    watch: {
      reply (val) {
        this.$refs.editor[val ? 'focus' : 'blur']()
      },
      authInfo (val) {
        if (!val) {
          this.model.name = ''
          this.model.email = ''
          this.model.site = ''
          this.avatar = defaultAvatar
        }
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
        // if (this.authInfo) {
        //   return
        // }
      },
      async handleSubmit (params = {}) {
        if (this.loading) {
          return
        }
        if (!this.content) {
          return this.$message.warning('你要说啥？')
        }
        const { name, email, site } = this.model
        if (!name) {
          return this.$message.warning('你的昵称呢？')
        }
        if (!email) {
          return this.$message.warning('你的邮箱呢？')
        } else if (!isEmail(email)) {
          return this.$message.warning('邮箱格式错误')
        }
        if (site && !isSiteUrl(site)) {
          return this.$message.warning('站点格式错误')
        }
        params = Object.assign({
          type: this.articleDetail ? 0 : 1,
          content: this.content
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
        this.$message.success(`${this.type}成功`)
        this.$emit('on-publish', data)
      },
      handleClear () {
        this.clearInfo()
      },
      handleClearReply () {
        this.$emit('on-clear-reply')
      }
    }
  }
</script>
