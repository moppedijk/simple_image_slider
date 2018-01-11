
/* SliderController IIFE */
Slider.prototype.SliderController = (function() {

	// Var declarations
	var slideIndex,
		slides,
		_onBtnPrevClick,
		_onBtnNextClick,
		_showSlide,
		_next,
		_prev;

	/**
	 * On Btn Prev Click handler
	 * @private
	 */
	_onBtnPrevClick = function() {
		_prev();
	};

	/**
	 * On Btn Click handler
	 * @private
	 */
	_onBtnNextClick = function() {
		_next();
	};

	/**
	 * Show slide function
	 * @private
	 */
	_showSlide = function(index) {
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
	_next = function() {
		if(slideIndex >= (slides.length - 1)) {
			_showSlide(0);
			slideIndex = 0;
		}else {
			slideIndex++;
			_showSlide(slideIndex);
		}
	};

	/**
	 * Prev slide function
	 * @private
	 */
	_prev = function() {
		if(slideIndex <= 0) {
			_showSlide((slides.length -1));
			slideIndex = (slides.length - 1);
		}else {
			slideIndex--;
			_showSlide(slideIndex);
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
		btnPrev.addEventListener('click', _onBtnPrevClick);
		btnNext.addEventListener('click', _onBtnNextClick);

		/**
		 * Start at function
		 * @public
		 * @param {number} index 
		 */
		this.startAt = function(index) {
			if(!slideStarted) {
				slideIndex = index || 0;
				_showSlide(slideIndex);
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
			_next();
		};

		/**
		 * Prev function
		 * @public
		 */
		this.prev = function() {
			_prev();
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