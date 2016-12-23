/**
 * Created by omotoo on 2016/12/23.
 */



var getData= function (params) {
    $.ajax({
        url: 'video.json',
        type: 'GET',
        success:function(data){
            //data加工成数组
            dataArray.concat(data)
        }
    });
}

//————————————————————————————————————————————————

$(function(){


    waterFall('.video_content',{
        firstLoadRows:4,
        scale:0.67
    },getData)







});

