<template>
	<div class="swiper">
		<div v-swiper:mySwiper="swiperOptions">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
					<div class="overlay"></div>
					<span>{{ banner }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./index.ts" lang="ts"></script>

<style src="./index.styl" lang="stylus" scoped></style>
