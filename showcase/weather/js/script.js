$(document).ready(function(){
    $(window).scroll(function(){
        if($(document).scrollTop() > 50 && $(document).scrollTop() < 600){
            $("nav").removeClass("shrink-down");
            $("nav").addClass("shrink");
        }
        else if($(document).scrollTop() >= 600){ 
            $("nav").removeClass("shrink");
            $("nav").addClass("shrink-down");
        }
        else{
            $("nav").removeClass("shrink");
        }
    })
})