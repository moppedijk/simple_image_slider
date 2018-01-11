/** 
 * Package name: slider 
 * Publish date: 2018-01-11 
 * Author: Martijn Oppedijk 
 * Description: Simple Slider 
 * Version: 1.0.0 
 */ 

// Check if Slider constructor is not a function
if(typeof window.Slider !== 'function') {

	/**
	 * Slider constructor function
	 * @constructor
	 * @param {object} props - Slider properties images[Array] and target[string]
	 */
	window.Slider = function Slider (props) {

		// Var declarations
		var slides = [],
			Controller,
			BtnPrev,
			BtnNext;

		// Check if props is true
		if(!props) {
			throw new Error('Slider init has no props');
		}

		// Check if props has images and target
		if(props.images && props.target) {

			// Construct slides	
			for(var i = 0; i < props.images.length; i++) {
				slides.push(new Slider.prototype.Slide(props.images[i]));
			}

			// Construct Btn prev
			BtnPrev = new Slider.prototype.Btn({
				label: 'left',
				type: 'prev'
			});
			
			// Contruct Btn next
			BtnNext = new Slider.prototype.Btn({
				label: 'right',
				type: 'next'
			});
			
			// Render HTML elements in target
			Slider.prototype._render({
				images: slides,
				btnPrev: BtnPrev,
				btnNext: BtnNext,
				target: props.target
			});

			// Construct Controller
			Controller = new Slider.prototype.SliderController({
				images: slides,
				btnPrev: BtnPrev,
				btnNext: BtnNext
			});

		}else {
			throw new Error('Images or target are not defined in init');
		}

		/**
		 * Start At function
		 * @public 
		 * @param {number} index - Index of the array
		 */
		this.startAt = function(index) {
			if(Controller) {
				Controller.startAt(index);
			} else {
				throw new Error('Controller not yet definded');
			}
		};

		/**
		 * Next Slide function
		 * @public
		 */
		this.nextSlide = function() {
			Controller.next();
		};

		/**
		 * Prev Slide function
		 * @public
		 */
		this.prevSlide = function() {
			Controller.prev();
		};

		/**
		 * Get Current Slide function
		 * @public
		 * @return {number} - returns the index of the array
		 */
		this.getCurrentSlide = function() {
			return Controller.getCurrentSlide();
		};
	};
} else {
	throw new Error('Slider constructor allready exists in window object');
};
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
;
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

}());;
/* Slide IIFE */
Slider.prototype.Slide = (function() {
	
	// Var declarations
	var id = 0,
		generateHtml,
		show,
		hide;

	/** 
	 * Generate Html function
	 * @private
	 * @param {object} props - The html props
	 */
	generateHtml = function(props) {
		var html = '';

		html += '<div id=\'' + props.htmlId + '\' class=\'slider__slide\'>';
		html += '<div \' class=\'slider__title\'>' + props.title + '</div>';
		html += '<img class=\'slider__image\' src=\'' + props.url + '\' alt=\'image\' />';
		html += '</div>';

		return html;
	};

	/** 
	 * Show function 
	 * @private
	 * @param {object} htmlId - The id of the slide
	 */
	show = function(htmlId) {
		var target = document.getElementById(htmlId);
		target.style.display = 'block';
	};

	/** 
	 * Hide function 
	 * @private
	 * @param {object} htmlId - The id of the slide
	 */
	hide = function(htmlId) {
		var target = document.getElementById(htmlId);
		target.style.display = 'none';
	};

	/** 
	 * Return Slide constructor 
	 * @constructor
	 * @param {object} props - Slide properties
	 */
	return function Slide (props) {

		// Var declarations
		var htmlId,
			url,
			title,
			link;

		// Increment constructor id
		id++;

		// Define props
		htmlId = 'image_' + id;
		url = props.url || false;
		title = props.title || 'Unknown';
		link = props.link || false;
		
		/**
		 * Get html function
		 * @public
		 */
		this.getHtml = function() {
			return generateHtml({
				htmlId: htmlId,
				url: url,
				title: title,
				link: link
			});
		};

		/**
		 * Show function
		 * @public
		 */
		this.show = function() {
			show(htmlId);
		};

		/**
		 * Hide function
		 * @public
		 */
		this.hide = function() {
			hide(htmlId);
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
		 * Get url function
		 * @public
		 */
		this.getUrl = function() {
			return url;
		};
	};

}());;
/* SliderController IIFE */
Slider.prototype.SliderController = (function() {

	// Var declarations
	var slideIndex,
		slides,
		onBtnPrevClick,
		onBtnNextClick,
		showSlide,
		next,
		prev;

	/**
	 * On Btn Prev Click handler
	 * @private
	 */
	onBtnPrevClick = function() {
		prev();
	};

	/**
	 * On Btn Click handler
	 * @private
	 */
	onBtnNextClick = function() {
		next();
	};

	/**
	 * Show slide function
	 * @private
	 */
	showSlide = function(index) {
		if(index > slides.length) {
			throw new Error('Show Slide index is to large! It needs to be smaller or equal to: ' + slides.length);
		}else {
			for(var i = 0; i < slides.length; i++) {
				if(slides.indexOf(slides[i]) === index) {
					slides[i].show();
				}else {
					slides[i].hide();
				}
			}
		}
	};

	/**
	 * Next slide function
	 * @private
	 */
	next = function() {
		if(slideIndex >= (slides.length - 1)) {
			showSlide(0);
			slideIndex = 0;
		}else {
			slideIndex++;
			showSlide(slideIndex);
		}
	};

	/**
	 * Prev slide function
	 * @private
	 */
	prev = function() {
		if(slideIndex <= 0) {
			showSlide((slides.length -1));
			slideIndex = (slides.length - 1);
		}else {
			slideIndex--;
			showSlide(slideIndex);
		}
	};

	/**
	 * Slide Controller constructor
	 * @constructor
	 * @param {object} props - SLide Controller properties
	 */
	return function SlideController (props) {
		var btnNext,
			btnPrev,
			slideStarted = false;

		// Slides
		slides = props.images || false;

		// Buttons
		btnPrev = document.getElementById(props.btnPrev.getHtmlId());
		btnNext = document.getElementById(props.btnNext.getHtmlId());
		btnPrev.addEventListener('click', onBtnPrevClick);
		btnNext.addEventListener('click', onBtnNextClick);

		/**
		 * Start at function
		 * @public
		 * @param {number} index 
		 */
		this.startAt = function(index) {
			if(!slideStarted) {
				slideIndex = index || 0;
				showSlide(slideIndex);
				slideStarted = true;
			} else {
				throw new Error('Slider allready started');
			}
		};

		/**
		 * Next function
		 * @public
		 */
		this.next = function() {
			next();
		};

		/**
		 * Prev function
		 * @public
		 */
		this.prev = function() {
			prev();
		};

		/**
		 * Get Current Slide function
		 * @public
		 * @param {number} - Returns array index of current slide
		 */
		this.getCurrentSlide = function() {
			return slideIndex;
		};
	};

}());