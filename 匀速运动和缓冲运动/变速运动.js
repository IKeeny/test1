//Math.ceil()  向上取整
//alert(Math.ceil(10.0001));  //11
//alert(Math.ceil(-12.5));    //-12
//
//Math.floor  向下取整
//alert(Math.floor(8.9999));  //8
//alert(Math.floor(-0.8));    //-1

window.onload = function(){
  
	var oBtn = document.getElementById('btn');
	var oDiv = document.getElementById('div1');
	var timer = null;

	function startMove(iTarget){
		clearInterval(timer);

		timer = setInterval(function(){
            var iSpeed = (iTarget - oDiv.offsetLeft)/8;
            iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //用三目运算简化
            // if (iSpeed>0) {
            // 	iSpeed = Math.ceil(iSpeed);
            // }else{
            // 	iSpeed = Math.floor(iSpeed);
            // }
            
            if (oDiv.offsetLeft == iTarget) {
            	clearInterval(timer);
            }else{
            	oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';
            }
            
            document.title = oDiv.offsetLeft + 'iSpeed =' + iSpeed;
		},30);
	}

	oBtn.onclick = function(){
		startMove(300);
	}

}