// //search
// var str = 'abcdef';
//
// alert(str.search('bc'));  //返回要查找的字符串第一次出现的位置 1
// alert(str.search('g'));   //不存在的时候返回-1  -1
//
// //substring 子字符串
// var str2 = 'abdfrkhl';
// alert(str2.substring(1,4)); //bdf 不包含结尾字符
//
// //charAt 找某个位置上的字符
// var str3 = 'fdgfhggadfd';
// alert(str3.charAt(0));  //f
//
// //split 分割字符串，获得数组
// var str4 = 'abc-456-ft-s-g';
// var str4 = str4.split('-');
// alert(str4[0]); //abc


//找出字符串中所有的数字
var str = '12,3,5 6 76 -d v rf09';

// //普通方法
// var arr = [];
// var temp = '';
// var i = 0;

// for(i=0; i<str.length; i++){
// 	if (str.charAt(i)>='0' && str.charAt(i)<='9') {
// 		temp += str.charAt(i);
// 		alert(temp);
// 	}else{
// 		if (temp) {
// 			arr.push(temp);
// 			temp = '';
// 		}
// 	}
// }
// if (temp) {
// 	arr.push(temp);
// 	temp = '';
// }
	
// alert(arr);

// //用正则表达式
// var re = /\d+/g;
// alert(str.match(re));

//正则表达式：规则表达式
//            规则、模式
//            只能操作字符串

// var str5 = 'sdkgAk';
// //var re = new RegExp('a','i');  //包含字母a  i:ignore忽略大小写
// //RegExp 有简写// perl风格
// var re = /a/i;
// alert(re.test(str5));   //str5字符串是否符合这个规则  true
// alert(str5.search(/d/));  //1

// var str6 = 'sffg f456 dd34 5 s'
// var re = /\d/;
// // alert(str6.search(re));  //6
// // alert(window.navigator.userAgent.search(/chrome/i ));
// if (window.navigator.userAgent.search(/firefox/i) != -1) {
// 	alert('ff');
// }
// else if(window.navigator.userAgent.search(/chrome/i) != -1){
// 	alert('chrome');
// }

// var str7 = 'sffg 3gh5h gf56n 567 12 c 2';
// // var re = /\d/;
// // var re = /\d/g;  //g: global 全局匹配 可以匹配到所有的数字
// var re = /\d+/g;    //+量词 代表许多
// alert(str7.match(re));    

// var str8 = 'abbcdaefA';
// // alert(str8.replace('a','T'));
// alert(str8.replace(/a/gi,'T')); //TbbcdTefT

window.onload = function(){
	var oTxt1 = document.getElementById('txt1');
	var oTxt2 = document.getElementById('txt2');
	var oBtn = document.getElementById('btn');

	oBtn.onclick = function(){

		var re = /我们|你们|他们/g;  // |或者
		oTxt2.value = oTxt1.value.replace(re,'***');

	}

	var oTxt3 = document.getElementById('txt3');
	var oTxt4 = document.getElementById('txt4');
	var oBtn2 = document.getElementById('btn2');
	oBtn2.onclick = function(){
		var re = /<[^<>]+>/g;   //.代表任意字符
		oTxt4.value = oTxt3.value.replace(re,'');
		alert(oTxt3.value);
	}

}

//字符类
// var re = /1[abc]2/g;   //[abc]代表a或者b或者c
                       //[a,b]代表a或者逗号或者c
                       //[0-9]代表所有的数字其中的一个
                       //[a-z]代表所有字母其中的一个
                       //[^a]代表除了a的任意值
// var str = '1a2 abc ee 1c2';
// alert(str.match(re));  //1a2,1c2


// //\d  digital
// //\D  [^0-9]非数字
// //\w  [0-9a-z_]  word
// //\W  [^0-9a-z_]除了0-9a-z_以外的东西
// //\s  space
// //\S  除了空白字符以外的东西
// var str = '  rdgfgdh  ghg q e tf';
// var re = /\s/g;
// alert(str.replace(re,''));

//什么是量词
//{n,m}  最少出现n次，最多出现m次
//{n,}   最少n次，最多不限
//{,m}   最少不限，最多m次
//{n}    正好n次

//QQ号
//位数：最少5位，最多11位
//[1-9]\d{4,10}
var re = /[1-9]\d{4,10}/g;
var str = '我的QQ是3456723，你的是1099876323吗？';
alert(str.match(re));
