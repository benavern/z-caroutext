////////////////////////////
//		Z-Caroutext		  //
//	by Benjamin Caradeuc  //
//	http://caradeuc.info  //
////////////////////////////


// The caroutext class :)
var ZCaroutext = function(element, texts, period, pipeColor){
	this.element = element;
	this.texts = texts;
	this.period = period;
	
	element.style.borderRight = "0.1em solid " + pipeColor;
	
	this.currentTextIndex = 0;
	this.txt = '';
	this.isDeleting = false;
	
	this.run();
};

// run method (infinit)
ZCaroutext.prototype.run = function(){
	
	var z = this;
	var currentText = z.texts[z.currentTextIndex];
	var deltaT = ((!z.isDeleting) ? 300 : 100) - Math.random()*100;
	
	if (z.isDeleting) {
	    z.txt = currentText.substring(0, z.txt.length - 1);
	} else {
		z.txt = currentText.substring(0, z.txt.length + 1);
	}
	
	z.element.innerHTML = z.txt;
	
	if(!z.isDeleting && z.txt === currentText){
		deltaT = z.period;
		this.isDeleting = true;
	}
	else if(z.isDeleting && z.txt === ''){
		z.isDeleting = false;
		z.currentTextIndex = (z.currentTextIndex >= z.texts.length-1) ? 0 : z.currentTextIndex + 1;
		deltaT = z.period/2;
	}
	
	setTimeout(function() {
		z.run();
	}, deltaT);
	
};

// creating an object for each element
window.onload = function(){
	
	var elems = document.getElementsByClassName('z-caroutext');
	
	for(var i =0; i<elems.length; i++){
		(function(i){
			
			var elem = elems[i];
			
			var elemTexts = JSON.parse(elem.getAttribute('data-texts'));
			var elemTiming = parseInt(elem.getAttribute('data-timing'),10) || 2000;
			var elemPipeColor = elem.getAttribute('data-pipe-color') || "#000";
			
			new ZCaroutext(elem, elemTexts, elemTiming, elemPipeColor);
			
		})(i)
	}
	
};