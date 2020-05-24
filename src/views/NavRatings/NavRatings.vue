<template>
	<div>
		<nav-staer :size="48" :score="score" class="staer">
			<template v-slot:left-test>{{title}}</template>
			<template v-slot:grade>{{score}}</template>
		</nav-staer>
	</div>
</template>

<script type="text/ecmascript-6">
	import NavStaer from 'components/NavStar/NavStar.vue';
	export default {
		name: 'NavRatings',
		components: {
			NavStaer
		},
        data() {
			return {
				score: 4.8,
				title: '服务态度'
			};
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.staer
		margin-top: 10px
</style>
