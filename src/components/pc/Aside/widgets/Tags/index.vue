<!--
 * @desc Tags
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:29:30
 -->
<template>
  <Card class="widget-tags">
    <div class="title" slot="header">
      <i class="icon icon-tag"></i>
      标签
    </div>
    <div class="tag-list" v-if="tagList.length">
      <Tag v-for="item in tagList"
        :key="item.name"
        :name="item.name"
        :icon="findExtendsItem(item.extends, 'icon')"
        :count="item.count"
        :link="true"></Tag>
    </div>
    <p class="no-data" v-else>暂无标签</p>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
