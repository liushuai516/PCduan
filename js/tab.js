(function(){
  var head=document.getElementById("head_logo");
    var logo=document.getElementById("logo_bottom");
  head.onmouseover=function(e){
        e = e || window.event;
        e.target= e.target|| e.srcElement;
        var cur= e.target;
        if(cur.className==="logo_head"){
            cur.style.color="#ffffff";
            var curD = cur.nextElementSibling;
            curD.style.display = "block";
        }
    };
    head.onmouseleave=function(e){
        e = e || window.event;
        e.target= e.target|| e.srcElement;
        var cur= e.target;
        if(cur.id==="head_logo"){
            cur.firstElementChild.style.color="#999999";
           cur.lastElementChild.style.display="none";
        }
    };

    //->绑定数据
    function bindChange(){
      var str="";
        str+="<ul class='clear'>";
        for(var i=0;i<ajax.length;i++){
            var cur=ajax[i];
            str+="<li>"+cur.title+"</li>";
        }
        str+="</ul>";
        document.getElementById("side-content-left").innerHTML=str;
        str="";
        for(i=0;i<ajax.length;i++){
            var curT=ajax[i];
            str+="<ul>";
            var curCh=curT["data"];
            for(var j=0;j<curCh.length;j++){
                var curH=curCh[j];
                str+="<li>";
                str+="<a type='javascript:;'><img src='"+curH+"' class='company-logo'/></a>";
                str+="</li>";
            }
            str+="</ul>";
        }
        document.getElementById("side-content-right").innerHTML=str;
    }
    bindChange();

    var step= 0,autotimer=null;
    var oLis=document.getElementById("side-content-left").getElementsByTagName("li");
    var oUls=document.getElementById("side-content-right").getElementsByTagName("ul");
    /*function changeBg(step){
        var stepList=step;
        for(var i=0;i<oLis.length;i++){
            if(stepList==i){
                oLis[i].className="bg";
                oUls[i].className="bg";
                animate(oUls[i],{opacity:1},1000);
                oUls[i].style.zIndex="2";
            }
            oLis[i].className="";
            oUls[i].className="";
            animate(oUls[i],{opacity:0},300);
            oUls[i].style.zIndex="1";
        }
    }*/
    function changeBg(){
        var stepList=step;
        stepList>=oLis.length?step=0:null;
        for(var i=0;i<oLis.length;i++){
            oLis[i].className = i === stepList ? "bg" : null;
            if(i==step){
                oUls[i].className="bg";
                oUls[i].style.zIndex="2";
                oUls[i].style.opacity=1;
            }else{
                oUls[i].className="";
                oUls[i].style.zIndex="1";
                oUls[i].style.opacity=0;
            }

        }

    }
    function move(){
        for(var i=0;i<oLis.length;i++){
            var cur=oLis[i];
            cur.index=i;
            cur.onmouseover=function(){
                window.clearInterval(autotimer);
                step=this.index;
                changeBg();

            }
        }
    }
    move();
   var  sideRight=document.getElementById("side-content-right");
    sideRight.onmouseover=function(e){
        e=e||window.event;
        e.target= e.target|| e.srcElement;
        window.clearInterval(autotimer);
    };
    sideRight.onmouseout=function(e){
        e=e||window.event;
        e.target= e.target|| e.srcElement;
        autotimer=window.setInterval(autoMove,2000);
    };
    function autoMove(){
        changeBg();
        step++;
        if(step>=oLis.length){
            step=0;
        }
    }
    window.setTimeout(autoMove);
    autotimer=window.setInterval(autoMove,2000);

    /*给全局的 side-content 绑定事件 当鼠标移动到左边的side-content-left上时，清除了定时器，鼠标只移动到右边的side-content-right 上时定时器停止，离开继续执行轮播*/

})();
