<template>
	<div class="star" :class="starType">
		<span v-for="(item,index) in itemClasses" :key="index" :class="itemClasses[index]" class="star-item"></span>
	</div>
</template>

<script type="text/ecmascript-6">
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	export default {
		name: 'NavStar',
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let result = [];
				// 例:传入分数为4.3，向下取整/2，转换后为4
				let score = Math.floor(this.score * 2) / 2;
				// 判断分数是否有小数，返回值：Boolean
				let hasDecimal = score % 1 !== 0;
				// 获取有多少整数，也就是全星的数量
				let integer = Math.floor(score);
				// 1.遍历整数星星数，数组的末尾添加星星
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				// 2.是否有半星
				if (hasDecimal) {
					result.push(CLS_HALF);
				}
				// 3.如果当前星星数不足5，补全空白星星
				while (result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	};
</script>

<style scoped lang="stylus">
	@import '../../common/stylus/mixin.styl'
	.star
		font-size :0
		.star-item
			display :inline-block
			background-repeat :no-repeat
		&.star-48
			.star-item
				width :20px
				height :20px
				margin-right :22px
				background-size :20px 20px
				&:last-child
					margin-right :0
				&.on
					bg-image('./img/star48_on')
				&.half
					bg-image('./img/star48_half')
				&.off
					bg-image('./img/star48_off')
		&.star-36
			.star-item
				width :15px
				height :15px
				margin-right :6px
				background-size :15px 15px
				&:last-child
					margin-right :0
				&.on
					bg-image('./img/star36_on')
				&.half
					bg-image('./img/star36_half')
				&.off
					bg-image('./img/star36_off')
		&.star-24
			.star-item
				width :10px
				height :10px
				margin-right :3px
				background-size :10px 10px
				&:last-child
					margin-right :0
				&.on
					bg-image('./img/star24_on')
				&.half
					bg-image('./img/star24_half')
				&.off
					bg-image('./img/star24_off')
</style>
