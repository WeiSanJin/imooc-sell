import Vue from 'vue';
import Router from 'vue-router';
import goods from '../views/goods/goods.vue';
import ratings from '../views/ratings/ratings.vue';
import seller from '../views/seller/seller.vue';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/goods',
			component: goods
		},
		{
			path: '/ratings',
			component: ratings
		},
		{
			path: '/seller',
			component: seller
		},
		{
			path: '/',
			component: goods
		}
	],
	linkActiveClass: 'active'
});
