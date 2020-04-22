window.onload = function(){
   new Drag('div1');
   new LimitDrag('div2');
}
function Drag(id){
    
    var _this = this;
    this.disX = 0;
    this.disY = 0;

	this.oDiv = document.getElementById(id);

	this.oDiv.onmousedown = function(ev){
		var event = ev || event;
		// alert(event);
		_this.fnDown(event);

		return false;
    };
}

Drag.prototype.fnDown = function(ev){
	var _this = this;
    // var event = ev || event;

    this.disX = ev.clientX - this.oDiv.offsetLeft;
	this.disY = ev.clientY - this.oDiv.offsetTop;

	document.onmousemove = function(ev){
		var event = ev || event;
		_this.fnMove(event);
	};

	document.onmouseup = function(ev){
		var event = ev || event;
		_this.fnUp(event);
	};
};

Drag.prototype.fnMove = function(ev){
	// var event = ev || event;

	this.oDiv.style.left = ev.clientX - this.disX + 'px';
	this.oDiv.style.top = ev.clientY - this.disY + 'px';

};

Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
};


//继承
function LimitDrag(id){
	//构造函数伪装
	Drag.call(this,id); 
}
//原型链 继承方法
for(var i in Drag.prototype){
	LimitDrag.prototype[i] = Drag.prototype[i];
}
LimitDrag.prototype.fnMove = function(ev){

	var l = ev.clientX - this.disX;
	var t = ev.clientY - this.disY;
	if (l<0) {
		l=0;
	}else if(l>document.documentElement.clientWidth-this.oDiv.offsetWidth){
		l=document.documentElement.clientWidth-this.oDiv.offsetWidth;
	}
	if (t<0) {
		t=0;
	}else if(t>document.documentElement.clientHeight-this.oDiv.offsetHeight){
		t=document.documentElement.clientHeight-this.oDiv.offsetHeight;
	}
	this.oDiv.style.left = l + 'px';
	this.oDiv.style.top = t + 'px';

}

//系统对象
//1.宿主对象 运行的环境不同而有所变化 （由浏览器提供的对象）
//           DOM(document)  BOM(window)
//           
//2.本地对象
//  Array 必须要new才能使用
//  需要实例化的 ————非静态对象
//  常用的有：Object Function Array String Boolean Number Date RegExp Error
//3.内置对象
//  Math.ceil  Math不需要new就可以使用 
//  不需要实例化，直接可以用的 ——--静态对象
//  例如：Global(只是一个概念 全局) Math