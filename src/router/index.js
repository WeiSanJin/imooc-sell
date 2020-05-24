import Vue from 'vue';
import Router from 'vue-router';
import NavGoods from '../views/NavGoods/NavGoods.vue';
import NavRatings from '../views/NavRatings/NavRatings.vue';
import NavSeller from '../views/NavSeller/NavSeller.vue';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/goods',
			component: NavGoods
		},
		{
			path: '/ratings',
			component: NavRatings
		},
		{
			path: '/seller',
			component: NavSeller
		},
		{
			path: '/',
			component: NavGoods
		}
	],
	linkActiveClass: 'active'
});
