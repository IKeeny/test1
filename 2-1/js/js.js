
function square(num) {
	var total = num * num; //函数内部设为局部变量
	return total;
}
var total = 50;
var number = square(20);  //返回的是number
alert(total);