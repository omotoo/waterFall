/**
 * Created by omotoo on 2016/12/23.
 */

//默认参数
var defaultParams={
    firstLoadRows:4,
    scale:0.67
}

var dataArray= []

function waterFall(DOMId,params,getDataFn){
    getDataFn();

    //参数合并方法
    var resultParams=extend({}, [params,defaultParams]);

    var id=DOMId;
    var alreadyLoad=0;
    var rows=resultParams.firstLoadRows;
    var scale=resultParams.scale;

    setStyle(id,rows,scale);

    var videoContent=$(id);
    var flag2=true;


    var data=dataArray;

    //Array.prototype.outItem的回调函数
    data.callback=function(){
      if(data.length<10){
          getDataFn();
      }
    };

    var wait=setInterval(function(){
        if(data.length>0){
            clearInterval(wait)
            //////////////////
            // 计算第一页需要多少个元素填充,去填充
            /////////







            //瀑布流监听事件
            window.onscroll=function(){
                roll(data);
            }
        }
    },100);


    function roll(data){

        //1.确定要放几个元素到页面
        //2.要判断容器中的元素够不够,是否需要补充容器元素

        flag2=true;
        if(getLastOneBottom(videoContent)){
            // console.log('到底');
            var add=rows;

            if(data.length>=rows){



            }else{




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
        var item=data.outItem();
        var template = "<div class='video'><div class='pic' style='background:url(" + item.videoPicture + ") no-repeat;background-size:100% 100%;'></div><p class='video_t'>" + item.videoName + "</p></div>";
        arr.push(template);
    }
    parent.html(parent.html()+arr.join(''));
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


Array.prototype.outItem = function(){
    var item=this.shift();
    if(typeof this.callback == 'function') this.callback.call(this);
    return item
}