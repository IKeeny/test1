window.onload = function(){
	var oDiv = document.getElementById('div1');
	var timer = null;

	function startMove(iTarget){
		clearInterval(timer);
        var oDiv = document.getElementById('div1');

        timer = setInterval(function(){
        	var iSpeed = 0;
        	
        	if (oDiv.offsetLeft<iTarget) {
        		iSpeed = 10;
	        }else{
	        	iSpeed = -10;
	        }

        	if (oDiv.offsetLeft == iTarget) {  //运动是否到达终点
        		clearInterval(timer);   //到达终点
        	}else{
                oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';  //到达之前
        	}
        	
        },30)

	}
    
	oDiv.onmouseover = function(){
        startMove(0);
	}
    
    oDiv.onmouseout = function(){
    	startMove(-100);
    }
}