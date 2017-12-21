
/* Btn IFFE */
Slider.prototype.Btn = (function() {
	
	// Var declarions
	var id = 0,
		generateHtml;

	/**
	 * Generate html function
	 * @private
	 * @param {object} props - Html properties
	 */
	generateHtml = function(props) {
		var html = '';

		// Opening tag (switch class)
		switch(props.type) {
		case 'prev':
			html += '<div class=\'slider__btn slider__btn--prev\'>';
			break;
		case 'next':
			html += '<div class=\'slider__btn slider__btn--next\'>';
			break;
		default:
			html += '<div class=\'slider__btn\'>';
			break;
		}

		// Add anker to html
		html += '<a class=\'slider__btnlink\' id=\'' + props.htmlId + '\' href=\'javascript:void(0);\'>' + props.label + '</a>';

		// Closing tag
		html += '</div>';

		return html;
	};

	/**
	 * return Btn constructor
	 * @constructor
	 * @param {object} props - The Btn properties
	 */
	return function Btn (props) {

		// Var declarations
		var htmlId,
			type,
			label;

		// Increment constructor id	
		id++;

		// Define props
		htmlId = 'btn_' + id;
		type = props.type || false;
		label = props.label || 'btn';

		/**
		 * Get html function
		 * @public
		 */
		this.getHtml = function() {
			return generateHtml({
				htmlId: htmlId,
				type: type,
				label: label
			});
		};

		/**
		 * Get id function
		 * @public
		 */
		this.getId = function() {
			return id;
		};

		/**
		 * Get html id
		 * @public
		 */
		this.getHtmlId = function() {
			return htmlId;
		};

		/**
		 * Get type
		 * @public
		 */
		this.getType = function() {
			return type;
		};
	};

}());