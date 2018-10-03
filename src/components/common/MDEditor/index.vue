<!--
 * @desc MDEditor
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 15:39:54
 -->
<template>
  <div class="md-editor" :class="{ disabled }">
    <div class="wrapper">
      <textarea ref="input"
        name="input"
        :placeholder="placeholder"
        :cols="cols"
        :rows="rows"
        :value="value"
        :disabled="disabled"
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
            <Propover placement="bottom" v-model="showEmoji" v-if="item.key === 'emoji'">
              <div class="emoji-list">
                <a class="emoji-item" v-for="item in emoji"
                  :key="item.value"
                  :data-emoji="item.value"
                  @click="hadnleSelectEmoji(item)">
                  <!-- <img :src="item.src" :alt="item.alt"> -->
                  {{ item.alt }}
                </a>
              </div>
            </Propover>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
