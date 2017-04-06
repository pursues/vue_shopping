define(['lib/vue', 'modules/home/home', 'modules/list/list', 'modules/product/product', 'modules/login/login','css!./app.css'], function (Vue, home, list, product) {
	// 实例化vue实例化对象
	var app = new Vue({
		el: '#app',
		data: {
			// 定义视图变量
			// view: 'home'
			// view: 'list'
			// view: 'product',
			view: '',
			// 定义路由参数变量
			query: [],
			// 搜索词
			search: '',
			// 传递给子组件搜索字段
			searchQuery: '',
			// 是否显示搜索框
			isShowSearch: true,
			index : 0

		},
		// 定义方法
		methods: {
			// 搜索框中按下enter键
			showResult: function () {
				// 更新searchQuery
				this.searchQuery = this.search;
				// 清空search
				this.search = '';
			},
			// 点击返回按钮
			goBack: function () {
				history.go(-1)
			}
		},
		// 注册消息
		events: {
			dealSearch: function (msg) {
				// 作用域是vue实例化对象
				this.isShowSearch = msg;
				// console.log(msg)
			}
		}
	})

	// 暴漏接口
	return app;
})