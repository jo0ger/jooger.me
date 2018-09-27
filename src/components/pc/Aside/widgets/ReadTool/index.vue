<!--
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 -->
<template>
  <Card class="read-tool">
    <div class="tools">
      <div class="tool-item" :class="['tool-item-' + tool.key]" v-for="tool in tools" :key="tool.key" @click="toolClick(tool)">
        <i class="icon iconfont" :class="['icon-' + tool.key]"></i>
        <span class="title">{{ tool.title }}</span>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
