Docs are a work in progress...

## Options

`openTrigger: .full-screen-overlay-open`<br />
**openTrigger** *(jQuery selector)*: This should be overriden with a unique selector when you have more than one full screen overlay on the 
page.  Otherwise clicking the element with class .full-screen-overlay-open will open ALL overlays.

`closeTrigger: ".full-screen-overlay-close",` <br/>
**closeTrigger** *(jQuery selector)*: This should be overriden with a unique selector when you have more than one full screen overlay on the 
page.  Otherwise clicking the element with class .full-screen-overlay-close will close ALL overlays.  If a custom value is entered here the closeButtonOmit should also be set to true.

`fixedHeader: false`<br />
**fixedHeader** *(boolean)*:  When set to `true` a sticky section will be attached to the top of the overlay using postion fixed. This will mean that only the overlay body will scroll.
  
`headerContent: ''`<br />
**headerContent** *(string)*: Enter a jQuery selector or HTML markup.  Only applicable if fixedHeader is true.

`bodyContent: ''`<br />
**bodyContent** *(string)*: If left as an empty string then the innerHtml of the element that called .fullScreenOverlay() will be used. Enter a jQuery selector or HTML markup to use HTML markup from elsewhere on the page.

`closeButtonMarkup: ''`<br />
**closeButtonMarkup** *(string)*: By default this plugin will add a close button using the FontAwesome cross icon.  If you wish to override the markup for the button to add a custom image, for example, then add the markup here.  Alternatively, set closeButtonOmit to true and include your close button in the headerContent, bodyContent or inside the element which fullScreenOverlay() is called on. 

`closeButtonLocation: '.full-screen-overlay-body'`<br />
**closeButtonLocation** *(string)*: Not applicable if closeTrigger is set.  This determines where the plugin will add it's default close button.  Use `.full-screen-overlay-header` to place in the header if using `fixedHeader: true`.

`closeButtonOmit: 'false'`<br />
**closeButtonOmit** *(boolean)*: When set to `true` the default close button provided by the plugin will be omitted.  Use in conjunction with `closeTrigger` to tell the plugin which element should be used as the close trigger.
