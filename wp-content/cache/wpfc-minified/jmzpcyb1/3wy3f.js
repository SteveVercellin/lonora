// source --> https://lonora.hrslab.com/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js?ver=2.7.0-wc.6.9.3 
/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
!function(){"use strict";function e(p){p.fn._fadeIn=p.fn.fadeIn;var b=p.noop||function(){},h=/MSIE/.test(navigator.userAgent),k=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent),y=(document.documentMode,"function"==typeof document.createElement("div").style.setExpression&&document.createElement("div").style.setExpression),m=(p.blockUI=function(e){o(window,e)},p.unblockUI=function(e){v(window,e)},p.growlUI=function(e,t,o,n){var i=p('<div class="growlUI"></div>'),s=(e&&i.append("<h1>"+e+"</h1>"),t&&i.append("<h2>"+t+"</h2>"),o===undefined&&(o=3e3),function(e){p.blockUI({message:i,fadeIn:"undefined"!=typeof(e=e||{}).fadeIn?e.fadeIn:700,fadeOut:"undefined"!=typeof e.fadeOut?e.fadeOut:1e3,timeout:"undefined"!=typeof e.timeout?e.timeout:o,centerY:!1,showOverlay:!1,onUnblock:n,css:p.blockUI.defaults.growlCSS})});s(),i.css("opacity");i.on("mouseover",function(){s({fadeIn:0,timeout:3e4});var e=p(".blockMsg");e.stop(),e.fadeTo(300,1)}).on("mouseout",function(){p(".blockMsg").fadeOut(1e3)})},p.fn.block=function(e){if(this[0]===window)return p.blockUI(e),this;var t=p.extend({},p.blockUI.defaults,e||{});return this.each(function(){var e=p(this);t.ignoreIfBlocked&&e.data("blockUI.isBlocked")||e.unblock({fadeOut:0})}),this.each(function(){"static"==p.css(this,"position")&&(this.style.position="relative",p(this).data("blockUI.static",!0)),this.style.zoom=1,o(this,e)})},p.fn.unblock=function(e){return this[0]===window?(p.unblockUI(e),this):this.each(function(){v(this,e)})},p.blockUI.version=2.7,p.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1},null),g=[];function o(e,o){var n=e==window,t=o&&o.message!==undefined?o.message:undefined;if(!(o=p.extend({},p.blockUI.defaults,o||{})).ignoreIfBlocked||!p(e).data("blockUI.isBlocked")){o.overlayCSS=p.extend({},p.blockUI.defaults.overlayCSS,o.overlayCSS||{}),f=p.extend({},p.blockUI.defaults.css,o.css||{}),o.onOverlayClick&&(o.overlayCSS.cursor="pointer"),u=p.extend({},p.blockUI.defaults.themedCSS,o.themedCSS||{}),t=t===undefined?o.message:t,n&&m&&v(window,{fadeOut:0}),t&&"string"!=typeof t&&(t.parentNode||t.jquery)&&(l=t.jquery?t[0]:t,d={},p(e).data("blockUI.history",d),d.el=l,d.parent=l.parentNode,d.display=l.style.display,d.position=l.style.position,d.parent&&d.parent.removeChild(l)),p(e).data("blockUI.onUnblock",o.onUnblock);var i,s,l=o.baseZ,d=h||o.forceIframe?p('<iframe class="blockUI" style="z-index:'+l+++';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+o.iframeSrc+'"></iframe>'):p('<div class="blockUI" style="display:none"></div>'),a=o.theme?p('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+l+++';display:none"></div>'):p('<div class="blockUI blockOverlay" style="z-index:'+l+++';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),c=(o.theme&&n?(c='<div class="blockUI '+o.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(l+10)+';display:none;position:fixed">',o.title&&(c+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(o.title||"&nbsp;")+"</div>"),c+='<div class="ui-widget-content ui-dialog-content"></div></div>'):o.theme?(c='<div class="blockUI '+o.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(l+10)+';display:none;position:absolute">',o.title&&(c+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(o.title||"&nbsp;")+"</div>"),c+='<div class="ui-widget-content ui-dialog-content"></div></div>'):c=n?'<div class="blockUI '+o.blockMsgClass+' blockPage" style="z-index:'+(l+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+o.blockMsgClass+' blockElement" style="z-index:'+(l+10)+';display:none;position:absolute"></div>',l=p(c),t&&(o.theme?(l.css(u),l.addClass("ui-widget-content")):l.css(f)),o.theme||a.css(o.overlayCSS),a.css("position",n?"fixed":"absolute"),(h||o.forceIframe)&&d.css("opacity",0),[d,a,l]),r=p(n?"body":e),u=(p.each(c,function(){this.appendTo(r)}),o.theme&&o.draggable&&p.fn.draggable&&l.draggable({handle:".ui-dialog-titlebar",cancel:"li"}),y&&(!p.support.boxModel||0<p("object,embed",n?null:e).length));if((k||u)&&(n&&o.allowBodyStretch&&p.support.boxModel&&p("html,body").css("height","100%"),!k&&p.support.boxModel||n||(f=U(e,"borderTopWidth"),u=U(e,"borderLeftWidth"),i=f?"(0 - "+f+")":0,s=u?"(0 - "+u+")":0),p.each(c,function(e,t){t=t[0].style;t.position="absolute",e<2?(n?t.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+o.quirksmodeOffsetHack+') + "px"'):t.setExpression("height",'this.parentNode.offsetHeight + "px"'),n?t.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):t.setExpression("width",'this.parentNode.offsetWidth + "px"'),s&&t.setExpression("left",s),i&&t.setExpression("top",i)):o.centerY?(n&&t.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),t.marginTop=0):!o.centerY&&n&&(e=o.css&&o.css.top?parseInt(o.css.top,10):0,t.setExpression("top","((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+e+') + "px"'))})),t&&((o.theme?l.find(".ui-widget-content"):l).append(t),(t.jquery||t.nodeType)&&p(t).show()),(h||o.forceIframe)&&o.showOverlay&&d.show(),o.fadeIn?(f=o.onBlock||b,u=o.showOverlay&&!t?f:b,c=t?f:b,o.showOverlay&&a._fadeIn(o.fadeIn,u),t&&l._fadeIn(o.fadeIn,c)):(o.showOverlay&&a.show(),t&&l.show(),o.onBlock&&o.onBlock.bind(l)()),I(1,e,o),n)m=l[0],g=p(o.focusableElements,m),o.focusInput&&setTimeout(w,20);else{var d=l[0],f=o.centerX,u=o.centerY,c=d.parentNode,a=d.style,t=(c.offsetWidth-d.offsetWidth)/2-U(c,"borderLeftWidth"),d=(c.offsetHeight-d.offsetHeight)/2-U(c,"borderTopWidth");f&&(a.left=0<t?t+"px":"0"),u&&(a.top=0<d?d+"px":"0")}o.timeout&&(l=setTimeout(function(){n?p.unblockUI(o):p(e).unblock(o)},o.timeout),p(e).data("blockUI.timeout",l))}}function v(e,t){var o,n,i=e==window,s=p(e),l=s.data("blockUI.history"),d=s.data("blockUI.timeout");d&&(clearTimeout(d),s.removeData("blockUI.timeout")),t=p.extend({},p.blockUI.defaults,t||{}),I(0,e,t),null===t.onUnblock&&(t.onUnblock=s.data("blockUI.onUnblock"),s.removeData("blockUI.onUnblock")),n=i?p(document.body).children().filter(".blockUI").add("body > .blockUI"):s.find(">.blockUI"),t.cursorReset&&(1<n.length&&(n[1].style.cursor=t.cursorReset),2<n.length&&(n[2].style.cursor=t.cursorReset)),i&&(m=g=null),t.fadeOut?(o=n.length,n.stop().fadeOut(t.fadeOut,function(){0==--o&&a(n,l,t,e)})):a(n,l,t,e)}function a(e,t,o,n){var i=p(n);i.data("blockUI.isBlocked")||(e.each(function(e,t){this.parentNode&&this.parentNode.removeChild(this)}),t&&t.el&&(t.el.style.display=t.display,t.el.style.position=t.position,t.el.style.cursor="default",t.parent&&t.parent.appendChild(t.el),i.removeData("blockUI.history")),i.data("blockUI.static")&&i.css("position","static"),"function"==typeof o.onUnblock&&o.onUnblock(n,o),t=(e=p(document.body)).width(),i=e[0].style.width,e.width(t-1).width(t),e[0].style.width=i)}function I(e,t,o){var n=t==window,t=p(t);!e&&(n&&!m||!n&&!t.data("blockUI.isBlocked"))||(t.data("blockUI.isBlocked",e),n&&o.bindEvents&&(!e||o.showOverlay)&&(t="mousedown mouseup keydown keypress keyup touchstart touchend touchmove",e?p(document).on(t,o,i):p(document).off(t,i)))}function i(e){if("keydown"===e.type&&e.keyCode&&9==e.keyCode&&m&&e.data.constrainTabKey){var t=g,o=!e.shiftKey&&e.target===t[t.length-1],n=e.shiftKey&&e.target===t[0];if(o||n)return setTimeout(function(){w(n)},10),!1}t=e.data,o=p(e.target);return o.hasClass("blockOverlay")&&t.onOverlayClick&&t.onOverlayClick(e),0<o.parents("div."+t.blockMsgClass).length||0===o.parents().children().filter("div.blockUI").length}function w(e){!g||(e=g[!0===e?g.length-1:0])&&e.trigger("focus")}function U(e,t){return parseInt(p.css(e,t),10)||0}}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)}();