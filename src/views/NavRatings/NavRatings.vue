<template>
	<div class="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import NavStar from '@/components/NavStar/NavStar.vue'
	export default {
		name: 'NavRatings',
		components: {
		},
		props: {
			seller: {
				type: Object
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
.ratings
	position: absolute
	top: 174px
	bottom: 0
	left: 0
	width: 100%
	overflow: hidden
	.overview
		display: flex
		padding: 18px 0
		.overview-left
			flex: 0 0 137px
			padding: 6px 0
			width: 137px
			border-right: 1px solid rgba(7, 17, 27, 0.1)
			text-align: center
			// @media only screen and (max-width: 320px)
				// flex: 0 0 120px
				// width: 120px
			.score
				margin-bottom: 6px
				line-height: 28px
				font-size: 24px
				color: rgb(255, 153, 0)
			.title
				margin-bottom: 8px
				line-height: 12px
				font-size: 12px
				color: rgb(7, 17, 27)
			.rank
				line-height: 10px
				font-size: 10px
				color: rgb(147, 153, 159)
		.overview-right
			flex: 1
			padding: 6px 0 6px 24px
		// @media only screen and (max-width: 320px)
			// padding-left: 6px
</style>
