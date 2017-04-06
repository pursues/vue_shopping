// 将vue模块化
require.config({
	shim: {
		'lib/vue': {
			exports: 'Vue'
		}
	},
	// 定义css配置
	map: {
		'*': {
			'css': 'lib/css'
		}
	}
})

require(['route/route'], function (route) {
	// 此时页面已经加载完成了，所以在route中注册的load事件没有意义了
	// 所以我们可以立即执行route方法，来弥补这个问题
	route();
})