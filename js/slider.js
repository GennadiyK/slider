//1.correct width of ul check width of slider item
//2.create control rendering for slider
//3.animate slider
//4.get data for slider from JSON
//5.create property - show / hide slider control
//6. create property for visible count items of slider
//7.create thumbs


    function Slider(options) {
        var elem = options.elem;
        var slider,sliderList,li,img,imgSrc;


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
            slider.className = 'slider';
            renderItems();
        };


        function renderItems(){
            sliderList = document.createElement('ul');
            sliderList.className = 'slider-list';
            imgSrc = options.imgSrc || [];


            imgSrc.forEach(function(item,i){
                li = document.createElement('li');
                li.className = 'slider-list-item';
                img = document.createElement('img');
                img.src = item;
                $(li).append(img);
                $(sliderList).append(li);

            });



            $(slider).append(sliderList);

            $(elem).append(slider);
            fixedSliderWidth('.slider-list-item','.slider-list');
        };


        function renderControl() {

        };

        function fixedSliderWidth(item, container) {
            var itemElem = $(item);
            var containerElem = $(container);
            var itemElemWidth = $(item).outerWidth(true);
            var containerElemWidth = itemElemWidth * itemElem.length;

            containerElem.width(containerElemWidth);
        };


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