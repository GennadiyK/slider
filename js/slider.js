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

        //final render of slider
        function getElem(){
            if(!slider) render();
            return slider;
        }

        //rendering slider-list(ul)
        function render(){
            slider = document.createElement('div');
            slider.className = 'slider';
            renderItems();
            renderControl();
        }

        /*creating ul.slider-list
         creating  li.slider-list-item,
         append all into the elem,
         add current class for firs li,
         correct slider width - fixedSliderWidth()*/

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

        //creating control for slider
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

        //correcting full width of slider
        function fixedSliderWidth(item, container) {
            var itemElem = $(item);
            var containerElem = $(container);
            var itemElemWidth = $(item).outerWidth(true);
            var containerElemWidth = itemElemWidth * itemElem.length;

            containerElem.width(containerElemWidth);
        }

        //delegation click event on control buttons and apply prevNext() function
        elem.on('click', function (e) {
            prevNext(e);
            toggleClass('.slider-list','.slider-list-item','current');
        });

        //checking event.target and if click was on prev button - run prev(); if click was on next - run next()
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

        //move ul with margin-left
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

        //move ul with margin-left
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

        //changing class on li element with currentSlide element index
        function toggleClass(parent,item,className) {
            $(parent).find('.'+className).removeClass(className);
            $(item).eq(currentSlide).addClass(className);
        }

        //initialize getElem method
        this.getElem = getElem;
    }