/**
 * @desc CommentInputBox
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:23:17
 */

import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'
import Card from '../../Card/index.vue'
import Loading from '../../Loading/index.vue'
import { namespace } from 'vuex-class'
import MDEditor from '../../MDEditor/index.vue'
import { isEmail, isSiteUrl } from '@/utils'

const appMod = namespace('app')
const commentMod = namespace('comment')
const articleMod = namespace('article')

const getDefModel = () => ({
  name: { value: '', error: false },
  email: { value: '', error: false },
  site: { value: '', error: false }
})

@Component({
  name: 'CommentInputBox',
  components: {
    Card,
    MDEditor,
    Loading
  }
})
export default class CommentInputBox extends Base {
  @Prop({ type: Boolean, default: false })
  private isChild!: boolean

  @Prop({ type: String, default: '' })
  private parent!: string

  @Prop({ type: Object, default: () => null})
  private reply!: WebApi.CommentModule.Comment

  @Prop({ type: Boolean, default: false })
  private isMessage!: boolean

  @appMod.Action private updateUser
  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article
  @commentMod.Action private publish

  private loading = false
  private model = getDefModel()

  private avatar = ''

  private content = ''

  private get typeText () {
    return this.isMessage ? '留言' : this.isChild ? '回复' : '评论'
  }

  @Watch('user')
  private watchUser (val) {
    if (!val) {
      this.model = getDefModel()
    }
  }

  private created () {
    this.initUser()
  }

  private initUser () {
    if (this.user) {
      this.model.name.value = this.user.name
      this.model.email.value = this.user.email
      this.model.site.value = this.user.site
      this.avatar = this.user.avatar
    }
  }

  // 退出
  private clear () {
    this.updateUser(null)
  }

  private clearReply () {
    this.$emit('on-clear-reply')
  }

  private getPayload () {
    const payload: {
      [key: string]: any
    } = {
      content: this.content,
      author: {}
    }
    if (this.user) {
      payload.author = this.user._id
      if (this.checkUserInfoChange()) {
        payload.author = {
          id: this.user._id
        }
        Object.keys(this.model).forEach(key => {
          payload.author[key] = this.model[key].value
        })
      }
    } else {
      Object.keys(this.model).forEach(key => {
        payload.author[key] = this.model[key].value
      })
    }
    if (this.article) {
      payload.article = this.article._id
    }
    if (this.parent) {
      payload.parent = this.parent
    }
    if (this.reply) {
      payload.forward = this.reply._id
    } else if (this.parent) {
      payload.forward = this.parent
    }
    return payload
  }

  private async submit () {
    if (this.loading) return
    const warn = this.$message.warn
    if (!this.content) return warn('你要说啥？')
    const { name, email, site } = this.model
    if (!name.value) return warn('你的昵称呢？')
    if (!email.value) return warn('你的邮箱呢？')
    else if (!isEmail(email.value)) return warn('邮箱格式错误')
    if (site.value && !isSiteUrl(site.value)) return warn('站点格式错误')
    const payload = this.getPayload()
    this.loading = true
    const { success, data } = await this.publish(payload)
    this.loading = false
    if (success) {
      this.initUser()
      this.content = ''
      this.$message.success(`${this.typeText}成功`)
      this.$emit('on-publish', data)
      if (this.isChild) {
        const parentNode = this.$parent.$parent.$parent.$el
        this.$scrollToComments(parentNode)
      } else {
        this.$scrollToComments()
      }
    }
  }

  private checkUserInfoChange () {
    if (this.user) {
      const model = this.model
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          if (model[key].value !== this.user[key]) {
            return true
          }
        }
      }
    }
    return false
  }
}
