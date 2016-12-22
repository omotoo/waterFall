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
	getVideo({
		id:'.video_content',
		firstLoadRows:3
	});
});
function getLastOneTop(lastone){
	var top=lastone.offsetTop;
	while(lastone.offsetParent!=null){
		lastone=lastone.offsetParent;
		top+=lastone.offsetTop;
	}
	return top;
}
function getLastOneBottom(parent){
	var lastone=getLastOne(parent);
	var top=getLastOneTop(lastone)+lastone.offsetHeight;
	var clientHeight=document.documentElement.clientHeight;
	if(clientHeight+window.scrollY>=top){
		return true;
	}else{
		return false;
	}
}

function getLastOne(parent){
	var childrenArr=parent.children();
	var lastOneIndex=childrenArr.length-1;
	return childrenArr[lastOneIndex];
}

function addElement(alreadyLoad,rows,data,parent){
	var arr=[];
	for (var i = alreadyLoad; i < alreadyLoad+rows; i++) {
		var template = "<div class='video'><div class='pic'><img src=" + data[i].videoPicture + " /></div><p class='video_t'>" + data[i].videoName + "</p></div>";
		arr.push(template);
	}
	parent.html(parent.html()+arr.join(''));
}

function getVideo(obj){
	if(obj){
		var id=obj.id;
		var alreadyLoad=0;
		var rows=obj.firstLoadRows;
	}
	var videoContent=$(id);
	var flag=true;
	$.ajax({
		url: 'video.json',
		type: 'GET',
		success:function(data){
			//var data=$.parseJSON(data);			
			// 首次加载列数根据页面高度决定
			while(flag){				
				if(data.length-alreadyLoad<=rows){
					rows=data.length-alreadyLoad;
					flag=false;
				}				
				addElement(alreadyLoad,rows,data,videoContent);				
				alreadyLoad+=rows;
				if(flag){					
					flag=getLastOneBottom(videoContent);
					// console.log(flag);
				}					
			};	
			// 瀑布流			
			window.onscroll=function(){
				if(getLastOneBottom(videoContent)){
					// console.log('到底');
					var add=0;						
					while(rows){
						if(data.length-alreadyLoad>=rows){
							add=rows;
							break;							
						}			
						rows--;			
					}
					addElement(alreadyLoad,add,data,videoContent);	
					alreadyLoad+=add;
					// console.log(alreadyLoad);
				}
			}
		}
	});	

}