/*
 * jQuery comingohstrolls
 * ver 0.1 alpha
 * 2013-06-07
 * by yahiousun
 * license MIT
*/

(function($){
	
	var methods = {
		init: function(options){
			var settings = $.extend({}, $.fn.comingohstrolls.defaults, options)
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls');
				if(!data){ // if not initialized yet
					self.data('comingohstrolls', { // set data
						target: settings.target,
						easing: settings.easing,
						duration: settings.duration,
						response: settings.response,
						callback: settings.callback
					});
					data = self.data('comingohstrolls'); // get data
				}
				
				var target, offsetTop = new Number;
				
				if(data.target){
					target = $(data.target);
				}else if(self.attr('href') === '#'){
					target = $('body')
				}else{
					target = $(self.attr('href'));
				}
				offsetTop  = target.offset().top;
				
				self.bind('click.comingohstrolls', function(){
					$('html, body').stop().animate({
						scrollTop: offsetTop
					}, data.duration, data.easing, function(){
						if(data.callback){ // callback
							data.callback();
						}
					});
					return false;
				})
				$(window).bind('scroll.comingohstrolls', function(){self.comingohstrolls('response')})
			})
		},
		update: function(options){ // update the plug-in options
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls'); // get current settings
				if(data&&options){
					var settings = $.extend({}, data, options);
					data = self.data('comingohstrolls', settings); // update data
				}
				
				var top;
				
			})
		},
		response: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls');
				if(data){
					offsetTop = $(window).scrollTop();
					var targetOffsetTop = $(this).offset().top;
					if(offsetTop===targetOffsetTop){
						$(this).parent().find('a').removeClass('active');
						$(this).addClass('active');
					}
				}
			})
		}
	}

	$.fn.comingohstrolls = function(method){ // call method logic
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method==='object'||!method){
			return methods.init.apply(this, arguments);
		}else{
			$.error('Method '+method+' does not exist on jQuery.comingohstrolls.');
		}
	};
	
	// default settings
	$.fn.comingohstrolls.defaults = {
		target: '',
		easing: 'swing',
		duration: 500,
		response: false,
		callback: ''
	}
	
})(jQuery);