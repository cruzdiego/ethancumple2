//VARIABLES
var body = document.body;
var picture = document.getElementsByTagName("picture")[0];
var envelopes = document.getElementsByClassName("envelope");
var footer = document.getElementsByTagName("footer")[0];
var footerText = document.getElementById("footerText");
var windowHeight;
var windowWidth;

//EXECUTION
addObservers();

//FUNCTIONS
function addObservers() {
	window.addEventListener("load",function() {
		calculatePictureDimensions();
	});
	window.addEventListener("resize",function() {
		calculatePictureDimensions();
	});
	//
	if ("ontouchstart" in document.documentElement) {
  		picture.addEventListener("touchstart", function() {
  			picture.classList.add("touchstart");
  		});
  		picture.addEventListener("touchend", function() {
  			picture.classList.remove("touchstart");
  			toggleInvitation();
  		});
	} else {
		picture.addEventListener("mousedown", function() {
			picture.classList.add("touchstart");
		});
		picture.addEventListener("mouseup", function() {
  			picture.classList.remove("touchstart");
  			toggleInvitation();
  		});
	}
}

//Picture Dimensions
function calculatePictureDimensions() {
	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;
	var aspectRatioW = 542;
	var aspectRatioH = 497;
	var pictureWidth;
	var pictureHeight;
	if (windowWidth < windowHeight) {
		pictureWidth = windowWidth * pictureScale();
		pictureHeight = pictureWidth * aspectRatioH/aspectRatioW;
	} else {
		pictureHeight = windowHeight * pictureScale();
		pictureWidth = pictureHeight * aspectRatioW/aspectRatioH;
	}
	picture.style.width = pictureWidth+"px";
	picture.style.height = pictureHeight+"px";
	picture.style.display = "block";
	toggleFooterText(0);
}

function pictureScale() {
	if (windowWidth <= 760) {
		return 0.9;
	} else {
		return 0.7;
	}
}

//Invitation
function toggleInvitation() {
	toggleFooterText(150);
	if (picture.classList.contains("open")) {
		closeInvitation();
	} else {
		openInvitation();
	}
}

function openInvitation() {
	picture.classList.add("open");
	body.classList.remove("close");
	body.classList.add("open");
	translateToDissapear(envelopes);
	setTimeout(function() {
		body.onclick = function() {toggleInvitation()};
	}, 100);
	
}

function closeInvitation() {
	picture.classList.remove("open");
	body.classList.remove("open");
	body.classList.add("close");
	translateToAppear(envelopes);
	body.onclick = function() {};
}

function translateToDissapear(elements) {
	var elementsCount = elements.length;
	for (var k=0;k<elementsCount;k++) {
		var element = elements[k];
		element.style.transform = translationToDissapear();
	}
}

function translationToDissapear() {
	var pictureHeight = picture.offsetHeight;
	var x = 0;
	var y = pictureHeight + ((windowHeight - pictureHeight)/2);
	return translationText(x,y);
}

function translateToAppear(elements) {
	var elementsCount = elements.length;
	for (var k=0;k<elementsCount;k++) {
		var element = elements[k];
		element.style.transform = null;
	}
}

function translationText(x,y) {
	return "translate3d("+x+"px,"+y+"px,0px)";
}

//Footer
function toggleFooterText(delay) {
	setTimeout(function(){
		if (picture.classList.contains("open")) {
			footer.classList.add("calendar");
			footerText.innerHTML = windowWidth < 760 ? "Añade al calendario" : "Añadir al calendario"
		} else {
			footer.classList.remove("calendar");
			footerText.innerHTML = windowWidth < 760 ? "Tap para abrir" : "Click para abrir"
		}
	},delay);
}

function handleFooterAction() {
	if (picture.classList.contains("open")) {
		addToCalendar();
	} else {
		toggleInvitation();
	}
}

function addToCalendar() {
	window.location = "resources/iCal-20170320-063117.ics";
}