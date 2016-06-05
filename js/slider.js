    function Slider(elem) {
        this.elem = elem;
        this.elemImgSrc = [];
        this.elemList = null;
        this.elemListItem = null;
        this.sliderControls = true;
        this.slideWidth = null;
        this.listWidth = null;
        this.marginLeft = 0;
        this.currentSlide = 0;
        this.clonedSlideLenght = 2;
        this.buttonPrev = null;
        this.buttonNext = null;
        this.removedItem = null;
    }

    Slider.prototype.init = function() {
        this.getElemImgSrc();
        this.deleteElemChildren();
    };

    Slider.prototype.render = function() {
        this.init();
        this.elem.appendChild(this.createContainer());
        this.addCurrentClass(0, 'current');
        this.elemList.insertBefore(this.clonedLastItem(), this.elemList.childNodes[0]);
        this.elemList.appendChild(this.clonedFirstItem());
        this.getSlideWidth();
        this.setDefaultMarginLeft();
        this.getListWidth();
        this.setListWidth();

        if(this.sliderControls) {
            this.showControls(this.elem);
            this.prevNextSliding();
        }


    };

    Slider.prototype.getElemImgSrc = function() {
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
        this.elemList = document.createElement('ul');
        this.elemList.classList.add('slider-list');

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
        this.listWidth =  this.slideWidth * (this.elemImgSrc.length + this.clonedSlideLenght);

        return this.listWidth;
    };

    Slider.prototype.setListWidth = function() {
        this.elemList.style.width = this.listWidth + 'px';
    };


    Slider.prototype.setDefaultMarginLeft = function() {
        this.marginLeft -=  this.slideWidth;
        this.elemList.style.marginLeft = this.marginLeft + 'px';
    };



    Slider.prototype.nextSlide = function() {
        // this.removeItem(this.currentSlide);
        // this.appendItem(this.removedItem);
        // if(this.currentSlide < this.elemImgSrc.length - 1) {
            this.marginLeft -= this.slideWidth;
            this.elemList.style.marginLeft = this.marginLeft + 'px';
            this.removeCurrentClass('current');
            this.currentSlide++;
            this.addCurrentClass(this.currentSlide + 1, 'current');
        // }

    };

    Slider.prototype.prevSlide = function() {
        // if(this.currentSlide > 0) {
            this.marginLeft += this.slideWidth;
            this.elemList.style.marginLeft = this.marginLeft + 'px';
            this.removeCurrentClass('current');
        this.addCurrentClass(this.currentSlide, 'current');
        this.currentSlide--;
        // }
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

    Slider.prototype.removeItem = function(slideIndex) {
        this.removedItem = this.elemList.querySelectorAll('.slider-list-item')[slideIndex];
        this.elemList.removeChild(this.removedItem);

    };

    Slider.prototype.appendItem = function(item) {
        this.elemList.appendChild(item);
    };

    Slider.prototype.clonedFirstItem = function() {
        return this.createItem(0);
    };

    Slider.prototype.clonedLastItem = function() {
        return this.createItem(this.elemImgSrc.length - 1);
    };
