var clock = null;   //定时器
var speed = 6;      //开始时的游戏速度
var flag = false;   //是否游戏开始

function $(id){
    return document.getElementById(id)
}

function creatediv(className){
    var div = document.createElement("div")
    div.className=className
    return div
}

function createcell(){
    var temp = ["cell","cell","cell","cell"]
    var i = Math.floor(Math.random() * 4)
    temp[i] = "cell black"
    return temp
}

function createrow(){
    var con = $("con")
    var row = creatediv("row")
    var arr = createcell()
    for(var i = 0;i<arr.length;i++){
        row.appendChild(creatediv(arr[i]))
    }
    con.appendChild(row)
    if(con.firstChild == null){
        con.appendChild(row)
    }else{
        con.insertBefore(row,con.firstChild);
    }
}

function delrow(){
    var con = $("con")
    if(con.childNodes.length == 6){
        con.removeChild(con.lastChild)
    }
}

function over(){
    var rows = con.childNodes;
    if(rows.length ==5 && rows[rows.length-1].pass !== 1){
        fail();
    }
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].pass1 == 1) {
            fail();
        }
    }
}

function speedup() {
    speed += 2;
    if (speed == 20) {
      alert("你超神了");
    }
}

function move(){
    var con=$("con")
    var top = parseInt(window.getComputedStyle(con,null)["top"])

    if(speed + top>0){
        top = 0
    }else{
        top += speed
    }
    con.style.top = top + "px"
    over();
    if(top ==0){
        createrow();
        con.style.top = "-102px"
        delrow();
    }
}

function judge(ev) {
    if (
      ev.target.className.indexOf("black") == -1 &&
      ev.target.className.indexOf("cell") !== -1
    ) {
      ev.target.parentNode.pass1 = 1; //定义属性pass1，表示此行row的白块已经被点击
    }
  
    if (ev.target.className.indexOf("black") !== -1) {
      //点击目标元素 类名中包含 black 说明是黑块
      ev.target.className = "cell";
      ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
      score();
    }
}

function score() {
    var newscore = parseInt($("score").innerHTML) + 1; //分数加一
    $("score").innerHTML = newscore; //修改分数
    if (newscore % 10 == 0) {
      //当分数是10 的倍数时使用加速函数，越来越快
      speedup();
    }
}

function fail() {
    clearInterval(clock);
    flag = false;
    confirm("你的最终得分为 " + parseInt($("score").innerHTML));
    var con = $("con");
    con.innerHTML = "";
    $("score").innerHTML = 0;
    con.style.top = "-408px";
}
  
function init() {
    var con=$("con")
    flag = true;
    for (var i = 0; i < 4; i++) {
      createrow();
    }
    con.removeChild(con.lastChild)
    // 添加onclick事件
    $("wp").onclick = function (ev) {
      ev = ev || event;
      judge(ev);
    };
  
    // 定时器 每30毫秒调用一次move()
    clock = setInterval("move()", 30);
}

function start() {
    if (!flag) {
      init();
    } else {
      alert("游戏已经开始，无须再次点击！");
    }
}

  