window.onload = function(){
	oDiv1 = document.getElementById('div1');
	oDiv2 = document.getElementById('div2');
    oDiv3 = document.getElementById('div3');
    oDiv4 = document.getElementById('div4');

	var imax = oDiv1.offsetHeight - oDiv2.offsetHeight;

	oDiv2.onmousedown = function(ev){
		var ev = ev || event;

		disY = ev.clientY - this.offsetTop;

		document.onmousemove = function(ev){
			var ev = ev || event;
            var T = ev.clientY - disY;
            if (T>=0 && T<=imax) {
               oDiv2.style.top = T + 'px';
               oDiv4.style.top = (oDiv3.clientHeight - oDiv4.offsetHeight)*T/imax + 'px';
            }
		}

		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
		}

		return false;
	}
}