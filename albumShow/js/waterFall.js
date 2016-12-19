(function ($, window, document, undefined) {
    var waterFall = 'pinterestGrid';
    var defaults = {
        paddingX: 10,
        paddingY: 10,
        columnNum: 3,
        marginBottom: 50,
        singleColumnBreakpoint: 100
    };
    var columns;
    var $eachPhoto;
    var eachPhotoWidth;

    function WaterFall(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = waterFall;
        this.init();
    }

    WaterFall.prototype.init = function () {
        var _this = this;
        var resizeFinish;
        $(window).resize(function() {
            clearTimeout(resizeFinish);
            resizeFinish = setTimeout( function () {
                _this.layoutChange(_this);
            }, 11);
        });
        _this.layoutChange(_this);
        setTimeout(function() {
            $(window).resize();
        }, 500);
    };

    WaterFall.prototype.calculate = function (singleColumnMode) {
        var _this = this;
        var tallest = 0;
        var row = 0;
        var $container = $(this.element);
        var containerWidth = $container.width();
        var $eachPhoto = $(this.element).children();

        if(singleColumnMode === true) {
            eachPhotoWidth = $container.width() - _this.options.paddingX;
        } else {
            eachPhotoWidth = ($container.width() - _this.options.paddingX * _this.options.columnNum) / _this.options.columnNum;
        }

        $eachPhoto.each(function() {
            $(this).css('width', eachPhotoWidth);
        });

        columns = _this.options.columnNum;

        $eachPhoto.each(function(index) {
            var currentColumn;
            var leftOut = 0;
            var top = 0;
            var $this = $(this);
            var prevAll = $this.prevAll();
            var tallest = 0;

            if(singleColumnMode === false) {
                currentColumn = (index % columns);
            } else {
                currentColumn = 0;
            }

            for(var t = 0; t < columns; t++) {
                $this.removeClass('c' + t);
            }

            if(index % columns === 0) {
                row++;
            }

            $this.addClass('c' + currentColumn);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if($(this).hasClass('c' + currentColumn)) {
                    top += $(this).outerHeight() + _this.options.paddingY;
                }
            });

            if(singleColumnMode === true) {
                leftOut = 0;
            } else {
                leftOut = (index % columns) * (eachPhotoWidth + _this.options.paddingX);
            }

            $this.css({
                'left': leftOut,
                'top' : top
            });
        });

        this.tallest($container);
        $(window).resize();
    };

    WaterFall.prototype.tallest = function (_container) {
        var columnHeights = [];
        var largest = 0;

        for(var z = 0; z < columns; z++) {
            var tempHeight = 0;
            _container.find('.c'+z).each(function() {
                tempHeight += $(this).outerHeight();
            });
            columnHeights[z] = tempHeight;
        }

        largest = Math.max.apply(Math, columnHeights);
        _container.css('height', largest + (this.options.paddingY + this.options.marginBottom));
    };

    WaterFall.prototype.layoutChange = function (that) {
        if($(window).width() < that.options.singleColumnBreakpoint) {
            that.calculate(true);
        } else {
            that.calculate(false);
        }
    };

    $.fn[waterFall] = function (options) {
        return this.each(function () {
            if (!$.data(this, waterFall)) {
                $.data(this, waterFall,new WaterFall(this, options));
            }
        });
    }
})(jQuery, window, document);