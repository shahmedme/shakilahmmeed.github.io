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
    $(window).scroll(function(){
        if($(document).scrollTop() > 50){
            $(".navbar").addClass("shrink");
        }
        else{
            $(".navbar").removeClass("shrink");
        }
    })
})