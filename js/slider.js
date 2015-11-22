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
            imgCollection,
            mrg;

        currentSlide = 0;
        mrg = 0;

        function getElem(){
            if(!slider) render();
            return slider;

        }

        function render(){
            slider = document.createElement('div');
            slider.className = 'slider';
            renderItems();
            renderControl();
        }


        function renderItems(){
            sliderList = document.createElement('ul');
            sliderList.className = 'slider-list';
            imgCollection = options.imgCollection || [];


            imgCollection.forEach(function(item){
                li = document.createElement('li');
                li.className = 'slider-list-item';
                img = document.createElement('img');
                img.src = item;
                $(li).append(img);
                $(sliderList).append(li);

            });

            $(slider).append(sliderList);
            $(elem).append(slider);
            $('.slider-list-item:first-child').addClass('current');

            fixedSliderWidth('.slider-list-item','.slider-list');
        }


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
        }

        function fixedSliderWidth(item, container) {
            var itemElem = $(item);
            var containerElem = $(container);
            var itemElemWidth = $(item).outerWidth(true);
            var containerElemWidth = itemElemWidth * itemElem.length;

            containerElem.width(containerElemWidth);
        }


        elem.on('click', function (e) {
            prevNext(e);
            toggleClass('.slider-list','.slider-list-item','current');
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

        }

        function next() {
            if (currentSlide < imgCollection.length - 3) {
                currentSlide++;
                mrg += $(li).outerWidth(true);

                $(sliderList).css({
                    'margin-left': '-' + mrg + 'px'
                });

            } else {
                currentSlide = 0;
                mrg = 0;
                $(sliderList).css({
                    'margin-left': mrg + 'px'
                });
            }
        }

        function prev() {
            if (currentSlide != 0) {
                currentSlide--;
                mrg -= $(li).outerWidth(true);
                $(sliderList).css({
                    'margin-left': '-' + mrg + 'px'
                });
            } else {
                currentSlide = imgCollection.length - 3;
                mrg = $(sliderList).width() - ($(li).outerWidth(true) * currentSlide);
                $(sliderList).css({
                    'margin-left': '-' + mrg + 'px'
                });
            }
        }

        function toggleClass(parent,item,className) {
            $(parent).find('.'+className).removeClass(className);
            $(item).eq(currentSlide).addClass(className);
        }

        this.getElem = getElem;
    }