import Vue from 'vue';
import Router from 'vue-router';
import goods from '../views/goods/goods.vue';
import ratings from '../views/ratings/ratings.vue';
import NavSeller from '../views/NavSeller/NavSeller.vue';

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
			component: NavSeller
		},
		{
			path: '/',
			component: goods
		}
	],
	linkActiveClass: 'active'
});
