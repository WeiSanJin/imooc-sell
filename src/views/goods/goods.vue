<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li class="menu-item"
					v-for="(item,index) in goods" :key="index"
					:class="{'current':currentIndex===index}"
					@click="selectMenu(index, $event)">
					<span class="text border-1px">
						<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<ul>
				<li class="food-list food-list-hook"
					v-for="(item,index) in goods" :key="index" >
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item border-1px"
							v-for="(food,index) in item.foods" :key="index"
							@click="selectFood(food,$event)">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<nav-cartcontrol :food="food" @cart-add="cartAdd"></nav-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 向子组件传入配送费、起送费 -->
		<nav-shopcart
			ref="shopcart"
			:select-foods="selectFoods"
			:delivery-price="seller.deliveryPrice"
			:min-price="seller.minPrice"
		></nav-shopcart>
		<!-- 商品详情页组件 -->
		<nav-food
			ref="food"
			:food="selectedFood"
		></nav-food>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import NavShopcart from '../../components/NavShopcart/NavShopcart.vue';
	import NavCartcontrol from '@/components/NavCartcontrol/NavCartcontrol.vue';
	import NavFood from '@/components/NavFood/NavFood.vue';
	const ERR_OK = 0;
	export default {
		name: 'NavGoods',
		components: {
			NavShopcart,
			NavCartcontrol,
			NavFood
		},
		props: {
			seller: {}
		},
        data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex() { // 试试计算当前scrollY落在那个区间
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						// NavCartcontrol：点击添加按钮会增加一个count属性
						// 遍历每个商品，如果商品有被添加购物车，将商品记录下来
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created() {
			// 自定义样式数组
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			selectMenu(index, event) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				// scrollToElement作用：滚动到指定的目标元素。
				this.foodScroll.scrollToElement(el, 300);
				// console.log(index);
			},
			selectFood(food, event) { // 获取当前点击的商品信息
				if (!event._constructed) {
					return;
				}
				// 将商品当前点击的商品信息传给子组件
				this.selectedFood = food;
				// 调用子组件show方法
				this.$refs.food.show();
			},
			cartAdd(el) {
				// 体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(el);
				});
			},
			_initScroll() {
				this.meunScroll = new BScroll('.menu-wrapper', {
					scrollY: true,
					click: true,
					bounce: {
						top: false,
						bottom: true,
						left: true,
						right: true
					}
				});
				this.foodScroll = new BScroll('.foods-wrapper', {
					scrollY: true,
					click: true,
					bounce: {
						top: false,
						bottom: true,
						left: true,
						right: true
					},
					// 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，
					// 而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
					probeType: 3
				});
				// 滚动是返回滚动到的位置
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
					// console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
				});
			},
			_calculateHeight() { // 获取每个分类商品的高度
				// 返回值：[0, 1037, 1191, 1313, 1626, 1843, 2078, 2391, 2894, 3588]
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				// console.log(foodList);
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					// 元素宽高（height+padding，不包含边框），可以理解为元素可视区域高度
					height += item.clientHeight;
					// 记录每个foods的title位置
					this.listHeight.push(height);
				}
			}
		}
		// events: {
		// 	'cart.add'(target) {
		// 		this._drop(target);
		// 	}
		// }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.goods
		display :flex
		position :absolute
		top :174px
		bottom :46px
		width: 100%
		overflow :hidden
		.menu-wrapper
			flex :0 0 80px
			width :80px
			background :#f3f5f7
			.menu-item
				display :table
				width :56px
				height :54px
				padding :0 12px
				line-height :14px
				&.current
					position :relative
					z-index :10
					margin-top :-1px
					background :#fff
					font-weight :700
					.text
						border-none()
				.icon
					display :inline-block
					vertical-align :top
					width :12px
					height :12px
					margin-right :2px
					background-size :12px 12px
					background-repeat :no-repeat
					&.decrease
						bg-image('./img/decrease_3')
					&.discount
						bg-image('./img/discount_3')
					&.guarantee
						bg-image('./img/guarantee_3')
					&.invoice
						bg-image('./img/invoice_3')
					&.special
						bg-image('./img/special_3')
				.text
					display :table-cell
					width :56px
					vertical-align :middle
					border-1px(rgba(7, 17, 27, 0.1))
					font-size :12px
		.foods-wrapper
			flex :1
			.title
				padding-left :14px
				height :26px
				line-height :26px
				border-left :2px solid #d9dde1
				font-size :12px
				color :rgb(147, 153, 159)
				background :#F3F5F7
			.food-item
				display :flex
				margin :18px
				padding-bottom :18px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom :0
				.icon
					flex :0 0 57px
					margin-right :10px
				.content
					flex :1
					.name
						margin :2px 0 8px 0
						height :14px
						line-height :14px
						font-size :14px
						color :rgb(7, 17, 27)
					.desc, .extra
						line-height :10px
						font-size :10px
						color :rgb(147, 153, 159)
					.desc
						line-height :12px
						margin-bottom :8px
					.extra
						.count
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
						right :0
						bottom :12px
</style>
