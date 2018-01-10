
console.log(Slider);

function Slider(props) {

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
}