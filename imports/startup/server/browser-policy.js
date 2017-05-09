 import { BrowserPolicy } from 'meteor/browser-policy-common';
 BrowserPolicy.content.allowEval()
 BrowserPolicy.content.allowFontDataUrl();
 BrowserPolicy.content.allowOriginForAll( 'fonts.googleapis.com' );
 BrowserPolicy.content.allowOriginForAll( 'https://fonts.gstatic.com');
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
//https://fonts.googleapis.com/css?family=Roboto:400,300,500

