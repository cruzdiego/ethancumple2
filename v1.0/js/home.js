//VARIABLES
var body = document.body;
var invitationSVG = document.getElementById("invitationSVG");
var backBody = document.getElementById("backBody");
var frontBody = document.getElementById("frontBody");
var invitationLetter = document.getElementById("invitationLetter");
//Transform
var backBodyInitialTransformX = 0;
var backBodyInitialTransformY = 0;
var frontBodyInitialTransformX = 93;
var frontBodyInitialTransformY = 293;
var invitationLetterInitialTransformX = 103;
var invitationLetterInitialTransformY = 108;

//FUNCTIONS
function toggleInvitation() {
	if (invitationSVG.classList.contains("open")) {
		closeInvitation();
	} else {
		openInvitation();
	}
}

function openInvitation() {
	invitationSVG.classList.add("open");
	body.classList.add("open");
	backBody.style.transform = finalTransformText(backBodyInitialTransformX,backBodyInitialTransformY);
	frontBody.style.transform = finalTransformText(frontBodyInitialTransformX,frontBodyInitialTransformY);
	setTimeout(function() {
		body.onclick = function() {toggleInvitation()};
	}, 100);
	
}

function closeInvitation() {
	invitationSVG.classList.remove("open");
	body.classList.remove("open");
	backBody.style.transform = null;
	frontBody.style.transform = null;
	body.onclick = function() {};
}

//Transform
function invitationSVGHeight(windowHeight) {
	var windowWidth = window.innerWidth;
	if (windowWidth <= 760) {
		return windowHeight * 0.90;
	} else {
		return windowHeight * 0.70;
	}
}

function finalTransformY(initialTransformY) {
	var windowHeight = window.innerHeight;
	var svgHeight = invitationSVGHeight(windowHeight);
	var emptySpaceHeight = (windowHeight - svgHeight)/2;
	var addedTranslation = svgHeight + (emptySpaceHeight*542/windowHeight);
	return initialTransformY + addedTranslation;
}

function finalTransformText(intialTransformX, initialTransformY) {
	var x = intialTransformX;
	var y = finalTransformY(initialTransformY);
	return transformText(x,y);
}

function transformText(x,y) {
	return "translate("+x+"px,"+y+"px)";
}