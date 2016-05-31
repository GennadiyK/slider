    function Slider(elem) {
        this.elem = elem;
        this.elemImgSrc = [];
    }

    Slider.prototype.init = function() {
        this.getElemImgSrc();
        this.deleteElemChildren();
    };

    Slider.prototype.render = function() {
        this.init();
        this.elem.appendChild(this.createContainer());
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
        var li = document.createElement('li');
            li.classList.add('slider-list-item');
        var img = document.createElement('img');
            img.classList.add('slider-list-img');

        for(var i = 0; i < this.elemImgSrc.length; i++) {
            if(i === index) {
                img.src = this.elemImgSrc[i];
            }
        }

        li.appendChild(img);

        return li;
    };

    Slider.prototype.createList = function() {
        var ul = document.createElement('ul');
            ul.classList.add('slider-list');

        for(var i = 0; i < this.elemImgSrc.length; i++ ) {
            ul.appendChild(this.createItem(i));
        }

        return ul;
    };

    Slider.prototype.createContainer = function() {
        var container = document.createElement('div');
            container.classList.add('slider-list-wrapper');

            container.appendChild(this.createList());

        return container;
    };

