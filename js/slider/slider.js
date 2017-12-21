
function Slider(props) {
	// Check if props is true
	if(!props) {
		throw new Error('Slider init has no props');
	}

	// Check if props has images and target
	if(props.images && props.target) {
		// Start something
	}else {
		throw new Error('Images or target are not defined in init');
	}

	this.render = function(id) {
	};

	this.nextSlide = function() {
		// controller.next();
	};
	
	this.prevSlide = function() {
		// controller.prev();
	};

	this.getCurrentSlide = function() {
		// return controller.getCurrentSlide();
	};
}