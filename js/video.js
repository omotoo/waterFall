/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-30 10:43:22
 * @version $Id$
 */
var u = navigator.userAgent;
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息 
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
$(function(){
	getVideo();
});
function findParent(el){
	return $(el).parent('.video');
}

// 获取视频瀑布流，开始加载一屏约5行
function getVideo(){
	$.ajax({
		url: 'video.json',
		type: 'GET',
		success:function(data){
			//var data=$.parseJSON(data);
			var videoContent=$('.video_content');
			var arr=[];
			for(var i=0;i<data.length;i++){
				var template="<div class='video'><div class='pic'><img src="+data[i].videoPicture+" /></div><p class='video_t'>"+data[i].videoName+"</p></div>";
				arr.push(template);
			}
			videoContent.html(arr.join(''));
		}
	});	
}