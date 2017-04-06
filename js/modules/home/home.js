define(['lib/vue', 'util/util','filter/filter','lib/jquery-1.12.2',  'css!./home.css'], function (Vue,  Util, filter) {
	// 首页组件
	var Home = Vue.extend({
		template: Util.tpl('tpl_home'),
		// 数据通过data属性来设置
		data: function () {
			// 通过返回值，将数据绑定
			return {
				list: [
					{id: 1, title: '大众', url: '01.jpg'},
					{id: 2, title: '宝马', url: '02.jpg'},
					{id: 3, title: '奔驰', url: '03.jpg'},
					{id: 4, title: '奥迪', url: '04.jpg'},
					{id: 5, title: '保时捷', url: '05.jpg'},
					{id: 6, title: '兰博基尼', url: '06.jpg'},
					{id: 7, title: '法拉利', url: '07.jpg'},
					{id: 8, title: '劳斯莱斯', url: '08.jpg'},
					{id: 9, title: '福特', url: '09.jpg'},
					{id: 10, title: '路虎', url: '10.jpg'}
				],
				ad: [],
				items: [],
				car:[],
				index :0
			}
		},

		methods:{
			//定义切换图片事件
			imgSwitch:function(){
				var me = this;
				clearInterval(timer);
				function Timer(){ 
					me.index++;
					$('.car li').eq(me.index).fadeIn().siblings().fadeOut();
					if(me.index >= 4){
						me.index = 0;
					}
					/*if(me.t){
					clearInterval(timer);

					}*/
				}
				 var index = 0;
				//开一个定时器
				var timer = setInterval(Timer, 3000);
				//到达上一个的点击事件
				$('.car .pre').click(function(){
					//点击时就要关闭定时器
					clearInterval(timer);
					//me.t = true;
					//获取选中的button
					$('.car ul li')
					//还需要获取当前显示图片的index的上一张的值
					//console.log(me.index)
					.eq(me.index--)
					//将其显示出来
					/*.animate({opacity:1},500,
						function() {
						 	me.t = false;
						}
					)*/
						/* stuff to do after animation is complete */
					.fadeIn().siblings().fadeOut();
					if(me.index < 0){
						me.index = 4;
					}
					timer = setInterval(Timer, 3000);
				});
				//到达下一个的点击事件
				$('.car .next').click(function(){
					clearInterval(timer);
					//获取选中的button
					$('.car ul li').eq(me.index++).fadeIn().siblings().fadeOut();
					if(me.index > 4){
						me.index = 0;
					}
					timer = setInterval(Timer, 3000);
				});
				//获取小圆点

			}
			//到达上一个的点击事件
			/*Pre:function(){
				//var me = this;
				// var index = 0;
				//开一个定时器
				me.index--;
			},
			//到达下一个的点击事件
			Next:function(){
				//var me = this;
				//var index = 0;
				//开一个定时器
				me.index++;
				//me.imgSwitch();
			}*/
		},
		// 定义声明周期
		created: function () {

			// 缓存this
			var me = this;
			
			//console.log($('.car li'));
			// 通知父组件显示搜索框
			me.$dispatch('dealSearch', true)
			// 发送请求，获取数据，更新绑定的数据
			Util.ajax('data/home.json', function (res) {
				// 给组件实例化对象保存数据
				// console.log(res, window)
				if (res && res.errno === 0) {
					me.ad = res.data.ad;
					me.items = res.data.list;
					me.car = res.data.car;
					// $set方法设置的是新的数据
					// me.$set('ad', res.data.ad)
					// me.$set('items', res.data.list)
					me.imgSwitch();
				}
			})
		}
	})
	// 注册组件
	Vue.component('home', Home);
})