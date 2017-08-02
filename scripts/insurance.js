function showOneInsurance() {
	Element.hide("secondaryInsurance");
	Element.show("primaryInsurance");		
}

function showNoInsurance() {
	Element.hide("secondaryInsurance");
	Element.hide("primaryInsurance");
}

function showBothInsurance() {
	Element.show("secondaryInsurance");
	Element.show("primaryInsurance");
}

function init() {
	if ($("oneIns") && $("oneIns").checked) {
		showOneInsurance();
	} 
	if ($("noIns") && $("noIns").checked) {
		showNoInsurance();
	} 
	if ($("multipleIns") && $("multipleIns").checked) {
		showBothInsurance();
	} 
}
window.onload = init;

