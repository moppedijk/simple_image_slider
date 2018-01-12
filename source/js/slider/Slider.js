
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
			startAt = props.startAt || 0,
			Controller,
			BtnPrev,
			BtnNext;

		// Check if props is false
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

			// Start controller at array position
			Controller.startAt(startAt);

		}else {
			throw new Error('Images or target are not defined in init');
		}

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
}