function startMove(obj,json,fn){
		clearInterval(obj.timer);

		obj.timer = setInterval(function(){
			var bStop = true;  //这一次运动结束了，所有的值都到达了
			for(var attr in json){
				//第一步：取当前值
                var iCur = 0; 
				if (attr == 'opacity') {
					iCur = parseInt(parseFloat(getStyle(obj,attr))*100);//把后面的小数干掉
				}else{
					iCur = parseInt(getStyle(obj,attr));
				}
                
                //第二步：算速度
				var iSpeed = (json[attr] - iCur)/8;
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                
                //第三步：检测停止
                if (iCur != json[attr]) {
                	bStop = false;
                }

                if (attr == 'opacity') {
	                obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
	                obj.style.opacity = (iCur+iSpeed)/100;
				}else{
	                obj.style[attr] = iCur + iSpeed + 'px';
				}

				if (bStop) {
					clearInterval(obj.timer);  
					// alert('a');
					
					//链式运动
					//运动停止时，执行函数
					//运动停止时，开始下一次运动
					if (fn) {
	                   fn();
					}
				}

			}
		},30);
	}

	function getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}

window.onload = function(){
    var oUl = document.getElementById('ul1');
    var oLi = document.getElementsByTagName('li');
    var i=0;
    var zIndex = 2;
    
    //布局转换
    for(i=0; i<oLi.length; i++){
    	oLi[i].style.left = oLi[i].offsetLeft+'px';
    	oLi[i].style.top = oLi[i].offsetTop+'px';
    	//oLi[i].style.position = 'absolute';//直接这样写的话只看得到一个，因为每一个都有浮动
    }
    for(var i=0; i<oLi.length; i++){
    	oLi[i].style.position = 'absolute';  //都存下来之后再一个一个给绝对定位
        oLi[i].style.margin = '0';
    }
    
    //加事件
    for(var i=0; i<oLi.length; i++){
    	oLi[i].onmouseover = function(){
    	   this.style.zIndex = zIndex++;
    	   startMove(this,{width:200,height:200,marginLeft:-50,marginTop:-50});
        }
        oLi[i].onmouseout = function(){
    	   startMove(this,{width:100,height:100,marginLeft:0,marginTop:0});
        }
    }
    
    // var oDiv = document.getElementById('div1');
    // oDiv.onmouseover = function(){
    // 	startMove(oDiv,{width:200, height:200,marginLeft:-50,marginTop:-50});
    // }
    // oDiv.onmouseout = function(){
    // 	startMove(oDiv,{width:100,height:100,marginLeft:0,marginTop:0});
    // }
};