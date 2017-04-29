/* shrink navbar on scroll */
$(window).scroll(function () {
    const navbar = $('nav.navbar');
    if ($(document).scrollTop() > navbar.height()) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
});

const heroSliders = $('.hero-slider');
if (heroSliders.length > 0) {

    heroSliders.slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: false,
        verticalSwiping: false,
        arrows: false,
        autoplay: document.location.hostname !== 'localhost',
        autoplaySpeed: 5000,
    });
}


$(document).ready(function () {
    // Custom 
    var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
        var stickyHeight = sticky.outerHeight();
        var stickyTop = stickyWrapper.offset().top;
        if (scrollElement.scrollTop() >= stickyTop) {
            stickyWrapper.height(stickyHeight);
            sticky.addClass("is-sticky");
        }
        else {
            sticky.removeClass("is-sticky");
            stickyWrapper.height('auto');
        }
    };

    // Find all data-toggle="sticky-onscroll" elements
    $('[data-toggle="sticky-onscroll"]').each(function () {
        var sticky = $(this);
        var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
        sticky.before(stickyWrapper);
        sticky.addClass('sticky');

        // Scroll & resize events
        $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
            stickyToggle(sticky, stickyWrapper, $(this));
        });

        // On page load
        stickyToggle(sticky, stickyWrapper, $(window));
    });
});