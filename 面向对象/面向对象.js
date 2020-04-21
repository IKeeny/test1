// 封装
// 继承
// 多态
// var arr = [1,2,3,4];
// var a = 2;   //变量 自由
// arr.a = 5;  //属性 属于一个对象
// alert(arr.a);  //5

// function show(){  //函数
// 	alert(1);
// }
// arr.fn = function(){ //方法 属于一个对象
// 	alert(2);
// }
// arr.fn();

// //this:当前的方法，属于谁
// var arr = [12,75,78];
// arr.show = function(){
// 	alert(this.length);
// };
// // arr.show();

// function show(){
// 	alert(this);
// }
// // show();  //window

// var a = 2;
// alert(window.a); //全局变量 实际上是window的一个属性
// window.show();   //全局函数 实际上是window的一个方法

//自己新建的对象，没有方法和属性
// var obj = new Object();
// obj.aaa = 12;
// obj.show = function(){
// 	alert(this.aaa);
// }
// obj.show();

// var obj1 = new Object();
// obj1.name = 'blue';
// obj1.sex = '男';
//
// obj1.showName = function(){
// 	alert('我的名字是' + obj1.name);
// }
// obj1.showSex = function(){
// 	alert('我的性别是' + obj1.sex);
// }
// obj1.showName();
// obj1.showSex();

//为了区别构造函数和普通函数：
//1.构造函数名首字母大写
//2.构造函数里面添加属性，每个对象属性各不相同
//  原型里面添加方法，所有对象的方法都一样

//用工厂方式创建对象1,2,3
//类就是构造函数，构造函数就是类
function CreatePerson(name,sex){   //构造函数：构造对象
	// //1.原料
	// var obj = new Object();

	// //2.加工
	// obj.name = name;
	// obj.sex = sex;
    
	// obj.showName = function(){
	// 	alert('我的名字是' + obj.name);
	// }
	// obj.showSex = function(){
	// 	alert('我的性别是' + obj.sex);
	// }

 //    // 3.出厂
	// return obj;  //不返回新创建的对象，就没有东西
	
 //    //解决第一个问题，没有new
 //    //假想的系统内部工作流程
 //    //var this = new Object();
	// this.name = name;
	// this.sex = sex;

	// this.showName = function(){
	// 	alert('我的名字是' + this.name);
	// }
	// this.showSex = function(){
	// 	alert('我的性别是' + this.sex);
	// }	
	// //假想的系统工作流程
	// //return this;
    
    //解决第二个问题
    this.name = name;
	this.sex = sex;

};
CreatePerson.prototype.showName = function(){
	alert('我的名字是' + this.name);
};
CreatePerson.prototype.showSex = function(){
	alert('我的性别是' + this.sex);
};	

// var p1 = CreatePerson('Pole','男');
// var p2 = CreatePerson('Jonne','女');
var p1 = new CreatePerson('Pole','男');
var p2 = new CreatePerson('Jonne','女');
p1.showName();
p1.showSex();
p2.showName();
p2.showSex();
// alert(typeof p1);  //object

//工厂方式的问题：
//1.没有new
//2.每个对象都有一套自己的方法，浪费资源
//  用 prototype(原型) 解决
//  class 改变一类元素的样式        
//  行间样式 改变一个元素的样式     给一个对象加方法
//  类：不具有实际的功能 只能用来构造对象
//  对象：真正有功能的东西，被构造出来的

//原型的一个重要功能（应用）————可以扩展系统对象

//this: 当前的方法属于谁
//在函数前面有new的时候会失效

// function show(){
// 	//函数前面加了new,系统会自动的创建一个新的对象，所以不再指向window,而是object
// 	// var this = new Object();
// 	alert(this);
// };
// show();   //object Window
// new show();  //object Object

var arr1 = new Array(12,5,8,25);
var arr2 = new Array(20,4,6,3);
// arr1.sum = function(){
// 	var result = 0;
// 	var i = 0;
// 	for(i=0; i<this.length; i++){
// 		result += this[i];
// 	}
// 	return result;
// }
// 给数组添加原型求和函数
Array.prototype.sum = function(){
	var result = 0;
	var i = 0;
	for(i=0; i<this.length; i++){
		result += this[i];
	}
	return result;
}
// alert(arr1.sum()); //50
// alert(arr2.sum()); //在原型上构造之后才有 33

//去掉字符串开头的空格
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g,'');
}
var str = '    gfd  re  t j l';
// alert('('+str.trim()+')');

// alert(typeof Array);  //function 构造函数

//给原型和给对象添加的优先级
//给对象添加属性或方法的优先级更高
// Array.prototype.a = 12;
//
// var arr3 = [1,2,3];
// alert(arr3.a); //12
// arr3.a = 4;
// alert(arr3.a); //5
// delete arr3.a;
// alert(arr3.a); //12


