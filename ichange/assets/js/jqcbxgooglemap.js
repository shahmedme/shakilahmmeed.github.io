
    $.fn.jqcbxgoglemap = function (options) {


        var $lz_map_selector = this;
        var settings = $.extend(true, {}, $.fn.jqcbxgoglemap.defaults, options);


        //Create Maps Using Google Map Event Listner
        google.maps.event.addDomListener(window, 'load', function() {

            $lz_map_selector.each(function(index) {
                //Create Jquery Object of Current Item
                var elem = $($lz_map_selector);

                var gmOptions = {};//GoogleMapOptions

                if ($.isArray(settings.mapOptions.center)) {
                    var center = (settings.mapOptions.center.hasOwnProperty(index)) ? settings.mapOptions.center[index] : false;
                } else {
                    var center = (settings.mapOptions.center === true) ? true : false;
                }

                if (center) {
                    var cbNewLat = ($.isArray(settings.mapOptions.latitude) && settings.mapOptions.latitude.hasOwnProperty(index)) ? settings.mapOptions.latitude[index] : settings.mapOptions.latitude;


                    var cbNewLong = ($.isArray(settings.mapOptions.longitude) && settings.mapOptions.longitude.hasOwnProperty(index)) ? settings.mapOptions.longitude[index] : settings.longitude;
                    gmOptions.center = new google.maps.LatLng(cbNewLat, cbNewLong);
                }

                if ($.isArray(settings.mapOptions.zoom)) {
                    gmOptions.zoom = (settings.mapOptions.zoom.hasOwnProperty(index)) ? settings.mapOptions.zoom[index] : 8;
                } else {
                    gmOptions.zoom = settings.mapOptions.zoom;;
                }

                if ($.isArray(settings.mapOptions.mapType)) {
                    gmOptions.mapTypeId = (settings.mapOptions.mapType.hasOwnProperty(index)) ? settings.mapOptions.mapType[index] : google.maps.MapTypeId.ROADMAP;
                } else {
                    gmOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
                }

                if ($.isArray(settings.mapOptions.icon)) {
                    gmOptions.markerIcon = (settings.mapOptions.icon.hasOwnProperty(index)) ? settings.mapOptions.icon[index] : null;
                } else {
                    gmOptions.markerIcon = (typeof settings.mapOptions.icon == 'undefined') ? null : settings.mapOptions.icon;
                }

                if ($.isArray(settings.mapOptions.scrollwheel)) {
                    gmOptions.scrollwheel = (settings.mapOptions.scrollwheel.hasOwnProperty(index)) ? settings.mapOptions.scrollwheel[index] : false;
                } else {
                    gmOptions.scrollwheel = (typeof settings.mapOptions.scrollwheel == 'undefined') ? false : settings.mapOptions.scrollwheel;
                }

                if ($.isArray(settings.mapOptions.infoWindow) && settings.mapOptions.infoWindow.length > 0) {
                    gmOptions.title = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].title : null;
                    gmOptions.content = (settings.mapOptions.infoWindow.hasOwnProperty(index)) ? settings.mapOptions.infoWindow[index].content : null;
                } else {
                    gmOptions.title = settings.mapOptions.infoWindowTitle;
                    gmOptions.content = settings.mapOptions.infoWindowContent;
                }


                var contentString = '<div class="jqcbxgoglemap_info"><h3 class="jqcbxgoglemap_info_heading">' + gmOptions.title + '</h1><div class="jqcbxgoglemap_info_body">' + gmOptions.content + '</div></div>';
                var CbMap = new google.maps.Map(elem[0], gmOptions);

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var CbMarker = new google.maps.Marker({
                    position: gmOptions.center,
                    map: CbMap,
                    title:gmOptions.title,
                    icon: gmOptions.markerIcon,
                    backgroundColor: gmOptions.backgroundColor
                });

                //listen to marker click event
                google.maps.event.addListener(CbMarker, 'click', function() {
                    infowindow.open(CbMap,CbMarker);
                });

                //add window resize event
                google.maps.event.addDomListener(
                    window,
                    'resize',
                    function() {

                        var center_new = CbMap.getCenter();
                        google.maps.event.trigger(CbMap, "resize");
                        CbMap.setCenter(center_new);
                    }
                );



            });
        });

    };

//Initialize The Defaults Setings For Map Plugin
    $.fn.jqcbxgoglemap.defaults = {
        latitude: '44.5403', //44.5403, -78.5463
        longitude: '-78.5463',
        icon: null,
        infoWindowTitle: null,
        infoWindowContent: null,
        mapOptions: {

            latitude: ['23.810332'],
            longitude: ['89.841991'],
            center: true,
            scrollwheel: true,
            zoom: 8,
            mapType: 'roadmap',//google.maps.MapTypeId.ROADMAP
            icon: null,
            infoWindow: []
        }
    };



