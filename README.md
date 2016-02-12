Docs are a work in progress...

## Options

`openTrigger: ".full-screen-overlay-open"`<br />
**openTrigger** *(jQuery selector)*: This should be overriden with a unique selector when you have more than one full screen overlay on the 
page.  Otherwise clicking the element with class `.full-screen-overlay-open` will open ALL overlays.

`closeTrigger: ".full-screen-overlay-close",` <br/>
**closeTrigger** *(jQuery selector)*: This should be overriden with a unique selector when you have more than one full screen overlay on the 
page.  Otherwise clicking the element with class .full-screen-overlay-close will close ALL overlays.  If a custom value is entered here then `closeButtonOmit` should also be set to true.

`fixedHeader: false`<br />
**fixedHeader** *(boolean)*:  When set to `true` a sticky section will be attached to the top of the overlay using postion fixed. This will mean that only the overlay body will scroll.
  
`headerContent: ''`<br />
**headerContent** *(string)*: Enter a jQuery selector or HTML markup.  Only applicable if fixedHeader is true.

`bodyContent: ''`<br />
**bodyContent** *(string)*: If left as an empty string then the innerHtml of the element that called .fullScreenOverlay() will be used. Enter a jQuery selector or HTML markup to use HTML markup from elsewhere on the page.

`closeButtonMarkup: ''`<br />
**closeButtonMarkup** *(string)*: By default this plugin will add a close button using the FontAwesome cross icon.  If you wish to override the markup for the button to add a custom image, for example, then add the markup here.  Alternatively, set closeButtonOmit to true and include your close button in the `headerContent`, `bodyContent` or inside the element which `fullScreenOverlay()` is called on. 

`closeButtonLocation: '.full-screen-overlay-body'`<br />
**closeButtonLocation** *(string)*: Not applicable if closeTrigger is set.  This determines where the plugin will add it's default close button.  Use `.full-screen-overlay-header` to place in the header if using `fixedHeader: true`.  Otherwise leave as `.full-screen-overlay-body' to place in body.

`closeButtonOmit: 'false'`<br />
**closeButtonOmit** *(boolean)*: When set to `true` the default close button provided by the plugin will be omitted.  Use in conjunction with `closeTrigger` to tell the plugin which element should be used as the close trigger.

### Events

The following events can be used by setting the relevant option:

`onBeforeOpen(e, fullScreenOverlayObject)`<br />
`onAfterOpen(e, fullScreenOverlayObject)`<br />
`onBeforeClose(e, fullScreenOverlayObject)`
`onAfterClose(e, fullScreenOverlayObject)`

**Example:**
```
$('.my-element').fullScreenOverlay({
	onAfterOpen: function(e, fullScreenOverlayObject) {
		// Move focus into the dialog for accessibility.
		$('.my-focus-element-inside-the-overlay').focus();
	},
	onAfterClose: function(e, fullScreenOverlayObject) {
		// Move focus back to the main page for accessibility.
		$('.my-focus-element-on-the-main-page').focus();
	},
});
```

## Functions

`$('.my-element').fullScreenOverlay('open');`
Open the overlay.  Useful for responsive where you may want to show/hide a mobile nav overlay depending on the browser width.

`$('.my-element').fullScreenOverlay('close');`
Close the overlay.  Useful for responsive where you may want to show/hide a mobile nav overlay depending on the browser width.

