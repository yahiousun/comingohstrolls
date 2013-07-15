/*
 * jQuery comingohstrolls
 * ver 0.4
 * 2013-07-15
 * by yahiousun
 * http://yahiousun.github.io/comingohstrolls/
 * license MIT
*/

(function($){
	var comingohstrolls = {
		name: 'comingohstrolls',
		version: '0.4',
		date: '2013-07-15',
		author: 'yahiousun',
		url: 'http://yahiousun.github.io/comingohstrolls/',
		license: 'MIT'
	}
	var methods = {
		init: function(options){
			var settings = $.extend({}, $.fn.comingohstrolls.defaults, options)
			return this.each(function(){
				var self = $(this);
				var data = self.data(comingohstrolls.name);
				if(!data){ // if not initialized yet
					self.data(comingohstrolls.name, { // set data
						target: settings.target,
						easing: settings.easing,
						duration: settings.duration,
						response: settings.response,
						active: settings.active,
						parents: settings.parents,
						callback: settings.callback,
						trigger: settings.trigger,
						hidden: settings.hidden
					});
					data = self.data(comingohstrolls.name);
				}

				var target, offsetTop = new Number;
				if(data.target){
					if(/^#{1}[a-zA-Z]{1}([a-zA-Z0-9]|[-_:.])*$/g.test(data.target)){ // if anchor link
						target = $(data.target);
					}else{
						$.error('Wrong target '+data.target+' for jQuery.'+comingohstrolls.name+'.');
					}
				}else if(self.attr('href') === '#'){
					target = $('body')
				}else if(/^#{1}[a-zA-Z]{1}([a-zA-Z0-9]|[-_:.])*$/g.test(self.attr('href'))){ // if anchor link
					target = $(self.attr('href'));
				}else{
					$.error('Wrong target '+self.attr('href')+' for jQuery.'+comingohstrolls.name+'.');
				}
				
				offsetTop  = target.offset().top;
				
				self.bind(data.trigger+'.'+comingohstrolls.name, function(){
					var invoked = false; // callback is completed?
					$('html, body').stop().animate({
						scrollTop: offsetTop
					}, data.duration, data.easing, function(){
						if(data.callback){ // if callback, callback
							if(invoked) {
								return false;
							} else {
								invoked = true;
								data.callback();
							}
						}
					});
					return false;
				})
				
				if(data.response){ // response handler
					self.comingohstrolls('response');
					$(window).bind('scroll.'+comingohstrolls.name, function(){self.comingohstrolls('response')});
				}
				if(data.hidden){ // response handler
					self.comingohstrolls('hidden');
					$(window).bind('scroll.'+comingohstrolls.name, function(){self.comingohstrolls('hidden')});
				}
			})
		},
		destroy: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data(comingohstrolls.name); // data flag
				if(data){ // if initialized, remove event handler, data and class
					self.unbind(data.trigger+'.'+comingohstrolls.name);
					$(window).unbind('scroll.'+comingohstrolls.name);
					self.removeData(comingohstrolls.name);
					self.removeClass(data.active);
				}
			})
		},
		update: function(options){ // update the plug-in options
			return this.each(function(){
				var self = $(this);
				var data = self.data(comingohstrolls.name); // get current settings
				if(data&&options){
					var settings = $.extend({}, data, options);
					self.comingohstrolls('destroy'); // deactive the plugin
					data = self.data(comingohstrolls.name, settings); // update data
					self.comingohstrolls('init'); // reactive
				}
			})
		},
		response: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data(comingohstrolls.name);
				if(data){			
					var target, offsetTop = new Number;
					if(data.target){
						if(/^#{1}[a-zA-Z]{1}([a-zA-Z0-9]|[-_:.])*$/g.test(data.target)){ // if anchor link
							target = $(data.target);
						}else{
							$.error('Wrong target '+data.target+' for jQuery.'+comingohstrolls.name+'.');
						}
					}else if(self.attr('href') === '#'){
						target = $('body')
					}else if(/^#{1}[a-zA-Z]{1}([a-zA-Z0-9]|[-_:.])*$/g.test(self.attr('href'))){
						target = $(self.attr('href'));
					}else{
						$.error('Wrong target '+self.attr('href')+' for jQuery.'+comingohstrolls.name+'.');
					}
					var offsetTop = $(document).scrollTop();
					var targetOffsetTop = target.offset().top;
					if(offsetTop>=targetOffsetTop){
						$(this).parents(data.parent).find('a').removeClass(data.active);
						$(this).addClass(data.active);
					}
				}
			})
		},
		hidden: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data(comingohstrolls.name);
				if(data){			
					var offsetTop = $(document).scrollTop();
					var wh = $(window).height();
					if(offsetTop > (wh/2)){
						$(this).fadeIn(data.duration);
					}else if(offsetTop < (wh/2)){
						$(this).fadeOut(data.duration);
					}
				}
			})
		},
		about: function(){
			return comingohstrolls;
		}
	}

	$.fn.comingohstrolls = function(method){ // call method logic
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method==='object'||!method){
			return methods.init.apply(this, arguments);
		}else{
			$.error('Method '+method+' does not exist on jQuery.'+comingohstrolls.name+'.');
		}
	};
	
	// default settings
	$.fn.comingohstrolls.defaults = {
		target: '',
		easing: 'swing',
		duration: 500,
		response: false,
		active: 'comingohstrolls',
		parents: 'ul',
		callback: '',
		trigger: 'click',
		hidden: false
	}
})(jQuery);