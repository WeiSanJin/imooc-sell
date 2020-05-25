<template>
	<transition name="move">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<nav-cartcontrol :food="food"></nav-cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>
				<nav-split v-show="food.info"></nav-split>
				<div class="info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<nav-split></nav-split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<nav-ratingselect
						:selectType="selectType"
						:onlyContent="onlyContent"
						:desc="desc"
						:ratings="food.ratings"
						@select="onSelect"
						@toggle="onToggle"
					></nav-ratingselect>
				</div>
				<div class="rating-wrapper">
					<!-- 如果没有评价不显示列表 -->
					<ul v-show="food.ratings && food.ratings.length">
						<li
							v-for="(rating,index) in food.ratings" :key="index"
							class="rating-item border-1px"
							v-show="needShow(rating.rateType, rating.text)">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" width="12" height="12" :src="rating.avatar"/>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import { formatDate } from '../../common/js/date.js';
	import NavCartcontrol from '../NavCartcontrol/NavCartcontrol.vue';
	import NavSplit from '../NavSplit/NavSplit.vue';
	import NavRatingselect from '../NavRatingselect/NavRatingselect.vue';
	const POSITIVE = 0; // 满意评价
	const NEGATIVE = 1; // 不满意评价
	const ALL = 2; // 全部评价
	export default {
		name: 'NavFood',
		components: {
			NavCartcontrol,
			NavSplit,
			NavRatingselect
		},
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() { // 打开商品详情页
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.foodScroll = new BScroll('.food', {
							scrollY: true,
							click: true,
							bounce: {
								top: false,
								bottom: true,
								left: true,
								right: true
							}
						});
					} else {
						this.foodScroll.refresh();
					}
				});
			},
			hide() { // 关闭商品详情页
				this.showFlag = false;
			},
			addFirst(event) { // 点击【加入购物车】按钮
				if (!event._constructed) { // 防止pc多次点击
					return;
				}
				// 添加这句，提交'cart-add'事情给父组件，第二个是要传递的参数
				this.$emit('cart-add', event.target);
				Vue.set(this.food, 'count', 1);
			},
			needShow(type, text) { // 判断评价类型和评价是否有内容
				if (this.onlyContent && !text) { // 是否要显示内容
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			onSelect(type) { // 选择评论类型
				this.selectType = type;
				this.$nextTick(() => {
					this.foodScroll.refresh();
				});
			},
			onToggle(onlyContent) { // 是否显示无内容评论
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.foodScroll.refresh();
				});
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.food
		position :fixed
		left :0
		top :0
		bottom :48px
		z-index :30
		width :100%
		background :#fff
		&.move-transition
			transition :all 0.2s linear
			transform :translate3d(0, 0, 0)
		&.move-enter, &.move-leave
			transform :translate3d(100%, 0, 0)
		.image-header
			position :relative
			width :100%
			height :0
			padding-top :100%
			img
				position :absolute
				top :0
				left :0
				width :100%
				height :100%;
			.back
				position :absolute
				top :10px
				left :0
				.icon-arrow_lift
					display :block
					padding :10px
					font-size :20px
					color :#fff
		.content
			padding :18px
			position: relative;
			.title
				line-height :14px
				margin-bottom :8px
				font-size :14px
				font-weight :700
				color :rgb(7, 17, 27)
			.detail
				margin-bottom :18px
				line-height :10px
				height :10px
				font-size :0
				.sell-count, .rating
					font-size :10px
					color :rgb(147, 153, 159)
				.sell-count
					margin-right :12px
			.price
				font-weight :700
				line-height :24px
				.now
					margin-right :8px
					font-size :14px
					color :rgb(240, 20, 20)
				.old
					text-decoration :line-through
					font-size :10px
					color :rgb(147, 153, 159)
			.cartcontrol-wrapper
				position :absolute
				right :12px
				bottom :12px
			.buy
				position :absolute
				right :18px
				bottom :18px
				z-index :10
				height :24px
				line-height :24px
				padding :0 12px
				box-sizing :border-box
				border-radius :12px
				font-size :10px
				color :#FFF
				background :rgb(0, 160, 220)
				&.fade-transition
					transition :all 0.2s
					opacity :1
				&.fade-enter, &.fade-leave
					opacity :0
		.info
			padding :18px
			.title
				line-height :14px
				margin-bottom :6px
				font-size :14px
				color :rgb(7, 17, 27)
			.text
				line-height :24px
				padding :0 8px
				font-size :12px
				color :rgb(77, 85, 93)
		.rating
			padding-top :18px
			.title
				line-height :14px
				margin-left :18px
				font-size :14px
				color :rgb(7, 17, 27)
		.rating-wrapper
			padding :0 18px
			.rating-item
				position :relative
				padding :16px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.user
					position :absolute
					right :0
					top :16px
					line-height :12px
					font-size :0
					.name
						display :inline-block
						margin-right :6px
						vertical-align :6px
						font-size :10px
						color :rgb(147, 153, 159)
					.avatar
						border-radius :50%
				.time
					margin-bottom :6px
					line-height :12px
					font-size :10px
					color :rgb(147, 153, 159)
				.text
					line-height :16px
					font-size :12px
					color :rgb(7, 17, 27)
					.icon-thumb_up, .icon-thumb_down
						margin-right :4px
						line-height :16px
						font-size :12px
					.icon-thumb_up
						color :rgb(0, 160, 220)
					.icon-thumb_down
						color :rgb(147, 153, 159)
			.no-rating
				padding :16px
				font-size :12px
				color :rgb(147, 153, 159)
</style>
