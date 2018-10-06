<!--
 * @desc CommentInputBox
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:23:17
 -->
<template>
  <Card class="comment-input-box" :class="{ 'child-input-box': isChild, loading, 'message-input-box': isMessage }" :no-margin="isMessage">
    <no-ssr>
      <div class="wrapper">
        <div class="author" v-if="!isChild || (isChild && !user)">
          <div class="avatar" v-if="user && !mobileLayout">
            <img :src="user.avatar" :alt="user.name">
          </div>
          <div class="form">
            <div class="name">
              <i class="icon icon-name"></i>
              <input type="text" placeholder="昵称（必填）" required="required" name="name" autocomplete="false" v-model.trim="model.name.value">
            </div>
            <div class="email">
              <i class="icon icon-email-fill"></i>
              <input type="email" placeholder="邮箱（必填）" required="required" name="email" autocomplete="false" v-model.trim="model.email.value">
            </div>
            <div class="site">
              <i class="icon icon-site"></i>
              <input type="text" placeholder="站点" required="required" name="site" autocomplete="false" v-model.trim="model.site.value">
            </div>
            <div class="clear" v-if="user && !mobileLayout">
              <button @click="clear" title="退出">
                退出
              </button>
            </div>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <div class="reply" v-if="reply">
            <div class="target">
              正在回复：
              <a class="name" :href="reply.author.site || 'javascript:;'" target="_blank" rel="noopener">@{{ reply.author.name }}</a>
            </div>
            <div class="clear">
              <button @click="clearReply" title="取消回复">
                取消回复
              </button>
            </div>
          </div>
        </transition>
        <div class="content">
          <MDEditor
            class="editor"
            ref="editor"
            :disabled="loading"
            :rows="isChild ? 3 : mobileLayout ? 4 : 6"
            :placeholder="reply ? `回复@${reply.author.name}` : '说点儿什么'"
            v-model="content">
          </MDEditor>
        </div>
        <div class="action">
          <div class="action-item submit">
            <button class="submit-btn" @click="submit">
              <Loading v-if="loading" size="small" dark no-text></Loading>
              <span v-else>{{ typeText }}</span>
            </button>
          </div>
        </div>
      </div>
    </no-ssr>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" src="./index.styl"></style>
