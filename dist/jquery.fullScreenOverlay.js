/*
 *  jquery-boilerplate - v4.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

	// Allow multiple instances of the overlay and track each version with this counter.
	var instanceId = 0;

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "fullScreenOverlay",
			defaults = {
				// This should be overriden with a unique selector when you have more than
				// one full screen overlay on the page.  Otherwise clicking the element
				// with class .full-screen-overlay-open will open ALL overlays.
				openTrigger: ".full-screen-overlay-open",
				// This should be overriden with a unique selector when you have more than
				// one full screen overlay on the page.  Otherwise clicking the element
				// with class .full-screen-overlay-close will close ALL overlays.
				closeTrigger: ".full-screen-overlay-close",
				// true or false. Will attach a sticky section to the top of the overlay using postion fixed.
				// This will mean that only the overlay body will scroll.
				fixedHeader: false,
				// Enter a jQuery selector or HTML markup.  Only applicable if fixedHeader is true.  
				headerContent: null,
				// Enter a jQuery selector or HTML markup.
				bodyContent: null,
				// A string containing HTML markup for the close button.
				closeButtonMarkup: null,
				// 'header' or 'body'.
				closeButtonLocation: 'header'
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				id: '',
				instanceId: '',
				bodyContent: '',
				headerContent: '',
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like the example below
						var _this = this;
						this.instanceId = $(this.element).data("plugin_fullScreenOverlay_instanceId");
						this.id = 'full-screen-overlay-' + this.instanceId;

						// We should hide the header and body content initially. We will only show it
						// once the overlay is triggered.
						this._hideContent();

						this._createOverlayBoilerplate();
						this._events(_this);
				},
				_events: function(_this) {
						// Open the overlay handler.
						$(_this.settings.openTrigger).on('click keypress', function() {
							_this.open();
						});
						// Close overlay handler.
						$(_this.settings.closeTrigger).on('click keypress', function() {
							_this.close();
						});
				},

				_hideContent: function() {
					if(this.settings.bodyContent !== null) {
						$(this.settings.bodyContent).hide();
					}
					else {
						$(this.element).hide();
					}

					if(this.settings.fixedHeader && this.settings.headerContent !== null) {
						$(this.settings.headerContent).hide();
					}
				},

				_createOverlayBoilerplate: function() {
					var classes = "full-screen-overlay-wrap full-screen-overlay-no-fixed-header";
					var headerMarkup = '';

					if(this.settings.fixedHeader) {
						classes = "full-screen-overlay-wrap full-screen-overlay-fixed-header";
						headerMarkup = this._headerBoilerplate();
					}

					var markup = '<div style="display:none;" class="' + classes + '" id="' + this.id + '">' +
							         '<div class="full-screen-overlay">' +
								         headerMarkup +
									     this._bodyBoilerplate() +
							         '</div>' +
						          '</div>';

					$('body').append(markup);
				},
				_headerBoilerplate: function() {
					var markup =  "<div class='full-screen-overlay-header-wrap'>" +
						       		 "<div class='full-screen-overlay-header'>";

					if(this.settings.closeButtonLocation == 'header' && this.settings.fixedHeader == true) {
						markup = markup + this._closeButtonMarkup(); ;
					}

					return markup + "</div>" +
						   		 "</div>";
				},
				_bodyBoilerplate: function() {
					var markup = "<div class='full-screen-overlay-body-wrap'>" +
						             "<div class='full-screen-overlay-body'>";

					if(this.settings.closeButtonLocation == 'body') {
						markup = markup + this._closeButtonMarkup();
					}

					return markup + "</div>" +
						        "</div>";
				},
				_closeButtonMarkup: function() {
					var markup = "<div class='full-screen-overlay-close' title='Click to close overlay.' role='button'>";

					if(this.settings.closeButtonMarkup !== null) {
						markup = markup + this.settings.closeButtonMarkup;
					}
					else {
						markup = markup + "<i class='fa fa-times'></i>";
					}
					return markup + "</div>";
				},
				_addHeadContent: function() {
					// Create the header content.
					if(this.settings.fixedHeader) {
						$(this.settings.headerContent).show();
						$('.full-screen-overlay-header', '#' + this.id).append($(this.settings.headerContent));

						// If we have a fixed header then we remove the scrolling ability
						// on the HTML body to avoid duplicate scrollbars.
						$('body').addClass('full-screen-overlay-no-scroll');
					}
				},

				_addBodyContent: function() {
					// Grab the body content and append to the overlay body. Appending moves
					// the content into the overlay (as oppose to cloning it).
					if(this.settings.bodyContent === null) {
						// No body content provided so use the jQuery element that fullScreenOverlay()
						// was activated on.
						$(this.element).show();
						$('.full-screen-overlay-body', '#' + this.id).append($(this.element));
					}
					else {
						$(this.settings.bodyContent).show();
						$('.full-screen-overlay-body', '#' + this.id).append($(this.settings.bodyContent));
					}
				},

				open: function() {
					this._addHeadContent();

					this._addBodyContent();

					// If other overlays are displayed, close them.
					$('.full-screen-overlay-wrap').hide();

					// Finally, show the overlay.
					$('#' + this.id).show();
				},
				close: function() {
					// Hide the overlay.
					$('#' + this.id).fadeOut();
				},
		});

		// A really lightweight plugin wrapper around the constructor,
		// allowing multiple instantiations.
		$.fn.fullScreenOverlay = function ( options ) {
			var args = arguments;

	        // Is the first parameter an object (options), or was omitted,
	        // instantiate a new instance of the plugin.
	        if (options === undefined || typeof options === 'object') {
	            return this.each(function () {

	                // Only allow the plugin to be instantiated once,
	                // so we check that the element has no plugin instantiation yet
	                if (!$.data(this, 'plugin_' + pluginName)) {

	                    // Set the instance Id.
	                    $.data(this, 'plugin_' + pluginName + '_instanceId', instanceId);
	                    instanceId++;

	                    // if it has no instance, create a new one,
	                    // pass options to our plugin constructor,
	                    // and store the plugin instance
	                    // in the elements jQuery data object.
	                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
	                }
	            });

	        // If the first parameter is a string and it doesn't start
	        // with an underscore or "contains" the `init`-function,
	        // treat this as a call to a public method.
	        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

	            // Cache the method call
	            // to make it possible
	            // to return a value
	            var returns;

	            this.each(function () {
	                var instance = $.data(this, 'plugin_' + pluginName);

	                // Tests that there's already a plugin-instance
	                // and checks that the requested public method exists
	                if (instance instanceof Plugin && typeof instance[options] === 'function') {

	                    // Call the method of our plugin instance,
	                    // and pass it the supplied arguments.
	                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
	                }

	                // Allow instances to be destroyed via the 'destroy' method
	                if (options === 'destroy') {
	                  $.data(this, 'plugin_' + pluginName, null);
	                }
	            });

	            // If the earlier cached method
	            // gives a value back return the value,
	            // otherwise return this to preserve chainability.
	            return returns !== undefined ? returns : this;
	        }
		};

})( jQuery, window, document );
