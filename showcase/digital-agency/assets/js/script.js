$(document).ready(function(){


    $(window).scroll(function(){
        if($(document).scrollTop() > 50){
            $(".navbar").addClass("shrink");
        }
        else{
            $(".navbar").removeClass("shrink");
        }
    })

    $(".testimonial-slider").owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        nav: false
    })
})