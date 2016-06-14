    function Slider(elem) {
        this.elem = elem;
        this.elemImgSrc = [];
        this.elemList = document.createElement('ul');
        this.elemList.classList.add('slider-list');
        this.elemListItem = null;
        this.sliderControls = true;
        this.slideWidth = null;
        this.listWidth = null;
        this.marginLeft = 0;
        this.currentSlide = 0;
        this.clonedSlideLength = null;
        this.buttonPrev = null;
        this.buttonNext = null;
        this.animationDuration = 300;
        this.timePassed = 0;
        this.dir = 0;
    }

    Slider.prototype.init = function() {
        this.setElemImgSrc();
        this.deleteElemChildren();
    };

    Slider.prototype.render = function() {
        this.init();
        this.elem.appendChild(this.createContainer());
        this.addCurrentClass(0, 'current');
        this.elemList.insertBefore(this.clonedLastItem(), this.elemList.childNodes[0]);
        this.elemList.appendChild(this.clonedFirstItem());
        this.setClonedSlideLength();
        this.getSlideWidth();
        this.setDefaultMarginLeft(this.slideWidth);
        this.getListWidth();
        this.setListWidth();


        if(this.sliderControls) {
            this.showControls(this.elem);
            this.prevNextSliding();
        }
    };

    Slider.prototype.setElemImgSrc = function() {
        var imgSrc = this.elem.querySelectorAll('img');
        for(var i = 0; i < imgSrc.length; i++) {
            this.elemImgSrc.push(imgSrc[i].src);
        }
    };

    Slider.prototype.deleteElemChildren = function() {
        this.elem.innerHTML = '';
    };

    Slider.prototype.createItem = function(index) {
        this.elemListItem = document.createElement('li');
        this.elemListItem.classList.add('slider-list-item');
        var img = document.createElement('img');
            img.classList.add('slider-list-img');

        for(var i = 0; i < this.elemImgSrc.length; i++) {
            if(i === index) {
                img.src = this.elemImgSrc[i];
                this.elemListItem.dataset.index = i;
            }
        }

        this.elemListItem.appendChild(img);

        return this.elemListItem;
    };

    Slider.prototype.createList = function() {

        for(var i = 0; i < this.elemImgSrc.length; i++ ) {
            this.elemList.appendChild(this.createItem(i));
        }

        return this.elemList;
    };

    Slider.prototype.createControl = function(controlName) {
        this.controlName = document.createElement('button');

        this.controlName.classList.add('slider-control-' + controlName);
        this.controlName.innerHTML = controlName;
        return this.controlName;
    };

    Slider.prototype.showControls = function(elem) {
        this.buttonPrev = this.createControl('prev');
        this.buttonNext = this.createControl('next');

        elem.appendChild( this.buttonPrev );
        elem.appendChild( this.buttonNext );

    };

    Slider.prototype.createContainer = function() {
        var container = document.createElement('div');
            container.classList.add('slider-list-wrapper');

            container.appendChild(this.createList());

        return container;
    };

    Slider.prototype.getSlideWidth = function(){
       this.slideWidth = this.elem.querySelector('li').offsetWidth;

        return this.slideWidth;
    };

    Slider.prototype.getListWidth = function() {
        this.listWidth =  this.slideWidth * (this.elemImgSrc.length + this.clonedSlideLength);

        return this.listWidth;
    };

    Slider.prototype.setListWidth = function() {
        this.elemList.style.width = this.listWidth + 'px';
    };


    Slider.prototype.setDefaultMarginLeft = function(val) {
        this.dir = -1;
        var defaultMrg = val * this.dir;
        this.marginLeft = defaultMrg;
        this.elemList.style.marginLeft = defaultMrg + 'px';
    };


    Slider.prototype.animateSlider = function(elem, prop, start, finish, duration) {
        var startTime = Date.now();
        var path = finish - start;

        var timer = setInterval(function() {
            var t = (Date.now() - startTime) / duration;

            if(t >= 1) {
                this.timePassed = finish;
                clearInterval(timer);
            } else {
                this.timePassed = start +(t * path);
            }

            elem.style[prop] = this.timePassed + 'px';


        }.bind(this),5);
    };


    Slider.prototype.nextSlide = function() {

        this.dir = -1;
        this.removeCurrentClass('current');


        if(this.currentSlide < this.elemImgSrc.length) {
             this.currentSlide++;

            this.animateSlider(this.elemList, 'margin-left', this.marginLeft, this.marginLeft+= this.slideWidth * this.dir, 100);

            this.addCurrentClass(this.currentSlide + 1, 'current');

             if(this.currentSlide === this.elemImgSrc.length){
                 setTimeout(function(){
                     this.setDefaultMarginLeft(this.slideWidth);

                     this.currentSlide = 0;
                     this.removeCurrentClass('current');
                     this.addCurrentClass(this.currentSlide + 1, 'current');
                 }.bind(this), this.animationDuration);
             }
         }
    };



    Slider.prototype.prevSlide = function() {
        this.removeCurrentClass('current');
        this.animateSlider(true);
        this.dir = 1;
        if(this.currentSlide >= 0) {
            this.currentSlide--;
            this.animateSlider(this.elemList, 'margin-left', this.marginLeft, this.marginLeft+= this.slideWidth * this.dir, 100);
            this.addCurrentClass(this.currentSlide + 1, 'current');
        }

        if(this.currentSlide < 0 ){
            setTimeout(function(){
                this.setDefaultMarginLeft(this.slideWidth * this.elemImgSrc.length);
                this.animateSlider(false);
                this.currentSlide = this.elemImgSrc.length - 1;
                this.removeCurrentClass('current');
                this.addCurrentClass(this.currentSlide + 1, 'current');
            }.bind(this), this.animationDuration);
        }
    };

    Slider.prototype.addCurrentClass = function(currentSlide, currentClass) {
        this.elemList.querySelectorAll('.slider-list-item')[currentSlide].classList.add(currentClass);
    };

    Slider.prototype.removeCurrentClass = function( currentClass) {
        var items = this.elemList.querySelectorAll('.slider-list-item');
        for(var i = 0; i < items.length; i++) {
            items[i].classList.remove(currentClass);
        }
    };

    Slider.prototype.prevNextSliding = function() {
            this.buttonNext.addEventListener('click', function () {
                this.nextSlide();
            }.bind(this));

            this.buttonPrev.addEventListener('click', function(){
                this.prevSlide();
            }.bind(this));

    };

    Slider.prototype.clonedFirstItem = function() {
        var firstCloneItem = this.createItem(0);
            firstCloneItem.classList.add('clone-item');
        return firstCloneItem;
    };

    Slider.prototype.clonedLastItem = function() {
        var lastCloneItem = this.createItem(this.elemImgSrc.length - 1);
            lastCloneItem.classList.add('clone-item');
        return lastCloneItem;
    };

   Slider.prototype.setClonedSlideLength = function() {
       this.clonedSlideLength = this.elemList.querySelectorAll('.clone-item').length;
   };