$(document).ready(function(){
    $(window).resize(function(){
        let wid = $(window).width();

        if(wid <= 760){
            $(".work-content-item").addClass("res");
        }
        else{
            $(".work-content-item").removeClass("res");
        }
    })
})