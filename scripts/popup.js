//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;

//loading popup with jQuery magic!
function loadPopup(popupContact){
	//loads popup only if it is disabled
	if(popupStatus==0){
		jQuery("#backgroundPopup").css({
			"opacity": "0.7"
		});
		jQuery("#backgroundPopup").fadeIn("slow");
		jQuery("#"+popupContact).fadeIn("slow");
		popupStatus = 1;
	}
}
//disabling popup with jQuery magic!
function disablePopup(popupContact){
	//disables popup only if it is enabled
	if(popupStatus==1){
		jQuery("#backgroundPopup").fadeOut("slow");
		jQuery("#"+popupContact).fadeOut("slow");
		popupStatus = 0;
	}
}
//centering popup
function centerPopup(popupContact){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = jQuery("#"+popupContact).height();
	var popupWidth = jQuery("#"+popupContact).width();
	//centering
	jQuery("#"+popupContact).css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});

	jQuery("#backgroundPopup").css({
        //only need for IE6 we are setting the background height below for ie6
		"height": jQuery(document).height()
	});

}
jQuery(document).ready(function($) {jQuery("#inactivityClose").click(function(){disablePopup("popupContact1");});});
jQuery(function() {settings = {tl: { radius: 20 },tr: { radius: 20 }, bl: { radius: 20 },br: { radius: 20 },autoPad: true,validTags: ["div"]};
jQuery('.popupContact').corner(settings);
});
function printExpressConsent(divToPrint){
jQuery("#"+divToPrint).jqprint({ operaSupport: true });
}
/*####################################################################################################################
 Start the below scripts are developed and the above speed bump will be retired the below implementation is based on jQUERY
#####################################################################################################################
*/
var sbLastAccesedTime;
var sbTimeIntervalGap;
var sbInactiveTime;
var sbUrl;
var homeUrl;
function jqSBCheckSessionKeyEvent(speedBumpUrl,logoutUrl) {
    var currentTime = (new Date()).valueOf();
    jqSBCheckSession(currentTime, sbInactiveTime, sbTimeIntervalGap,speedBumpUrl,logoutUrl,homeUrl)
}
//this function is to handle session timeout speed bump
function jqSBCheckSession(lastAccessedTime, inactiveTime, intervalGap,speedBumpUrl,logoutUrl,loginUrl) {
    sbLastAccesedTime = lastAccessedTime;
    sbTimeIntervalGap = intervalGap;
    sbInactiveTime = inactiveTime;
    sbUrl=speedBumpUrl;
    homeUrl=loginUrl;
    var now = new Date();
    var currentTime = now.valueOf();
    if (sbInactiveTime - ((currentTime - sbLastAccesedTime) / 1000) <= 0 && sbInactiveTime - ((currentTime - sbLastAccesedTime) / 1000) > -3) {
        sessionPopUp();
        logWebActivity(speedBumpUrl, "sessionTimeOut=true");
        sbCallLogout(logoutUrl);
    }
    else {
        var toDelay = function() {
            jqSBCheckSession(sbLastAccesedTime, sbInactiveTime, sbTimeIntervalGap,speedBumpUrl,logoutUrl,homeUrl);
        };
        setTimeout(toDelay, 1000);
    }
}
function sbCallLogout(logoutUrl) {
    var now = new Date();
    var currentTime = now.valueOf();
    if (sbTimeIntervalGap - ((currentTime - sbLastAccesedTime) / 1000) <= 0 && sbTimeIntervalGap - ((currentTime - sbLastAccesedTime) / 1000) > -3) {
        logWebActivity(logoutUrl, "");
        window.location = homeUrl;
    }
    else {
        var toDelay = function() {
            sbCallLogout(logoutUrl);
        };
        setTimeout(toDelay, 1000);
    }
}
function speedBumpLogging(toUrl) {
    centerPopup("popupContact");
    loadPopup("popupContact");
    var now = new Date();
    var currentTime = now.valueOf();
    if (sbTimeIntervalGap - ((currentTime - sbLastAccesedTime) / 1000) > 0) {
        logWebActivity(toUrl, "sessionTimeOut=speedbumpLogout");
}
}
function sessionPopUp() {
    disablePopup("popupContact");
    centerPopup("popupContact1");
    loadPopup("popupContact1");
}
function jqSessionPopupClose(val) {
    var now = new Date();
    var currentTime = now.valueOf();
    if (sbTimeIntervalGap - ((currentTime - sbLastAccesedTime) / 1000) > 0) {
        logWebActivity(sbUrl, "sessionTimeOut=" + val);
    }
}
function logWebActivity(toUrl, data) {
    jQuery.ajax({
        type:'POST',
        contentType:'application/x-www-form-urlencoded',
        url: toUrl,
        data:data ,
        async:false,
        success: function(jqXHR, textStatus, data) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
        },
        complete: function() {
        }
    });
}
/**** handle  checkbox for express consent ****/
function handleCheckboxClicked(checkboxId) {
    var booleanCheckboxElement = document.getElementById(checkboxId);
    if (booleanCheckboxElement.checked == 1) {
        booleanCheckboxElement.value = 'true';
    } else {
        booleanCheckboxElement.value = 'false';
    }
}
function removeCheckboxValue(checkboxId) {
    var booleanCheckboxElement = document.getElementById(checkboxId);
    booleanCheckboxElement.value = 'false';
}
function isTdbIntegerKey(evt)
{
 if(evt.keyCode!=9){
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
}
  return true;
}
/*####################################################################################################################
 end the below scripts are developed and the above speed bump will be retired the below implementation is based on jQUERY
 #####################################################################################################################
*/