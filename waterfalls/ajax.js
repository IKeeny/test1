window.onload = function(){
    
    var oUl = document.getElementById('ul1');
	var oLi = document.getElementsByTagName('li');
	var iPage = 1;
	var oFF = true;
    
    getList();
    function getList(){
       $.ajax({
		type: "GET",
		url:"getPics.php",
		data: 'cpage=' + iPage,
		async:true,
		success:function (data){
			if (!data.length) {
				//后续没有数据了
				return ;
			}
			for(var i=0; i<data.length; i++){
				var index = getShort();
				var oDiv = document.createElement('div');
				var oImg = document.createElement('img');
				oImg.src = data[i].preview;
				oImg.style.width = '225px';
				oImg.style.height = data[i].height * (225/data[i].width) + 'px';
				oDiv.appendChild(oImg);
				var oP = document.createElement('p');
				oP.innerHTML = data[i].title;
				oDiv.appendChild(oP);

				oLi[index].appendChild(oDiv);
			}

			oFF = true;
		}
	   })
    }
    
    //滚动加载，实现瀑布流
	window.onscroll = function(){
		var _index = getShort();
		var aLi = oLi[_index];
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (getTop(aLi) + aLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {
            //防止滚动的时候上一页还没加载完，就加载很多页
            if(oFF){
            	oFF = false;
            	iPage++;
                getList();
            }
        }
	}
 
	// alert(oLi[1].innerHTML);
	
	function getShort(){
		var index = 0;
		var ih = oLi[index].offsetHeight;
		for(var i=0; i<oLi.length; i++){
			if(oLi[i].offsetHeight < ih){
				index = i;
				ih = oLi[i].offsetHeight;
			}
		}
		return index;
	}

	function getTop(obj){
        var iTop = 0;
        while(obj){
        	iTop += obj.offsetTop;
        	obj = obj.offsetParent;
        }
        return iTop;
	}
}