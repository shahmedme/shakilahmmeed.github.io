/*------------------------------------------------------------------
[Master Javascript]

Project Name: iChange Html Template
Version: 1.0.0
Author: Codeboxr
Website: http://codeboxr.com
Last Update: 06.06.2018
-------------------------------------------------------------------*/

"use strict";

jQuery(document).ready(function ($) {
    //counter section
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    //counter section end

    // sleek slider

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.slider-nav',
        arrows: false
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }]
    });



    //smooth scroll

    $('a.nav-link').smoothScroll({
        speed: 800
    });


    //Start Contact Form Validation And Ajax Submission
    //Local PATH
    var cbx_path = window.location.protocol + '//' + window.location.host;
    var pathArray = window.location.pathname.split('/');
    for (var i = 1; i < (pathArray.length - 1); i++) {
        cbx_path += '/';
        cbx_path += pathArray[i];
    }
    
    var $contactForm = $('form#cbx-contact-form');
    $contactForm.validate({
        submitHandler: function (form) {
            var $contactForm = $(form);
            $.ajax({
                url: cbx_path + '/php/contact.php',
                type: 'post',
                data: $contactForm.serialize(),
                success: function (ajaxResponse) {
                    try {
                        var ajaxResponse = $.parseJSON(ajaxResponse);


                        if (ajaxResponse.error) {
                            //for field error
                            $.each(ajaxResponse.error_field, function (i) {
                                if ($('label#' + ajaxResponse.error_field[i] + '-error').length == 0) {
                                    $('#' + ajaxResponse.error_field[i]).after('<label class="error" for="' + ajaxResponse.error_field[i] + '" id="' + ajaxResponse.error_field[i] + '-error"></label>');

                                }
                                $('label#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                            });
                        } else if (ajaxResponse.successmessage) {

                            //alert(ajaxResponse.successmessage);
                            //$( '.cbx-formalert' ).addClass( "alert alert-success" );
                            $('#cbx-formalert').addClass("alert alert alert-success").html(ajaxResponse.successmessage);
                            $contactForm[0].reset();
                        }
                    } catch (e) {
                        //consoe.log(e.message );
                        $contactForm[0].reset();
                    }
                },
                error: function (error) {
                    $contactForm[0].reset();
                }
            });

            return false;

        },

        rules: {
            'cbxname': {
                required: true
            },
            'cbxemail': {
                required: true
            },
            'cbxmessage': {
                required: true
            },
            'cbxsubject': {
                required: true
            }
        }
    }); //End Contact Form js



    $(window).on('scroll', function () {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('scroll');
        } else {
            $('nav').removeClass('scroll');
        }
    });


});
