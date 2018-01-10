
/**
 * Slider Render function
 * @private
 */
Slider.prototype._render = (function(){
	
	return function _render (props) {
		// Var declarations
		var target = document.getElementById(props.target),
			html = '';
		
		// Start html
		html += '<div class=\'slider\'>';
		
		// Add buttons
		html += props.btnPrev.getHtml();
		html += props.btnNext.getHtml();
		
		// Loop trough images
		for(var i = 0; i < props.images.length; i++) {
			html+= props.images[i].getHtml();
		}
		
		// End html
		html += '</div>';
		
		// Add html to target
		target.innerHTML = html;
	};

}());
