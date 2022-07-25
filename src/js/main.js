import './vendor';

$(document).ready(() => {
    var $window = $(window);
    var aboutSlider = $('.about-slider .owl-carousel');
    var aboutsliderTxt = $('.about-slider__text p');
    var romdesc = $('.rooms__desc');
    var numberSlider = $('.rooms-items .owl-carousel');
    var offersSlider = $('.offers-slider .owl-carousel');
    var offersBliser = $('.offers-bslider .owl-carousel');
    var reviewsSlider = $('.reviews-slider .owl-carousel');
    var hedaerfixed = $('.header-fixed');
    var roomSlider = $('.room-inner__slider.owl-carousel');
    var otherRooms = $('.rooms-items.owl-carousel');
    var mobilemenu = $('#mobile');

    aboutSlider.owlCarousel({
        dots: false,
        nav: true,
        margin: 11,
        loop: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            1024: {
                items: 4,
            }
        }
    });

    numberSlider.owlCarousel({
        dots: false,
        nav: true,
        margin: 20,
        loop: true,
        responsive: {
            0: {
                items: 1,
                autoplay: false,
            },
            1024: {
                items: 3,
                autoplay: true,
            }
        }
    });

    offersSlider.owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        responsive: {
            0: {
                autoplay: false,
            },
            1024: {
                autoplay: true,
            }
        }
    });

    offersBliser.owlCarousel({
        items: 1,
        loop: true,
        onInitialized: callback,
        onTranslated: callback2,
        autoplay: false,
        responsive: {
            0: {
                dots: false,
                nav: true,
            },
            1024: {
                dots: true,
                nav: false,
            },
        }
    });

    reviewsSlider.owlCarousel({
        dots: false,
        nav: true,
        loop: true,
        margin: 40,
        center: true,
        onInitialized: center,
        onTranslated: center,
        responsive: {
            0: {
                items: 1,
                autoplay: false,
            },
            1024: {
                items: 3,
                autoplay: true,
            }
        }
    });

    roomSlider.owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        autoplay: true,
    });

    function center() {
        reviewsSlider.find('.owl-item').each(function() {
            $(this).find('.reviews-slider__item').addClass('opacity');
            var CenterSlider = reviewsSlider.find('.owl-item.center .reviews-slider__item');
            CenterSlider.removeClass('opacity');
        });
    }

    function callback() {
        var dotcount = 1;

        jQuery('.owl-dot').each(function() {
            jQuery(this).addClass('dotnumber' + dotcount);
            jQuery(this).attr('data-info', dotcount);
            dotcount = dotcount + 1;
        });

        var slidecount = 1;

        offersBliser.find('.owl-item').not('.cloned').each(function() {
            jQuery(this).addClass('slidenumber' + slidecount);
            slidecount = slidecount + 1;
        });

        jQuery('.owl-dot').each(function() {

            var grab = jQuery(this).data('info');

            var slidegrab = jQuery('.slidenumber' + grab + ' img').attr('srcset');

            jQuery(this).css("background-image", "url(" + slidegrab + ")");

        });

        offersBliser.find('.owl-item.active').not('.cloned').each(function() {
            $(this).find('.offers-bslider__block').addClass('animated bounceInLeft');
        });
    }

    function callback2() {
        offersBliser.find('.owl-item.active').not('.cloned').each(function() {
            $(this).find('.offers-bslider__block').addClass('bounceInLeft animated delay-3s');
            $(this).siblings().find('.offers-bslider__block').removeClass('bounceInLeft');
        });
    };

    var size = 480,
        newsText = aboutsliderTxt.text();

    if (newsText.length > size) {
        aboutsliderTxt.text(newsText.slice(0, size) + ' ...');
    };

    var size2 = 180;
    romdesc.each(function() {
        var romdesc2 = $(this).children().text();
        if (romdesc2.length > size2) {
            romdesc.children().text(romdesc2.slice(0, size2) + ' ...');
        }
    });

    if ($window.width() >= 1023) {
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 300) {
                hedaerfixed.addClass('slideInDown animated').removeClass('slideInUp');
            } else {
                hedaerfixed.removeClass('slideInDown').addClass('slideInUp');
            }
        });
    }

    var reviews = $('.reviews-inner__block');

    reviews.each(function() {
        var a = $(this).find('p').height();

        if (a > 115) {
            $(this).parent().find('.collapse').show();
            $(this).find('p').addClass('hide')

        } else {
            $(this).parent().find('.collapse').hide();
        }
        $('.collapse a').on('click', function(e) {
            e.preventDefault;
            var text = $(this).parent().parent().find('p');
            text.toggleClass('hide');
            var toggleText = $(this).data('text');
            $(this).data('text', $(this).text()).text(toggleText);
        });
    });

    $('.form-group input,.form-group textarea')
        .focus((e) => {
            let $this = $(e.currentTarget);
            let parent = $this.parent();
            let label = parent.children("label");

            parent.addClass("focused");

            if ($this.val() !== "") {
                label.show();
            }
        })
        .blur((e) => {
            let $this = $(e.currentTarget);
            let parent = $this.parent();
            let label = parent.children("label");

            if ($this.val() === "") {
                parent.removeClass("focused");
            }
            if ($this.val() !== "") {
                parent.removeClass("focused");
                label.hide();
            }
        })
        .change((e) => {
            let $this = $(e.currentTarget);
            let parent = $this.parent();
            let label = parent.children("label");

            if ($this.val() !== "") {
                label.hide();
                parent.removeClass("focused");
            } else {
                label.show();
            }
        });

    $('[data-fancybox="gallery"]').fancybox({
        smallBtn: false,
        toolbar: false,
        infobar: false,
        beforeLoad() {
            let caption = $('.fancybox-caption');
            let arrows = $('.fancybox-navigation');
            let close = $('.fancybox-toolbar');
            let closeBtn = $('#closeBtn');

            close.hide();
            closeBtn.show();

            this.title = caption.text();
            caption.hide();
            arrows.hide();
            setTimeout(() => {
                this.$content.append(
                        '<a data-fancybox-prev class="fancybox-button modal_button modal_button_left " href="javascript:;">' +
                        '<span class="arrow-left"></span>' +
                        '</a>'
                    ),
                    this.$content.append(
                        '<a data-fancybox-next class="fancybox-button modal_button modal_button_right" href="javascript:;">' +
                        '<span class="arrow-right"></span>' +
                        '</a>'
                    ),
                    this.$content.append(
                        '<button data-fancybox-close="" id="closeBtn" class="fancybox-close-small" title="Close"><span data-text="Закрыть" class="close-btn">Закрыть</span></button>'
                    );
            }, 700);
        },
    });

    $('.filters').each(function() {
        $(this).find('a').on('click', function() {
            $(this).parent().addClass('active').siblings().removeClass('active');
        });
    });

    let onlyNumber = function onlyNumber(e) {
        let key = e.charCode || e.keyCode || 0;

        if (
            key === 8 ||
            key === 9 ||
            key === 13 ||
            key === 46 ||
            key === 110 ||
            key === 190 ||
            key >= 35 && key <= 40
        ) {} else if (key >= 48 && key <= 57 || key >= 96 && key <= 105) {} else {
            e.preventDefault();
        }
    };
    let $phone = $('input[type="tel"]');

    $phone.keydown(onlyNumber);

    $("#dtBox").DateTimePicker({
        mode: 'date',
        defaultDate: new Date(),
        minDate: new Date(),
        shortDayNames: ["Вос", "Пон", "Вто", "Сре", "Пят", "Суб", "Вос"],
        fullDayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        shortMonthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        fullMonthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октября", "Ноябрь", "Декабрь"],
        setValueInTextboxOnEveryClick: true,
        isPopup: false,
        buttonsToDisplay: ["HeaderCloseButton"],
        titleContentDate: '',
    });
    $("input[data-field='date'],input[data-field='time'] ").on('change', function() {
        $(this).parent().addClass('focused');
        $(this).parent().find('label').show();
    });

    $("#more-switch").change(function() {
        if (this.checked) {
            $('#bookhide').addClass('active');
        } else {
            $('#bookhide').removeClass('active');
        }
    });

    function oRoom() {
        otherRooms.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            loop: true,
            autoplay: true,
        });
    }

    if ($window.width() < 1024) {

        $window.scroll(function() {
            var e = $('table');

            if (e.length === 1) {
                $(".swipe-table").length === 0 && $('body').append('<div class="swipe-table"><span class="swipe_table"></span></div>');

                var a = e.offset();
                var t = e.innerHeight();
                var i = a.top + t;
                var s = $(window).scrollTop() + $(window).height();

                var l = a.top + (t - 100) / 2;

                i < s && ($('.swipe-table').css({
                    top: l
                }), $(".swipe-table").fadeIn("slow"), setTimeout(function() {
                    $(".swipe-table").fadeOut("slow");
                }, 2500));
            };
        });

        oRoom(true);

    }


    $('#myfile').bind('change', function() {
        var a = (this.files[0].size);
        alert(a);
        if (a > 2097152) {
            $('.format').addClass('error');
        } else {
            $('.format').removeClass('error');
        }
    });

    //mobile version - detect click event on filters tab
    var filter_tab_placeholder = $('.filters .placeholder button'),
        filter_tab_placeholder_default_value = filter_tab_placeholder.data('text'),
        filter_tab_placeholder_text = filter_tab_placeholder.text();

    $('.filters li').on('click', function(event) {
        //detect which tab filter item was selected
        var selected_filter = $(event.target).data('type');

        //check if user has clicked the placeholder item
        if ($(event.target).is(filter_tab_placeholder)) {
            (filter_tab_placeholder_default_value == filter_tab_placeholder.text()) ? filter_tab_placeholder.text(filter_tab_placeholder_text): filter_tab_placeholder.text(filter_tab_placeholder_default_value);
            $('.filters').toggleClass('is-open');

            //check if user has clicked a filter already selected 
        } else if (filter_tab_placeholder.data('type') == selected_filter) {
            filter_tab_placeholder.text($(event.target).text());
            $('.filters').removeClass('is-open');

        } else {
            //close the dropdown and change placeholder text/data-type value
            $('.filters').removeClass('is-open');
            filter_tab_placeholder.text($(event.target).text()).data('type', selected_filter);
            filter_tab_placeholder_text = $(event.target).text();

            //add class selected to the selected filter item
            $('.filters .selected').removeClass('selected');
            $(event.target).addClass('selected');
        }
    });

    var mixer = $('.rooms-items > ul').mixItUp({
        animation: {
            queue: false,
            animateResizeContainer: false,
            staggerSequence: function(i) {
                return i % 3;
            },
        },
        callbacks: {
            onMixStart: function() {
                $('.cd-fail-message').fadeOut(200);
            },
            onMixFail: function() {
                $('.cd-fail-message').fadeIn(200);
            }
        },
    });

    mobilemenu.on('click', function() {
        $('body').toggleClass('hidden');
        $(this).closest('.mobile').toggleClass('is-open');
    });

    $(document).mouseup(function(e) {
        var div = $(".mobile-menu");
        var mobile = $('.mobile');
        if (!div.is(e.target) && div.has(e.target).length === 0 && mobile.is(e.target)) {
            mobile.removeClass('is-open');
            $('body').removeClass('hidden');
        }
    });

});