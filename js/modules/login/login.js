define(['lib/vue', 'util/util', 'filter/filter', 'css!./login.css'], function (Vue,  Util, filter) {
	// 首页组件
	var Login = Vue.extend({
		template: Util.tpl('tpl_login'),
		// 数据通过data属性来设置
		created: function () {
			// 通知父组件隐藏搜索框
			this.$dispatch('dealSearch', false)
		}
	})

	// 注册组件
	Vue.component('login', Login);
})