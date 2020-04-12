window.onload = function(){

    //多物体运动框架
    function startMove(obj,attr,iTarget){
		clearInterval(obj.timer);

		obj.timer = setInterval(function(){
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);//把后面的小数干掉
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}

			var iSpeed = (iTarget - iCur)/8;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur == iTarget) {
				clearInterval(obj.timer);
			}else{
				if (attr == 'opacity') {
                   obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
                   obj.style.opacity = (iCur+iSpeed)/100;
				}else{
                   obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		},30);
	}

	function getStyle(obj,attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
	}

	var oDiv = document.getElementById('playimages');
	var oBtnPrev = document.getElementsByClassName('prev')[0];
	var oBtnNext = document.getElementsByClassName('next')[0];
	var oMarkLeft = document.getElementsByClassName('mark_left')[0];
	var oMarkRight = document.getElementsByClassName('mark_right')[0];
    
    var oSmallUl = document.getElementsByClassName('small_ul')[0];
    var oSmallLi = oSmallUl.getElementsByTagName('li');
    var oBigUl = document.getElementsByClassName('big_pic')[0];
    var oBigLi = oBigUl.getElementsByTagName('li');
    var oText = document.getElementsByClassName('text')[0];
    var oLength = document.getElementsByClassName('length')[0];
    var oTextValue = ['草地上的小王子','小王子和玫瑰花','小王子的星球','驯养那只小狐狸','通往星球的天梯','爱喝酒的星球'];
    oText.innerHTML = oTextValue[0];
    oLength.innerHTML = 1 +' / '+ oSmallLi.length;
    var timer = null;
    var iNow = 0;
    var iMinZindex = 2;
    var i = 0;

    oSmallUl.style.width = oSmallLi.length*oSmallLi[0].offsetWidth + 'px';

    //左右按钮的出现和消失
	oBtnPrev.onmouseover = oMarkLeft.onmouseover = function(){
		startMove(oBtnPrev,'opacity',100);
	}	
	oBtnPrev.onmouseout = oMarkLeft.onmouseout = function(){
		startMove(oBtnPrev,'opacity',0);
	}

	oBtnNext.onmouseover = oMarkRight.onmouseover = function(){
		startMove(oBtnNext,'opacity',100);
	}	
	oBtnNext.onmouseout = oMarkRight.onmouseout = function(){
		startMove(oBtnNext,'opacity',0);
	}

	//小图点击，大图移动
	for(i=0; i<oSmallLi.length; i++){
		oSmallLi[i].index = i;
		oSmallLi[i].onmouseover = function(){
			startMove(this,'opacity',100);
		}
		oSmallLi[i].onmouseout = function(){
			if (this.index != iNow) {
                startMove(this,'opacity',60);
			}
		}

		oSmallLi[i].onclick = function(){
			if (this.index == iNow) return;
			iNow = this.index;
			
			tab();
            
		}
	}

	//封装点击移动
	function tab(){
		for(i=0; i<oSmallLi.length; i++){
			startMove(oSmallLi[i],'opacity',60);
		}
		startMove(oSmallLi[iNow],'opacity',100);
		oBigLi[iNow].style.zIndex = iMinZindex++;
		oBigLi[iNow].style.height = 0;

		startMove(oBigLi[iNow],'height',oBigUl.offsetHeight);
        oText.innerHTML = oTextValue[iNow];
        oLength.innerHTML = (iNow+1) +' / '+ oSmallLi.length;
            
        if (iNow == 0) {
            startMove(oSmallUl,'left',0);
        }else if (iNow == oSmallLi.length-1) {
            startMove(oSmallUl,'left',-(iNow-2)*oSmallLi[0].offsetWidth);
        }else{
            startMove(oSmallUl,'left',-(iNow-1)*oSmallLi[0].offsetWidth);
        }
	}

    oBtnPrev.onclick = function(){
    	iNow--;
    	if (iNow == -1) {
    		iNow = oSmallLi.length - 1;
    	}

    	tab();
    }

    oBtnNext.onclick = function(){
    	iNow++;
    	if (iNow == oSmallLi.length) {
    		iNow = 0;
    	}

    	tab();
    }
    
    //设置定时器，自动播放
    timer = setInterval(function(){
    	iNow++;
    	if (iNow == oSmallLi.length) {
    		iNow = 0;
    	}

    	tab();
    },2000);

    oBigUl.onmouseover = function(){
		clearInterval(timer);
	}
	oBigUl.onmouseout = function(){
		timer = setInterval(function(){
    	    iNow++;
    	    if (iNow == oSmallLi.length) {
    		    iNow = 0;
    	    }

    	    tab();
        },2000);
	}
}