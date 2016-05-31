    function Slider() {
        this.elem = document.querySelectorAll('[data-elem="slider"]');
        this.imgCollection = [];
        this.dataView = [];
    }

    Slider.prototype.init = function() {
        this.getImgCollection();
        this.getDataView();
    };

    Slider.prototype.render = function() {
        this.init();
        for(var i=0; i<this.elem.length; i++) {
            this.elem[i].appendChild(this.generateListEl(this.imgCollection[i]));
        }

        this.setSlideSize();
        window.onresize = function() {
            this.setSlideSize();
        }.bind(this);
    };

    Slider.prototype.getDataImg = function() {
        var dataImg = [];
        for(var i = 0; i < this.elem.length; i++) {
            dataImg[i] = this.elem[i].dataset.img;
        }

       return dataImg;
    };

    Slider.prototype.getImgCollection = function() {
        var dataImg = this.getDataImg();
        for(var i =0; i < dataImg.length; i++) {
            switch(dataImg[i]) {
                case 'one':
                    this.imgCollection[i] = imgCollection.one;
                    break;
                case 'two':
                    this.imgCollection[i] = imgCollection.two;
                    break;
            }
        }
    };

    Slider.prototype.generateListEl = function(collectionImg) {
        var listContainerEl = document.createElement('ul');
            listContainerEl.classList.add('slider-list');
        var listContainerWrapper = document.createElement('div');
            listContainerWrapper.classList.add('slider-list-wrapper');

        for(var i = 0; i < collectionImg.length; i++) {
            var liEl = document.createElement('li');
                liEl.classList.add('slider-list-item');
            var image = document.createElement('img');
                image.src = collectionImg[i];
                image.classList.add('slider-list-img');
                liEl.appendChild(image);


            listContainerEl.appendChild(liEl);
            listContainerWrapper.appendChild(listContainerEl);
        }

        return listContainerWrapper;
    };

    Slider.prototype.getDataView = function() {
      for(var i = 0; i < this.elem.length; i++) {
          this.dataView[i] = this.elem[i].dataset.view;
      }
    };

    Slider.prototype.setSlideSize = function() {
        var liOffsetWidth, liOffsetHeight;
        for(var i = 0; i < this.elem.length; i++) {
            for(var x = 0; x < this.elem[i].querySelectorAll('.slider-list-item').length; x++) {
                this.elem[i].querySelectorAll('li')[x].style.width = 100 / this.dataView[i] + '%';
            }
            liOffsetWidth = this.elem[i].querySelector('.slider-list-item').offsetWidth;
            liOffsetHeight = this.elem[i].querySelector('.slider-list-item').offsetHeight;

            console.log(liOffsetHeight);
            this.elem[i].querySelector('.slider-list-wrapper').style.height = liOffsetHeight + 'px';
        }
    };

