<template>
  <div class="page-guestbook">
    <Card class="hero">
      <div class="hero-bg"></div>
      <div class="info">
        <h2 class="title">You are here, and we are here</h2>
        <h4 class="subtitle">
          人的平均寿命77岁
          一共28105天
          67w小时
          4047w分钟
          24亿秒左右
          这10秒你在读这段话，这10秒你属于我
          你好陌生人，我爱你 ❤️
        </h4>
      </div>
    </Card>
    <div class="content">
      <div class="wrapper">
        <div class="message-widget">
          <Comment />
        </div>
        <div class="guests-widget">
          <Affix offsetTop="80">
            <Card>
              <div class="title" slot="header">
                <i class="icon icon-user"></i>
                共{{guestsCount}}位过客
              </div>
              <div class="guest-list">
                <a :href="guest.site || 'javascript:void(0);'" v-for="guest in guests"
                  class="guest-item"
                  target="_blank"
                  rel="noopener"
                  :key="guest._id">
                  <img class="avatar" :src="avatars[guest._id] || logo" alt="">
                  <span class="name">{{ guest.name }}</span>
                </a>
              </div>
            </Card>
          </Affix>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card, Comment, Affix } from '@/components/common'
  import logo from '@/static/images/logo.svg'

  export default {
    name: 'Guestbook',
    components: {
      Affix,
      Card,
      Comment
    },
    head () {
      return {
        title: 'Guestbook',
        bodyAttrs: {
          class: 'full-page'
        }
      }
    },
    async fetch ({ store }) {
      store.commit('article/CLEAR_DETAIL')
      await store.dispatch('comment/fetchList', {
        type: 1,
        page: 1
      })
    },
    data () {
      return {
        logo,
        avatars: {}
      }
    },
    computed: {
      ...mapGetters({
        guests: 'user/guests',
        guestsCount: 'user/guestsCount'
      })
    },
    mounted () {
      this.loadAvatars()
    },
    methods: {
      loadAvatars () {
        this.guests.forEach(item => {
          this.$loadImg(item.avatar, {
            success: () => {
              this.avatars[item._id] = item.avatar
              this.$forceUpdate()
            }
          })
        })
      }
    },
    afterRouteLeave (to, from, next) {
      this.$store.commit('comment/CLEAR_LIST')
      next()
    }
  }
</script>
