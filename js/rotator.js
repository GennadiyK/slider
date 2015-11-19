
    function Slider(options) {
        var elem = options.elem;
        var slider;

        //var slider = elem.find('[data-slider="slider"]');
        //var sliderItem = elem.find('[data-slider="item"]');
        //var sliderItemWidth = sliderItem.outerWidth(true);
        //var currentSlide = 0;
        //var mrg = 0;
        //slider.width(sliderItemWidth * sliderItem.length);

        function getElem(){
            if(!slider) render();
            return slider;

        };

        function render(){
            slider = document.createElement('div');
            slider.className = 'slider-wrap';
            renderItes();

        };


        function renderItes(){
            var sliderList = document.createElement('ul');
                sliderList.className = 'slider-list';
            var items = options.items || [];

            items.forEach(function(item){
                var li = document.createElement('li');
                li.innerHTML = item;
                $(sliderList).append(li);
            });
            $(elem).append(sliderList);
        };
        //
        //elem.on('click', function (e) {
        //    prevNext(e);
        //    toggleClass();
        //});
        //
        //function prevNext(e) {
        //    e.preventDefault();
        //
        //    var eventElem = e.target;
        //
        //    if (!$(eventElem).data("slider")) return;
        //
        //    if ($(eventElem).data("slider") == 'btnNext') {
        //        next();
        //
        //    } else if ($(eventElem).data("slider") == 'btnPrev') {
        //        prev();
        //
        //    }
        //
        //};
        //
        //function next() {
        //    if (currentSlide < sliderItem.length - 3) {
        //        currentSlide++;
        //
        //        mrg += sliderItemWidth;
        //        slider.css({
        //            'margin-left': '-' + mrg + 'px'
        //        });
        //
        //    } else {
        //        currentSlide = 0;
        //        mrg = 0;
        //        slider.css({
        //            'margin-left': mrg + 'px'
        //        });
        //    }
        //};
        //
        //function prev() {
        //    if (currentSlide != 0) {
        //        currentSlide--;
        //        mrg -= sliderItemWidth;
        //        slider.css({
        //            'margin-left': '-' + mrg + 'px'
        //        });
        //    } else {
        //        currentSlide = sliderItem.length - 3;
        //        mrg = slider.width() - (sliderItemWidth * currentSlide);
        //        slider.css({
        //            'margin-left': '-' + mrg + 'px'
        //        });
        //    }
        //};

        //function toggleClass() {
        //    slider.find('.current').removeClass('current');
        //    sliderItem.eq(currentSlide).addClass('current');
        //}
        this.getElem = getElem;
    }