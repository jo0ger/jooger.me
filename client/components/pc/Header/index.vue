<template>
	<header class="header">
		header
	</header>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'

	@Component({
	name: 'header'
	})
	export default class Header extends Vue {

	}
</script>

<style src="./index.styl" lang="stylus" scoped></style>
