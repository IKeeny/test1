window.onload = function(){
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

				// if (iCur == json[attr]) {
				// 	clearInterval(obj.timer);  //只要一个到了目标值，定时器就停止了
				// 	// alert('a');
				//	
				// 	//链式运动
				// 	//运动停止时，执行函数
				// 	//运动停止时，开始下一次运动
				// 	if (fn) {
	            //        fn();
				// 	}
				//	
				// }else{
				// 	if (attr == 'opacity') {
	            //        obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';
	            //        obj.style.opacity = (iCur+iSpeed)/100;
				// 	}else{
	            //        obj.style[attr] = iCur + iSpeed + 'px';
				// 	}
				// }
                
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

	var oBtn = document.getElementById('btn1');
	var oDiv1 = document.getElementById('div1');
    //var Ha = {'width':300,'height':300,'opacity':60}
	oBtn.onclick = function(){
		startMove(oDiv1,{'width':102,'height':400,'opacity':60})  //如果宽和高不同步的话会有问题，效果像卡了一样
	}
	
	// oDiv.onmouseover = function(){
	// 	startMove(oDiv,'width',300,function(){
	// 		startMove(oDiv,'height',300,function(){
	// 			startMove(oDiv,'opacity',100);
	// 		});
	// 	});
	// }

	// oDiv.onmouseout = function(){
	// 	startMove(oDiv,'opacity',30,function(){
	// 		startMove(oDiv,'height',100,function(){
	// 			startMove(oDiv,'width',100);
	// 		});
	// 	});
	// }
    
    //设置样式
    // function setStyle(obj,attr,value){
    //     obj.style[attr] = value;
    // }
    //
    // var oSet = {'width':'200px','height':'200px','background':'green'}
    // for(i in oSet){
    // 	setStyle(oDiv1,i,oSet[i]);
    // }
    // 
    // 另一种用json的方法,把for循环放在里面
    // 
    // function setStyle(obj,json){
    // 	for(var attr in json){//没有写var，attr就变成了全局变量 
    //        obj.style[attr] = json[attr];
    // 	}
    //   
    // }
    // setStyle(oDiv1,{'width':'200px','height':'200px','background':'green'})


    // for(var i=0; i<10; i++){
    // 	i = 'abc';
    // 	console.log(i);//只打印一个abc,最后一个i的值
    // }

    // for(let j=0; j<3; j++){
    // 	let j='def';
    // 	console.log(j);
    // }

    // console.log(fo);  //var 在定义之前可以使用 undefined
    //                   //    会发生变量提升
    // var fo = 2;

    // console.log(ka);  //let 在定义之前使用会报错
    // let ka = 3;

    // var tmp = new Date();
    //
    // function f(){
    // 	console.log(tmp);
    // 	if (false) {
    // 		var tmp = 'hahaha';   //内层覆盖了外层变量
    // 	}
    // }
    //
    // f();
}