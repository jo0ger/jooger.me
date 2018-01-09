<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="editor">
    <div class="wrapper">
      <textarea ref="input"
        name="input"
        :placeholder="placeholder"
        :cols="cols"
        :rows="rows"
        :value="value"
        required="required"
        aria-required="true"
        @input="handleValueChange">
      </textarea>
      <div class="command-bar">
        <div class="command-list" v-if="commands.length">
          <a class="command-item" :class="[`command-item-${item.key}`, showEmoji && item.key === 'emoji' && 'active']"
            v-for="item in commands"
            :key="item.key"
            :title="item.title"
            @click.prevent="handleCommandClick(item)">
            <i class="icon" :class="[`icon-${item.key}`]"></i>
            <span v-if="item.text">{{ item.text }}</span>
          </a>
        </div>
        <transition name="slide-down">
          <div class="emoji-list" v-show="showEmoji" v-clickoutside="handleCloseEmoji">
            <a class="emoji-item" v-for="item in emoji"
              :key="item.value"
              :data-emoji="item.value"
              @click="hadnleSelectEmoji(item)">
              <!-- <img :src="item.src" :alt="item.alt"> -->
              {{ item.alt }}
            </a>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import commands from './lib/commands'
  import emoji from './lib/emoji'
  import { getSelection, setSelection } from './lib/selectionHelper'
  import { makeEmoji } from './lib/commandsHelper'
  import { debounce } from '@/utils'

  export default {
    name: 'Editor',
    props: {
      rows: {
        type: Number,
        default: 4
      },
      cols: {
        type: Number,
        default: 45
      },
      value: {
        type: String,
        requierd: true
      },
      placeholder: {
        type: String,
        default: '写点儿什么'
      },
      commands: {
        type: Array,
        default () {
          return commands.getDefaultCommands()
        }
      }
    },
    data () {
      return {
        emoji,
        showEmoji: false
      }
    },
    methods: {
      getEmojiBinder (emoji) {
        return (val, selection) => makeEmoji(val, selection, emoji)
      },
      executeCommand (cmd) {
        const $input = this.$refs.input
        const newValue = cmd.execute ? cmd.execute(this.value, getSelection($input)) : null
        if (!newValue) {
          return
        }
        this.focus()
        setSelection($input, 0, $input.value.length)
        document.execCommand('insertText', false, newValue.text)
        if (!['emoji'].includes(cmd.key)) {
          setSelection($input, newValue.selection[0], newValue.selection[1])
        }
      },
      focus () {
        this.$refs.input.focus()
      },
      blur () {
        this.$refs.input.blur()
      },
      handleValueChange (e) {
        this.$emit('input', e.target.value.trim())
      },
      handleCommandClick (cmd) {
        switch (cmd.key) {
          case 'preview':
            // TODO: 预览
            break
          case 'emoji':
            this.showEmoji = !this.showEmoji
            break
          default:
            this.executeCommand(cmd)
            break
        }
      },
      handleCloseEmoji () {
        if (this.showEmoji) {
          this.showEmoji = false
        }
      },
      hadnleSelectEmoji ({ alt }) {
        // TODO: 匹配emoji svg
        this.executeCommand({
          key: 'emoji',
          execute: this.getEmojiBinder(alt)
        }, true)
      }
    }
  }
</script>

