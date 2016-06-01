    function Slider(elem) {
        this.elem = elem;
        this.elemImgSrc = [];
        this.elemList = null;
        this.elemListItem = null;
        this.slideWidth = null;
        this.listWidth = null;
        this.marginLeft = 0;

    }

    Slider.prototype.init = function() {
        this.getElemImgSrc();
        this.deleteElemChildren();
    };

    Slider.prototype.render = function() {
        this.init();
        this.elem.appendChild(this.createContainer());
        this.getSlideWidth();
        this.getListWidth();
        this.setListWidth();
        setInterval(function(){this.nextSlide();}.bind(this), 1000);
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
        this.listWidth =  this.slideWidth * this.elemImgSrc.length;

        return this.listWidth;
    };

    Slider.prototype.setListWidth = function() {
        this.elemList.style.width = this.listWidth + 'px';
    };

    Slider.prototype.nextSlide = function() {
        this.marginLeft += this.slideWidth;
        this.elemList.style.marginLeft = -this.marginLeft + 'px';
    };

    Slider.prototype.prevSlide = function() {
        this.marginLeft += this.slideWidth;
        this.elemList.style.marginLeft = this.marginLeft + 'px';
    };