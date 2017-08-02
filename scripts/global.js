var isPopUpExist = false;
var isSpeedBumpExist = false;
var speedBumpInactiveTime;
var speedBumpLastAccessedTime;

var bbdLastAccesedTime;
var bbdTimeIntervalGap;
var bbdSpeedBumpInactiveTime;

function submitOnce(e, v) {
  e.disabled = true;
  var ee = $('dynamic');
  ee.name = e.name;
  ee.value = e.value;
  e.value = v;
  e.form.submit();
}

function chooseLocale(e) {
  var url = window.location.href;
  var connector = "?";
  if (url.indexOf('/exec/appt') != -1) {
    /* locale for lan options are computed in server, needs reloading */
    window.location.href = url.replace(/exec\/appt.*$/, "exec/appt/?locale=" + e.value);
    return;
  }
  if (url.indexOf('/exec/apptNew') != -1) {
    /* locale for lan options are computed in server, needs reloading */
    window.location.href = url.replace(/exec\/apptNew.*$/, "exec/apptNew/?locale=" + e.value);
    return;
  }
  if (url.indexOf("?") != -1) {
    connector = "&";
    if (url.match(/locale=[^&.]*/)) {
      /* matches empty locale http://www.some.com/?locale=&selected=1 */
      window.location.href = url.replace(/locale=[^&.]*/, "locale=" + e.value);
      return;
    }
  }
  if (url.match(/#/))
    window.location.href = url.replace(/#/, connector + "locale=" + e.value + "#");
  else
    window.location.href = url + connector + "locale=" + e.value;
}

/* This function is used to change the style class of an element */
function swapClass(obj, newStyle) {
  obj.className = newStyle;
}

function isUndefined(value) {
  var undef;
  return value == undef;
}

function checkAll(theForm) { // check all the checkboxes in the list
  for (var i = 0; i < theForm.elements.length; i++) {
    var e = theForm.elements[i];
    var eName = e.name;
    if (eName != 'allbox' &&
        (e.type.indexOf("checkbox") == 0)) {
      e.checked = theForm.allbox.checked;
    }
  }
}

/* Function to clear a form of all it's values */
function clearForm(frmObj) {
  for (var i = 0; i < frmObj.length; i++) {
    var element = frmObj.elements[i];
    if (element.type.indexOf("text") == 0 ||
        element.type.indexOf("password") == 0) {
      element.value = "";
    } else if (element.type.indexOf("radio") == 0) {
      element.checked = false;
    } else if (element.type.indexOf("checkbox") == 0) {
      element.checked = false;
    } else if (element.type.indexOf("select") == 0) {
      for (var j = 0; j < element.length; j++) {
        element.options[j].selected = false;
      }
      element.options[0].selected = true;
    }
  }
}

/* Function to get a form's values in a string */
function getFormAsString(frmObj) {
  var query = "";
  for (var i = 0; i < frmObj.length; i++) {
    var element = frmObj.elements[i];
    if (element.type.indexOf("checkbox") == 0 ||
        element.type.indexOf("radio") == 0) {
      if (element.checked) {
        query += element.name + '=' + escape(element.value) + "&";
      }
    } else if (element.type.indexOf("select") == 0) {
      for (var j = 0; j < element.length; j++) {
        if (element.options[j].selected) {
          query += element.name + '=' + escape(element.value) + "&";
        }
      }
    } else {
      query += element.name + '='
          + escape(element.value) + "&";
    }
  }
  return query;
}

/* Function to hide form elements that show through
 the search form when it is visible */
function toggleForm(frmObj, iState) // 1 visible, 0 hidden
{
  for (var i = 0; i < frmObj.length; i++) {
    if (frmObj.elements[i].type.indexOf("select") == 0 || frmObj.elements[i].type.indexOf("checkbox") == 0) {
      frmObj.elements[i].style.visibility = iState ? "visible" : "hidden";
    }
  }
}

/* Helper function for re-ordering options in a select */
function opt(txt, val, sel) {
  this.txt = txt;
  this.val = val;
  this.sel = sel;
}

/* Function for re-ordering <option>'s in a <select> */
function move(list, to) {
  var total = list.options.length;
  index = list.selectedIndex;
  if (index == -1) return false;
  if (to == +1 && index == total - 1) return false;
  if (to == -1 && index == 0) return false;
  to = index + to;
  var opts = new Array();
  for (i = 0; i < total; i++) {
    opts[i] = new opt(list.options[i].text, list.options[i].value, list.options[i].selected);
  }
  tempOpt = opts[to];
  opts[to] = opts[index];
  opts[index] = tempOpt
  list.options.length = 0; // clear

  for (i = 0; i < opts.length; i++) {
    list.options[i] = new Option(opts[i].txt, opts[i].val);
    list.options[i].selected = opts[i].sel;
  }

  list.focus();
}

/*  This function is to select all options in a multi-valued <select> */
function selectAll(elementId) {
  var element = document.getElementById(elementId);
  len = element.length;
  if (len != 0) {
    for (i = 0; i < len; i++) {
      element.options[i].selected = true;
    }
  }
}

/* This function is used to select a checkbox by passing
 * in the checkbox id
 */
function toggleChoice(elementId) {
  var element = document.getElementById(elementId);
  if (element.checked) {
    element.checked = false;
  } else {
    element.checked = true;
  }
}

/* This function is used to select a radio button by passing
 * in the radio button id and index you want to select
 */
function toggleRadio(elementId, index) {
  var element = document.getElementsByName(elementId)[index];
  element.checked = true;
}

/* This function is used to open a pop-up window */
function openWindow(url, winTitle, winParams) {
  winName = window.open(url, winTitle, winParams);
  winName.focus();
}


/* This function is to open search results in a pop-up window */
function openSearch(url, winTitle) {
  var screenWidth = parseInt(screen.availWidth);
  var screenHeight = parseInt(screen.availHeight);

  var winParams = "width=" + screenWidth + ",height=" + screenHeight;
  winParams += ",left=0,top=0,toolbar,scrollbars,resizable,status=yes";

  openWindow(url, winTitle, winParams);
}

/* This function is used to set cookies */
function setCookie(name, value, expires, path, domain, secure) {
  document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
  var prefix = name + "="
  var start = document.cookie.indexOf(prefix)

  if (start == -1) {
    return null;
  }

  var end = document.cookie.indexOf(";", start + prefix.length)
  if (end == -1) {
    end = document.cookie.length;
  }

  var value = document.cookie.substring(start + prefix.length, end)
  return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// This function is for stripping leading and trailing spaces
function trim(str) {
  if (str != null) {
    var i;
    for (i = 0; i < str.length; i++) {
      if (str.charAt(i) != " ") {
        str = str.substring(i, str.length);
        break;
      }
    }

    for (i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) != " ") {
        str = str.substring(0, i + 1);
        break;
      }
    }

    if (str.charAt(0) == " ") {
      return "";
    } else {
      return str;
    }
  }
}

// This function is used by the login screen to validate user/pass
// are entered.
function validateRequired(form) {
  var bValid = true;
  var focusField = null;
  var i = 0;
  var fields = new Array();
  oRequired = new required();

  for (x in oRequired) {
    if ((form[oRequired[x][0]].type == 'text' || form[oRequired[x][0]].type == 'textarea' || form[oRequired[x][0]].type == 'select-one' || form[oRequired[x][0]].type == 'radio' || form[oRequired[x][0]].type == 'password') && form[oRequired[x][0]].value == '') {
      if (i == 0)
        focusField = form[oRequired[x][0]];

      fields[i++] = oRequired[x][1];

      bValid = false;
    }
  }

  if (fields.length > 0) {
    focusField.focus();
    alert(fields.join('\n'));
  }

  return bValid;
}

// This function is a generic function to create form elements
function createFormElement(element, type, name, id, value, parent) {
  var e = document.createElement(element);
  e.setAttribute("name", name);
  e.setAttribute("type", type);
  e.setAttribute("id", id);
  e.setAttribute("value", value);
  parent.appendChild(e);
}

function confirmDelete(obj) {
  var msg = "Are you sure you want to delete this " + obj + "?";
  ans = confirm(msg);
  if (ans) {
    return true;
  } else {
    return false;
  }
}

function highlightTableRows(tableId) {
  var previousClass = null;
  var table = document.getElementById(tableId);
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows;
  if (tbody == null) {
    rows = table.getElementsByTagName("tr");
  } else {
    rows = tbody.getElementsByTagName("tr");
  }
  // add event handlers so rows light up and are clickable
  for (i = 0; i < rows.length; i++) {
    rows[i].onmouseover = function() {
      previousClass = this.className;
      this.className += ' over'
    };
    rows[i].onmouseout = function() {
      this.className = previousClass
    };
    rows[i].onclick = function() {
      var cell = this.getElementsByTagName("td")[0];
      var link = cell.getElementsByTagName("a")[0];
      location.href = link.getAttribute("href");
      this.style.cursor = "wait";
    }
  }
}

function highlightFormElements() {
  // add input box highlighting
  //  addFocusHandlers(document.getElementsByTagName("input"));
  //  addFocusHandlers(document.getElementsByTagName("textarea"));
}

function addFocusHandlers(elements) {
  for (i = 0; i < elements.length; i++) {
    if (elements[i].type != "button" && elements[i].type != "submit" &&
        elements[i].type != "reset" && elements[i].type != "checkbox" && elements[i].type != "radio") {
      if (!elements[i].getAttribute('readonly') && !elements[i].getAttribute('disabled')) {
        elements[i].onfocus = function() {
          this.style.backgroundColor = '#ffd';
          this.select()
        };
        elements[i].onmouseover = function() {
          this.style.backgroundColor = '#ffd'
        };
        elements[i].onblur = function() {
          this.style.backgroundColor = '';
        }
        elements[i].onmouseout = function() {
          this.style.backgroundColor = '';
        }
      }
    }
  }
}

function radio(clicked) {
  var form = clicked.form;
  var checkboxes = form.elements[clicked.name];
  if (!clicked.checked || !checkboxes.length) {
    clicked.parentNode.parentNode.className = "";
    return false;
  }

  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != clicked) {
      checkboxes[i].checked = false;
      checkboxes[i].parentNode.parentNode.className = "";
    }
  }

  // highlight the row
  clicked.parentNode.parentNode.className = "over";
}



function noAlpha(event) {
  obj = Event.element(event);
  reg = /[^0-9.,]/g;
  obj.value = obj.value.replace(reg, "");
}

function isAlphaNum(evt) {
  var hh = (evt.which) ? evt.which : event.keyCode
  if ((hh > 47 && hh < 58) || (hh > 64 && hh < 91) || (hh > 96 && hh < 123) || (hh == 8))
  {
  }
  else {
    return false;
  }
  return true;
}
function isAlphaWithSpacesNDashes(evt) {
    var hh = (evt.which) ? evt.which : event.keyCode
    if ((hh==39) || (hh >= 44 && hh <=48) || (hh==32) || (hh > 64 && hh < 91) || (hh > 96 && hh < 123) || (hh == 8))
    {
    }
    else {
        return false;
    }
    return true;
}
function isAlphaNumWithSpacesNDashes(evt) {
    var hh = (evt.which) ? evt.which : event.keyCode
    if ((hh==45) || (hh==32) || (hh > 47 && hh < 58) || (hh > 64 && hh < 91) || (hh > 96 && hh < 123) || (hh == 8))
    {
    }
    else {
        return false;
    }
    return true;
}
// Show the document's title on the status bar
window.defaultStatus = document.title;


// Session time out functions for ncc2 portfolios
function checkSession(intervalTime) {
  var now = new Date();
  var currentTime = now.valueOf();
  
  if (intervalTime - ((currentTime - lastAccessedTime) / 1000) <= 600 && intervalTime - ((currentTime - lastAccessedTime) / 1000) > 597) {
    showpopup();
  }
  else {
    var toDelay = function() {
      checkSession(intervalTime);
    };
    setTimeout(toDelay, 1000);
  }

}

function keepSessionAlive(c, val) {
  lastAccessedTime = (new Date()).valueOf();
  val.v = c.value;
  new Ajax.Request(pingUrl, { method:'post', parameters: val});
}

function checkDFSSession(lastAccessedTime, intervalTime) {
  var now = new Date();
  var currentTime = now.valueOf();

  if (intervalTime - ((currentTime - lastAccessedTime) / 1000) <= 0) {
    document.location.href = "https://www.discovercard.com/cardmembersvcs/loginlogout/app/timeout";
  }
  else {
    var toDelay = function() {
      checkDFSSession(lastAccessedTime, intervalTime);
    };
    setTimeout(toDelay, 1000);
  }

}

function convertOriginalAccountNumberToUpperCase()
{
    var originalAccountNumber = document.getElementById("originalAccountNumber").value;
    document.getElementById("originalAccountNumber").value=originalAccountNumber.toUpperCase();
}

function convertToUpperCase(varElementId)
{
    var valueToUpperCase = document.getElementById(varElementId).value;
    document.getElementById(varElementId).value=valueToUpperCase.toUpperCase();
}

var pncLastFocusElement = null;
function showpopup()
{
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  if ($('pnclogoutlight')) document.getElementById('pnclogoutlight').style.display = 'none';
    if ($('pnclogoutfade')) document.getElementById('pnclogoutfade').style.display = 'none';
    if ($('hampBox')) document.getElementById('hampBox').style.display = 'none';
    if ($('hampFade')) document.getElementById('hampFade').style.display = 'none';
  if ($('hampFrame')) document.getElementById('hampFrame').style.display = 'block';
}
function hidepopup(intervalTime)
{
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  if ($('hampFrame')) document.getElementById('hampFrame').style.display = 'none';
  if(pncLastFocusElement && pncLastFocusElement.focus)
    pncLastFocusElement.focus();
    var toDelay = function() {
      checkSession(intervalTime);
    };
    setTimeout(toDelay, 1000);
}

function tricky_win_close(turl) {
  window.open(turl, "sub", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,maximise=1, resizable=1,left=0,top=0,width=790,height=525");
}
function isIntegerKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
function printSpecial(headerMsg) {

  if (document.getElementById != null)
  {
    var html = '<HTML> <b>' + headerMsg + '</b> </br>';

    if (document.getElementsByTagName != null)
    {
      var headTags = document.getElementById("print_div");
      if (headTags.length > 0)
        html += headTags[0].innerHTML;
    }

    var printReadyElem = document.getElementById("print_div");

    if (printReadyElem != null)
    {
      html += printReadyElem.innerHTML;
    }
    else
    {
      alert("Could not find the printReady function");
      return;
    }
    html += '\n</HTML>';
    var index = html.indexOf("<TH>");
    while (index != -1) {
      html = html.replace("<TH>", "<TH style=\"text-align:left\">");
      index = html.indexOf("<TH>");
    }

 var printWin = window.open("", "printSpecial");
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    //printWin.focus();
    printWin.print();
    printWin.close();
  
}
}
function mischandler()
{
  return false;
}
function showTerms(purl) {
  window.open(purl, "sub", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,maximise=1, resizable=1,left=0,top=0,width=790,height=525")
}
function termsPopUp() {
  window.open("/doc/paymentTerms", "sub", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,maximise=1, resizable=1,left=0,top=0,width=790,height=525")
}
function disableCTALoginToken() {
  var zip = document.getElementById('zip').value.length;
  var motherMaidenName = document.getElementById('motherMaidenName').value.length;
  if (zip > 0) {
    document.getElementById('motherMaidenName').disabled = true;
    document.getElementById('motherMaidenName').style.backgroundColor = '#C0C0C0';
  } else if (motherMaidenName > 0) {
    document.getElementById('zip').disabled = true;
    document.getElementById('zip').style.backgroundColor = '#C0C0C0';
  } else {
    document.getElementById('motherMaidenName').style.backgroundColor = '#FFFFFF';
    document.getElementById('zip').style.backgroundColor = '#FFFFFF';
    document.getElementById('motherMaidenName').disabled = false;
    document.getElementById('zip').disabled = false;
  }
}

function ctaLoginHelp(strUrl, windowWidth, windowHeight, windowSpecs)
{
  if (windowSpecs) {
    windowSpecs = "menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=no," + windowSpecs;
  }
  else {
    windowSpecs = "menubar=no,toolbar=no,location=no,resizable=no,status=no,scrollbars=no"
  }
  ;

  if (!windowWidth) {
    windowWidth = 300
  }
  ;
  if (!windowHeight) {
    windowHeight = 200
  }
  ;

  var screenHeight = screen.height;
  var topPosition = (screenHeight - windowHeight) / 2;
  var screenWidth = screen.width;
  var leftPosition = (screenWidth - windowWidth) / 2;

  var agt = navigator.appVersion.toLowerCase();
  if (agt.indexOf("aol") != -1)
  {
    topPosition = 0;
    leftPosition = 0;
  }
  ;

  windowSpecs += ",top=" + topPosition + ",left=" + leftPosition + ",width=" + windowWidth + ",height=" + windowHeight + "";
  var strURL = strUrl;

  var strCommand = "var newWin = open('" + strURL + "','newWin','" + windowSpecs + "');newWin.focus();";
  eval(strCommand);
}
function speedBumpCheckSessionKeyEvent(){
    var currentTime1 = (new Date()).valueOf();
    speedBumpCheckSession(currentTime1, speedBumpInactiveTime);
}
function speedBumpCheckSession(lastAccessedTime, intervalTime) {

  speedBumpLastAccessedTime=lastAccessedTime
  speedBumpInactiveTime=intervalTime;
  var now = new Date();
  var currentTime = now.valueOf();
  if (speedBumpInactiveTime - ((currentTime - speedBumpLastAccessedTime) / 1000) <= 0 && speedBumpInactiveTime - ((currentTime - speedBumpLastAccessedTime) / 1000) > -3)
  {
    speedBumpPopup();
  }
  else {
    var toDelay = function() {
      speedBumpCheckSession(speedBumpLastAccessedTime, speedBumpInactiveTime);
    };
    setTimeout(toDelay, 1000);
  }
}
function speedBumpCheckLogout(speedbumpLogout)
{
  document.getElementById('usblight').style.display = 'block';
  document.getElementById('usbfade').style.display = 'block';
  document.getElementById('light1').style.display = 'none';
  isSpeedBumpExist = true;
  isPopUpExist = false;
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/sbLogout", true); //getname will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sessionTimeOut=" + speedbumpLogout); //Posting to Servlet

  }
}
function speedBumpPopup() {
  if (isPopUpExist)
  {
    document.getElementById('light2').style.display = 'none';
    document.getElementById('usbfade2').style.display = 'none';
    isPopUpExist = false;
  }
  document.getElementById('light1').style.display = 'block';
  document.getElementById('usbfade').style.display = 'block';
  document.getElementById('usblight').style.display = 'none';
  isSpeedBumpExist = true;
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/sbLogout", true); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sessionTimeOut=true"); //Posting to Servlet
  }
}
function expressConsentPopup(val, speedBump, speedCheck)
{
  //this if condition is for testing the expressConsent from the speed bump popup
  if (isSpeedBumpExist)
  {
    document.getElementById('light1').style.display = 'none';
    document.getElementById('usbfade').style.display = 'none';
    document.getElementById('usblight').style.display = 'none';
    isSpeedBumpExist = false;
  }
  document.getElementById('light2').style.display = 'block';
  document.getElementById('usbfade2').style.display = 'block';
  //for requests coming from payment status on summary page, if express consent is enabled we are removing the ==
  if (val.match('paymentDetail'))
  {
    var modifiedVal2 = val.split('=', 1);
    var ps = modifiedVal2 + "=";
    modifiedVal2 = val.split(ps);
    val = ps + encodeURIComponent(modifiedVal2[1]);
    document.getElementById('consentSubmit').href = val;
  }
  else {
    document.getElementById('consentSubmit').href = val;
  }
  isPopUpExist = true;
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/ecPopup", false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("expressConsentPopup=" + val + "&speedCheck=" + speedCheck); //Posting to Servlet
  }
  //call this only if the account has speed bump
  if (speedBump == 1) {
    var now1 = new Date();
    var currentTime1 = now1.valueOf();
    speedBumpCheckSession(currentTime1, speedBumpInactiveTime);
  }

}
function expressConsentSubmit()
{
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  isPopUpExist = false;
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/ecPopup", false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("expressedConsent=true&_eventId_submit=popup"); //Posting to Servlet
    window.location = document.getElementById('consentSubmit').href;
  }
}
function expressConsentCancel()
{
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  isPopUpExist = false;
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/ecPopup", false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("expressedConsent=false"); //Posting to Servlet
    window.location = "/html/acctSummary";
  }
}
function speedBumpPopupClose(val)
{
  if (isSpeedBumpExist)
  {
    document.getElementById('light1').style.display = 'none';
    document.getElementById('usbfade').style.display = 'none';
    document.getElementById('usblight').style.display = 'none';
    isSpeedBumpExist = false;
    var now1 = new Date();
    var currentTime1 = now1.valueOf();
    speedBumpCheckSession(currentTime1, speedBumpInactiveTime);
  }
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/sbLogout", false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sessionTimeOut=" + val); //Posting to Servlet
    document.getElementById("inactivityClose").href = window.location;
  }
}
function getXMLObject()  //XML OBJECT
{
  var xmlHttp = false;
  try {
    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")  // For Old Microsoft Browsers
  }
  catch (e) {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")  // For Microsoft IE 6.0+
    }
    catch (e2) {
      xmlHttp = false   // No Browser accepts the XMLHTTP Object then false
    }
  }
  if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
    xmlHttp = new XMLHttpRequest();        //For Mozilla, Opera Browsers
  }
  return xmlHttp;  // Mandatory Statement returning the ajax object created
}

//this function is used to restrict the comments field length in 'ScheduleAppointment' and 'SurveyAppt' pages
function textCounter(field, maxlimit)
{
  if (document.getElementById(field).value.length > maxlimit)
    document.getElementById(field).value = document.getElementById(field).value.substring(0, maxlimit);

}


function charCounter(id, maxlimit, limited) {
  if (!$('counter-' + id)) {
    $(id).insert({after: '<div id="counter-' + id + '"></div>'});
  }
  if ($F(id).length >= maxlimit) {
    if (limited) {
      $(id).value = $F(id).substring(0, maxlimit);
    }
    $('counter-' + id).addClassName('charcount-limit');
    $('counter-' + id).removeClassName('charcount-safe');
  } else {
    $('counter-' + id).removeClassName('charcount-limit');
    $('counter-' + id).addClassName('charcount-safe');
  }
  $('counter-' + id).update((maxlimit - $F(id).length) + ' out of ' + maxlimit + " characters left.");

}

function makeItCount(id, maxsize, limited) {
  if (limited == null) limited = true;
  if ($(id)) {
    Event.observe($(id), 'keyup', function() {
      charCounter(id, maxsize, limited);
    }, false);
    Event.observe($(id), 'keydown', function() {
      charCounter(id, maxsize, limited);
    }, false);
    charCounter(id, maxsize, limited);
  }
}

function openHAMP(val)
{
  document.getElementById('hampBox').style.display = 'block';
  document.getElementById('hampFade').style.display = 'block';
  document.getElementById('hampFrame').style.display = 'block';
}

function closeHAMP()
{
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  var param = "hamp=viewed";
  if (xmlhttp) {
    xmlhttp.open("POST", "/doc/nccHAMP", true); //getname will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.setRequestHeader("Content-length", param.length);

    xmlhttp.send(param); //Posting to Servlet
  }

  document.getElementById('hampBox').style.display = 'none';
  document.getElementById('hampFade').style.display = 'none';
  document.getElementById('hampFrame').style.display = 'none';
}
function makePayment(val1, val2)
{
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", val2, false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("requestFrom=accountSummary"); //Posting to Servlet
    window.location = val1;
  }
}

function downloadPdf(val1, val2)
{    
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", val1, true); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("activityName=BorrowerDownloadedForbearanceDefermentPDF&requestFrom=" + val2); //Posting to Servlet
/*
    window.location = val1;
*/
  }
}

//Below script files are for barclays speed bump from logout and session...start
//this is for restricting comma on the cumstomer website updateContact Page.
function disableComma(evt){
var charCode = (evt.which) ? evt.which : event.keyCode;
 return (charCode!=44);
}

//this function is to handle when the user clicks on contactUs on the logout speed bump
function bbdSpeedBumpPopupClose()
{
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/sbLogout", false); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sessionTimeOut=contactUs"); //Posting to Servlet
  }
}

//this function is to check user active or inactive based on the  key press
function bbdSpeedBumpCheckSessionKeyEvent(){
    var currentTime = (new Date()).valueOf();
    bbdSpeedBumpCheckSession(currentTime, bbdSpeedBumpInactiveTime, bbdTimeIntervalGap)
}

//this function is to handle session timeout speed bump
function bbdSpeedBumpCheckSession(lastAccessedTime, intervalTime, intervalGap) {
  bbdLastAccesedTime = lastAccessedTime;
  bbdTimeIntervalGap = intervalGap;
  bbdSpeedBumpInactiveTime=intervalTime;

  var now = new Date();
  var currentTime = now.valueOf();
  if (bbdSpeedBumpInactiveTime - ((currentTime - bbdLastAccesedTime) / 1000) <= 0 && bbdSpeedBumpInactiveTime - ((currentTime - bbdLastAccesedTime) / 1000) > -3)
  {
    bbdSpeedBumpPopup();
  }
  else {
    var toDelay = function() {
      bbdSpeedBumpCheckSession(bbdLastAccesedTime, bbdSpeedBumpInactiveTime, bbdTimeIntervalGap);
    };
    setTimeout(toDelay, 1000);
  }
}

//this function is to display when the session timeout speed bump
function bbdSpeedBumpPopup() {
  if (isPopUpExist)
  {
    document.getElementById('light2').style.display = 'none';
    document.getElementById('usbfade2').style.display = 'none';
    isPopUpExist = false;
  }
  document.getElementById('light1').style.display = 'block';
  document.getElementById('usbfade').style.display = 'block';
  document.getElementById('usblight').style.display = 'none';
  isSpeedBumpExist = true;
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (xmlhttp)
  {
    xmlhttp.open("POST", "/doc/sbLogout", true); //get name will be the servlet name
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("sessionTimeOut=true"); //Posting to Servlet
  }
  bbdSpeedBumpCallLogout();
}

//this function is to handle user clicking on the close link on the session timeout speed bump and also validating the time to log webactivity
function bbdSpeedBumpSessionPopupClose(val)
{
  if (isSpeedBumpExist)
  {
    document.getElementById('light1').style.display = 'none';
    document.getElementById('usbfade').style.display = 'none';
    document.getElementById('usblight').style.display = 'none';
    isSpeedBumpExist = false;
  }
  var now = new Date();
  var currentTime = now.valueOf();
  var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
  if (bbdTimeIntervalGap - ((currentTime - bbdLastAccesedTime) / 1000) > 0) {
    if (xmlhttp)
    {
      xmlhttp.open("POST", "/doc/sbLogout", false); //get name will be the servlet name
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send("sessionTimeOut=" + val); //Posting to Servlet
    }
  }
  //document.getElementById("inactivityClose").href = window.location;  
}

//this function is to handle logout after session timeout speed bump
function bbdSpeedBumpCallLogout() {
  var now = new Date();
  var currentTime = now.valueOf();
  if (bbdTimeIntervalGap - ((currentTime - bbdLastAccesedTime) / 1000) <= 0 && bbdTimeIntervalGap - ((currentTime - bbdLastAccesedTime) / 1000) > -3)
  {
    var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object
    if (xmlhttp)
    {
      xmlhttp.open("POST", "/security/logout", true); //get name will be the servlet name
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(); //Posting to Servlet
    }
  }
  else {
    var toDelay = function() {
      bbdSpeedBumpCallLogout();
    };
    setTimeout(toDelay, 1000);
  }
}
//Below script files are for barclays...end

function pncSpeedBumpCheckLogout()
{
  document.getElementById('pnclogoutlight').style.display = 'block';
  document.getElementById('pnclogoutfade').style.display = 'block';
  document.getElementById('hampFrame').style.display = 'block';  
}

function disableUserClick(bool){
      if(bool != null && bool=='false'){
      document.getElementById("darkLayer").style.display = 'block';
      document.getElementById("darkLayer1").style.display = 'block';
      document.getElementById("darkLayer2").style.display = 'block';
      }
}
function disableUserClickForConfirmPage(bool){
      if(bool != null && bool=='false'){
      document.getElementById("darkLayerContactConfirm").style.display = 'block';
      document.getElementById("darkLayer1").style.display = 'block';
      document.getElementById("darkLayer2").style.display = 'block';
      }
}

function hoaKeepSessionAlive(c, val) {
  lastAccessedTime = (new Date()).valueOf();
  val.v = c.value;
  val.n = c.name;
  new Ajax.Request(homeownerAssistanceUrl, { method:'post', parameters: val});
}

function callSlmLiveChat(daysDelq,programOfferFlag,refNum,shortPayFlag,skipIndicator,delinquencyBucket,chargedOffFlag,randomDigits,daysSinceLastPayment,originalAccountNum,riskTier,lastContactDate,lastAttemptDate,challengerInd,eventCode,ptpScore,ssTier,maxOpsBucket,ficoScore,lastCosContactDate,pCBalSum){

        lpAddVars('page', 'LoginErrorCount', 'null');
        lpAddVars('visitor', 'DaysDelinquent', daysDelq);
        lpAddVars('session', 'ProgramOfferFlag', programOfferFlag);
        lpAddVars('page', 'ReferenceNumber', refNum);        
        if(shortPayFlag == "1"){
        lpAddVars('session', 'ShortPayFlag', shortPayFlag);
        }else{
        lpAddVars('session', 'ShortPayFlag', '0');  
        }
        lpAddVars('session', 'SkipIndicator', skipIndicator);
        lpAddVars('session', 'DelinquencyBucket', delinquencyBucket);
        lpAddVars('session', 'ChargeOff', chargedOffFlag);
        lpAddVars('session', 'RandomDigit', randomDigits);
        lpAddVars('session', 'LastPaymentDays', daysSinceLastPayment);    
        lpAddVars('session', 'AccountNumber', originalAccountNum);
        //Added for 2011/02/02 release
        lpAddVars('session', 'RiskTier', riskTier);
        lpAddVars('session', 'LastContactDate', lastContactDate);
        lpAddVars('session', 'LastAttemptDate', lastAttemptDate);
        lpAddVars('session', 'ChallengerInd', challengerInd);
        lpAddVars('session', 'EventCode', eventCode);
        lpAddVars('session', 'PTPScore', ptpScore);
        lpAddVars('session', 'SSRiskTier', ssTier);
        lpAddVars('session', 'MaxOpsBucket', maxOpsBucket);
        lpAddVars('session', 'FicoScore', ficoScore);
        lpAddVars('session', 'LastCosContactDate', lastCosContactDate);
        lpAddVars('session', 'PCBalSum', pCBalSum);
  }
/**** usbank pre chargedoff handle  checkbox for express consent ****/
function upcCheckboxClicked() {
    var booleanCheckboxElement = document.getElementById('expressedConsentCB1');
    if (booleanCheckboxElement.checked == 1) {
        booleanCheckboxElement.value = 'true';
    } else {
        booleanCheckboxElement.value = 'false';
    }
}
function removeUPCCheckboxValue() {
    var booleanCheckboxElement = document.getElementById('expressedConsentCB1');
    booleanCheckboxElement.value = 'false';
}

function checkFileUpload(obj){
 var value =  document.getElementById(obj).value;
  if(value==""){
    alert("File is empty, please try again.");
    return false;
  }
}
function printPage(idOfWebPart,title,height,width){
    var printElement = document.getElementById(idOfWebPart);
    var $j = jQuery.noConflict();
    $j(printElement).printArea({mode: "popup", popClose: false, popTitle:title, popHt:height, popWd:width});
}

