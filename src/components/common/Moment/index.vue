<!--
 * @desc Moment
 * @author jo0ger <iamjooger@gmail.com>
 * @date 2018-12-04 17:48:19
 -->
<template>
  <Card class="moment" no-padding>
    <div class="wrapper">
      <i class="icon icon-broadcast"></i>
      <div class="content">
        <div class="swiper" v-swiper:swiper="swiperOption">
          <div class="swiper-wrapper">
            <div
              class="moment-item swiper-slide"
              v-for="item in momentList"
              :key="item._id"
            >
              <div class="text">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="action">
        <div class="swiper-button-prev">
          <i class="icon icon-arrow-up"></i>
        </div>
        <div class="swiper-button-next">
          <i class="icon icon-arrow-down"></i>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
