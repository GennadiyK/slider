$(function(){


    var slider = $('.slider');
    var sliderItem = slider.find('.slider-item');
    var sliderItemWidth = sliderItem.outerWidth(true);
    var currentSlide = 0;
    var mrg = 0;
    slider.width(sliderItemWidth * sliderItem.length);

    $('.slider-b').on('click',function(e){
        prevNext(e);
    });

    function prevNext(e) {
        e.preventDefault();

        var elem = e.target;

        if(!$(elem).data("btn")) return;

        if($(elem).data("btn") == 'next') {
            next();

        } else if($(elem).data("btn") == 'prev') {
            prev();

        }

    };

    function next() {
        if(currentSlide < sliderItem.length - 3) {
            currentSlide++;
            slider.find('.current').removeClass('current');
            sliderItem.eq(currentSlide).addClass('current');
            mrg += sliderItemWidth;
            slider.css({
                'margin-left': '-' + mrg + 'px'
            });

        } else {
            currentSlide = 0;
            mrg = 0;
            slider.css({
                'margin-left': mrg + 'px'
            });
            slider.find('.current').removeClass('current');
            sliderItem.eq(currentSlide).addClass('current');
        }
    };

    function prev() {
        if(currentSlide != 0) {
            currentSlide--;
            slider.find('.current').removeClass('current');
            sliderItem.eq(currentSlide).addClass('current');
            mrg -= sliderItemWidth;
            slider.css({
                'margin-left': '-' + mrg + 'px'
            });
        } else {
            currentSlide = sliderItem.length - 3;
            mrg = slider.width() - (sliderItemWidth * currentSlide);
            slider.css({
                'margin-left': '-' + mrg + 'px'
            });
            slider.find('.current').removeClass('current');
            sliderItem.eq(currentSlide).addClass('current');
        }
    };

})