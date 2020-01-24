import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

import * as Utils from './utils'
import Auth from './components/auth'
import App from './components/app'
import Playlists from './components/playlists'
import Sidebar from './components/sidebar'

Vue.use(VueRouter)

const playlistsComponent = { template: '<playlists></playlists>' };

const routes = [
	// { path: '/welcome', component: { template: '<initial-setup/>' } },
	{
		path: '/auth', component: { template: '<auth></auth>' }
	},
	{
		path: '',
		component: { template: '<app></app>' },
		children: [
			{ path: '/playlists', component: playlistsComponent },
			{ path: '*' }
		]
	},
]

const router = new VueRouter({ routes });

Utils.api('/initial_setup')
	.then(function(res) { return res.json(); })
	.then(function(data) {

		Vue.component('auth', Auth);
		Vue.component('app', App);
		Vue.component('playlists', Playlists);
		Vue.component('sidebar', Sidebar);

		new Vue({
			router,
		}).$mount('#vue-container')

		if (!data.has_any_users) {
			router.push('welcome').catch(err => { });
		} else if (Cookies.get('username') == undefined) {
			router.push('auth').catch(err => { });
		}
	});