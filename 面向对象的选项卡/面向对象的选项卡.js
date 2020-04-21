


//面向过程的程序改写成面向对象的形式
//1.前提：所有东西都在onload里
//改写：不能有函数嵌套，可以有全局变量
//      onload:初始化整个程序     构造函数:初始化整个对象
//      全局变量                  属性
//      函数                      方法
//      改错：this
//            this啥时候会出问题？  1.定时器  被定时器调用的函数,this指向window
//                                  2.事件
//            解决办法：再套一层，通过闭包传递this

//面向对象 this

// window.onload = function(){
// 	var oTab = new TabSwitch('div1');
// }

// var oBtn = null;
// var aDiv = null
// function TabSwitch(id){
// 	var oDiv = document.getElementById(id);
// 	this.oBtn = oDiv.getElementsByTagName('input');
// 	this.aDiv = oDiv.getElementsByTagName('div');

// 	var i = 0;
// 	var _this = this;

// 	for(i=0; i<this.oBtn.length; i++){
// 		this.oBtn[i].index = i;
// 		// this.oBtn[i].onclick = this.tab;  //this.tab这里的this指向变了，变成了input框
// 	    this.oBtn[i].onclick = function(){
// 	    	_this.tab(this);
// 	    }
// 	}
// };

// TabSwitch.prototype.tab = function(oBtn){
// 	for(i=0; i<this.oBtn.length; i++){
// 		this.oBtn[i].className = '';
// 		this.aDiv[i].style.display = 'none';
//     }
// 	oBtn.className = 'active';
// 	this.aDiv[oBtn.index].style.display = 'block';
// }


// //例子1,定时器
// function Aaa(){
// 	this.a = 12;
// 	var _this = this;
// 	setInterval(function(){
// 		_this.show();  //12
// 	},1000);
// }
// Aaa.prototype.show = function(){
// 	alert(this.a);
// }
// var obj = new Aaa();
// // obj.show();

//例子2,事件
function Bbb(){
	var _this = this;
	this.b = 5;

	// document.getElementById('btn1').onclick = this.show;   //undefined
	document.getElementById('btn1').onclick = function(){
		_this.show();  //5
	}
    
};
Bbb.prototype.show = function(){
	alert(this.b);
}
window.onload = function(){
	new Bbb();
}