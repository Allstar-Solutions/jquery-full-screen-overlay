// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

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
				// When using a fixed header, a fixed height must be given.  Only applicable when
				// fixedHeader is set to true.
				headerHeight: '80px',
				// Enter a jQuery selector or HTML markup.
				bodyContent: null
		};

		// Allow multiple instances of the plugin.
		var instances = [];

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
				selector: '',
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
						this.instanceNum = $(this.element).data("plugin_fullScreenOverlay_instance_num");
						this.id = 'full-screen-overlay-' + this.instanceNum;

						// We should hide the header and body content initially. We will only show it
						// once the overlay is triggered.
						this.hideContent();

						this.events(_this);
						this.createOverlayBoilerplate();
				},
				events: function(_this) {
						// Open the overlay handler.
						$(this.settings.openTrigger).on('click keypress', function() {
							_this.openOverlay();
						});
						// Close overlay handler.
						$(this.settings.closeTrigger).on('click keypress', function() {
							_this.closeOverlay();
						});
				},

				hideContent: function() {
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

				createOverlayBoilerplate: function() {
					var markup = '<div style="display:none;" class="full-screen-overlay-wrap" id="' + this.id + '">' +
									'<div class="full-screen-overlay">';

					if(this.settings.fixedHeader === true) {
						markup = markup + this.headerBoilerplate();
					}

					markup = markup + this.bodyBoilerplate() +
								 '</div></div>';

					$('body').append(markup);
				},
				headerBoilerplate: function() {
					return "<div class='full-screen-overlay-header-wrap'>" +
						       "<div class='full-screen-overlay-header'>" +
							   "</div>" +
						   "</div>";
				},
				bodyBoilerplate: function() {
					return "<div class='full-screen-overlay-body-wrap'>" +
						       "<div class='full-screen-overlay-body'>" +
							   "</div>" +
						   "</div>";
				},

				getBodyContent: function() {
					// If no HTML has been given for the body content then default to the
					// HTML of the element that the fullScreenOverlay function was activated on.
					if(this.settings.bodyContent === null) {
						return $(this.element).show().wrap('<div></div>').parent().html();
					}
					else {
						// User has provided either a jQuery selector or an HTML string.
						return $(this.settings.bodyContent).show().html();
					}					
				},
				
				openOverlay: function() {
					// Create the header content.
					if(this.settings.fixedHeader) {
						$(this.settings.headerContent).show();
						$('.full-screen-overlay-header', '#' + this.id).append($(this.settings.headerContent));

						// If we have a fixed header then we remove the scrolling ability
						// on the HTML body to avoid duplicate scrollbars.
						$('body').addClass('full-screen-overlay-no-scroll');
					}

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

					// If other overlays ar displayed, close them.
					$('.full-screen-overlay-wrap').hide();

					// Finally, show the overlay.
					$('#' + this.id).show();
				},
				closeOverlay: function() {
					// Hide the overlay.
					$('#' + this.id).fadeOut();
				},
		});

		// A really lightweight plugin wrapper around the constructor,
		// allowing multiple instantiations.
		$.fn.fullScreenOverlay = function ( options ) {
				return this.each(function() {
					// Track which index of the instances array this occupies.
					var index = instances.length;

					// Store the instance number inside the element.
					$.data(this, "plugin_" + pluginName + "_instance_num", index);

					// Instanciate plugin.
					instances.push(new Plugin( this, options ));
				});
		};

})( jQuery, window, document );
