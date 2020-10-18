console.log("sssss")
define(["parabola","jquery","jquery-cookie","startmove"],function(parabola,s){
    function download(){
        $.ajax({
            url:"../data/data1.json",
            success:function(arr){
                for(let i=0;i<arr.length;i++){

                    var childarr = arr[i].child
                    for(let j = 0;j<childarr.length;j++){
                        
                        $(`<dd>
                        <a href="javascript:">${childarr[j].title}</a>
                    </dd>`).appendTo(".hide-list");
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function move(){
        
        $(".contain-third").mouseenter (function con(){
            $("#third-nav").css("display","block")
        })
        $(".contain-third").mouseleave (function con(){
            $("#third-nav").css("display","none")
        })
    }

    function single(){
        $.ajax({
            url:"../data/data4.json",
            success:function(kiki){
                for(let i=0;i<kiki.length;i++){
                    console.log("sss")
                    $(`<li><a href="detail.html" target ="_blank"><img src="${kiki[i].img}"></a></li>`).appendTo(".g-list");
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    function logo(){
        $.ajax({
            url:"../data/data5.json",
            success:function(kiki){
                for(let i=0;i<kiki.length;i++){
                    console.log("sss")
                    $(`<li><a href="javascript:"><img src="${kiki[i].img}"></a></li>`).appendTo(".b-logo");
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }


    function banners(){
        const oBanner = document.querySelector(".banner");
        const oUl = document.querySelector(".banner .imgBox");
        const aBtns = document.querySelectorAll(".banner .pointBox li");
        const LeftANDRightBtn = document.querySelectorAll(".leftRightTabs a");
        let iNow = 1; //代表当前显示的图片的下标
        let timer = null;
        let isRunning = false; //代表当前动画是否在执行。
        //一开始就要调用一次
        timerInner();

        //点击按钮的时候，进行小圆点切换和轮播图的切换
        for (var i = 0; i < aBtns.length; i++) {
          aBtns[i].index = i;
          aBtns[i].onclick = function () {
            iNow = this.index + 1;
            tab();
          };
        }

        //自动轮播
        function timerInner() {
          timer = setInterval(function () {
            iNow++;
            tab();
          }, 2000);
        }

        //实现轮播效果
        function tab() {

          console.log(iNow);
          for (var i = 0; i < aBtns.length; i++) {
            aBtns[i].className = "";
            console.log("aaa")
          }
          if (iNow == aBtns.length + 1) {
            aBtns[0].className = "active";
          } else if (iNow == 0) {
            aBtns[aBtns.length - 1].className = "active";
          } else {
            aBtns[iNow - 1].className = "active";
          }

          //开始动画
          isRunning = true;
          startMove(oUl, { left: iNow * -1150 }, function () {
            //判断最后一张图片结束的时候
            if (iNow == aBtns.length + 1) {
              iNow = 1;
              oUl.style.left = "-1150px";
              //判断第一张图片的时候
            } else if (iNow == 0) {
              iNow = 3;
              oUl.style.left = iNow * -1150 + "px";
            }
            //这里动画结束
            isRunning = false;
          });
        }

        //给banner添加鼠标的移入和移出
        oBanner.onmouseenter = function () {
          clearInterval(timer);
        };
        oBanner.onmouseleave = function () {
          //重新启动动画
          timerInner();
        };

        //添加左右按钮的点击
        LeftANDRightBtn[0].onclick = function () {
          if (!isRunning) {
            iNow--;
            tab();
          }
          return false;
        };

        LeftANDRightBtn[1].onclick = function () {
          if (!isRunning) {
            iNow++;
            tab();
          }
          return false;
        };
    }
    return{
        download,
        move,
        single,
        logo,
        banners,
    }
})




