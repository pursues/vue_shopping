define([], function () {
	// 定义工具对象
	var Util = {
		/**
		 * 根据id获取模板
		 * @id 		模板标签元素的id
		 **/
		tpl: function (id) {
			// 获取元素，获取内容，返回
			return document.getElementById(id).innerHTML;
		},
		/**
		 * 定义拉去数据的异步请求方法
		 * @url 	请求的路径
		 * @fn 		请求成功时候的回调函数
		 ***/
		ajax: function (url, fn) {
			// 异步请求拉去数据
			// 创建xhr对象
			var xhr = new XMLHttpRequest();
			// 监听状态的改变
			xhr.onreadystatechange = function () {
				// 监听readyState改变
				if (xhr.readyState === 4) {
					// 监听状态吗
					if (xhr.status === 200) {
						// 查看结果
						// 转化json对象
						var res = JSON.parse(xhr.responseText);
						// 判断回调函数存在，并执行
						fn && fn(res)
						// console.log(res)
					}
				}
			}
			// 发送请求
			// 打开请求
			xhr.open('GET', url, true);
			// 发送数据
			xhr.send(null)
		}
	}
	// 暴漏接口
	return Util;
})