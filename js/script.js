$(function() {
    $(document).ready(function(){


        function isMobile() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return true;
            }
            return false;
        }
        
        if (isMobile()) {
            $('body').addClass('isMobile');
        }

    	$(function() {
		    $('#ri-grid').gridrotator({
                rows		: 7,
                columns		: 10,
                animSpeed	: 1000,
                interval	: 2000,
                step		: 3,
                w1400       : {
                    rows    : 8,
                    columns : 8
                },
                w1200       : {
                    rows    : 8,
                    columns : 7
                },
                w1024       : {
                    rows    : 8,
                    columns : 6
                },
                w768        : {
                    rows    : 12,
                    columns : 5
                },
                w480        : {
                    rows    : 8,
                    columns : 4
                },
                w320		: {
                    rows	: 8,
                    columns	: 3
                },
                w240		: {
                    rows	: 8,
                    columns	: 2
                }
            });
		});

		var austDay = new Date();
		austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
		$('#defaultCountdown').countdown({
            until: austDay,
            format: 'wdHMS'
        });
		$('#year').text(austDay.getFullYear());


        if(isMobile() == false){
            $('#md-sections').ulslide({
                effect: {
                    type: 'slide', 
                    axis: 'y',     
                    distance: 0   
                },
                duration: 500,
                autoslide: false,
                height: 'auto',
                width: '100%',
                mousewheel: true,
                direction: 'f',
                nextButton: '#arrow-next',
                prevButton: '#arrow-prev',
                pager: "#md-pager .md-page"
            });
        }
		
        function pageResize() {
            var panelHeight = $(window).height(),
                panelWidth = $(window).width();
            $("#md-comingsoon, #md-sections").height(panelHeight);

            $('.md-content').each(function(){
                var _parent = $(this).parent(),
                    _self = $(this);
                _parent.show();
                mtop = (_parent.height() - _self.height() - 20)/2;
                if (mtop > 0)
                    _self.css({'margin-top': mtop})
                else
                    _self.css({'margin-top': 0})
            });

            if($mdBgImage.size() > 0) {
                var width = parseInt($mdBgImage.data("defW")),
                    height = parseInt($mdBgImage.data("defH"));
                if(height > 0 && panelHeight > 0) {
                    if (((width / height) > (panelWidth / panelHeight))) {
                        var left = panelWidth - (panelHeight / height) * width;
                        $mdBgImage.css({width: "auto", height: panelHeight + "px"});
                        if(left < 0) {
                            $mdBgImage.css({left: (left/2) + "px", top: 0 });
                        } else {
                            $mdBgImage.css({left: 0, top: 0 });
                        }
                    } else {
                        var top = panelHeight - (panelWidth / width) * height;
                        $mdBgImage.css({width: panelWidth + "px", height: "auto"});
                        if(top < 0) {
                            $mdBgImage.css({top: (top/2) + "px", left: 0 });
                        } else {
                            $mdBgImage.css({left: 0, top: 0 });
                        }
                    }
                }
            }
        }
        $(window).resize(function() {
            pageResize();
        });
		function getImgSize(imgSrc) {
            var newImg = new Image();
            newImg.src = imgSrc;
            return {height: newImg.height, width: newImg.width};
        }
        var $mdBgImage = $(".md-bg-image img");
        if($mdBgImage.size() > 0) {
			var size = $mdBgImage.size(),
				i = 0;
			$mdBgImage.each(function() {
				$(this).load(function() {
					if(!$(this).data('defW')) {
						i++;
						var dimensions = getImgSize($(this).attr("src"));
						$(this).data({
							'defW': dimensions.width,
							'defH': dimensions.height
						});
						if(i == size) pageReady();
					}
				});
				if(this.complete) {
					$(this).load();
				}
			});
            
        }
		pageResize();
		function pageReady() {
			pageResize();
		}
    });
});