function hideAll() {
	for (var i = 0; i < arguments.length; i++) {
		if ($(arguments[i])) {
			Element.hide(arguments[i]);
		}
	}
}

function showAll() {
	for (var i = 0; i < arguments.length; i++) {
		if ($(arguments[i])) {
			Element.show(arguments[i]);
		}
	}
}

function hc() {
	hideAll("newBankNick", "newBankSubmit", "newCardSubmit", "newCardNick", "newCardAddress", "newBankCheck", "newBankCheckDiv","FLAMessage");
}

function sc() {
	hc();
	for (var i = 0; i < arguments.length; i++) {
		if ($(arguments[i])) {
			Element.show(arguments[i]);
		}
	}
}
function init() {
	if ($("isNewBank") && !$("isNewBank").checked) {
		hideAll("newBankNick", "newBankSubmit", "newBankCheck", "newBankCheckDiv");
	} else {
		showAll("newBankNick", "newBankSubmit", "newBankCheck", "newBankCheckDiv");
	}
	if ($("isNewCard") && !$("isNewCard").checked) {
		hideAll("newCardSubmit", "newCardNick", "newCardAddress");
	} else {
		showAll("newCardSubmit", "newCardNick", "newCardAddress");
	}
}
function showNewCard() {
	sc("newCardNick", "newCardAddress", "newCardSubmit");
	if ($("isNewCard")) {
		$("isNewCard").checked = true;
	}
}
function showNewBank() {
	sc("newBankNick", "newBankSubmit", "newBankCheck", "newBankCheckDiv");
	if ($("isNewBank")) {
		$("isNewBank").checked = true;
	}
}

/* NFS-107 & NFS-16 to hide disclaimer when CC is the chosen payment method */
function hideDisclaimerAndProceed(elementId){
	try {
		document.getElementById(elementId).style.display = 'none';
		document.getElementById("disclaimer").checked=true;
		document.getElementById("proceed").disabled = false;
		document.getElementById("directDebitAgreementLink").style.display = 'none';
	}catch(e){ }
}
function showDisclaimer(elementId){
	try {
		document.getElementById(elementId).style.display = '';
		document.getElementById("disclaimer").checked=false;
		document.getElementById("proceed").disabled = true;
		document.getElementById("directDebitAgreementLink").style.display = '';
	}catch(e){ }
	var $j = jQuery.noConflict();
	if ($j){
		$j(".existingCardDisclaimerAreaClass").css("display", "none");
	}
}
window.onload = init;

