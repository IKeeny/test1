window.onload = function(){
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function(){
		startMove();
	}
}
window.onload = function(){
    var oDiv = document.getElementById("div1");

    var lastX = 0;
    var lastY = 0

    oDiv.onmousedown = function(ev){
    	var event = ev || event;

    	var disX = event.clientX - oDiv.offsetLeft;
    	var disY = event.clientY - oDiv.offsetTop; 

    	document.onmousemove = function(ev){
    		var event = ev || event;

    		var l = event.clientX - disX;
    		var t = event.clientY - disY;
            
    		oDiv.style.left = l + "px";
    		oDiv.style.top = t + "px";

    		// var box = document.createElement("div");
    		// box.style.left = l + 'px';
    		// box.style.top = t + 'px';
    		// document.body.appendChild(box);
    		
    		//拖拽求速度
    		iSpeedX = l - lastX;
    		iSpeedY = t - lastY;

    		lastX = l;
    		lastY = t;

    	}

    	document.onmouseup = function(){
            document.onmousemove = document.onmouseup = null;
            startMove();
    	}
    	clearInterval(timer);
    }
}

var iSpeedX = 0;
var iSpeedY = 0;
var timer  = null;

function startMove(){
	clearInterval(timer);

	timer = setInterval(function(){
		var oDiv = document.getElementById('div1');
		iSpeedY += 3;  //重力
		var l = oDiv.offsetLeft + iSpeedX;
		var t = oDiv.offsetTop + iSpeedY;
        
        if (t>=document.documentElement.clientHeight - oDiv.offsetHeight) {
        	// iSpeedY *= -1;
        	iSpeedY *= -0.8; //速度越来越小
            iSpeedX *= 0.8;  //横轴速度也要减小
            //解决滚动条闪烁的问题，过界了拉回来
        	t = document.documentElement.clientHeight - oDiv.offsetHeight;
        }else if(t<=0){
        	// iSpeedY *= -1;
        	iSpeedY *= -0.8;
        	iSpeedX *= 0.8;
        	t = 0;
        }
        if (l>=document.documentElement.clientWidth - oDiv.offsetWidth) {
        	// iSpeedX *= -1;
        	iSpeedX *= -0.8;
        	l = document.documentElement.clientWidth - oDiv.offsetWidth
        }else if(l<=0){
        	// iSpeedX *= -1;
        	iSpeedX *= -0.8;
        	l = 0;
        }

        if (Math.abs(iSpeedX)<1){
        	iSpeedX = 0;
        }
        if(Math.abs(iSpeedY)<1){
            iSpeedY = 0;
        }

        //没有运动但是定时器还没关，还在运行耗用资源，因此要关掉
        if (iSpeedX == 0 && iSpeedY == 0 && t == (document.documentElement.clientHeight - oDiv.offsetHeight)) {
        	clearInterval(timer);
        	// alert('停止');
        }else{
            oDiv.style.left = l + 'px';
		    oDiv.style.top = t + 'px';
        }

	},30);
}