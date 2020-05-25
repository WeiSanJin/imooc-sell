<template>
	<div class="cartcontrol">
		<!-- 商品减少按钮增加一个滚动动画 -->
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	export default {
		name: 'NavGoods',
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				// 非自定义点击事件的情况下return掉，这样pc端就不会检测到两次点击事件。
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					// 调用方法：Vue.set( target, key, value )
					// target：要更改的数据源(可以是对象或者数组)
					// key：要更改的具体数据
					// value ：重新赋的值
					Vue.set(this.food, 'count', 1);
					// 给对象添加他不存在的属性时，这样的方式是不行的。需要用Vue的Vue.set()
					// this.food.count=1;
				} else {
					this.food.count++;
				}
				// 添加这句，提交'cart-add'事件给父组件，第二个是要传递的参数
				this.$emit('cart-add', event.target);
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size :0
		.cart-decrease
			display :inline-block
			padding :6px
			transition :all 0.4s linear
			// 过渡动画
			&.move-transition
				opacity :1
				transform :translate3d(0, 0, 0)
			.inner
				display :inline-block
				line-height :24px
				font-size :24px
				color :rgb(0, 160, 220)
				transition :all 0.4s linear
				transform :rotate(0)
			// 动画结束
			&.move-enter, &.move-leave-to
				opacity :0
				transform :translate3d(24px, 0, 0)
				.inner
					transform :rotate(180deg)
		.cart-count
			display :inline-block
			vertical-align :top
			width :12px
			padding-top :6px
			line-height :24px
			text-align :center
			font-size :10px
			color rgb(147, 153, 159)
		.cart-add
			display :inline-block
			padding :6px
			line-height :24px
			font-size :24px
			color :rgb(0, 160, 220)
</style>
