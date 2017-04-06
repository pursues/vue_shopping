define(['lib/vue', 'util/util', 'filter/filter', 'css!./product.css'], function (Vue, Util, filter) {
	// 详情页组件
	var Product = Vue.extend({
		// 定义模板
		template: Util.tpl('tpl_product'),
		data: function () {
			// 返回数据是绑定的数据
			return {
				data:[],
				list:[]	
				
			}
		},
		created: function () {
			var me = this;
			// 向父组件发送消息
			me.$dispatch('dealSearch', false)
			// 拉去数据
			var query = this.$parent.query;
			Util.ajax('data/product.json?id=' + query[0], function (res) {
				if (res && res.errno === 0) {
					// 存储数据
					me.data = res.data;
					me.list = res.data.list;
					//console.log(me.list)
				}
			})
		}
	})
	// 注册组件
	Vue.component('product', Product);
})