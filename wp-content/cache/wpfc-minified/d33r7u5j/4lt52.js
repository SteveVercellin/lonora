// source --> https://lonora.hrslab.com/wp-content/plugins/pixelyoursite/dist/scripts/public.js?ver=9.2.0 
/* global pysOptions */

// https://bitbucket.org/pixelyoursite/pys_pro_7/issues/7/possible-ie-11-error
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

!function ($, options) {

    if (options.debug) {
        console.log('PYS:', options);
    }

    var dummyPinterest = function () {

        /**
         * Public API
         */
        return {

            isEnabled: function () {
            },

            disable: function () {
            },

            loadPixel: function () {
            },

            fireEvent: function (name, data) {
                return false;
            },

            onCommentEvent: function () {
            },

            onDownloadEvent: function (params) {
            },

            onFormEvent: function (params) {
            },

            onWooAddToCartOnButtonEvent: function (product_id) {
            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, is_external, $form) {
            },

            onWooRemoveFromCartEvent: function (cart_item_hash) {
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {
            },

            onEddRemoveFromCartEvent: function (item) {
            },
            onPageScroll: function (event) {},
            onTime: function (event) {

            },

        }

    }();

    var dummyBing = function () {

        /**
         * Public API
         */
        return {

            isEnabled: function () {
            },

            disable: function () {
            },

            loadPixel: function () {
            },

            fireEvent: function (name, data) {
                return false;
            },

            onAdSenseEvent: function () {
            },

            onClickEvent: function (params) {
            },

            onWatchVideo: function (params) {
            },

            onCommentEvent: function () {
            },

            onFormEvent: function (params) {
            },

            onDownloadEvent: function (params) {
            },

            onWooAddToCartOnButtonEvent: function (product_id) {
            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, is_variable, is_external, $form) {
            },

            onWooRemoveFromCartEvent: function (cart_item_hash) {
            },

            onWooAffiliateEvent: function (product_id) {
            },

            onWooPayPalEvent: function () {
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {
            },

            onEddRemoveFromCartEvent: function (item) {
            },

            onPageScroll: function (event) {
            },

            onTime: function (event) {
            },

        }

    }();

    var Utils = function (options) {

        var Pinterest = dummyPinterest;

        var Bing = dummyBing;

        var gtag_loaded = false;

        let isNewSession = checkSession();

        let utmTerms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

        let utmId = ['fbadid', 'gadid', 'padid', 'bingid'];

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function getDomain(url) {

            url = url.replace(/(https?:\/\/)?(www.)?/i, '');

            if (url.indexOf('/') !== -1) {
                return url.split('/')[0];
            }

            return url;
        }
        function loadPixels() {

            if (!options.gdpr.all_disabled_by_api) {

                if (!options.gdpr.facebook_disabled_by_api) {
                    Facebook.loadPixel();
                }

                if (!options.gdpr.analytics_disabled_by_api) {
                    Analytics.loadPixel();
                }

                if (!options.gdpr.pinterest_disabled_by_api) {
                    Pinterest.loadPixel();
                }

                if (!options.gdpr.bing_disabled_by_api) {
                    Bing.loadPixel();
                }
            }

        }

        function checkSession() {
            let duration = options.last_visit_duration * 60000
            if( Cookies.get('pys_start_session') === undefined ||
                Cookies.get('pys_session_limit') === undefined) {
                var now = new Date();
                now.setTime(now.getTime() + duration);
                Cookies.set('pys_session_limit', true,{ expires: now })
                Cookies.set('pys_start_session', true)
                return true
            }
            return false

        }

        function getTrafficSource() {

            try {

                let referrer = document.referrer.toString(),
                    source;

                let direct = referrer.length === 0;
                let internal = direct ? false : referrer.indexOf(options.siteUrl) === 0;
                let external = !direct && !internal;

                if (external === false) {
                    source = 'direct';
                } else {
                    source = referrer;
                }

                if (source !== 'direct') {
                    // leave only domain (Issue #70)
                    return getDomain(source);
                } else {
                    return source;
                }

            } catch (e) {
                console.error(e);
                return 'direct';
            }

        }

        /**
         * Return query variables object with where property name is query variable
         * and property value is query variable value.
         */
        function getQueryVars() {

            try {

                var result = {},
                    tmp = [];

                window.location.search
                    .substr(1)
                    .split("&")
                    .forEach(function (item) {

                        tmp = item.split('=');

                        if (tmp.length > 1) {
                            result[tmp[0]] = tmp[1];
                        }

                    });

                return result;

            } catch (e) {
                console.error(e);
                return {};
            }

        }


        function getUTMId(useLast = false) {
            try {
                let cookiePrefix = 'pys_'
                let terms = [];
                if (useLast) {
                    cookiePrefix = 'last_pys_'
                }
                $.each(utmId, function (index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        terms[name] = Cookies.get(cookiePrefix + name)
                    }
                });
                return terms;
            } catch (e) {
                console.error(e);
                return [];
            }
        }
        /**
         * Return UTM terms from request query variables or from cookies.
         */
        function getUTMs(useLast = false) {

            try {
                let cookiePrefix = 'pys_'
                if(useLast) {
                    cookiePrefix = 'last_pys_'
                }
                let terms = [];
                $.each(utmTerms, function (index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        let value = Cookies.get(cookiePrefix + name);
                        terms[name] = filterEmails(value); // do not allow email in request params (Issue #70)
                    }
                });

                return terms;

            } catch (e) {
                console.error(e);
                return [];
            }

        }

        function getDateTime() {
            var dateTime = new Array();
            var date = new Date(),
                days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                hours = ['00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08',
                    '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17',
                    '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'
                ];
            dateTime.push(hours[date.getHours()]);
            dateTime.push(days[date.getDay()]);
            dateTime.push(months[date.getMonth()]);
            return dateTime;
        }

        function filterEmails(value) {
            return validateEmail(value) ? undefined : value;
        }

        /**
         * PUBLIC API
         */
        return {
            PRODUCT_SIMPLE : 0,
            PRODUCT_VARIABLE : 1,
            PRODUCT_BUNDLE : 2,
            PRODUCT_GROUPED : 3,

            fireEventForAllPixel:function(functionName,events){
                if (events.hasOwnProperty(Facebook.tag()))
                    Facebook[functionName](events[Facebook.tag()]);
                if (events.hasOwnProperty(Analytics.tag()))
                    Analytics[functionName](events[Analytics.tag()]);
                if (events.hasOwnProperty(Pinterest.tag()))
                    Pinterest[functionName](events[Pinterest.tag()]);
                if (events.hasOwnProperty(Bing.tag()))
                    Bing[functionName](events[Bing.tag()]);
            },

            setupPinterestObject: function () {
                Pinterest = window.pys.Pinterest || Pinterest;
                return Pinterest;
            },

            setupBingObject: function () {
                Bing = window.pys.Bing || Bing;
                return Bing;
            },

            // Clone all object members to another and return it
            copyProperties: function (from, to) {
                for (var key in from) {
                    if("function" == typeof from[key]) {
                        continue;
                    }
                    to[key] = from[key];
                }
                return to;
            },

            manageCookies: function () {
                let expires = parseInt(options.cookie_duration); //  days
                let queryVars = getQueryVars();
                let landing = window.location.href.split('?')[0];
                try {
                    // save data for first visit
                    if(Cookies.get('pys_first_visit') === undefined) {
                        Cookies.set('pys_first_visit', true, { expires: expires });
                        Cookies.set('pysTrafficSource', getTrafficSource(), { expires: expires });
                        Cookies.set('pys_landing_page',landing,{ expires: expires });
                        $.each(utmTerms, function (index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        });
                        $.each(utmId,function(index,name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        })
                    }

                    // save data for last visit if it new session
                    if(isNewSession) {
                        Cookies.set('last_pysTrafficSource', getTrafficSource(), { expires: expires });
                        $.each(utmTerms, function (index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        });
                        $.each(utmId,function(index,name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], { expires: expires });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        })
                        Cookies.set('last_pys_landing_page',landing,{ expires: expires });
                    }
                } catch (e) {
                    console.error(e);
                }
            },
            // clone object
            clone: function(obj) {
                var copy;

                // Handle the 3 simple types, and null or undefined
                if (null == obj || "object" != typeof obj) return obj;

                // Handle Date
                if (obj instanceof Date) {
                    copy = new Date();
                    copy.setTime(obj.getTime());
                    return copy;
                }

                // Handle Array
                if (obj instanceof Array) {
                    copy = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        if("function" == typeof obj[i]) {
                            continue;
                        }
                        copy[i] = Utils.clone(obj[i]);
                    }
                    return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                    copy = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) {
                            if("function" == typeof obj[attr]) {
                                continue;
                            }
                            copy[attr] = Utils.clone(obj[attr]);
                        }
                    }
                    return copy;
                }

                return obj;
            },

            // Returns array of elements with given tag name
            getTagsAsArray: function (tag) {
                return [].slice.call(document.getElementsByTagName(tag));
            },

            getRequestParams: function () {
                return [];
            },

            /**
             * CUSTOM EVENTS
             */

            setupMouseOverClickEvents: function (eventId, triggers) {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $(document).onFirst('mouseover', triggers.join(','), function () {

                    // do not fire event multiple times
                    if ($(this).hasClass('pys-mouse-over-' + eventId)) {
                        return true;
                    } else {
                        $(this).addClass('pys-mouse-over-' + eventId);
                    }

                    Utils.fireDynamicEvent(eventId);

                });

            },

            setupCSSClickEvents: function (eventId, triggers) {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $(document).onFirst('click', triggers.join(','), function () {
                    Utils.fireTriggerEvent(eventId);
                });
            },

            setupURLClickEvents: function () {

                // Non-default binding used to avoid situations when some code in external js
                // stopping events propagation, eg. returns false, and our handler will never called
                $('a[data-pys-event-id]').onFirst('click', function (evt) {

                    $(this).attr('data-pys-event-id').split(',').forEach(function (eventId) {

                        eventId = parseInt(eventId);

                        if (isNaN(eventId) === false) {
                            Utils.fireTriggerEvent(eventId);
                        }

                    });

                });


            },

            setupScrollPosEvents: function (eventId, triggers) {

                var scrollPosThresholds = {},
                    docHeight = $(document).height() - $(window).height();

                // convert % to absolute positions
                $.each(triggers, function (index, scrollPos) {

                    // convert % to pixels
                    scrollPos = docHeight * scrollPos / 100;
                    scrollPos = Math.round(scrollPos);

                    scrollPosThresholds[scrollPos] = eventId;

                });

                $(document).on("scroll",function () {

                    var scrollPos = $(window).scrollTop();

                    $.each(scrollPosThresholds, function (threshold, eventId) {

                        // position has not reached yes
                        if (scrollPos <= threshold) {
                            return true;
                        }

                        // fire event only once
                        if (eventId === null) {
                            return true;
                        } else {
                            scrollPosThresholds[threshold] = null;
                        }

                        Utils.fireTriggerEvent(eventId);

                    });

                });


            },
            setupCommentEvents : function (eventId,triggers) {
                $('form.comment-form').on("submit",function () {
                    Utils.fireTriggerEvent(eventId);
                });
            },

            /**
             * Events
             */

            fireTriggerEvent: function (eventId) {

                if (!options.triggerEvents.hasOwnProperty(eventId)) {
                    return;
                }

                var event = {};
                var events = options.triggerEvents[eventId];

                if (events.hasOwnProperty('facebook')) {
                    event = events.facebook;
                    Facebook.fireEvent(event.name, event);
                }

                if (events.hasOwnProperty('ga')) {
                    event = events.ga;
                    Analytics.fireEvent(event.name, event);
                }

                if (events.hasOwnProperty('pinterest')) {
                    event = events.pinterest;
                    Pinterest.fireEvent(event.name, event);
                }

                if (events.hasOwnProperty('bing')) {
                    event = events.bing;
                    Bing.fireEvent(event.name, event);
                }
            },

            fireStaticEvents: function (pixel) {

                if (options.staticEvents.hasOwnProperty(pixel)) {

                    $.each(options.staticEvents[pixel], function (eventName, events) {
                        $.each(events, function (index, eventData) {

                            eventData.fired = eventData.fired || false;

                            if (!eventData.fired) {

                                var fired = false;

                                // fire event
                                if ('facebook' === pixel) {
                                    fired = Facebook.fireEvent(eventData.name, eventData);
                                } else if ('ga' === pixel) {
                                    fired = Analytics.fireEvent(eventData.name, eventData);
                                } else if ('pinterest' === pixel) {
                                    fired = Pinterest.fireEvent(eventData.name, eventData);
                                } else if ('bing' === pixel) {
                                    fired = Bing.fireEvent(eventData.name, eventData);
                                }

                                // prevent event double event firing
                                eventData.fired = fired;

                            }

                        });
                    });

                }

            },

            /**
             * Load tag's JS
             *
             * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/
             * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
             */
            loadGoogleTag: function (id) {

                if (!gtag_loaded) {

                    (function (window, document, src) {
                        var a = document.createElement('script'),
                            m = document.getElementsByTagName('script')[0];
                        a.async = 1;
                        a.src = src;
                        m.parentNode.insertBefore(a, m);
                    })(window, document, '//www.googletagmanager.com/gtag/js?id=' + id);

                    window.dataLayer = window.dataLayer || [];
                    window.gtag = window.gtag || function gtag() {
                        dataLayer.push(arguments);
                    };

                    gtag('js', new Date());

                    gtag_loaded = true;

                }

            },

            /**
             * GDPR
             */

            loadPixels: function () {

                if (options.gdpr.ajax_enabled && !options.gdpr.consent_magic_integration_enabled) {

                    // retrieves actual PYS GDPR filters values which allow to avoid cache issues
                    $.get({
                        url: options.ajaxUrl,
                        dataType: 'json',
                        data: {
                            action: 'pys_get_gdpr_filters_values'
                        },
                        success: function (res) {

                            if (res.success) {

                                options.gdpr.all_disabled_by_api = res.data.all_disabled_by_api;
                                options.gdpr.facebook_disabled_by_api = res.data.facebook_disabled_by_api;
                                options.gdpr.analytics_disabled_by_api = res.data.analytics_disabled_by_api;
                                options.gdpr.google_ads_disabled_by_api = res.data.google_ads_disabled_by_api;
                                options.gdpr.pinterest_disabled_by_api = res.data.pinterest_disabled_by_api;
                                options.gdpr.bing_disabled_by_api = res.data.bing_disabled_by_api;

                            }

                            loadPixels();

                        }
                    });

                } else {
                    loadPixels();
                }

            },

            consentGiven: function (pixel) {

                /**
                 * ConsentMagic
                 */
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {

                    var cs_cookie = Cookies.get('cs_viewed_cookie_policy'+test_prefix);

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cs_cookie === 'undefined' || cs_cookie === 'yes') {
                            return true;
                        }
                    } else {
                        if (typeof cs_cookie === 'undefined' || cs_cookie === 'yes') {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * Real Cookie Banner
                 */
                if(options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        switch (pixel) {
                            case "analytics":
                                return consentApi.consentSync("http", "_ga", "*").cookieOptIn;
                            case "facebook":
                                return consentApi.consentSync("http", "_fbp", "*").cookieOptIn;
                            case "pinterest":
                                return consentApi.consentSync("http", "_pinterest_sess", ".pinterest.com").cookieOptIn;
                            default:
                                return true;
                        }
                    }
                }

                /**
                 * Cookiebot
                 */
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {

                    var cookiebot_consent_category = options.gdpr['cookiebot_' + pixel + '_consent_category'];

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (Cookiebot.consented === false || Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    } else {
                        if (Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * Cookie Notice
                 */
                if (options.gdpr.cookie_notice_integration_enabled && typeof cnArgs !== 'undefined') {

                    var cn_cookie = Cookies.get(cnArgs.cookieName);

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cn_cookie === 'undefined' || cn_cookie === 'true') {
                            return true;
                        }
                    } else {
                        if (cn_cookie === 'true') {
                            return true;
                        }
                    }

                    return false;

                }

                /**
                 * Cookie Law Info
                 */
                if (options.gdpr.cookie_law_info_integration_enabled) {

                    var cli_cookie = Cookies.get('viewed_cookie_policy');

                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cli_cookie === 'undefined' || cli_cookie === 'yes') {
                            return true;
                        }
                    } else {
                        if (cli_cookie === 'yes') {
                            return true;
                        }
                    }

                    return false;

                }

                return true;

            },

            setupGdprCallbacks: function () {
                /**
                 * ConsentMagic
                 */
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    var test_prefix = CS_Data.test_prefix,
                        cs_refresh_after_consent = false,
                        substring = "cs_enabled_cookie_term";

                    if (CS_Data.cs_refresh_after_consent == 1) {
                        cs_refresh_after_consent = CS_Data.cs_refresh_after_consent;
                    }

                    if (!cs_refresh_after_consent) {
                        var theCookies = document.cookie.split(';');
                        for (var i = 1 ; i <= theCookies.length; i++) {
                            if (theCookies[i-1].indexOf(substring) !== -1) {
                                var categoryCookie = theCookies[i-1].replace('cs_enabled_cookie_term'+test_prefix+'_','');
                                categoryCookie = Number(categoryCookie.replace(/\D+/g,""));
                                var cs_cookie_val = Cookies.get('cs_enabled_cookie_term'+test_prefix+'_'+categoryCookie);
                                if(cs_cookie_val == 'yes') {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.loadPixel();
                                    } 
                                    
                                    if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.loadPixel();
                                    } 
                                    
                                    if (categoryCookie === CS_Data.cs_script_cat.analytics) {
                                        Analytics.loadPixel();
                                    } 
                                    
                                     if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.loadPixel();
                                    }
                                } else {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.disable();
                                    } 
                                    
                                     if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.disable();
                                    } 
                                    
                                     if (categoryCookie === CS_Data.cs_script_cat.analytics) {
                                        Analytics.disable();
                                    } 
                                    
                                     if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.disable();
                                    }
                                }
                                if (Cookies.get('cs_enabled_advanced_matching') == 'yes') {
                                    Facebook.loadPixel();
                                }
                            }
                        }

                        $(document).on('click','.cs_action_btn',function(e) {
                            e.preventDefault();
                            var elm = $(this),
                                button_action = elm.attr('data-cs_action');

                            if(button_action === 'allow_all') {
                                Facebook.loadPixel();
                                Bing.loadPixel();
                                Analytics.loadPixel();
                                Pinterest.loadPixel();
                            } else if(button_action === 'disable_all') {
                                Facebook.disable();
                                Bing.disable();
                                Analytics.disable();
                                Pinterest.disable();
                            }
                        });
                    }
                }
                /**
                 * Real Cookie Banner
                 */
                if(options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        consentApi.consent("http", "_ga", "*")
                            .then(Analytics.loadPixel.bind(Analytics), Analytics.disable.bind(Analytics));
                        consentApi.consent("http", "_fbp", "*")
                            .then(Facebook.loadPixel.bind(Facebook), Facebook.disable.bind(Facebook));
                        consentApi.consent("http", "_pinterest_sess", ".pinterest.com")
                            .then(Pinterest.loadPixel.bind(Pinterest), Pinterest.disable.bind(Pinterest));
                    }
                }
                /**
                 * Cookiebot
                 */
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {

                    window.addEventListener("CookiebotOnConsentReady", function() {
                        if (Cookiebot.consent.marketing) {
                            Facebook.loadPixel();
                            Bing.loadPixel();
                            Pinterest.loadPixel();

                        }
                        if (Cookiebot.consent.statistics) {
                            Analytics.loadPixel();
                        }
                        if (!Cookiebot.consent.marketing) {
                            Facebook.disable();
                            Pinterest.disable();
                            Bing.disable()
                        }
                        if (!Cookiebot.consent.statistics) {
                            Analytics.disable();
                        }
                    });

                }

                /**
                 * Cookie Notice
                 */
                if (options.gdpr.cookie_notice_integration_enabled) {

                    $(document).onFirst('click', '.cn-set-cookie', function () {

                        if ($(this).data('cookie-set') === 'accept') {
                            Facebook.loadPixel();
                            Analytics.loadPixel();
                            Pinterest.loadPixel();
                            Bing.loadPixel();
                        } else {
                            Facebook.disable();
                            Analytics.disable();
                            Pinterest.disable();
                            Bing.disable();
                        }

                    });

                    $(document).onFirst('click', '.cn-revoke-cookie', function () {
                        Facebook.disable();
                        Analytics.disable();
                        Pinterest.disable();
                        Bing.disable();
                    });

                }

                /**
                 * Cookie Law Info
                 */
                if (options.gdpr.cookie_law_info_integration_enabled) {

                    $(document).onFirst('click', '#cookie_action_close_header', function () {
                        Facebook.loadPixel();
                        Analytics.loadPixel();
                        Pinterest.loadPixel();
                        Bing.loadPixel();
                    });

                    $(document).onFirst('click', '#cookie_action_close_header_reject', function () {
                        Facebook.disable();
                        Analytics.disable();
                        Pinterest.disable();
                        Bing.disable();
                    });

                }

            },

            /**
             * DOWNLOAD DOCS
             */

            getLinkExtension: function (link) {

                // Remove anchor, query string and everything before last slash
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);

                // If there's a period left in the URL, then there's a extension
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    link = link.substring(link.indexOf(".") + 1); // Remove everything but what's after the first period
                    return link;
                } else {
                    return "";
                }
            },

            getLinkFilename: function (link) {

                // Remove anchor, query string and everything before last slash
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);

                // If there's a period left in the URL, then there's a extension
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    return link;
                } else {
                    return "";
                }
            },
            /**
             * Enrich
             */
            isCheckoutPage: function () {
                return $('body').hasClass('woocommerce-checkout') ||
                    $('body').hasClass('edd-checkout');
            },
            addCheckoutFields : function() {
                var utm = "";
                var utms = getUTMs()

                $.each(utmTerms, function (index, name) {
                    if(index > 0) {
                        utm+="|";
                    }
                    utm+=name+":"+utms[name];
                });
                var utmIdList = "";
                var utmsIds = getUTMId()
                $.each(utmId, function (index, name) {
                    if(index > 0) {
                        utmIdList+="|";
                    }
                    utmIdList+=name+":"+utmsIds[name];
                });
                var utmIdListLast = "";
                var utmsIdsLast = getUTMId(true)
                $.each(utmId, function (index, name) {
                    if(index > 0) {
                        utmIdListLast+="|";
                    }
                    utmIdListLast+=name+":"+utmsIdsLast[name];
                });


                var utmLast = "";
                var utmsLast = getUTMs(true)
                $.each(utmTerms, function (index, name) {
                    if(index > 0) {
                        utmLast+="|";
                    }
                    utmLast+=name+":"+utmsLast[name];
                });

                var dateTime = getDateTime();
                var landing = Cookies.get('pys_landing_page');
                var lastLanding = Cookies.get('last_pys_landing_page');
                var trafic = Cookies.get('pysTrafficSource');
                var lastTrafic = Cookies.get('last_pysTrafficSource');

                var $form = null;
                if($('body').hasClass('woocommerce-checkout')) {
                    $form = $("form.woocommerce-checkout");
                } else {
                    $form = $("#edd_purchase_form");
                }
                var inputs = {'pys_utm':utm,
                    'pys_utm_id':utmIdList,
                    'pys_browser_time':dateTime.join("|"),
                    'pys_landing':landing,
                    'pys_source':trafic,
                    'pys_order_type': $(".wcf-optin-form").length > 0 ? "wcf-optin" : "normal",

                    'last_pys_landing':lastLanding,
                    'last_pys_source':lastTrafic,
                    'last_pys_utm':utmLast,
                    'last_pys_utm_id':utmIdListLast,
                }

                Object.keys(inputs).forEach(function(key,index) {
                    $form.append("<input type='hidden' name='"+key+"' value='"+inputs[key]+"' /> ");
                });


            }
        };

    }(options);

    var Facebook = function (options) {


        var defaultEventTypes = [
            'PageView',
            'ViewContent',
            'Search',
            'AddToCart',
            'AddToWishlist',
            'InitiateCheckout',
            'AddPaymentInfo',
            'Purchase',
            'Lead',

            'Subscribe',
            'CustomizeProduct',
            'FindLocation',
            'StartTrial',
            'SubmitApplication',
            'Schedule',
            'Contact',
            'Donate'
        ];

        var initialized = false;

        // fire server side event gdpr plugin installed
        var isApiDisabled = options.gdpr.all_disabled_by_api ||
            options.gdpr.facebook_disabled_by_api ||
            options.gdpr.cookiebot_integration_enabled ||
            options.gdpr.consent_magic_integration_enabled ||
            options.gdpr.cookie_notice_integration_enabled ||
            options.gdpr.cookie_law_info_integration_enabled;

        /**
         *
         * @param allData
         * @param params
         * @returns {string | null}
         */
        function sendFbServerEvent(allData,name,params) {
            let eventId = null;
            if(options.facebook.serverApiEnabled) {

                if(allData.e_id === "woo_remove_from_cart" || allData.e_id === "woo_add_to_cart_on_button_click") {// server event will sended from hook
                    let isAddToCartFromJs =  options.woo.hasOwnProperty("addToCartCatchMethod")
                        && options.woo.addToCartCatchMethod === "add_cart_js";

                    if(isAddToCartFromJs || allData.e_id !== "woo_add_to_cart_on_button_click") {
                        Facebook.updateEventId(allData.name);
                        allData.eventID = Facebook.getEventId(allData.name);
                    } else {
                        // not update eventID for woo_add_to_cart_on_button_click,
                        // web event created by ajax from server
                    }
                } else {
                    if(  options.facebook.ajaxForServerEvent
                        || isApiDisabled
                        || allData.delay > 0
                        || allData.type !== "static")
                    { // send event from server if they was bloc by gdpr or need send with delay
                        allData.eventID = pys_generate_token(36);
                        var json = {
                            action: 'pys_api_event',
                            pixel: 'facebook',
                            event: name,
                            data:params,
                            ids:options.facebook.pixelIds,
                            eventID:allData.eventID,
                            url:window.location.href,
                        };
                        if(allData.hasOwnProperty('woo_order')) {
                            json['woo_order'] = allData.woo_order;
                        }
                        if(allData.hasOwnProperty('edd_order')) {
                            json['edd_order'] = allData.edd_order;
                        }

                        if(allData.delay > 0) {
                            jQuery.ajax( {
                                type: 'POST',
                                url: options.ajaxUrl,
                                data: json,
                                headers: {
                                    'Cache-Control': 'no-cache'
                                },
                                success: function(){},
                            });
                        } else {
                            setTimeout(function (json) {
                                jQuery.ajax({
                                    type: 'POST',
                                    url: options.ajaxUrl,
                                    data: json,
                                    headers: {
                                        'Cache-Control': 'no-cache'
                                    },
                                    success: function () {
                                    },
                                });
                            }, 500, json);
                        }
                    }
                }
                eventId = allData.eventID
            }

            return eventId;
        }

        function fireEvent(name, allData) {

            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name,'facebook')) {
                return;
            }

            var actionType = defaultEventTypes.includes(name) ? 'track' : 'trackCustom';
            var data = allData.params;
            var params = {};
            var arg = {};
            Utils.copyProperties(data, params);

            let eventId = sendFbServerEvent(allData,name,params)


            if("hCR" === name) {
                return;
            }

            if (options.debug) {
                console.log('[Facebook] ' + name, params,"eventID",eventId);
            }

            if(eventId != null) {
                arg.eventID = eventId;
            }

            fbq(actionType, name, params,arg);
        }

        /**
         * Public API
         */
        return {
            tag: function() {
                return "facebook";
            },
            isEnabled: function () {
                return options.hasOwnProperty('facebook');
            },

            disable: function () {
                initialized = false;
            },

            /**
             * Load pixel's JS
             */
            loadPixel: function () {

                if (initialized || !this.isEnabled() || !Utils.consentGiven('facebook')) {
                    return;
                }

                !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.agent = 'dvpixelyoursite';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window,
                    document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

                // initialize pixel
                options.facebook.pixelIds.forEach(function (pixelId) {

                    if (options.facebook.removeMetadata) {
                        fbq('set', 'autoConfig', false, pixelId);
                    }
                    if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                        if(options.facebook.advancedMatching.length === 0) {
                            fbq('init', pixelId);
                        } else {
                            var cs_advanced_matching = Cookies.get('cs_enabled_advanced_matching'+test_prefix);
                            if (jQuery('#cs_enabled_advanced_matching'+test_prefix).length > 0) {
                                if (cs_advanced_matching == 'yes') {
                                    fbq('init', pixelId, options.facebook.advancedMatching);
                                } else {
                                    fbq('init', pixelId);
                                }
                            } else {
                                fbq('init', pixelId, options.facebook.advancedMatching);
                            }
                        }
                    } else {
                        if (options.facebook.advancedMatching.length === 0) {
                            fbq('init', pixelId);
                        } else {
                            fbq('init', pixelId, options.facebook.advancedMatching);
                        }
                    }
                });

                initialized = true;

                Utils.fireStaticEvents('facebook');

            },

            fireEvent: function (name, data) {

                if (!initialized || !this.isEnabled()) {
                    return false;
                }

                data.delay = data.delay || 0;
                data.params = data.params || {};

                if (data.delay === 0) {

                    fireEvent(name, data);

                } else {

                    setTimeout(function (name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);

                }

                return true;

            },

            onCommentEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onDownloadEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onFormEvent: function (event) {

                this.fireEvent(event.name, event);

            },

            onWooAddToCartOnButtonEvent: function (product_id) {

                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()];

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {
                        event = Utils.copyProperties(event, {})
                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook'].params, event.params)
                        this.fireEvent(event.name, event);
                    }
                }
            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, $form) {

                window.pysWooProductData = window.pysWooProductData || [];
                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                if (product_type === Utils.PRODUCT_VARIABLE && !options.facebook.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {


                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook'].params, event.params);

                        var groupValue = 0;
                        if(product_type === Utils.PRODUCT_GROUPED ) {
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index){
                                var childId = $(this).attr('name').replaceAll("quantity[","").replaceAll("]","");
                                var quantity = parseInt($(this).val());
                                if(isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['facebook'].grouped[childId];

                                if(quantity == 0) {
                                    event.params.content_ids.forEach(function(el,index,array) {
                                        if(el == childItem.content_id) {
                                            array.splice(index, 1);
                                        }
                                    });
                                }

                                if(event.params.hasOwnProperty('contents')) {
                                    event.params.contents.forEach(function(el,index,array) {
                                        if(el.id == childItem.content_id) {
                                            if(quantity > 0){
                                                el.quantity = quantity;
                                            } else {
                                                array.splice(index, 1);
                                            }
                                        }
                                    });
                                }


                                groupValue += childItem.price * quantity;
                            });
                            if(groupValue == 0) return; // skip if no items selected
                        }

                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {

                            if(product_type === Utils.PRODUCT_GROUPED) {
                                event.params.value = groupValue;
                            } else if(product_type === Utils.PRODUCT_BUNDLE) {
                                var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                                var items_sum = getBundlePriceOnSingleProduct(data);
                                event.params.value = (parseInt(data.base_price) + items_sum )* qty;
                            } else {
                                event.params.value = event.params.value * qty;
                            }
                        }

                        // only when non Facebook for WooCommerce logic used
                        if (event.params.hasOwnProperty('contents') && product_type !== Utils.PRODUCT_GROUPED) {
                            event.params.contents[0].quantity = qty;
                        }

                        this.fireEvent(event.name, event);

                    }
                }
            },

            onWooRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {

                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);

                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('facebook')) {


                            Utils.copyProperties(window.pysEddProductData[download_id][index]['facebook']["params"], event.params)

                            // maybe customize value option
                            if (options.edd.addToCartOnButtonValueEnabled && options.edd.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = event.params.value * qty;
                            }

                            // update contents qty param
                            var contents = event.params.contents;
                            contents[0].quantity = qty;
                            event.params.contents = contents;

                            this.fireEvent(event.name,event);

                        }
                    }

                }

            },

            onEddRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function (event) {
                this.fireEvent(event.name, event);
            },
            onTime: function (event) {
                this.fireEvent(event.name, event);
            },
            initEventIdCookies: function (key) {
                var ids = {};
                ids[key] = pys_generate_token(36)
                Cookies.set('pys_fb_event_id', JSON.stringify(ids));
            },
            updateEventId:function(key) {
                var cooData = Cookies.get("pys_fb_event_id")
                if(cooData === undefined) {
                    this.initEventIdCookies(key);
                } else {
                    var data = JSON.parse(cooData);
                    data[key] = pys_generate_token(36);
                    Cookies.set('pys_fb_event_id', JSON.stringify(data) );
                }
            },

            getEventId:function (key) {
                var data = Cookies.get("pys_fb_event_id");
                if(data === undefined) {
                    this.initEventIdCookies(key);
                    data = Cookies.get("pys_fb_event_id");
                }
                return JSON.parse(data)[key];
            },
        };

    }(options);

    var Analytics = function (options) {

        var initialized = false;

        /**
         * Fires event
         *
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/sending-data
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/events
         * @link: https://developers.google.com/gtagjs/reference/event
         * @link: https://developers.google.com/gtagjs/reference/parameter
         *
         * @link: https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
         *
         * @param name
         * @param data
         */
        function fireEvent(name, data) {

            if(typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name,'ga')) {
                return;
            }

            var eventParams = Utils.copyProperties(data, {});

            var _fireEvent = function (tracking_id,name,params) {

                params['send_to'] = tracking_id;

                if (options.debug) {
                    console.log('[Google Analytics #' + tracking_id + '] ' + name, params);
                }

                gtag('event', name, params);

            };

            options.ga.trackingIds.forEach(function (tracking_id) {
                var copyParams = Utils.copyProperties(eventParams, {}); // copy params because mapParamsTov4 can modify it
                var params = mapParamsTov4(tracking_id,name,copyParams)
                _fireEvent(tracking_id,name,params);
            });

        }
        function mapParamsTov4(tag,name,param) {
            //GA4 automatically collects a number of parameters for all events
            delete param.page_title;
            delete param.event_url;
            delete param.landing_page;
            // end
            if(isv4(tag)) {
                delete param.traffic_source;
                delete param.event_category;
                delete param.event_label;
                delete param.ecomm_prodid;
                delete param.ecomm_pagetype;
                delete param.ecomm_totalvalue;
                if(name === 'search') {
                    param['search'] = param.search_term;
                    delete param.search_term;
                    delete param.non_interaction;
                    delete param.dynx_itemid;
                    delete param.dynx_pagetype;
                    delete param.dynx_totalvalue;
                }
            } else {

                switch (name) {

                    case 'Comment' :
                    case 'login' :
                    case 'sign_up' :
                    case 'EmailClick' :
                    case 'TelClick' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                             non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'Form' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            non_interaction: param.non_interaction,
                        }
                        var formClass = (typeof param.form_class != 'undefined') ? 'class: ' + param.form_class : '';
                        if(formClass != "") {
                            params["event_label"] = formClass;
                        }
                        return params;
                    }
                    case 'Download' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: param.download_name,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'TimeOnPage' :
                    case 'PageScroll' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: document.title,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                    case 'search' : {
                        let params = {
                            event_category: "Key Actions",
                            event_action: name,
                            event_label: param.search_term,
                              non_interaction: param.non_interaction,
                        }
                        return params;
                    }
                }

                //delete standard params

                delete param.post_type;
                delete param.post_id;
                delete param.plugin;
                delete param.user_role;
                delete param.cartlows;
                delete param.cartflows_flow;
                delete param.cartflows_step;
            }
            return param;
        }

        function isv4(tag) {
            return tag.indexOf('G') === 0;
        }

        /**
         * Public API
         */
        return {
            tag: function() {
                return "ga";
            },
            isEnabled: function () {
                return options.hasOwnProperty('ga');
            },

            disable: function () {
                initialized = false;
            },

            loadPixel: function () {

                if (initialized || !this.isEnabled() || !Utils.consentGiven('analytics')) {
                    return;
                }

                Utils.loadGoogleTag(options.ga.trackingIds[0]);

                var config = {
                    'link_attribution': options.ga.enhanceLinkAttr,
                    'anonymize_ip': options.ga.anonimizeIP
                };

                // Cross-Domain tracking
                if (options.ga.crossDomainEnabled) {
                    config.linker = {
                        accept_incoming: options.ga.crossDomainAcceptIncoming,
                        domains: options.ga.crossDomainDomains
                    };
                }



                // configure tracking ids
                options.ga.trackingIds.forEach(function (trackingId,index) {
                    config.debug_mode = options.ga.isDebugEnabled.includes("index_" + index);
                    if(isv4(trackingId)) {
                        if(options.ga.disableAdvertisingFeatures) {
                            config.allow_google_signals = false
                        }
                        if(options.ga.disableAdvertisingPersonalization) {
                            config.allow_ad_personalization_signals = false
                        }
                    }
                    gtag('config', trackingId, config);
                });

                initialized = true;

                Utils.fireStaticEvents('ga');

            },

            fireEvent: function (name, data) {

                if (!initialized || !this.isEnabled()) {
                    return false;
                }

                data.delay = data.delay || 0;
                data.params = data.params || {};

                if (data.delay === 0) {

                    fireEvent(name, data.params);

                } else {

                    setTimeout(function (name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data.params);

                }

                return true;

            },

            onCommentEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onDownloadEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onFormEvent: function (event) {
                this.fireEvent(event.name, event);
            },

            onWooAddToCartOnButtonEvent: function (product_id) {

                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {
                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params)
                        this.fireEvent(event.name, event);
                    }
                }


            },

            onWooAddToCartOnSingleEvent: function (product_id, qty, product_type, $form) {

                window.pysWooProductData = window.pysWooProductData || [];

                if(!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);

                if (product_type === Utils.PRODUCT_VARIABLE && !options.ga.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }

                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {

                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params);
                        if(product_type === Utils.PRODUCT_GROUPED ) {
                            var groupValue = 0;
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index){
                                var childId = $(this).attr('name').replaceAll("quantity[","").replaceAll("]","");
                                var quantity = parseInt($(this).val());
                                if(isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['ga'].grouped[childId];
                                // update quantity
                                event.params.items.forEach(function(el,index,array) {
                                    if(el.id == childItem.content_id) {
                                        if(quantity > 0){
                                            el.quantity = quantity;
                                        } else {
                                            array.splice(index, 1);
                                        }
                                    }
                                });
                                groupValue += childItem.price * quantity;
                            });
                            if(options.woo.addToCartOnButtonValueEnabled &&
                                options.woo.addToCartOnButtonValueOption !== 'global' &&
                                event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = groupValue;
                            }

                            if(groupValue == 0) return; // skip if no items selected
                        } else {
                            // update items qty param
                            event.params.items[0].quantity = qty;
                        }

                        // maybe customize value option
                        if (options.woo.addToCartOnButtonValueEnabled &&
                            options.woo.addToCartOnButtonValueOption !== 'global' &&
                            product_type !== Utils.PRODUCT_GROUPED)
                        {
                            if(event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = event.params.items[0].price * qty;
                            }

                        }


                        this.fireEvent(event.name, event);
                    }
                }

            },

            onWooRemoveFromCartEvent: function (event) {

                this.fireEvent(event.name, event);

            },

            onEddAddToCartOnButtonEvent: function (download_id, price_index, qty) {

                if(!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);


                if (window.pysEddProductData.hasOwnProperty(download_id)) {

                    var index;

                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }

                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('ga')) {

                            Utils.copyProperties(window.pysEddProductData[download_id][index]['ga'].params, event.params);

                            // update items qty param
                            event.params.items[0].quantity = qty;

                            this.fireEvent(event.name,event);

                        }
                    }

                }

            },

            onEddRemoveFromCartEvent: function (event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function (event) {
                this.fireEvent(event.name, event);
            },
            onTime: function (event) {
                this.fireEvent(event.name, event);
            },

        };

    }(options);

    window.pys = window.pys || {};
    window.pys.Facebook = Facebook;
    window.pys.Analytics = Analytics;
    window.pys.Utils = Utils;




    $(document).ready(function () {

        if($("#pys_late_event").length > 0) {
            var events =  JSON.parse($("#pys_late_event").attr("dir"));
            for(var key in events) {
                var event = {};
                event[events[key].e_id] = [events[key]];
                if(options.staticEvents.hasOwnProperty(key)) {
                    Object.assign(options.staticEvents[key], event);
                } else {
                    options.staticEvents[key] = event;
                }

            }
        }

        var Pinterest = Utils.setupPinterestObject();
        var Bing = Utils.setupBingObject();

        Utils.manageCookies();
        Utils.setupGdprCallbacks();
        // page scroll event
        if ( options.dynamicEvents.hasOwnProperty("automatic_event_scroll")
        ) {

            var singlePageScroll = function () {


                var docHeight = $(document).height() - $(window).height();
                var isFired = false;

                if (options.dynamicEvents.hasOwnProperty("automatic_event_scroll")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_scroll);
                    for(var i = 0;i<pixels.length;i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_scroll[pixels[i]]);
                        var scroll = Math.round(docHeight * event.scroll_percent / 100)// convert % to absolute positions

                        if(scroll < $(window).scrollTop()) {
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onPageScroll(event);
                            isFired = true
                        }
                    }
                }
                if(isFired) {
                    $(document).off("scroll",singlePageScroll);
                }
            }
            $(document).on("scroll",singlePageScroll);
        }


        if (options.dynamicEvents.hasOwnProperty("automatic_event_time_on_page")) {
            var pixels = Object.keys(options.dynamicEvents.automatic_event_time_on_page);
            var time = options.dynamicEvents.automatic_event_time_on_page[pixels[0]].time_on_page; // the same for all pixel
            setTimeout(function(){
                for(var i = 0;i<pixels.length;i++) {
                    var event = Utils.clone(options.dynamicEvents.automatic_event_time_on_page[pixels[i]]);
                    Utils.copyProperties(Utils.getRequestParams(), event.params);
                    getPixelBySlag(pixels[i]).onTime(event);
                }
            },time*1000);
        }

        // setup Click Event
        if (options.dynamicEvents.hasOwnProperty("automatic_event_download")) {

            $(document).onFirst('click', 'a, button, input[type="button"], input[type="submit"]', function (e) {

                var $elem = $(this);

                // Download
                if(options.dynamicEvents.hasOwnProperty("automatic_event_download")
                ) {
                    var isFired = false;
                    if ($elem.is('a')) {
                        var href = $elem.attr('href');
                        if (typeof href !== "string") {
                            return;
                        }
                        href = href.trim();
                        var extension = Utils.getLinkExtension(href);
                        var track_download = false;

                        if (extension.length > 0) {

                            if(options.dynamicEvents.hasOwnProperty("automatic_event_download") ) {
                                var pixels = Object.keys(options.dynamicEvents.automatic_event_download);
                                for (var i = 0; i < pixels.length; i++) {
                                    var event = Utils.clone(options.dynamicEvents.automatic_event_download[pixels[i]]);
                                    var extensions = event.extensions;
                                    if (extensions.includes(extension)) {

                                        if(pixels[i] == "tiktok") {
                                            getPixelBySlag(pixels[i]).fireEvent(tikEvent.name, event);
                                        } else {
                                            if (options.enable_remove_download_url_param) {
                                                href = href.split('?')[0];
                                            }
                                            event.params.download_url = href;
                                            event.params.download_type = extension;
                                            event.params.download_name = Utils.getLinkFilename(href);
                                            getPixelBySlag(pixels[i]).onDownloadEvent(event);
                                        }

                                        isFired = true;
                                    }
                                }
                            }
                        }
                    }
                    if(isFired) { // prevent duplicate events on the same element
                        return;
                    }
                }
            });
        }


        // setup Dynamic events
        $.each(options.triggerEventTypes, function (triggerType, events) {

            $.each(events, function (eventId, triggers) {

                switch (triggerType) {
                    case 'url_click':
                        //@see: Utils.setupURLClickEvents()
                        break;

                    case 'css_click':
                        Utils.setupCSSClickEvents(eventId, triggers);
                        break;

                    case 'css_mouseover':
                        Utils.setupMouseOverClickEvents(eventId, triggers);
                        break;

                    case 'scroll_pos':
                        Utils.setupScrollPosEvents(eventId, triggers);
                        break;
                    case 'comment':
                        Utils.setupCommentEvents(eventId, triggers);
                        break;
                }

            });

        });
        // setup WooCommerce events
        if (options.woo.enabled) {

            // WooCommerce AddToCart
            if (options.dynamicEvents.hasOwnProperty("woo_add_to_cart_on_button_click")
                && options.woo.hasOwnProperty("addToCartCatchMethod")
                && options.woo.addToCartCatchMethod === "add_cart_js"
            ) {

                // Loop, any kind of "simple" product, except external
                $('.add_to_cart_button:not(.product_type_variable,.product_type_bundle,.single_add_to_cart_button)').on("click",function (e) {

                    var product_id = $(this).data('product_id');

                    if (typeof product_id !== 'undefined') {
                        Facebook.onWooAddToCartOnButtonEvent(product_id);
                        Analytics.onWooAddToCartOnButtonEvent(product_id);
                        Pinterest.onWooAddToCartOnButtonEvent(product_id);
                        Bing.onWooAddToCartOnButtonEvent(product_id);
                    }

                });

                // Single Product
                // tap try to https://stackoverflow.com/questions/30990967/on-tap-click-event-firing-twice-how-to-avoid-it
                //  $(document) not work
                $('body').onFirst('click','button.single_add_to_cart_button,.single_add_to_cart_button',function (e) {

                    var $button = $(this);

                    if ($button.hasClass('disabled')) {
                        return;
                    }

                    var $form = $button.closest('form');

                    var product_type = Utils.PRODUCT_SIMPLE;

                    if ($form.length === 0) {
                        return ;
                    } else if ($form.hasClass('variations_form')) {
                        product_type = Utils.PRODUCT_VARIABLE;
                    } else if($form.hasClass('bundle_form')) {
                        product_type = Utils.PRODUCT_BUNDLE;
                    } else if($form.hasClass('grouped_form')) {
                        product_type = Utils.PRODUCT_GROUPED;
                    }




                    var product_id;
                    var qty;

                    if (product_type === Utils.PRODUCT_GROUPED) {
                        qty = 1;
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                    } else if (product_type === Utils.PRODUCT_VARIABLE) {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if(qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    } else {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if(qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    }

                    Facebook.onWooAddToCartOnSingleEvent(product_id, qty, product_type, $form);
                    Analytics.onWooAddToCartOnSingleEvent(product_id, qty, product_type, $form);

                    Pinterest.onWooAddToCartOnSingleEvent(product_id, qty, product_type, false, $form);
                    Bing.onWooAddToCartOnSingleEvent(product_id, qty, product_type, false, $form);

                });

            }

            // WooCommerce RemoveFromCart
            if (options.dynamicEvents.hasOwnProperty("woo_remove_from_cart")) {

                $('body').on('click', options.woo.removeFromCartSelector, function (e) {

                    var $a = $(e.currentTarget),
                        href = $a.attr('href');

                    // extract cart item hash from remove button URL
                    var regex = new RegExp("[\\?&]remove_item=([^&#]*)"),
                        results = regex.exec(href);

                    if (results !== null) {

                        var item_hash = results[1];

                        if (options.dynamicEvents["woo_remove_from_cart"].hasOwnProperty(item_hash)) {
                            var events = options.dynamicEvents["woo_remove_from_cart"][item_hash];
                            Utils.fireEventForAllPixel("onWooRemoveFromCartEvent",events)
                        }

                    }

                });
            }
        }

        // setup EDD events
        if (options.edd.enabled) {

            // EDD AddToCart
            if (options.dynamicEvents.hasOwnProperty("edd_add_to_cart_on_button_click")) {

                $('form.edd_download_purchase_form .edd-add-to-cart').on("click",function (e) {

                    var $button = $(this);
                    var $form = $button.closest('form');
                    var variable_price = $button.data('variablePrice'); // yes/no
                    var price_mode = $button.data('priceMode'); // single/multi
                    var ids = [];
                    var quantities = [];
                    var qty;
                    var id;

                    if (variable_price === 'yes' && price_mode === 'multi') {

                        id = $form.find('input[name="download_id"]').val();

                        // get selected variants
                        $.each($form.find('input[name="edd_options[price_id][]"]:checked'), function (i, el) {
                            ids.push(id + '_' + $(el).val());
                        });

                        // get qty for selected variants
                        $.each(ids, function (i, variant_id) {

                            var variant_index = variant_id.split('_', 2);
                            qty = $form.find('input[name="edd_download_quantity_' + variant_index[1] + '"]').val();

                            if (typeof qty !== 'undefined') {
                                quantities.push(qty);
                            } else {
                                quantities.push(1);
                            }

                        });

                    } else if (variable_price === 'yes' && price_mode === 'single') {

                        id = $form.find('input[name="download_id"]').val();
                        ids.push(id + '_' + $form.find('input[name="edd_options[price_id][]"]:checked').val());

                        qty = $form.find('input[name="edd_download_quantity"]').val();

                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }

                    } else {

                        ids.push($button.data('downloadId'));

                        qty = $form.find('input[name="edd_download_quantity"]').val();

                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }
                    }

                    // fire event for each download/variant
                    $.each(ids, function (i, download_id) {

                        var q = parseInt(quantities[i]);
                        var variant_index = download_id.toString().split('_', 2);
                        var price_index;

                        if (variant_index.length === 2) {
                            download_id = variant_index[0];
                            price_index = variant_index[1];
                        }

                        Facebook.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Analytics.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Pinterest.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Bing.onEddAddToCartOnButtonEvent(download_id, price_index, q);

                    });

                });

            }


            // EDD RemoveFromCart
            if (options.dynamicEvents.hasOwnProperty("edd_remove_from_cart") ) {

                $('form#edd_checkout_cart_form .edd_cart_remove_item_btn').on("click",function (e) {

                    var href = $(this).attr('href');
                    if(href) {
                        var key = href.substring(href.indexOf('=') + 1).charAt(0);
                        if (options.dynamicEvents.edd_remove_from_cart.hasOwnProperty(key)) {
                            var events = options.dynamicEvents.edd_remove_from_cart[key];
                            Utils.fireEventForAllPixel("onEddRemoveFromCartEvent",events)
                        }
                    }
                });

            }

        }

        // setup Comment Event
        if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")
        ) {

            $('form.comment-form').on("submit",function () {
                if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_comment);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_comment[pixels[i]]);
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onCommentEvent(event);
                    }
                }
            });

        }


        // setup Form Event
        if ( options.dynamicEvents.hasOwnProperty("automatic_event_form")) {

            $(document).onFirst('submit', 'form', function (e) {

                var $form = $(this);

                // exclude WP forms
                if ($form.hasClass('comment-form') || $form.hasClass('search-form') || $form.attr('id') === 'adminbarsearch') {
                    return;
                }

                // exclude Woo forms
                if ($form.hasClass('woocommerce-product-search') || $form.hasClass('cart') || $form.hasClass('woocommerce-cart-form') ||
                    $form.hasClass('woocommerce-shipping-calculator') || $form.hasClass('checkout') || $form.hasClass('checkout_coupon')) {
                    return;
                }

                // exclude EDD forms
                if ($form.hasClass('edd_form') || $form.hasClass('edd_download_purchase_form')) {
                    return;
                }

                var params = {
                    form_id: $form.attr('id'),
                    form_class: $form.attr('class'),
                    text: $form.find('[type="submit"]').is('input') ?
                        $form.find('[type="submit"]').val() : $form.find('[type="submit"]').text()
                };

                if(options.dynamicEvents.hasOwnProperty("automatic_event_form") ) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_form[pixels[i]]);

                        if(pixels[i] === "tiktok") {
                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                        } else {
                            Utils.copyProperties(params, event.params,)
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onFormEvent(event);
                        }
                    }
                }
            });

            //Forminator
            $(document).on( 'forminator:form:submit:success', function( formData ){
                var params = {
                    form_id: $(formData.target).find('input[name="form_id"]').val(),
                    text: $(formData.target).find('.forminator-button-submit').text()
                };

                if(options.dynamicEvents.hasOwnProperty("automatic_event_form") ) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_form[pixels[i]]);
                        Utils.copyProperties(params, event.params)
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onFormEvent(event);
                    }
                }
            });

            // Ninja Forms
            $(document).onFirst('nfFormSubmitResponse', function (e, data) {

                var params = {
                    form_id: data.response.data.form_id,
                    text: data.response.data.settings.title
                };

                if(options.dynamicEvents.hasOwnProperty("automatic_event_form") ) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for(var i = 0;i<pixels.length;i++) {
                        var event = options.dynamicEvents.automatic_event_form[pixels[i]];
                        Utils.copyProperties(params,event.params)
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onFormEvent(event);
                    }
                }

            });

        }


        // load pixel APIs
        Utils.loadPixels();
        // setup Enrich content
        if(Utils.isCheckoutPage()) {
            Utils.addCheckoutFields();
        }
    });

}(jQuery, pysOptions);

function pys_generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function getBundlePriceOnSingleProduct(data) {
    var items_sum = 0;
    jQuery(".bundle_form .bundled_product").each(function(index){
        var id = jQuery(this).find(".cart").data("bundled_item_id");
        var item_price = data.prices[id];
        var item_quantity = jQuery(this).find(".bundled_qty").val();
        if(!jQuery(this).hasClass("bundled_item_optional") ||
            jQuery(this).find(".bundled_product_optional_checkbox input").prop('checked')) {
            items_sum += item_price*item_quantity;
        }
    });
    return items_sum;
}

function getPixelBySlag(slug) {
    switch (slug) {
        case "facebook": return window.pys.Facebook;
        case "ga": return window.pys.Analytics;
        case "bing": return window.pys.Bing;
        case "pinterest": return window.pys.Pinterest;
    }
};
// source --> https://lonora.hrslab.com/wp-content/plugins/elementor/assets/lib/font-awesome/js/v4-shims.min.js?ver=3.7.7 
/*!
 * Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
var l,a;l=this,a=function(){"use strict";var l={},a={};try{"undefined"!=typeof window&&(l=window),"undefined"!=typeof document&&(a=document)}catch(l){}var e=(l.navigator||{}).userAgent,r=void 0===e?"":e,n=l,o=a,u=(n.document,!!o.documentElement&&!!o.head&&"function"==typeof o.addEventListener&&o.createElement,~r.indexOf("MSIE")||r.indexOf("Trident/"),"___FONT_AWESOME___"),t=function(){try{return"production"===process.env.NODE_ENV}catch(l){return!1}}();var f=n||{};f[u]||(f[u]={}),f[u].styles||(f[u].styles={}),f[u].hooks||(f[u].hooks={}),f[u].shims||(f[u].shims=[]);var i=f[u],s=[["glass",null,"glass-martini"],["meetup","fab",null],["star-o","far","star"],["remove",null,"times"],["close",null,"times"],["gear",null,"cog"],["trash-o","far","trash-alt"],["file-o","far","file"],["clock-o","far","clock"],["arrow-circle-o-down","far","arrow-alt-circle-down"],["arrow-circle-o-up","far","arrow-alt-circle-up"],["play-circle-o","far","play-circle"],["repeat",null,"redo"],["rotate-right",null,"redo"],["refresh",null,"sync"],["list-alt","far",null],["dedent",null,"outdent"],["video-camera",null,"video"],["picture-o","far","image"],["photo","far","image"],["image","far","image"],["pencil",null,"pencil-alt"],["map-marker",null,"map-marker-alt"],["pencil-square-o","far","edit"],["share-square-o","far","share-square"],["check-square-o","far","check-square"],["arrows",null,"arrows-alt"],["times-circle-o","far","times-circle"],["check-circle-o","far","check-circle"],["mail-forward",null,"share"],["expand",null,"expand-alt"],["compress",null,"compress-alt"],["eye","far",null],["eye-slash","far",null],["warning",null,"exclamation-triangle"],["calendar",null,"calendar-alt"],["arrows-v",null,"arrows-alt-v"],["arrows-h",null,"arrows-alt-h"],["bar-chart","far","chart-bar"],["bar-chart-o","far","chart-bar"],["twitter-square","fab",null],["facebook-square","fab",null],["gears",null,"cogs"],["thumbs-o-up","far","thumbs-up"],["thumbs-o-down","far","thumbs-down"],["heart-o","far","heart"],["sign-out",null,"sign-out-alt"],["linkedin-square","fab","linkedin"],["thumb-tack",null,"thumbtack"],["external-link",null,"external-link-alt"],["sign-in",null,"sign-in-alt"],["github-square","fab",null],["lemon-o","far","lemon"],["square-o","far","square"],["bookmark-o","far","bookmark"],["twitter","fab",null],["facebook","fab","facebook-f"],["facebook-f","fab","facebook-f"],["github","fab",null],["credit-card","far",null],["feed",null,"rss"],["hdd-o","far","hdd"],["hand-o-right","far","hand-point-right"],["hand-o-left","far","hand-point-left"],["hand-o-up","far","hand-point-up"],["hand-o-down","far","hand-point-down"],["arrows-alt",null,"expand-arrows-alt"],["group",null,"users"],["chain",null,"link"],["scissors",null,"cut"],["files-o","far","copy"],["floppy-o","far","save"],["navicon",null,"bars"],["reorder",null,"bars"],["pinterest","fab",null],["pinterest-square","fab",null],["google-plus-square","fab",null],["google-plus","fab","google-plus-g"],["money","far","money-bill-alt"],["unsorted",null,"sort"],["sort-desc",null,"sort-down"],["sort-asc",null,"sort-up"],["linkedin","fab","linkedin-in"],["rotate-left",null,"undo"],["legal",null,"gavel"],["tachometer",null,"tachometer-alt"],["dashboard",null,"tachometer-alt"],["comment-o","far","comment"],["comments-o","far","comments"],["flash",null,"bolt"],["clipboard","far",null],["paste","far","clipboard"],["lightbulb-o","far","lightbulb"],["exchange",null,"exchange-alt"],["cloud-download",null,"cloud-download-alt"],["cloud-upload",null,"cloud-upload-alt"],["bell-o","far","bell"],["cutlery",null,"utensils"],["file-text-o","far","file-alt"],["building-o","far","building"],["hospital-o","far","hospital"],["tablet",null,"tablet-alt"],["mobile",null,"mobile-alt"],["mobile-phone",null,"mobile-alt"],["circle-o","far","circle"],["mail-reply",null,"reply"],["github-alt","fab",null],["folder-o","far","folder"],["folder-open-o","far","folder-open"],["smile-o","far","smile"],["frown-o","far","frown"],["meh-o","far","meh"],["keyboard-o","far","keyboard"],["flag-o","far","flag"],["mail-reply-all",null,"reply-all"],["star-half-o","far","star-half"],["star-half-empty","far","star-half"],["star-half-full","far","star-half"],["code-fork",null,"code-branch"],["chain-broken",null,"unlink"],["shield",null,"shield-alt"],["calendar-o","far","calendar"],["maxcdn","fab",null],["html5","fab",null],["css3","fab",null],["ticket",null,"ticket-alt"],["minus-square-o","far","minus-square"],["level-up",null,"level-up-alt"],["level-down",null,"level-down-alt"],["pencil-square",null,"pen-square"],["external-link-square",null,"external-link-square-alt"],["compass","far",null],["caret-square-o-down","far","caret-square-down"],["toggle-down","far","caret-square-down"],["caret-square-o-up","far","caret-square-up"],["toggle-up","far","caret-square-up"],["caret-square-o-right","far","caret-square-right"],["toggle-right","far","caret-square-right"],["eur",null,"euro-sign"],["euro",null,"euro-sign"],["gbp",null,"pound-sign"],["usd",null,"dollar-sign"],["dollar",null,"dollar-sign"],["inr",null,"rupee-sign"],["rupee",null,"rupee-sign"],["jpy",null,"yen-sign"],["cny",null,"yen-sign"],["rmb",null,"yen-sign"],["yen",null,"yen-sign"],["rub",null,"ruble-sign"],["ruble",null,"ruble-sign"],["rouble",null,"ruble-sign"],["krw",null,"won-sign"],["won",null,"won-sign"],["btc","fab",null],["bitcoin","fab","btc"],["file-text",null,"file-alt"],["sort-alpha-asc",null,"sort-alpha-down"],["sort-alpha-desc",null,"sort-alpha-down-alt"],["sort-amount-asc",null,"sort-amount-down"],["sort-amount-desc",null,"sort-amount-down-alt"],["sort-numeric-asc",null,"sort-numeric-down"],["sort-numeric-desc",null,"sort-numeric-down-alt"],["youtube-square","fab",null],["youtube","fab",null],["xing","fab",null],["xing-square","fab",null],["youtube-play","fab","youtube"],["dropbox","fab",null],["stack-overflow","fab",null],["instagram","fab",null],["flickr","fab",null],["adn","fab",null],["bitbucket","fab",null],["bitbucket-square","fab","bitbucket"],["tumblr","fab",null],["tumblr-square","fab",null],["long-arrow-down",null,"long-arrow-alt-down"],["long-arrow-up",null,"long-arrow-alt-up"],["long-arrow-left",null,"long-arrow-alt-left"],["long-arrow-right",null,"long-arrow-alt-right"],["apple","fab",null],["windows","fab",null],["android","fab",null],["linux","fab",null],["dribbble","fab",null],["skype","fab",null],["foursquare","fab",null],["trello","fab",null],["gratipay","fab",null],["gittip","fab","gratipay"],["sun-o","far","sun"],["moon-o","far","moon"],["vk","fab",null],["weibo","fab",null],["renren","fab",null],["pagelines","fab",null],["stack-exchange","fab",null],["arrow-circle-o-right","far","arrow-alt-circle-right"],["arrow-circle-o-left","far","arrow-alt-circle-left"],["caret-square-o-left","far","caret-square-left"],["toggle-left","far","caret-square-left"],["dot-circle-o","far","dot-circle"],["vimeo-square","fab",null],["try",null,"lira-sign"],["turkish-lira",null,"lira-sign"],["plus-square-o","far","plus-square"],["slack","fab",null],["wordpress","fab",null],["openid","fab",null],["institution",null,"university"],["bank",null,"university"],["mortar-board",null,"graduation-cap"],["yahoo","fab",null],["google","fab",null],["reddit","fab",null],["reddit-square","fab",null],["stumbleupon-circle","fab",null],["stumbleupon","fab",null],["delicious","fab",null],["digg","fab",null],["pied-piper-pp","fab",null],["pied-piper-alt","fab",null],["drupal","fab",null],["joomla","fab",null],["spoon",null,"utensil-spoon"],["behance","fab",null],["behance-square","fab",null],["steam","fab",null],["steam-square","fab",null],["automobile",null,"car"],["envelope-o","far","envelope"],["spotify","fab",null],["deviantart","fab",null],["soundcloud","fab",null],["file-pdf-o","far","file-pdf"],["file-word-o","far","file-word"],["file-excel-o","far","file-excel"],["file-powerpoint-o","far","file-powerpoint"],["file-image-o","far","file-image"],["file-photo-o","far","file-image"],["file-picture-o","far","file-image"],["file-archive-o","far","file-archive"],["file-zip-o","far","file-archive"],["file-audio-o","far","file-audio"],["file-sound-o","far","file-audio"],["file-video-o","far","file-video"],["file-movie-o","far","file-video"],["file-code-o","far","file-code"],["vine","fab",null],["codepen","fab",null],["jsfiddle","fab",null],["life-ring","far",null],["life-bouy","far","life-ring"],["life-buoy","far","life-ring"],["life-saver","far","life-ring"],["support","far","life-ring"],["circle-o-notch",null,"circle-notch"],["rebel","fab",null],["ra","fab","rebel"],["resistance","fab","rebel"],["empire","fab",null],["ge","fab","empire"],["git-square","fab",null],["git","fab",null],["hacker-news","fab",null],["y-combinator-square","fab","hacker-news"],["yc-square","fab","hacker-news"],["tencent-weibo","fab",null],["qq","fab",null],["weixin","fab",null],["wechat","fab","weixin"],["send",null,"paper-plane"],["paper-plane-o","far","paper-plane"],["send-o","far","paper-plane"],["circle-thin","far","circle"],["header",null,"heading"],["sliders",null,"sliders-h"],["futbol-o","far","futbol"],["soccer-ball-o","far","futbol"],["slideshare","fab",null],["twitch","fab",null],["yelp","fab",null],["newspaper-o","far","newspaper"],["paypal","fab",null],["google-wallet","fab",null],["cc-visa","fab",null],["cc-mastercard","fab",null],["cc-discover","fab",null],["cc-amex","fab",null],["cc-paypal","fab",null],["cc-stripe","fab",null],["bell-slash-o","far","bell-slash"],["trash",null,"trash-alt"],["copyright","far",null],["eyedropper",null,"eye-dropper"],["area-chart",null,"chart-area"],["pie-chart",null,"chart-pie"],["line-chart",null,"chart-line"],["lastfm","fab",null],["lastfm-square","fab",null],["ioxhost","fab",null],["angellist","fab",null],["cc","far","closed-captioning"],["ils",null,"shekel-sign"],["shekel",null,"shekel-sign"],["sheqel",null,"shekel-sign"],["meanpath","fab","font-awesome"],["buysellads","fab",null],["connectdevelop","fab",null],["dashcube","fab",null],["forumbee","fab",null],["leanpub","fab",null],["sellsy","fab",null],["shirtsinbulk","fab",null],["simplybuilt","fab",null],["skyatlas","fab",null],["diamond","far","gem"],["intersex",null,"transgender"],["facebook-official","fab","facebook"],["pinterest-p","fab",null],["whatsapp","fab",null],["hotel",null,"bed"],["viacoin","fab",null],["medium","fab",null],["y-combinator","fab",null],["yc","fab","y-combinator"],["optin-monster","fab",null],["opencart","fab",null],["expeditedssl","fab",null],["battery-4",null,"battery-full"],["battery",null,"battery-full"],["battery-3",null,"battery-three-quarters"],["battery-2",null,"battery-half"],["battery-1",null,"battery-quarter"],["battery-0",null,"battery-empty"],["object-group","far",null],["object-ungroup","far",null],["sticky-note-o","far","sticky-note"],["cc-jcb","fab",null],["cc-diners-club","fab",null],["clone","far",null],["hourglass-o","far","hourglass"],["hourglass-1",null,"hourglass-start"],["hourglass-2",null,"hourglass-half"],["hourglass-3",null,"hourglass-end"],["hand-rock-o","far","hand-rock"],["hand-grab-o","far","hand-rock"],["hand-paper-o","far","hand-paper"],["hand-stop-o","far","hand-paper"],["hand-scissors-o","far","hand-scissors"],["hand-lizard-o","far","hand-lizard"],["hand-spock-o","far","hand-spock"],["hand-pointer-o","far","hand-pointer"],["hand-peace-o","far","hand-peace"],["registered","far",null],["creative-commons","fab",null],["gg","fab",null],["gg-circle","fab",null],["tripadvisor","fab",null],["odnoklassniki","fab",null],["odnoklassniki-square","fab",null],["get-pocket","fab",null],["wikipedia-w","fab",null],["safari","fab",null],["chrome","fab",null],["firefox","fab",null],["opera","fab",null],["internet-explorer","fab",null],["television",null,"tv"],["contao","fab",null],["500px","fab",null],["amazon","fab",null],["calendar-plus-o","far","calendar-plus"],["calendar-minus-o","far","calendar-minus"],["calendar-times-o","far","calendar-times"],["calendar-check-o","far","calendar-check"],["map-o","far","map"],["commenting",null,"comment-dots"],["commenting-o","far","comment-dots"],["houzz","fab",null],["vimeo","fab","vimeo-v"],["black-tie","fab",null],["fonticons","fab",null],["reddit-alien","fab",null],["edge","fab",null],["credit-card-alt",null,"credit-card"],["codiepie","fab",null],["modx","fab",null],["fort-awesome","fab",null],["usb","fab",null],["product-hunt","fab",null],["mixcloud","fab",null],["scribd","fab",null],["pause-circle-o","far","pause-circle"],["stop-circle-o","far","stop-circle"],["bluetooth","fab",null],["bluetooth-b","fab",null],["gitlab","fab",null],["wpbeginner","fab",null],["wpforms","fab",null],["envira","fab",null],["wheelchair-alt","fab","accessible-icon"],["question-circle-o","far","question-circle"],["volume-control-phone",null,"phone-volume"],["asl-interpreting",null,"american-sign-language-interpreting"],["deafness",null,"deaf"],["hard-of-hearing",null,"deaf"],["glide","fab",null],["glide-g","fab",null],["signing",null,"sign-language"],["viadeo","fab",null],["viadeo-square","fab",null],["snapchat","fab",null],["snapchat-ghost","fab",null],["snapchat-square","fab",null],["pied-piper","fab",null],["first-order","fab",null],["yoast","fab",null],["themeisle","fab",null],["google-plus-official","fab","google-plus"],["google-plus-circle","fab","google-plus"],["font-awesome","fab",null],["fa","fab","font-awesome"],["handshake-o","far","handshake"],["envelope-open-o","far","envelope-open"],["linode","fab",null],["address-book-o","far","address-book"],["vcard",null,"address-card"],["address-card-o","far","address-card"],["vcard-o","far","address-card"],["user-circle-o","far","user-circle"],["user-o","far","user"],["id-badge","far",null],["drivers-license",null,"id-card"],["id-card-o","far","id-card"],["drivers-license-o","far","id-card"],["quora","fab",null],["free-code-camp","fab",null],["telegram","fab",null],["thermometer-4",null,"thermometer-full"],["thermometer",null,"thermometer-full"],["thermometer-3",null,"thermometer-three-quarters"],["thermometer-2",null,"thermometer-half"],["thermometer-1",null,"thermometer-quarter"],["thermometer-0",null,"thermometer-empty"],["bathtub",null,"bath"],["s15",null,"bath"],["window-maximize","far",null],["window-restore","far",null],["times-rectangle",null,"window-close"],["window-close-o","far","window-close"],["times-rectangle-o","far","window-close"],["bandcamp","fab",null],["grav","fab",null],["etsy","fab",null],["imdb","fab",null],["ravelry","fab",null],["eercast","fab","sellcast"],["snowflake-o","far","snowflake"],["superpowers","fab",null],["wpexplorer","fab",null],["cab",null,"taxi"]];return function(l){try{l()}catch(l){if(!t)throw l}}(function(){var l;"function"==typeof i.hooks.addShims?i.hooks.addShims(s):(l=i.shims).push.apply(l,s)}),s},"object"==typeof exports&&"undefined"!=typeof module?module.exports=a():"function"==typeof define&&define.amd?define(a):l["fontawesome-free-shims"]=a();