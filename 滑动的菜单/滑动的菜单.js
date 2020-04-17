window.onload = function(){
	var oUl = document.getElementById('ul1');
	var aLi = oUl.getElementsByTagName('li');
	var oBg = aLi[aLi.length-1];
	var i = 0;

	for(i=0; i<aLi.length-1; i++){
		aLi[i].onmouseover = function(){
			startMove(oBg,this.offsetLeft);
		}
	}
}

var iSpeed = 0;
var left = 0;
function startMove(obj,iTarget){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		iSpeed += (iTarget-obj.offsetLeft)/5
		iSpeed *= 0.7;

        left += iSpeed;  //速度往变量上加

	    //因为速度等于0，所以看着没有动，但是定时器依然开着的，在消耗资源，因此要关掉        
        //速度和距离同时满足足够小时，关闭定时器
        if (Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1) {
            clearInterval(obj.timer);
            obj.style.left = iTarget + 'px';
        }else{
			// obj.style.left = obj.offsetLeft + iSpeed + 'px';
	        //style.left 只能为整数
	        //style.left  速度  加过之后  误差
	        //0           3.5 ->3         0.5
	        //3           3.2 ->6         0.5+0.2
			//速度最后为0.46，因此会有超出1px的误差，要解决小数问题
			// document.title = obj.offsetLeft + '|' + iTarget + '|' +iSpeed;
		    //解决方法：先把速度值存起来，最后再赋值给style.left
		    obj.style.left = left + 'px';
	    }
	},30);
}

