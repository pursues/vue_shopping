define(['lib/vue', 'util/util', 'filter/filter', 'css!./list.css'], function (Vue, Util, filter) {
	// 列表页组件
	var List = Vue.extend({
		// 注册属性数据
		props: ['search'],
		template: Util.tpl('tpl_list'),
		// 定义数据
		data: function () {
			return {
				type: [
					{value: '价格排序', key: 'price'},
					{value: '销量排序', key: 'sales'},
					{value: '好评排序', key: 'evaluate'},
					{value: '优惠排序', key: 'discount'}
				],
				list: [],
				// 缓存的数据
				other: []
			}
		},
		// methods属性中定义回调函数
		methods: {
			// 查看更多
			showAll: function () {
				// 将缓存的other数据，添加到list图中，将other清空
				this.list = this.list.concat(this.other)
				this.other = [];

			},
			// 定义排序方法
			sort: function (key) {
				// 排序就是对list中的数据排序
				this.list.sort(function (a, b) {
					// 看是否比较优惠字段
					if (key === 'discount') {
						// 优惠应该是原价减去现价
						return (a.orignPrice - a.price) - (b.orignPrice - b.price)
					}
					// 有key决定如何排序
					// return a[key] - b[key]
					// 降序
					return b[key] - a[key]
					// return a.price - b.price;
				})
				// console.log(key)
			}
		},
		// 创建完整之后发送请求获取数据，渲染页面
		created: function () {
			// 通知父组件显示搜索框
			this.$dispatch('dealSearch', true)
			var me = this;
			// 获取query数据
			var query = this.$parent.query 
			// 在地址的query中拼凑出传递给后端的数据
			var url = 'data/list.json';
			// 有query，要将query拼接出来
			if (query[0] !== undefined && query[1] !== undefined) {
				url += '?' + query[0] + '=' + query[1]
			}
			// 发送请求
			Util.ajax(url, function (res) {
				if (res && res.errno === 0) {
					// 将数据存储在组件实例化对象中
					// console.log(res.data)
					// 前三个保存在list中，后七个缓存起来吧
					me.list = res.data.slice(0, 3);
					me.other = res.data.slice(3);
				}
			})
		}
	})
	// 注册组件
	Vue.component('list', List);
})