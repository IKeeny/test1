
window.onload = function(){
    var oDiv = document.getElementById('div1');
    var oUl = document.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oA = document.getElementsByTagName('a');
    var timer = null;
    var iSpeed = 10;
    
    //设置两个一样的内容
    oUl.innerHTML += oUl.innerHTML;
    //不设置ul的宽度，可以让图片自适应
    oUl.style.width = aLi.length*aLi[0].offsetWidth + 'px';
    
    timer = setInterval(fnMove,30);
    function fnMove(){
    	//走到一半时拉回来
    	if (oUl.offsetLeft < -oUl.offsetWidth/2) {
    		oUl.style.left = 0;
    	}else if(oUl.offsetLeft>0){
            oUl.style.left = -oUl.offsetWidth/2 + 'px';
    	}
    	oUl.style.left = oUl.offsetLeft + iSpeed + 'px';
    }

    oA[0].onclick = function(){
    	iSpeed = -10;
    }
    oA[1].onclick = function(){
    	iSpeed = 10;
    }

    // for(var i=0; i<aLi.length; i++){
    // 	aLi[i].onmouseover = function(){
    // 		clearInterval(timer);
    // 	}
    // 	aLi[i].onmouseout = function(){
    //
    // 	}
    // }
    
    // 直接给最外面的div加移入移出事件
    oDiv.onmouseover = function(){
    	clearInterval(timer);
    }
    oDiv.onmouseout = function(){
    	timer = setInterval(fnMove,30);
    }
};