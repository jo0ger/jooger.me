/**
 * @desc MDEditor
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 15:39:54
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import commands, { Command } from './lib/commands'
import emoji from './lib/emoji'
import { getSelection, setSelection } from './lib/selectionHelper'
import { makeEmoji } from './lib/commandsHelper'
import Propover from '../Popover/index.vue'

@Component({
  name: 'MDEditor',
  components: {
    Propover
  }
})
export default class MDEditor extends Base {
  @Prop({ type: Number, default: 4 })
  private rows!: number

  @Prop({ type: Number, default: 45 })
  private cols!: number

  @Prop({ type: String, required: true })
  private value!: string

  @Prop({ type: String, default: '写点儿什么' })
  private placeholder!: string

  @Prop({ type: Array, default: () => commands.getDefaultCommands() })
  private commands!: Command[]

  @Prop({ type: Boolean, default: false })
  private disabled!: boolean

  private emoji = emoji
  private showEmoji = false

  private getEmojiBinder (emoji) {
    return (val, selection) => makeEmoji(val, selection, emoji)
  }

  private executeCommand (cmd: Command) {
    const $input = this.$refs.input
    const newValue = cmd.execute ? cmd.execute(this.value, getSelection($input)) : null
    if (!newValue) {
      return
    }
    this.focus()
    setSelection($input, 0, ($input as any).value.length)
    document.execCommand('insertText', false, newValue.text)
    if (!['emoji'].includes(cmd.key)) {
      setSelection($input, newValue.selection[0], newValue.selection[1])
    }
  }

  private focus () {
    (this.$refs.input as HTMLElement).focus()
  }

  private blur () {
    (this.$refs.input as HTMLElement).blur()
  }

  private handleValueChange (e) {
    this.$emit('input', e.target.value.trim())
  }

  private handleCommandClick (cmd) {
    switch (cmd.key) {
      case 'emoji':
        this.showEmoji = !this.showEmoji
        break
      default:
        this.executeCommand(cmd)
        break
    }
  }

  private handleCloseEmoji () {
    if (this.showEmoji) {
      this.showEmoji = false
    }
  }

  private hadnleSelectEmoji ({ alt }) {
    this.executeCommand({
      key: 'emoji',
      title: 'emoji',
      execute: this.getEmojiBinder(alt)
    })
  }
}
