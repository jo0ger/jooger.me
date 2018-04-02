<template>
	<transition name="slide-up-message">
    <div class="message" v-show="visible">
      <div class="wrapper">
        <i class="icon" :class="[`icon-${type}`]" v-if="type"></i>
        <p class="content">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<style src="./index.styl" lang="stylus" scoped></style>
