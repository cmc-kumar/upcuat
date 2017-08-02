
var ct = "<img src=";
var cd = "//www.discovercard.com"; //this should contain the domain of the web site
var cu = "/images/zag.gif?Log=1"; //this should contain the full path to the zag.gif file (excluding domain) and include the query string of log=1
var ce = "width='1' height='1' />";

// Browser Constants
var c = {};
c["sw"] = screen.width;
c["sh"] = screen.height;
c["cd"] = screen.colorDepth;
var co = "";

// Dynamic variables
var d = {};
d["dt"] = document.title;
d["dd"] = window.location.hostname.toString();
d["dl"] = window.location.pathname.toString();
d["dr"] = document.referrer;
d["cb"] = new Date().getTime();
d["qs"] = window.location.search.toString();
var vo = "";

// META DATA Constants (as needed)

// Visual Science specific variables
if (typeof v != "undefined") {
	for ( vKey in v ) {
		vo = vo+"&"+vKey+"="+escape1(v[vKey]);
	}
}

for ( cKey in c ) {
	co = co+"&"+cKey+"="+escape1(c[cKey]);
}

for ( dKey in d ) {
	vo = vo+"&"+dKey+"="+escape2(d[dKey]);
}
//alert (ct + "\n" + cd  + "\n"  +  cu  + "\n" +  vo  + "\n" + co  + "\n" +  ce);
document.write (ct + cd  +  cu  +  vo  + co  +  ce);
//END REFERENCE PAGE TAG


//REFERENCE LINK AND FORM CLICK PAGE TAG
//INITIATE FUNCTIONS ONLOAD
window.onload = startCapture;

function startCapture(){
	
	//TO CAPTURE LINK CLICKS
	if (vlc == "1"){captureLink();}
	
}

//BEGIN LINK CAPTURE PAGE TAG
function captureLink(){
	if (document.links[0]){
	if (document.links){
	var links = document.links, link, k=0;
	while(link=links[k++])	
	link.onclick = captureLinkName;
	}
	}
}
function captureLinkName() {
	var lc=new Image();
	this.parent = this.parentNode;
	lc.src= cd + cu + '&linkname=' + escape1(this.name) + "&cd=" + new Date().getTime();
}

function AppendFormValues()
{
  var formvalues = "";
  for (var i=0;i<document.formname.length;i++)
  {
    var item = document.formname.elements[i];
    var formitem = "v_"+i;
    var formvalue = escape1(item.value);
    formvalues += formitem + '=' + formvalue + '&';
  }
  document.formname.action = document.formname.action + '?' + formvalues;
}


//ESCAPE FUNCTIONS
function escape1(s)
{ return escape(s).replace(/\+/g,"%20") }

function escape2(s)
{ return escape(s).replace(/\+/g, "%2B") }

    
//END LINK CAPTURE PAGE TAG


