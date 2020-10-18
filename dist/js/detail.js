console.log("aaaaaaaaa")
define(["jquery","jquery-cookie","startmove"],function(parabola,s){
    function magnifys() {
            $("#small").mouseenter(function () {
                $("#mark,#big").show();
              })
            $("#small").mouseleave(function () {
                $("#mark,#big").hide();
              })
              .mousemove(function(ev){
                var l = ev.pageX - $(this).offset().left - 157;
                l = Math.max(0, l);
                l = Math.min(l, 120);
                var t = ev.pageY - $(this).offset().top - 157;
                t = Math.max(0, t);
                t = Math.min(t, 281);
                $("#mark").css({
                  left: l,
                  top: t
                })
                $("#big img").css({
                  left: -2 * l,
                  top: -2 * t
                })
              })
          
      };

    return{
        magnifys
    }
})