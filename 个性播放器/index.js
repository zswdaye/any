window.onload = function(){
    var btn = document.getElementsByClassName("play")[0]
    var mymusic = document.getElementById("myMusic")
    var txt = document.getElementById("txt")
    var con = document.getElementsByClassName("content")[0]
    var mark = true


    btn.onclick = function(){   
        if(mark){           
            this.className += " rotate"
            mymusic.play()
            mark = false
        }else{
            this.className = "play"
            mymusic.pause()
            mark = true
        }
    }
    var lrc = txt.value
    var lrcArr = lrc.split("[")
    var html = ""
    for(var i = 0;i<lrcArr.length;i++){
        var arr = lrcArr[i].split("]")
        var time = arr[0].split(".")
        var timer = time[0].split(":")
        var s = timer[0] *60 + timer[1] * 1
        var text = arr[1]
        if(text){
            html += "<p id=" + s +">" + text + "</p>"
        }

        con.innerHTML = html
    }

    var num = 0
    var oP = con.getElementsByTagName("p")
    mymusic.addEventListener("timeupdate",function(){
        var duration = parseInt(this.duration)
        var curTime = parseInt(this.currentTime)
        if(duration==curTime){
            btn.className = "play"
            mark = true
            con.style.top =0
            num = 0
            return false
        }
        if(document.getElementById(curTime)){         
            for(var i=0;i<oP.length;i++){
                oP[i].style.cssText = "font-size: 15px;"
            }  
            document.getElementById(curTime).style.cssText = "background: linear-gradient(-3deg,#eebd89 0%,#d13abd 100%);-webkit-background-clip: text;color: transparent;font-size: 20px;"
            if(oP[ 7 + num].id == curTime){
                con.style.top = -20*num+"px"
                num++
            }
        }       
    },false)

    
}
