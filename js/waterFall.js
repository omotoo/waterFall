/**
 * Created by omotoo on 2016/12/23.
 */

//默认参数
var defaultParams={
    firstLoadRows:4,
    scale:0.67
};

var dataArray= [];
var videoContent;
var rows;
var getDataFn;

function waterFall(DOMId,params,getData){


    //参数合并方法
    var resultParams=extend({}, [params,defaultParams]);

    var id=DOMId;
    var alreadyLoad=0;
    rows=resultParams.firstLoadRows;
    var scale=resultParams.scale;

    setStyle(id,rows,scale);

    videoContent=$(id);
    var flag2=true;


    /*var data=dataArray;
    console.log(data)*/
    //Array.prototype.addWaterFallData 的回调函数
    //dataArray.waterFallFn=function(){
       //填充数据fn
       // addElement(dataArray.length,dataArray,videoContent);
     //};





    getDataFn=getData;
    getDataFn()




    //waitData();

    //function waitData(){
    //	var wait=setInterval(function(){
	 //   	/*console.log(Data)
	 //   	console.log(dataArray)*/
	 //   	var data=dataArray;
	 //   	var length;
		//    // console.log(data)
	 //       if(data.length>0){
	 //           clearInterval(wait);
	 //           //填充页面
	 //           length=data.length;
	 //           addElement(data.length,data,videoContent);
    //
    //
    //
    //
    //
    //
	 //           ////瀑布流监听事件
	 //           //window.onscroll=function(){
	 //           //    roll(rows);
	 //           //}
	 //       }
	 //   },100);
    //}

    //function roll(rows){
    //
     //   //1.确定要放几个元素到页面
     //   //2.要判断容器中的元素够不够,是否需要补充容器元素
     //   // var isBottom=getLastOneBottom(videoContent);
     //   var node;
     //   var arr=getChildrenArray(videoContent[0]);
     //   var num=arr.length;
    	//node=arr[num-rows-1];
     //   var isBottom=isFinally(node);
     //   if(isBottom){
     //       console.log('下一次请求');
    //
     //       /*if(data.length>=rows){
    //
    //
    //
     //       }else{
    //
    //
    //
    //
     //       }*/
     //       window.onscroll=null;
     //       getDataFn();
     //       waitData();
    //
     //       /*addElement(data.length,data,videoContent);
     //       alreadyLoad+=add;
     //       console.log(add);
     //       if(data.length<1&&flag2){
     //           //请求数据
     //           $.ajax({
     //               url: 'video2.json',
     //               type: 'GET',
     //               success:function(data2){
     //                   // 瀑布流
     //                   alreadyLoad=0;
     //                   rows=obj.firstLoadRows;
     //                   window.onscroll=null;
     //                   addElement(rows-add,data2,videoContent);
     //                   alreadyLoad=rows-add;
     //                   window.onscroll=function(){
     //                       roll(data2);
     //                   }
     //               }
     //           });
     //           flag2=false;
     //       }*/
     //       // console.log(alreadyLoad);
     //   }
    //
	//}
}

//待整理

function setStyle(id,rows,scale){
    var clientWidth=document.documentElement.clientWidth;
    var aWidth=Math.floor(clientWidth/rows);
    var aHeight=aWidth/scale;
    var head=document.getElementsByTagName('head')[0];
    var style="<style>"+id+">.video{width:"+(100-rows*2)/rows+"%;margin:1%;}"+id+">.video .pic{height:"+aHeight+"px;}</style>"
    head.innerHTML+=style;
}

function addElement(rows,data,parent){
    var arr=[];
    for (var i = 0; i < rows; i++) {
        var item=data.shift();
        var template = "<div class='video'><div class='pic' style='background:url(" + item.videoPicture + ") no-repeat;background-size:100% 100%;'></div><p class='video_t'>" + item.videoName + "</p></div>";
        arr.push(template);
    }
    parent.html(parent.html()+arr.join(''));
}

function getTop(ele){
    var top=ele.offsetTop;
    while(ele.offsetParent!=null){
        ele=ele.offsetParent;
        top+=ele.offsetTop;
    }
    return top;
}

function isFinally(ele){
	var top=getTop(ele)+ele.offsetHeight;
	var clientHeight=document.documentElement.clientHeight;
	if(clientHeight+window.scrollY>=top){
		return true;
	}
	else{
		return false;
	}
}

/*function trigger(num,rows){
	if(num%rows===0){
		return isFinally()
	}
}*/

function getChildrenArray(parent){
    var childrenArr=parent.childNodes;  
    return childrenArr;
}


//工具方法

function extend(des, src, override){
    if(src instanceof Array){
        for(var i = 0, len = src.length; i < len; i++)
            extend(des, src[i], override);
    }
    for( var i in src){
        if(override || !(i in des)){
            des[i] = src[i];
        }
    }
    return des;
}

function addWaterFallData(data) {
    dataArray=data
    addElement(dataArray.length,dataArray,videoContent);

    //瀑布流监听事件
    window.onscroll=function(){
        roll(rows);
    }
}


function roll(rows){

    var node;
    var arr=getChildrenArray(videoContent[0]);
    var num=arr.length;
    node=arr[num-rows-1];
    var isBottom=isFinally(node);
    if(isBottom){
        console.log('下一次请求');
        window.onscroll=null;
        getDataFn();
    }

}
//
//Array.prototype.addWaterFallData = function(){
//    dataArray=this;
//    console.log(dataArray)
//    if(typeof this.waterFallFn == 'function') this.waterFallFn.call(this);
//    return dataArray
//}