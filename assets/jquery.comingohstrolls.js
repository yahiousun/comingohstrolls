/*
 * jQuery comingohstrolls
 * ver 0.2 beta
 * 2013-06-18
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
						active: settings.active,
						callback: settings.callback
					});
				}
				self.comingohstrolls('run');
			})
		},
		run: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls');
				
				if(data){ // check data flag
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
						$('body').stop().animate({
							scrollTop: offsetTop
						}, data.duration, data.easing, function(){
							if(data.callback){ // if callback, callback
								data.callback();
							}
						});
						return false;
					})
				
					if(data.response){ // response handler
						self.comingohstrolls('response');
						$(window).bind('scroll.comingohstrolls', function(){self.comingohstrolls('response')});
					}
				}
			})
		},
		destroy: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls'); // data flag
				if(data){ // if initialized, remove event handler, data and class
					self.unbind('click.comingohstrolls');
					$(window).unbind('scroll.comingohstrolls');
					self.removeData('comingohstrolls');
					self.removeClass(data.active);
				}
			})
		},
		update: function(options){ // update the plug-in options
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls'); // get current settings
				if(data&&options){
					var settings = $.extend({}, data, options);
					data = self.data('comingohstrolls', settings); // update data
					self.comingohstrolls('run');
				}
			})
		},
		response: function(){
			return this.each(function(){
				var self = $(this);
				var data = self.data('comingohstrolls');
				if(data){			
					var target, offsetTop = new Number;
					if(data.target){
						target = $(data.target);
					}else if(self.attr('href') === '#'){
						target = $('body')
					}else{
						target = $(self.attr('href'));
					}
					var offsetTop = $(document).scrollTop();
					var targetOffsetTop = target.offset().top;
					if(offsetTop>=targetOffsetTop){
						$(this).parent().find('a').removeClass(data.active);
						$(this).parent().parent().find('a').removeClass(data.active);
						$(this).addClass(data.active);
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
		active: 'comingohstrolls',
		callback: ''
	}
	
})(jQuery);