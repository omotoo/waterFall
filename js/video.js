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
	waterFall({
		id:'.video_content',
		firstLoadRows:4,
		scale:0.67
	});
});

function imgLoad(img,callback){
	var timer=setInterval(function(){
		if(img.complte){
			callback();
			clearInterval(timer);
		}
	},50);	
}

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
		var template = "<div class='video'><div class='pic' style='background:url(" + data[i].videoPicture + ") no-repeat;background-size:cover;'></div><p class='video_t'>" + data[i].videoName + "</p></div>";
		arr.push(template);
	}
	parent.html(parent.html()+arr.join(''));
}

function setStyle(rows,scale){
	var clientWidth=document.documentElement.clientWidth;
	var aWidth=Math.floor(clientWidth/rows);
	var aHeight=aWidth/scale;
	var head=document.getElementsByTagName('head')[0];
	var style="<style>.video{width:"+(100-rows*2)/rows+"%;margin:1%;}.video .pic{height:"+aHeight+"px;}</style>"
	head.innerHTML+=style;
}

function waterFall(obj){
	if(obj){
		var id=obj.id;
		var alreadyLoad=0;
		var rows=obj.firstLoadRows;
		var scale=obj.scale;
	}
	setStyle(rows,scale);
	var videoContent=$(id);
	var flag=true;	
	var flag2=true;
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
					console.log(flag);
				}					
			};	
			// 瀑布流			
			window.onscroll=function(){
				roll(data);	
			}
		}
	});	
	function roll(data){
		flag2=true;
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
			console.log(add);
			if(data.length-alreadyLoad<1&&flag2){
				//请求数据
				$.ajax({
					url: 'video2.json',
					type: 'GET',
					success:function(data2){
						// 瀑布流
						alreadyLoad=0;
						rows=obj.firstLoadRows;
						window.onscroll=null;
						addElement(alreadyLoad,rows-add,data2,videoContent);
						alreadyLoad=rows-add;
						window.onscroll=function(){
							roll(data2);
						}	
					}
				});
				flag2=false;
			}
			// console.log(alreadyLoad);
		}
	}
}