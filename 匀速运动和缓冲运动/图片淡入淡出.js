window.onload = function(){
	var oImg = document.getElementById('img1');
	var timer = null;
	var alpha = 30;

	function startMove(iTarget){
		clearInterval(timer);

		timer = setInterval(function(){
            var iSpeed = 0;
            if (alpha<iTarget) {
                iSpeed = 1;
            }else{
            	iSpeed = -1;
            }

            if (alpha == iTarget) {
            	clearInterval(timer);
            }else{
            	alpha += iSpeed;
            	oImg.style.filter = 'alpha(opacity:'+alpha+')';
            	oImg.style.opacity = alpha/100;
            	document.title = alpha;
            }
		},30);
	}

	oImg.onmouseover = function(){
		startMove(100);
	}

	oImg.onmouseout = function(){
		startMove(30);
	}

}