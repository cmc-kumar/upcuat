var sessionStatusMessage="Your security session will time out in |time|.";
var sessionTimeoutAlert="Your security session has timed out.";
var nwcSessionTimeoutAlert="Your session has timed out. You  will be re-directed to the login page.";
var sessionTimeOutUrl = window.location.href;
var redirectExclusionUrlPattern = /\/security\/login/;
var redirectExclusionDocPattern=/\/doc/;
var redirectExclusionBBDUrlPattern = /\/security\/bbdLogin/;
var redirectExclusionBBLUrlPattern = /\/security\/bblLogin/;
var redirectPopupNWCUrlPattern = /\/security\/nwcLogin/;
var maxSessionMin = 1;
var maxSessionSec = 0;

function sessionTimeDisplay(min, sec) {
    var disp;
    if (min <= 9) disp = " 0";
    else disp = " ";
    disp += min + ":";
    if (sec <= 9) disp += "0" + sec;
    else disp += sec;
    return (disp);
}
function sessionCountDown() {
    sec--;
    if (sec == -1) {
        sec = 59;
        min--;
    }
    window.status = sessionStatusMessage.replace("|time|", sessionTimeDisplay(min, sec));
    if ((min == 0) && (sec == 0)) {
        if(!redirectPopupNWCUrlPattern.test(window.location.href)){
            alert(nwcSessionTimeoutAlert);
        }
        window.location.href = sessionTimeOutUrl;
    }
    else down = setTimeout("sessionCountDown()", 900);
}
function sessionTimeOutMonitor() {
    min = 1 * maxSessionMin;
    sec = 0 + maxSessionSec;
    sessionCountDown();
}

if(!redirectExclusionUrlPattern.test(window.location.href) && !redirectExclusionBBDUrlPattern.test(window.location.href) && !redirectExclusionDocPattern.test(window.location.href) && !redirectExclusionBBLUrlPattern.test(window.location.href))
    if(Event && Event.observe) Event.observe(window, "load", sessionTimeOutMonitor);
