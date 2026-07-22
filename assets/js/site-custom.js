/* ==================== 
Table of Content 
==================== 

1. Loader Animation
2. Featured Countdown 
3. Select Dropdown Globally
4. Donation Select
5. Select Light
6. Select Charity Home
7. On Scroll Header Animation
8. Search Popup
9. On Scroll Back To Top Arrow
10. Toggles
11. Animated Skill Bars
12. Animated Counter
13. Popup Gallery & Videos
*/

(function ($) {
    "use strict";
    

    function updateHeaderHeight() {
        const header = document.querySelector('header');
        // header.style.height = 'auto';
        const headerHeight = header.offsetHeight;
        header.style.height = headerHeight + 'px';
    }

    // window.addEventListener('DOMContentLoaded', updateHeaderHeight);
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('load', updateHeaderHeight);


    feather.replace({ 'stroke-width': 1.5 });

    $("[data-trigger]").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var offcanvas_id =  $(this).attr('data-trigger');
        $(offcanvas_id).toggleClass("show");
        $('html').toggleClass("offcanvas-active");
        $(".screen-overlay").toggleClass("show");
    });

    $(".navbar-toggler, .close-nav").on("click", function(e){
        $('html').toggleClass("sidenav-open");
    });

    // document.getElementById("yearText").innerHTML = new Date().getFullYear();
    document.addEventListener("DOMContentLoaded", function () {
        var yearElement = document.getElementById("yearText");
        if (yearElement) {
            yearElement.innerHTML = new Date().getFullYear();
        }
    });

    // Default Eid date (MM/DD/YYYY HH:MM:SS) -- can be overridden via window.EID_DATE or data-eid-date on #featured-cause
    window.EID_DATE = window.EID_DATE || '03/20/2026 00:00:00';


     // Dropdown Menu For Mobile
     $('.dropdown-menu a.dropdown-toggle-mob').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        //alert(hello);
        $(this).toggleClass('show');
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu > .dropdown-toggle-mob').removeClass("show");
            $('.dropdown-toggle-mob').removeClass("show");
        });

        return false;
    });


    $('#basicuse').jflickrfeed({
        limit: 6,
        qstrings: {
            id: '52617155@N08'
        },
        itemTemplate: '<li><a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
    });
    
    var custom_js = {

        // Loader Animation
        loader_site: function () {

            $(window).on("load",function () {
                $("#pageloader").delay(1200).fadeOut("slow");
                $(".loader-item").delay(700).fadeOut();
            });

        },

        // Featured Countdown
        featured_countdown: function () {
            if ($('#featured-cause').length) {
                var $fc = $('#featured-cause');
                var eidDate = $fc.data('eidDate') || window.EID_DATE || '03/20/2026 00:00:00';

                // Accept either MM/DD/YYYY or YYYY-MM-DD formats (with optional time)
                if (/^\d{4}-\d{2}-\d{2}/.test(eidDate)) {
                    var parts = eidDate.split(' ')[0].split('-');
                    var timePart = (eidDate.indexOf(' ') > -1) ? (' ' + eidDate.split(' ')[1]) : ' 00:00:00';
                    eidDate = parts[1] + '/' + parts[2] + '/' + parts[0] + timePart;
                }

                $fc.countdown({
                    date: eidDate, // e.g. 03/20/2026 00:00:00
                    offset: +2, // timezone offset
                    day: 'Day',
                    days: 'Days',
                    hideOnComplete: true
                });
            }
        },

        // Select Dropdown Globally
        select_globally: function () {
            if ($('select').length) {
                $('select').select2({
                    width: 'resolve',
                    theme: "form-dark",
                    minimumResultsForSearch: -1
                });
            }
        },

        // Donation Select
        select_donation: function () {
            if ($('.donation-select').length) {
                $('.donation-select').select2({
                    width: 'resolve',
                    theme: "form-dark",
                    placeholder: "Select Country",
                    minimumResultsForSearch: -1
                });
            }
        },

        // Select Light
        select_light: function () {
            if ($('.form-light-select').length) {
                $('.form-light-select').select2({
                    width: 'resolve',
                    theme: "form-light",
                    minimumResultsForSearch: -1
                });
            }
        },

        // Select Charity Home
        select_charity_home: function () {
            if ($('.home-charity').length) {
                $('.home-charity').select2({
                    width: 'resolve',
                    theme: "form-light",
                    placeholder: "Select Causes",
                    minimumResultsForSearch: -1
                });
            }
        },

        tooltip_globally: function () {
            if ($('[data-bs-toggle="tooltip"]').length) {
                $('[data-bs-toggle="tooltip"]').tooltip();
            }
        },

        header_anim: function () {
            if ($('.header-fullpage').length) {

                const headerElement = document.querySelector('header');
                var headerHeight = headerElement ? headerElement.offsetHeight : 0;

                $(window).scroll(function () {
                    if ($(this).scrollTop() >= headerHeight) {
                        $('.header-fullpage').addClass('fixed animated fadeInDown fixed-top');
                    } else {
                        $('.header-fullpage').removeClass('fixed animated fadeInDown fixed-top');
                    }
                });
            }
        },

        // Search Popup
        search_overlay: function () {
            if ($('.overlay-close').length) {

                $('#search_home, .overlay-close').on("click", function ($e) {
                    $e.preventDefault();
                    $(".overlay").toggleClass("open");
                });
            }
        },

        // On Scroll Back To Top Arrow
        back_to_top: function () {
            if ($('#mkdf-back-to-top').length) {

                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        $('#mkdf-back-to-top').addClass('on');
                    } else {
                        $('#mkdf-back-to-top').removeClass('on');
                    }
                });

                $('#mkdf-back-to-top').click(function () {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 600);
                    return false;
                });
            }
        },

        // Toggles
        toggle_accordion: function () {
            if ($('.toggle').length) {

                $('.toggle').click(function () {

                    $('.toggle').removeClass("arrow-down");

                    if (!$(this).next().hasClass('show')) {
                        $(this).parent().children('.collapse.show').collapse('hide');
                        $(this).toggleClass('arrow-down');

                    }
                    $(this).next().collapse('toggle');

                });
            }
        },

        // Animated Skill Bars  
        animated_skillbar: function () {
            if ($('.skillbar').length) {

                $('.skillbar').appear();
                $('.skillbar').on('appear', function () {
                    $(this).find('.skillbar-bar').animate({
                        width: $(this).attr('data-percent')
                    }, 3000);
                });
            }
        },

        // Animated Counter
        animated_counter: function () {
            if ($('.counter').length) {

                $('.counter').counterUp({
                    delay: 10,
                    time: 1000
                });
            }
        },

        // Popup Gallery & Videos
        magnific_popup: function () {
            if ($('.popup-video').length) {

                $('.popup-video').magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: true,
                    fixedContentPos: true
                });

                $('.img-gallery').each(function () { // the containers for all your galleries
                    $(this).magnificPopup({
                        delegate: 'a', // the selector for gallery item
                        type: 'image',
                        gallery: {
                            enabled: true, // set to true to enable gallery

                            preload: [0, 2], // read about this option in next Lazy-loading section

                            navigateByImgClick: true,

                            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

                            tPrev: 'Previous (Left arrow key)', // title for left button
                            tNext: 'Next (Right arrow key)', // title for right button
                            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
                        }
                    });
                });
            }
        },

        // Carousel Home Testimonials
        carousel_home_testimonials: function () {
            if ($('#home-client-testimonials').length) {

                $("#home-client-testimonials").owlCarousel({
                    items: 2,
                    margin: 30,
                    loop: true,
                    nav: true,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 1,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 3,
                            loop: true,
                        },
                        1200: {
                            items: 3,
                            loop: true,
                        }
                    }
                });
            }
        },

        // Carousel Donators
        carousel_our_donator: function () {
            if ($('#our-donator-slider-warp').length) {

                $("#our-donator-slider-warp").owlCarousel({
                    items: 2,
                    margin: 30,
                    loop: true,
                    nav: false,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 2,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 3,
                            loop: true,
                        },
                        1200: {
                            items: 2,
                            loop: true,
                        }
                    }
                });

            }
        },

        // Carousel Home Clients
        carousel_home_clients: function () {
            if ($('#home-clients').length) {

                $("#home-clients").owlCarousel({
                    items: 2,
                    margin: 30,
                    loop: true,
                    nav: false,
                    slideBy: 1,
                    dots: true,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 2,
                        },
                        600: {
                            items: 3,
                        },
                        767: {
                            items: 4,
                        },
                        1000: {
                            items: 5,
                            loop: true,
                        },
                        1200: {
                            items: 5,
                            loop: true,
                        }
                    }
                });

            }
        },

        // Carousel Home Blog Post
        carousel_home_blog: function () {
            if ($('#home-blog-post').length) {

                $("#home-blog-post").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: true,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 2,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 2.5,
                            loop: true,
                        },
                        1200: {
                            items: 3,
                            loop: true,
                        },
                        1920: {
                            items: 3,
                            loop: true,
                        }
                    }
                });

            }
        },

        // Carousel Second Home Blog Post
        carousel_home_second_blog: function () {
            if ($('#home-second-blog-post').length) {

                $("#home-second-blog-post").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: true,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 1,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 3,
                            loop: true,
                        },
                        1200: {
                            items: 3,
                            loop: true,
                        },
                        1920: {
                            items: 3,
                            loop: true,
                        }
                    }
                });

            }
        },

        // Carousel Sidebar Causes
        carousel_aside_causes: function () {
            if ($('#sidebar-causes').length) {

                $("#sidebar-causes").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: false,
                    slideBy: 1,
                    dots: true,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                });

            }
        },

        // Carousel Home Second Causes
        carousel_home_second_causes: function () {
            if ($('#home-second-causes').length) {

                $("#home-second-causes").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: false,
                    slideBy: 1,
                    dots: true,
                    center: false,
                    autoplay: true,
                    autoheight: false,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 1,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 3,
                            loop: true,
                            slideBy: 3,
                        }
                    }
                });

            }
        },

        // Carousel Home Second Events
        carousel_home_second_events: function () {
            if ($('#home-second-events').length) {

                $("#home-second-events").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: true,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: true,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'],
                    responsive: {
                        320: {
                            items: 1,
                        },
                        600: {
                            items: 1,
                        },
                        767: {
                            items: 2,
                        },
                        1000: {
                            items: 3,
                            loop: true,
                        }
                    }
                });

            }
        },

        // Carousel Home Second Testimonials
        carousel_home_second_testimonials: function () {
            if ($('#home-second-testimonials').length) {

                $("#home-second-testimonials").owlCarousel({
                    items: 1,
                    margin: 30,
                    loop: true,
                    nav: true,
                    slideBy: 1,
                    dots: false,
                    center: false,
                    autoplay: false,
                    autoheight: true,
                    navText: [
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>']
                });

            }
        },

        // Carousel Home Second Testimonials
        contact_form: function () {
            if ($('#contact_form').length) {

                $("#contact_form").validate({
                    meta: "validate",
                    submitHandler: function (form) {
                        var s_name = $("#name").val();
                        var s_lastname = $("#lastname").val();
                        var s_email = $("#email").val();
                        var s_phone = $("#phone").val();
                        var s_comment = $("#comment").val();
                        var subject = "Contact from Al Buthaina website";
                        var body = "Name: " + s_name + " " + s_lastname + "\nEmail: " + s_email + "\nPhone: " + s_phone + "\n\nMessage:\n" + s_comment;
                        var whatsapp = "https://wa.me/256745630373?text=" + encodeURIComponent(subject + "\n\n" + body);
                        window.location.href = whatsapp;
                        $('#sucessmessage').html('<p class="text-success">WhatsApp will open with your message ready to send to +256 745 630 373.</p>');
                        $('#contact_form').hide();
                        return false;
                    },
                    /* */
                    rules: {
                        name: "required",

                        lastname: "required",
                        // simple rule, converted to {required:true}
                        email: { // compound rule
                            required: true,
                            email: true
                        },
                        phone: {
                            required: true,
                        },
                        comment: {
                            required: true
                        }
                    },
                    messages: {
                        name: "Please enter your name.",
                        lastname: "Please enter your last name.",
                        email: {
                            required: "Please enter email.",
                            email: "Please enter valid email"
                        },
                        phone: "Please enter a phone.",
                        comment: "Please enter your message."
                    },
                });

            }
        },


        initializ: function () {

            this.featured_countdown();
            this.select_globally();
            this.select_donation();
            this.select_light();
            this.select_charity_home();
            //this.mobile_dropdown();
            this.tooltip_globally();
            this.header_anim();
            this.search_overlay();
            this.back_to_top();
            this.toggle_accordion();
            this.animated_skillbar();
            this.animated_counter();
            this.magnific_popup();
            this.carousel_home_testimonials();
            this.carousel_our_donator();
            this.carousel_home_clients();
            this.carousel_home_blog();
            this.carousel_home_second_blog();
            this.carousel_aside_causes();
            this.carousel_home_second_causes();
            this.carousel_home_second_events();
            this.carousel_home_second_testimonials();
            this.contact_form();

        }

    }

    /* ---------------------------------------------
    Document ready function
    --------------------------------------------- */
    $(function () {

        custom_js.loader_site();
        custom_js.initializ();
    });

 /* ============================================
   Language & Currency Switcher Functionality
   ============================================ */

    // Language Data - Comprehensive translations
    const translations = {
        'en': {
            'donate': 'Donate',
            'donation': 'Donation',
            'donation_policy': '100% Donation Policy',
            'quran_verse': 'Indeed, those men and women who give charity and lend to Allah a goodly loan, it will be multiplied for them. — Quran 57:18',
            'support_our': 'Support Our',
            'ramadan_projects': 'Ramadan Projects',
            'charity_imaan': 'Charity rooted in Imaan.',
            'iftar_meal': 'Iftar Per Meal',
            'quran_per': 'Quran Per Quran',
            'food_pack': 'Food Pack Per Family',
            'sacrifice_animal': 'Sacrifice Per Animal',
            'water_well': 'Water Well Per Village',
            'masjid_province': 'Masjid Per Province',
            'donation_methods': 'Donation Methods',
            'org_name': 'Organization',
            'bank_details': 'Bank Account',
            'home': 'Home',
            'about': 'About Us',
            'causes': 'Causes',
            'events': 'Events',
            'blog': 'Blog',
            'contact': 'Contact',
            'join_us': 'Join Us',
            'volunteer': 'Volunteer',
            'welcome': 'Welcome To Raise Hope',
            'small_actions': 'Small Actions Lead To Big changes',
            'help_us_now': 'Help Us Now',
            'more_causes': 'More Recent Causes',
            'view_all': 'View All Causes',
            'about_title': 'About Us',
            'our_mission': 'Our Mission',
            'our_vision': 'Our Vision',
            'team': 'Our Team',
            'testimonials': 'What People Say',
            'faqs': 'Frequently Asked Questions',
            'events_title': 'Upcoming Events',
            'blog_title': 'Latest News',
            'contact_us': 'Contact Us',
            'send_message': 'Send Message',
            'name': 'Name',
            'email': 'Email',
            'message': 'Message',
            'submit': 'Submit',
            'phone': 'Phone',
            'address': 'Address',
            'quick_links': 'Quick Links',
            'follow_us': 'Follow Us',
            'copyright': 'All rights reserved',
            'search': 'Search',
            'donate_now': 'Donate Now',
            'learn_more': 'Learn More',
            'read_more': 'Read More'
        },
        'es': {
            'donate': 'Donar',
            'donation': 'Donación',
            'donation_policy': 'Política 100% Donación',
            'quran_verse': 'En verdad, aquellos hombres y mujeres que dan caridad y prestan a Allah un buen préstamo, se les multiplicará. — Corán 57:18',
            'support_our': 'Apoya Nuestros',
            'ramadan_projects': 'Proyectos de Ramadán',
            'charity_imaan': 'Caridad arraigada en Imaan.',
            'iftar_meal': 'Iftar Por Comida',
            'quran_per': 'Corán Por Corán',
            'food_pack': 'Paquete de Alimentos Por Familia',
            'sacrifice_animal': 'Sacrificio Por Animal',
            'water_well': 'Pozo Por Pueblo',
            'masjid_province': 'Masjid Por Provincia',
            'donation_methods': 'Métodos de Donación',
            'org_name': 'Organización',
            'bank_details': 'Cuenta Bancaria',
            'home': 'Inicio',
            'about': 'Sobre Nosotros',
            'causes': 'Causas',
            'events': 'Eventos',
            'blog': 'Blog',
            'contact': 'Contacto',
            'join_us': 'Únete a Nosotros',
            'volunteer': 'Voluntario',
            'welcome': 'Bienvenido a Raise Hope',
            'small_actions': 'Pequeñas acciones conducen a grandes cambios',
            'help_us_now': 'Ayúdanos ahora',
            'more_causes': 'Causas más recientes',
            'view_all': 'Ver todas las causas',
            'about_title': 'Sobre Nosotros',
            'our_mission': 'Nuestra Misión',
            'our_vision': 'Nuestra Visión',
            'team': 'Nuestro Equipo',
            'testimonials': 'Lo que la gente dice',
            'faqs': 'Preguntas Frecuentes',
            'events_title': 'Próximos Eventos',
            'blog_title': 'Últimas Noticias',
            'contact_us': 'Contáctenos',
            'send_message': 'Enviar Mensaje',
            'name': 'Nombre',
            'email': 'Correo Electrónico',
            'message': 'Mensaje',
            'submit': 'Enviar',
            'phone': 'Teléfono',
            'address': 'Dirección',
            'quick_links': 'Enlaces Rápidos',
            'follow_us': 'Síguenos',
            'copyright': 'Todos los derechos reservados',
            'search': 'Buscar',
            'donate_now': 'Donar Ahora',
            'learn_more': 'Aprender Más',
            'read_more': 'Leer Más'
        },
        'fr': {
            'donate': 'Faire un don',
            'donation': 'Don',
            'donation_policy': 'Politique 100% Don',
            'quran_verse': 'Ceux qui font l\'aumône et prêtent à Allah un beau prêt, cela leur sera multiplié. — Coran 57:18',
            'support_our': 'Soutenez Nos',
            'ramadan_projects': 'Projets Ramadan',
            'charity_imaan': 'Charité enracinée dans l\'Imaan.',
            'iftar_meal': 'Iftar Par Repas',
            'quran_per': 'Coran Par Coran',
            'food_pack': 'Colis Alimentaire Par Famille',
            'sacrifice_animal': 'Sacrifice Par Animal',
            'water_well': 'Puits Par Village',
            'masjid_province': 'Masjid Par Province',
            'donation_methods': 'Méthodes de Don',
            'org_name': 'Organisation',
            'bank_details': 'Compte Bancaire',
            'home': 'Accueil',
            'about': 'À propos',
            'causes': 'Causes',
            'events': 'Événements',
            'blog': 'Blog',
            'contact': 'Contact',
            'join_us': 'Rejoignez-nous',
            'volunteer': 'Bénévole',
            'welcome': 'Bienvenue à Raise Hope',
            'small_actions': 'Les petites actions mènent à de grands changements',
            'help_us_now': 'Aidez-nous maintenant',
            'more_causes': 'Causes plus récentes',
            'view_all': 'Voir toutes les causes',
            'about_title': 'À Propos de Nous',
            'our_mission': 'Notre Mission',
            'our_vision': 'Notre Vision',
            'team': 'Notre Équipe',
            'testimonials': 'Ce que les gens disent',
            'faqs': 'Questions Fréquemment Posées',
            'events_title': 'Événements à Venir',
            'blog_title': 'Dernières Nouvelles',
            'contact_us': 'Nous Contacter',
            'send_message': 'Envoyer un Message',
            'name': 'Nom',
            'email': 'Email',
            'message': 'Message',
            'submit': 'Soumettre',
            'phone': 'Téléphone',
            'address': 'Adresse',
            'quick_links': 'Liens Rapides',
            'follow_us': 'Suivez-nous',
            'copyright': 'Tous droits réservés',
            'search': 'Rechercher',
            'donate_now': 'Faire un Don Maintenant',
            'learn_more': 'En Savoir Plus',
            'read_more': 'Lire la Suite'
        },
        'ar': {
            'donate': 'تبرع',
            'donation': 'التبرع',
            'donation_policy': 'سياسة 100٪ تبرع',
            'quran_verse': 'إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضاً حَسَناً يُضَاعَفُ لَهُمْ — القرآن 57:18',
            'support_our': 'ادعم',
            'ramadan_projects': 'مشاريع رمضان',
            'charity_imaan': 'صدقة متجذرة في الإيمان.',
            'iftar_meal': 'إفطار لكل وجبة',
            'quran_per': 'قرآن بقرآن',
            'food_pack': 'حزمة غذاء لكل عائلة',
            'sacrifice_animal': 'أضحية لكل حيوان',
            'water_well': 'بئر ماء لكل قرية',
            'masjid_province': 'مسجد لكل محافظة',
            'donation_methods': 'طرق التبرع',
            'org_name': 'المؤسسة',
            'bank_details': 'الحساب البنكي',
            'home': 'الرئيسية',
            'about': 'حول',
            'causes': 'الأسباب',
            'events': 'الأحداث',
            'blog': 'مدونة',
            'contact': 'اتصل',
            'join_us': 'انضم إلينا',
            'volunteer': 'متطوع',
            'welcome': 'أهلا وسهلا برفع الأمل',
            'small_actions': 'الإجراءات الصغيرة تؤدي إلى تغييرات كبيرة',
            'help_us_now': 'ساعدنا الآن',
            'more_causes': 'الأسباب الأكثر حداثة',
            'view_all': 'عرض جميع الأسباب',
            'about_title': 'عن ن‌ا',
            'our_mission': 'مهمتنا',
            'our_vision': 'رؤيتنا',
            'team': 'فريقنا',
            'testimonials': 'ما يقوله الناس',
            'faqs': 'الأسئلة الشائعة',
            'events_title': 'الأحداث القادمة',
            'blog_title': 'آخر الأخبار',
            'contact_us': 'اتصل بنا',
            'send_message': 'إرسال رسالة',
            'name': 'الاسم',
            'email': 'البريد الإلكتروني',
            'message': 'الرسالة',
            'submit': 'إرسال',
            'phone': 'هاتف',
            'address': 'العنوان',
            'quick_links': 'روابط سريعة',
            'follow_us': 'تابعنا',
            'copyright': 'جميع الحقوق محفوظة',
            'search': 'بحث',
            'donate_now': 'تبرع الآن',
            'learn_more': 'تعرف على المزيد',
            'read_more': 'اقرأ أكثر'
        },
        'sw': {
            'donate': 'Donate',
            'donation': 'Mchango',
            'donation_policy': 'Sera 100% Mchango',
            'quran_verse': 'Hakika wale wanaume na wanawake wanaotoa sadaka na kukopesha Mwenyezi Mungu mkopo mzuri, itazidishwa kwao. — Quran 57:18',
            'support_our': 'Tusaidie',
            'ramadan_projects': 'Miradi ya Ramadhan',
            'charity_imaan': 'Sadaka imejikita katika Imaan.',
            'iftar_meal': 'Iftar Kwa Kilo Cha Chakula',
            'quran_per': 'Quran Kwa Quran',
            'food_pack': 'Kifurushi Cha Chakula Kwa Familia',
            'sacrifice_animal': 'Dhabihu Kwa Mnyama',
            'water_well': 'Kisima Kwa Kijiji',
            'masjid_province': 'Msikiti Kwa Mkoa',
            'donation_methods': 'Njia za Mchango',
            'org_name': 'Shirika',
            'bank_details': 'Akaunti ya Benki',
            'home': 'Nyumbani',
            'about': 'Kuhusu Sisi',
            'causes': 'Sababu',
            'events': 'Matukio',
            'blog': 'Blogi',
            'contact': 'Wasiliana',
            'join_us': 'Jiunge Nasi',
            'volunteer': 'Kujitolea',
            'welcome': 'Karibu kwa Kuinua Tumaini',
            'small_actions': 'Hatua ndogo zinasababisha mabadiliko makubwa',
            'help_us_now': 'Tutusaidie Sasa',
            'more_causes': 'Sababu za Karibuni',
            'view_all': 'Angalia Sababu Zote',
            'about_title': 'Kuhusu Sisi',
            'our_mission': 'Lengo Letu',
            'our_vision': 'Macho Yetu',
            'team': 'Timu Yetu',
            'testimonials': 'Watu Wanasema Nini',
            'faqs': 'Maswali Yanayoulizwa Mara Kwa Mara',
            'events_title': 'Matukio Yanayokuja',
            'blog_title': 'Habari Za Hivi Karibuni',
            'contact_us': 'Wasiliana Nasi',
            'send_message': 'Tuma Ujumbe',
            'name': 'Jina',
            'email': 'Barua Pepe',
            'message': 'Ujumbe',
            'submit': 'Tuma',
            'phone': 'Simu',
            'address': 'Anwani',
            'quick_links': 'Viungo Vya Haraka',
            'follow_us': 'Ufuate',
            'copyright': 'Haki zote zimehifadhiwa',
            'search': 'Tafuta',
            'donate_now': 'Donate Sasa',
            'learn_more': 'Jifunze Zaidi',
            'read_more': 'Soma Zaidi'
        },
        'ja': {
            'donate': '寄付',
            'donation': '寄付',
            'donation_policy': '100%寄付ポリシー',
            'quran_verse': '本当に、喜捨し、アッラーに良い貸付をする男女には、倍にして返される。— クルアーン 57:18',
            'support_our': '私たちの',
            'ramadan_projects': 'ラマダンプロジェクト',
            'charity_imaan': '信仰に根ざした慈善。',
            'iftar_meal': '1食あたりのイフタール',
            'quran_per': '1冊あたりのクルアーン',
            'food_pack': '家族あたりの食料パック',
            'sacrifice_animal': '1頭あたりの犠牲',
            'water_well': '村あたりの井戸',
            'masjid_province': '州あたりのマスジド',
            'donation_methods': '寄付方法',
            'org_name': '団体名',
            'bank_details': '銀行口座',
            'home': 'ホーム',
            'about': '私たちについて',
            'causes': '活動',
            'events': 'イベント',
            'blog': 'ブログ',
            'contact': 'お問い合わせ',
            'join_us': '参加する',
            'volunteer': 'ボランティア',
            'donate_now': '今すぐ寄付',
            'learn_more': '詳しく見る',
            'read_more': '続きを読む'
        }
    };
    
    // Exchange rates
    const exchangeRates = {
        'USD': 1,
        'EUR': 0.92,
        'GBP': 0.79,
        'CAD': 1.35,
        'AUD': 1.52,
        'JPY': 150.5,
        'INR': 83.2,
        'AED': 3.67,
        'UGX': 3700,
        'KES': 160.5
    };
    
    // Currency symbols
    const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'CAD': 'CA$',
        'AUD': 'A$',
        'JPY': '¥',
        'INR': '₹',
        'AED': 'AED',
        'UGX': 'USh',
        'KES': 'KSh'
    };
    
    // Get language name from code
    function getLanguageName(code) {
        const languageNames = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ar': 'العربية',
            'sw': 'Kiswahili',
            'ja': '日本語',
            'zh': '中文',
            'ru': 'Русский',
            'hi': 'हिन्दी'
        };
        return languageNames[code] || 'English';
    }
    
    // Load saved preferences
    function loadPreferences() {
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
        
        // Update dropdown display
        $('.language-text').text(getLanguageName(savedLang));
        $('.currency-text').text(savedCurrency);
        
        // Apply language if translation exists
        if (translations[savedLang]) {
            applyTranslations(savedLang);
        }
        
        // Apply currency conversion
        applyCurrencyConversion(savedCurrency);
    }
    
    // Apply translations
    function applyTranslations(lang) {
        const langData = translations[lang];
        if (!langData) return;
        
        // 1. Update all elements with data-translate attribute
        $('[data-translate]').each(function() {
            const key = $(this).data('translate');
            if (langData[key]) {
                if ($(this).children().length === 0) {
                    $(this).text(langData[key]);
                } else {
                    $(this).contents().each(function() {
                        if (this.nodeType === 3) {
                            this.textContent = langData[key];
                        }
                    });
                }
            }
        });
        
        // 2. Text replacement mapping for common UI elements
        const textMappings = {
            'en': {
                'Donate': 'Donate',
                'Donation': 'Donation',
                'Home': 'Home',
                'About Us': 'About Us',
                'Causes': 'Causes',
                'Events': 'Events',
                'Blog': 'Blog',
                'Contact': 'Contact',
                'Join Us': 'Join Us',
                'Volunteer': 'Volunteer',
                'Contact Us': 'Contact Us',
                'Send Message': 'Send Message',
                'Learn More': 'Learn More',
                'Read More': 'Read More',
                'Donate Now': 'Donate Now'
            },
            'es': {
                'Donate': 'Donar',
                'Donation': 'Donación',
                'Home': 'Inicio',
                'About Us': 'Sobre Nosotros',
                'Causes': 'Causas',
                'Events': 'Eventos',
                'Blog': 'Blog',
                'Contact': 'Contacto',
                'Join Us': 'Únete a Nosotros',
                'Volunteer': 'Voluntario',
                'Contact Us': 'Contáctenos',
                'Send Message': 'Enviar Mensaje',
                'Learn More': 'Aprender Más',
                'Read More': 'Leer Más',
                'Donate Now': 'Donar Ahora'
            },
            'fr': {
                'Donate': 'Faire un don',
                'Donation': 'Don',
                'Home': 'Accueil',
                'About Us': 'À propos',
                'Causes': 'Causes',
                'Events': 'Événements',
                'Blog': 'Blog',
                'Contact': 'Contact',
                'Join Us': 'Rejoignez-nous',
                'Volunteer': 'Bénévole',
                'Contact Us': 'Nous Contacter',
                'Send Message': 'Envoyer un Message',
                'Learn More': 'En Savoir Plus',
                'Read More': 'Lire la Suite',
                'Donate Now': 'Faire un Don Maintenant'
            },
            'ar': {
                'Donate': 'تبرع',
                'Donation': 'التبرع',
                'Home': 'الرئيسية',
                'About Us': 'حول',
                'Causes': 'الأسباب',
                'Events': 'الأحداث',
                'Blog': 'مدونة',
                'Contact': 'اتصل',
                'Join Us': 'انضم إلينا',
                'Volunteer': 'متطوع',
                'Contact Us': 'اتصل بنا',
                'Send Message': 'إرسال رسالة',
                'Learn More': 'تعرف على المزيد',
                'Read More': 'اقرأ أكثر',
                'Donate Now': 'تبرع الآن'
            },
            'sw': {
                'Donate': 'Donate',
                'Donation': 'Mchango',
                'Home': 'Nyumbani',
                'About Us': 'Kuhusu Sisi',
                'Causes': 'Sababu',
                'Events': 'Matukio',
                'Blog': 'Blogi',
                'Contact': 'Wasiliana',
                'Join Us': 'Jiunge Nasi',
                'Volunteer': 'Kujitolea',
                'Contact Us': 'Wasiliana Nasi',
                'Send Message': 'Tuma Ujumbe',
                'Learn More': 'Jifunze Zaidi',
                'Read More': 'Soma Zaidi',
                'Donate Now': 'Donate Sasa'
            }
        };
        
        const mapping = textMappings[lang];
        if (!mapping) return;
        
        // Walk through all text nodes and replace matching text
        function walkAndReplace(node) {
            if (node.nodeType === 3) { // Text node
                let text = node.textContent;
                for (const [original, translated] of Object.entries(mapping)) {
                    text = text.replace(new RegExp('\\b' + original + '\\b', 'g'), translated);
                }
                node.textContent = text;
            } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                // Element node (but not script or style)
                for (let i = 0; i < node.childNodes.length; i++) {
                    walkAndReplace(node.childNodes[i]);
                }
            }
        }
        
        // Apply replacements to body
        walkAndReplace(document.body);
    }
    
    // Apply currency conversion
    function applyCurrencyConversion(currency) {
        const rate = exchangeRates[currency] || 1;
        const symbol = currencySymbols[currency] || '$';
        
        console.log('Applying currency:', currency, 'Rate:', rate, 'Symbol:', symbol);
        
        // Update donation form amounts
        $('input[name="Amount"] + label').each(function() {
            const $label = $(this);
            const originalText = $label.text();
            const amountMatch = originalText.match(/\$(\d+)/);
            
            if (amountMatch) {
                const usdAmount = parseInt(amountMatch[1]);
                const convertedAmount = Math.round(usdAmount * rate);
                $label.text(symbol + convertedAmount);
                console.log('Converted:', originalText, 'to', symbol + convertedAmount);
            }
        });
        
        // Update custom amount placeholder
        $('input[placeholder*="$"]').each(function() {
            const $input = $(this);
            const placeholder = $input.attr('placeholder');
            if (placeholder && placeholder.includes('$')) {
                $input.attr('placeholder', placeholder.replace('$', symbol));
            }
        });
        
        // Update amounts in causes/progress bars (replace every $ amount in the string)
        $('.raised-progress .clearfix').each(function() {
            const $element = $(this);
            let text = $element.text();
            const regex = /\$([\d,]+)/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const usdAmount = parseFloat(match[1].replace(/,/g, ''));
                const convertedAmount = Math.round(usdAmount * rate);
                text = text.replace(match[0], symbol + convertedAmount.toLocaleString());
            }
            $element.text(text);
        });

        // Featured cause timer "X pledged of Y" – use data-usd so switching currency works
        $('.featured-cause-timer h3 strong[data-usd]').each(function() {
            const $el = $(this);
            const usd = parseFloat($el.data('usd'));
            if (!isNaN(usd)) {
                const converted = Math.round(usd * rate);
                $el.text(symbol + converted.toLocaleString());
            }
        });

        // Pledge cards (Cow, Goat, Sheep) and pledged-items – replace all $ amounts
        $('.pledge-cards-section .figma-detail-row__value, .pledge-cards-section .card-title, .pledged-items').each(function() {
            const $el = $(this);
            let text = $el.html();
            if (typeof text !== 'string') return;
            const regex = /\$([\d,]+)/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                const usdAmount = parseFloat(match[1].replace(/,/g, ''));
                const converted = Math.round(usdAmount * rate);
                text = text.replace(match[0], symbol + converted.toLocaleString());
            }
            $el.html(text);
        });

        // Total Funds Committed counter – use data-original-usd so switching currency works
        $('.funds-committed .counter').each(function() {
            const $el = $(this);
            const usd = parseFloat($el.data('original-usd')) || parseFloat($el.text().replace(/,/g, ''));
            if (!isNaN(usd)) {
                if (!$el.data('original-usd')) $el.data('original-usd', usd);
                const converted = Math.round(usd * rate);
                $el.text(converted.toLocaleString());
            }
        });

        // Donation tier list (Iftar, Quran, Food Pack, etc.) – use data-usd so currency switch updates them
        $('.donation-tier-amount[data-usd], .list-group-item strong[data-usd]').each(function() {
            const $el = $(this);
            const usd = parseFloat($el.data('usd'));
            if (!isNaN(usd)) {
                const converted = Math.round(usd * rate);
                $el.text(symbol + (converted >= 1000 ? converted.toLocaleString() : converted));
            }
        });
    }
    
    // Show notification
    function showNotification(message) {
        // Remove any existing notifications
        $('.switcher-notification').remove();
        
        const $notification = $('<div class="switcher-notification">' + message + '</div>');
        $('body').append($notification);
        
        setTimeout(() => {
            $notification.css('transform', 'translateX(0)');
        }, 10);
        
        setTimeout(() => {
            $notification.css('transform', 'translateX(120%)');
            setTimeout(() => {
                $notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Language dropdown click handler
    $(document).on('click', '[data-lang]', function(e) {
        e.preventDefault();
        const lang = $(this).data('lang');
        const langName = getLanguageName(lang);
        
        console.log('Language selected:', lang, langName);
        
        $('.language-text').text(langName);
        localStorage.setItem('preferredLanguage', lang);
        
        if (translations[lang]) {
            applyTranslations(lang);
        }
        
        showNotification('Language changed to ' + langName);
        
        // Close dropdown
        $(this).closest('.dropdown-menu').prev('.btn').dropdown('toggle');
        // Reload the page to update all content
        setTimeout(function() {
            location.reload();
        }, 500);
    });
    
    // Currency dropdown click handler
    $(document).on('click', '[data-currency]', function(e) {
        e.preventDefault();
        const currency = $(this).data('currency');
        
        console.log('Currency selected:', currency);
        
        $('.currency-text').text(currency);
        localStorage.setItem('preferredCurrency', currency);
        applyCurrencyConversion(currency);
        
        showNotification('Currency changed to ' + currency);
        
        // Close dropdown
        $(this).closest('.dropdown-menu').prev('.btn').dropdown('toggle');
        // Reload the page to update all content
        setTimeout(function() {
            location.reload();
        }, 500);
    });
    
    // Initialize function
    function initializeLanguageCurrency() {
        // Load preferences on page load
        loadPreferences();
        
        // Make sure dropdowns work
        $('.language-dropdown, .currency-dropdown').on('show.bs.dropdown', function() {
            console.log('Dropdown opening');
        });
        
        console.log('Language/Currency switcher initialized');
    }
    
        // Initialize when document is ready
        $(document).ready(function() {
            initializeLanguageCurrency();
        });
    })(jQuery);
