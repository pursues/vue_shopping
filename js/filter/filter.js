define(['lib/vue'], function (Vue) {
	// 定义过滤器
	// 价格过滤器
	Vue.filter('priceFilter', function (price) {
		return price + '万元';
	})
	// 原价过滤器
	Vue.filter('originPriceFilter', function (price) {
		return '门市价:' + price + '万元';
	})
	// 销量过滤器
	Vue.filter('salesFilter', function (sales) {
		return '已售' + sales;
	})
})