##jQuery plugin for lazy load images  
---
###example  
---
at first, you should add jquery file into the document:  

`<script src="jquery.min.js"></script>`
  
  
and add the plugin to the document:  

`<script src="lazy-load-image.js"></script>`  
   

    $('.lazy-image').imgLazyLoad({
		threshold : -100, 
		onShow : function(self) {
			if(!self.hasClass('fadein')) {
				self.addClass('fadein');
			}
		},
		onError : function(self) {}
	})
  
  
###props
---
* threshold  
* onShow  
* onError  



