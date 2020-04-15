var board = [];
var added = new Array();
var score = 0;
var top = 240;

window.onload = function(){
	newgame();
    
    //点击new game 可以重新开始一次游戏
	var newGame = document.getElementById('newgame');
	newGame.onclick = function(){
		newgame();
	}
}

function newgame(){
    //初始化棋盘
	init();
    //随机产生两个数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
    score = 0;
    document.getElementById('score').innerHTML = score;
    document.getElementById('gameover').style.display = 'none';

    //设置每个格子的位置
    for(var i=0; i<4; i++){
    	for(var j=0; j<4; j++){
    		var gridCell = document.getElementById('grid-cell-'+i+'-'+j);
    		gridCell.style.top = getPosTop(i,j);
    		gridCell.style.left = getPosLeft(i,j);
    	}
    }

    //初始化格子数组
    for(var i=0; i<4; i++){
    	board[i] = new Array();
    	for(var j=0; j<4; j++){
    		board[i][j] = 0;
    	}
    }

    //初始化判定合并的数组
    for(var i=0; i<4; i++){
    	added[i] = new Array();
    	for(var j=0; j<4; j++){
    		added[i][j] = 0;
    	}
    }

    updateBoardView();
}

//更新样式
function updateBoardView(){
    $('.number-cell').remove();
    for(var i=0; i<4; i++){
    	for(var j=0; j<4; j++){
    		$('#container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
    		var theNumberCell = $('#number-cell-'+i+'-'+j);//document.getElementById('number-cell-'+i+'-'+j);
    		if (board[i][j] == 0) {
    			theNumberCell.css('width','0px');
    			theNumberCell.css('height','0px');
    			theNumberCell.css('top',getPosTop(i,j));
    			theNumberCell.css('left',getPosLeft(i,j));
    		}else{
    			theNumberCell.css('width','100px');
    			theNumberCell.css('height','100px');
    			theNumberCell.css('top',getPosTop(i,j));
    			theNumberCell.css('left',getPosLeft(i,j));
    			//NumberCell覆盖
    			theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
    			theNumberCell.css('color',getNumberColor(board[i][j]));
    			theNumberCell.text(board[i][j]);
    		}
    	}
    }
}

//生成随机格子
function generateOneNumber(){
    if (nospace(board)) {
    	return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
    	//判断这个位置上是否已经存在数字，若存在，则继续随机位置
    	if (board[randx][randy] == 0) {
    		break;
    	}
    	var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    var randNumber = Math.random()<0.7 ? 2 : 4;
    //随机位置上
    board[randx][randy] = randNumber;
    showNumberAndAnimation(randx,randy,randNumber);
    return true;
}


//随机数字的样式变动
function showNumberAndAnimation(i,j,randNumber){
    var numberCell = $('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
    	width: '100px',
    	height: '100px',
    	top: getPosTop(i,j),
    	left: getPosLeft(i,j)
    },50);
}

//格子的位置
function getPosTop(i,j){
	return 20 + i*120 + 'px';
}

function getPosLeft(i,j){
	return 20 + j*120 + 'px';
}

//数字格子的背景颜色
function getNumberBackgroundColor(number){
    switch(number){
    	case 2:
    	    return '#eee4da';
    	    break;
    	case 4:
    	    return '#ee4da';
    	    break;
    	case 8:
    	    return '#f26179';
    	    break;
    	case 16:
            return '#f59563';
            break;
        case 32:
            return '#f67c5f';
            break;
        case 64:
            return '#f65e36';
            break;
        case 128:
            return '#edcf72';
            break;
        case 256:
            return '#edcc61';
            break;
        case 512:
            return '#9c0';
            break;
        case 1024:
            return '#3365a5';
            break;
        case 2048:
            return '#09c';
            break;
        case 4096:
            return '#a6bc';
            break;
        case 8192:
            return '#93c';
            break;
    }
    return 'black';
}

//数字的背景颜色
function getNumberColor(number){
    if (number<=4) {
    	return '#776e65';
    }
    return 'white';
}

//将判断能否合并的数组值置为0
function isaddedArray(){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			added[i][j] = 0;
		}
	}
}

//判断能否左移
function canMoveLeft(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++)
			if (board[i][j] !=0 && j!=0) {
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;
				}
			}
	}
	return false;
}

//判断能否右移
function canMoveRight(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++)
			if (board[i][j] !=0 && j!=3) {
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				}
			}
	}
	return false;
}

//判断能否上移
function canMoveTop(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++)
			if (board[i][j] !=0 && i!=0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				}
			}
	}
	return false;
}

//判断能否下移
function canMoveBottom(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++)
			if (board[i][j] !=0 && i!=3) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
	}
	return false;
}

//随机生成数字的时候判断16个格子是否还有空间
function nospace(board){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			if (board[i][j] == 0) 
				return false;
    return true;
}

//判断水平方向是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1; i<col2; i++)
		if(board[row][i] != 0) 
			return false;
    return true;
}

//判断垂直方向是否有障碍物
function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1; i<row2; i++)
		if(board[i][col] != 0)
			return false;
	return true;
}

//实现移动格子的样式变动
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
    	top: getPosTop(tox,toy),
    	left: getPosLeft(tox,toy)
    },200);
}

//向左移动
function moveLeft(){
    if(!canMoveLeft(board))
    	return false;

    isaddedArray();

    //真正的moveLeft函数
    for(var i=0; i<4; i++)
    	for(var j=1; j<4; j++){  //第一列的不能向左移动
    		if (board[i][j] != 0) {
    			//(i,j)左侧的元素
    			for(var k=0; k<j; k++){
    				//落脚的位置是否为空 && 中间没有障碍物
    				if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
    					//移动
    					showMoveAnimation(i,j,i,k);
    					board[i][k] = board[i][j];
    					board[i][j] = 0;
    					continue;
    				}
    				//落脚位置数字和本来的数字相等 && 中间没有障碍物
    				else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)) {
                        //移动
                        showMoveAnimation(i,j,i,k);
                        //相加
                        //目标落脚点是否完成过合并
                        if (added[i][k] != 0) {
                        	board[i][k+1] = board[i][j];
                        	board[i][j] = 0;
                        }else{
                        	board[i][k] += board[i][j];
                        	board[i][j] = 0;
                        	added[i][k] = 1;
                        	score += board[i][k];  //累计分数
                        }
                        continue;
    				}
    			}
    		}
    	}
    setTimeout(function(){
    	updateBoardView();
    },200)
    return true;
}

//向右移动
function moveRight(){
    if(!canMoveRight(board))
    	return false;

    isaddedArray();

    //真正的moveRight函数
    for(var i=0; i<4; i++)
    	for(var j=2; j>=0; j--){  //第3列的不能向右移动
    		if (board[i][j] != 0) {
    			//(i,j)右侧的元素
    			for(var k=3; k>j; k--){
    				//落脚的位置是否为空 && 中间没有障碍物
    				if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
    					//移动
    					showMoveAnimation(i,j,i,k);
    					board[i][k] = board[i][j];
    					board[i][j] = 0;
    					continue;
    				}
    				//落脚位置数字和本来的数字相等 && 中间没有障碍物
    				else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)) {
                        //移动
                        showMoveAnimation(i,j,i,k);
                        //相加
                        //目标落脚点是否完成过合并
                        if (added[i][k] != 0) {
                        	board[i][k-1] = board[i][j];
                        	board[i][j] = 0;
                        }else{
                        	board[i][k] += board[i][j];
                        	board[i][j] = 0;
                        	added[i][k] = 1;
                        	score += board[i][k];  //累计分数
                        }
                        continue;
    				}
    			}
    		}
    	}
    setTimeout(function(){
    	updateBoardView();
    },200)
    return true;
}

//向上移动
function moveTop(){
    if(!canMoveTop(board))
    	return false;

    isaddedArray();

    //真正的moveTop函数
    for(var j=0; j<4; j++) 
    	for(var i=1; i<4; i++){  //第一行的不能向上移动
    		if (board[i][j] != 0) {
    			//(i,j)上侧的元素
    			for(var k=0; k<i; k++){
    				//落脚的位置是否为空 && 中间没有障碍物
    				if (board[k][j] == 0 && noBlockVertical(j,k,i,board)) {
    					//移动
    					showMoveAnimation(i,j,k,j);
    					board[k][j] = board[i][j];
    					board[i][j] = 0;
    					continue;
    				}
    				//落脚位置数字和本来的数字相等 && 中间没有障碍物
    				else if (board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)) {
                        //移动
                        showMoveAnimation(i,j,k,j);
                        //相加
                        //目标落脚点是否完成过合并
                        if (added[k][j] != 0) {
                        	board[k+1][j] = board[i][j];
                        	board[i][j] = 0;
                        }else{
                        	board[k][j] += board[i][j];
                        	board[i][j] = 0;
                        	added[k][j] = 1;
                        	score += board[k][j];  //累计分数
                        }
                        continue;
    				}
    			}
    		}
    	}
    setTimeout(function(){
    	updateBoardView();
    },200)
    return true;
}

//向下移动
function moveBottom(){
    if(!canMoveBottom(board))
    	return false;

    isaddedArray();

    //真正的moveBottom函数
    for(var j=0; j<4; j++) 
    	for(var i=2; i>=0; i--){  //第3行的不能向下移动
    		if (board[i][j] != 0) {
    			//(i,j)下侧的元素
    			for(var k=3; k>i; k--){
    				//落脚的位置是否为空 && 中间没有障碍物
    				if (board[k][j] == 0 && noBlockVertical(j,i,k,board)) {
    					//移动
    					showMoveAnimation(i,j,k,j);
    					board[k][j] = board[i][j];
    					board[i][j] = 0;
    					continue;
    				}
    				//落脚位置数字和本来的数字相等 && 中间没有障碍物
    				else if (board[k][j] == board[i][j] && noBlockVertical(j,i,k,board)) {
                        //移动
                        showMoveAnimation(i,j,k,j);
                        //相加
                        //目标落脚点是否完成过合并
                        if (added[k][j] != 0) {
                        	board[k-1][j] = board[i][j];
                        	board[i][j] = 0;
                        }else{
                        	board[k][j] += board[i][j];
                        	board[i][j] = 0;
                        	added[k][j] = 1;
                        	score += board[k][j];  //累计分数
                        }
                        continue;
    				}
    			}
    		}
    	}
    setTimeout(function(){
    	updateBoardView();
    },200)
    return true;
}

document.onkeydown = function(event){
	switch(event.keyCode){
		//向左
		case 37:
		   if (moveLeft()) {
		   	   getScore();
		   	   //每次新增一个数字就可能游戏结束
		   	   generateOneNumber();
		   	   setTimeout(function(){
                   isgameover();
		   	   },400);
		   }
		   break;
        //向上
        case 38:
		   if (moveTop()) {
		   	   getScore();
		   	   //每次新增一个数字就可能游戏结束
		   	   generateOneNumber();
		   	   setTimeout(function(){
                   isgameover();
		   	   },400);
		   }
		   break;
		//向右
		case 39:
		   if (moveRight()) {
		   	   getScore();
		   	   //每次新增一个数字就可能游戏结束
		   	   generateOneNumber();
		   	   setTimeout(function(){
                   isgameover();
		   	   },400);
		   }
		   break;
		//向下
		case 40:
		   if (moveBottom()) {
		   	   getScore();
		   	   //每次新增一个数字就可能游戏结束
		   	   generateOneNumber();
		   	   setTimeout(function(){
                   isgameover();
		   	   },400);
		   }
		   break;
	}

}

//分数变更
function getScore(){
	document.getElementById('score').innerHTML = score;
}

//判断游戏是否结束
function nomove(board){
    if (canMoveLeft(board) || canMoveTop(board) || canMoveRight(board) || canMoveBottom(board)) {
    	return false;
    }
    return true;
}

function isgameover(){
	if (nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover(){
	document.getElementById('gameover').style.display = 'block';
}
