# Simple Slider
This Simple Slider creates an image slider in a given target. The image slider creates its own html, image elements and btn elements.

## Getting started
To get started download or clone the repository and use the JavaScript files in the `dist` folder. Add the script files to your `<head>` or add them to your bundle. The `Slider` constructor is added to the `window` object.

Grunt is used to build and minify the source folder. To use Grunt install the npm dependencies with `npm install` and run `grunt` in your console.

## Example
Below you will find an example code snippet for constructing the slider. Create a variable and construct Slider with `new Slider()`. The Slider constructor takes one argument `props`, props takes a few properties `images`, `target`, and `startAt`. 

### Props images
Images is a Array with and object which is the image object. The image object takes three properties `title`, `url`, and `link`. 

### Props target
Target is a string and only accepts id's, in this case the target is `#header` or `<div id='header'></div>`.

### Props startAt
StartAt is a number and represents the array index of the images array.

### Example code
```javascript
(function(){
	// Construct Slider with props 
	var Header = new Slider({
		images:[
			{   
				title: 'Afbeelding 1',
				url: 'http://lorempixel.com/728/90/sports/1/',
				link: 'http://google.nl'
			},
			{   
				title: 'Afbeelding 2',
				url: 'http://lorempixel.com/728/90/sports/2/',
				link: 'http://google.nl'
			}
		],
		target: 'header',
		startAt: 0
	});
}());
```

In the example above `Header` has a few public properties for usage. `header.nextSlide()` can be used to go to the next slide. `Header.prevSlide()` can be used to go to the previous slide. `Header.getCurrentSlide()` can be used to get the current slide 'array' index. Below you will find an example code snippet which creates an autoplay image slider.

```javascript
setInterval(function(){ 
	Header.nextSlide(); 
}, 1000);
```

## License
GNU General Public Licence 2.0