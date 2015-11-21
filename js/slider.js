//1.correct width of ul check width of slider item
//2.create control rendering for slider
//3.animate slider
//4.get data for slider from JSON
//5.create property - show / hide slider control
//6. create property for visible count items of slider
//7.create thumbs


    function Slider(options) {
        var elem = options.elem;
        var slider,
            sliderList,
            currentSlide,
            li,
            img,
            imgSrc,
            mrg;

        currentSlide = 0;


        function getElem(){
            if(!slider) render();
            return slider;

        };

        function render(){
            slider = document.createElement('div');
            slider.className = 'slider';
            renderItems();
            renderControl();
        };


        function renderItems(){
            sliderList = document.createElement('ul');
            sliderList.className = 'slider-list';
            imgSrc = options.imgSrc || [];


            imgSrc.forEach(function(item){
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
            var prev = document.createElement('a');
            var next = document.createElement('a');

            prev.setAttribute('class','slider-control');
            next.setAttribute('class','slider-control');
            prev.setAttribute('data-control','prev');
            next.setAttribute('data-control','next');
            prev.setAttribute('href','#');
            next.setAttribute('href','#');

            prev.innerHTML = 'prev';
            next.innerHTML = 'next';

            $(elem).append(prev,next);
        };

        function fixedSliderWidth(item, container) {
            var itemElem = $(item);
            var containerElem = $(container);
            var itemElemWidth = $(item).outerWidth(true);
            var containerElemWidth = itemElemWidth * itemElem.length;

            containerElem.width(containerElemWidth);
        };


        elem.on('click', function (e) {
            prevNext(e);
            //toggleClass();
        });

        function prevNext(e) {
            e.preventDefault();

            var eventElem = e.target;

            if (!$(eventElem).data("control")) return;

            if ($(eventElem).data("control") == 'next') {
                next();

            } else if ($(eventElem).data("control") == 'prev') {
                prev();
            }

        };

        function next() {
            if (currentSlide < li.length - 3) {
                currentSlide++;

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
            }
        };

        function prev() {
            if (currentSlide != 0) {
                currentSlide--;
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
            }
        };

        //function toggleClass() {
        //    slider.find('.current').removeClass('current');
        //    sliderItem.eq(currentSlide).addClass('current');
        //}
        this.getElem = getElem;
    }