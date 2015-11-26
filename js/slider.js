    function Slider(options) {
        this.elem = options.elem;
        this.imgCollection = options.imgCollection || [];

        this._slider = null;
        this._sliderList = null;
        this._currentSlide = 0;
        this._li = null;
        this._img = null;
        this._mrg = 0;
    }
        //final render of slider
    Slider.prototype.getElem = function(){
        if(!this._slider) this.render();
        return this._slider;
    };

        //rendering slider-list(ul)
    Slider.prototype.render = function(){
        this._slider = document.createElement('div');
        this._slider.className = 'slider';
        this.renderItems();
        this.renderControl();
        this.clickOnElement();
    };

        /*creating ul.slider-list
         creating  li.slider-list-item,
         append all into the elem,
         add current class for firs li,
         correct slider width - fixedSliderWidth()*/

    Slider.prototype.renderItems = function(){
        this._sliderList = document.createElement('ul');
        this._sliderList.className = 'slider-list';

        this.imgCollection.forEach(function(item){
            this._li = document.createElement('li');
            this._li.className = 'slider-list-item';
            this._img = document.createElement('img');
            this._img.src = item;
            $(this._li).append(this._img);
            $(this._sliderList).append(this._li);

        },this);

        $(this._slider).append(this._sliderList);
        $(this.elem).append(this._slider);
        $('.slider-list-item:first-child').addClass('current');

        this.fixedSliderWidth('.slider-list-item','.slider-list');
    };

        //creating control for slider
    Slider.prototype.renderControl = function() {
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

        $(this.elem).append(prev,next);
    };

        //correcting full width of slider
    Slider.prototype.fixedSliderWidth = function (item, container) {
        var itemElem = $(item);
        var containerElem = $(container);
        var itemElemWidth = $(item).outerWidth(true);
        var containerElemWidth = itemElemWidth * itemElem.length;

        containerElem.width(containerElemWidth);
    };

        //delegation click event on control buttons and apply prevNext() function
    Slider.prototype.clickOnElement = function() {
        var self = this;
        this.elem.on('click', function (e) {
            self.prevNext(e);
            self.toggleClass('.slider-list','.slider-list-item','current');
        });
    }


        //checking event.target and if click was on prev button - run prev(); if click was on next - run next()
    Slider.prototype.prevNext= function (e) {
        e.preventDefault();

        var eventElem = e.target;

        if (!$(eventElem).data("control")) return;

        if ($(eventElem).data("control") == 'next') {
            this.next();
        } else if ($(eventElem).data("control") == 'prev') {
            this.prev();
        }

    };

        //move ul with margin-left
    Slider.prototype.next = function() {
        if (this._currentSlide < this.imgCollection.length-1) {
            this._currentSlide++;
            
            if(this._currentSlide%2 != 0) {
                this._mrg += $(this._li).outerWidth(true);
                $(this._sliderList).css({
                    'margin-left': '-' + this._mrg + 'px'
                });
            }

        } else {
            this._currentSlide = 0;
            this._mrg = 0;
            $(this._sliderList).css({
                'margin-left': this._mrg + 'px'
            });
        }
    }

        //move ul with margin-left
    Slider.prototype.prev = function() {
        if (this._currentSlide != 0) {
            this._currentSlide--;
            if(this._currentSlide%2 == 0 ) {
                this._mrg -= $(this._li).outerWidth(true);
                $(this._sliderList).css({
                    'margin-left': '-' + this._mrg + 'px'
                });
            }
        } else {
            this._currentSlide = this.imgCollection.length-1;
            this._mrg = $(this._sliderList).width() - ($(this._li).outerWidth(true)*3);
            console.log(this._mrg);
            $(this._sliderList).css({
                'margin-left': '-' + this._mrg + 'px'
            });
        }
    }

        //changing class on li element with currentSlide element index
    Slider.prototype.toggleClass = function (parent,item,className) {
            $(parent).find('.'+className).removeClass(className);
            $(item).eq(this._currentSlide).addClass(className);
        }

    //initialize getElem method

