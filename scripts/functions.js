/* ---- =JQUERY --*/

$(function () {

    var ease = "easeInOutCirc";
    var vel = 200;

    /* ---- =LIGHTBOX --*/
    var lb = $(".lightbox");
    if(lb)
    lb.fancybox({
        'transitionIn': 'fade',
        'transitionOut': 'fade',
        'overlayOpacity': 0.8,
        'padding': 0,
        'speedIn': 250,
        'speedOut': 250,
        'titleShow': false,
        'scrolling': 'no',
        'overlayColor': '#000'
    });

    /* ---- =SELECTORS --*/
    lb=$("#primary-nav > li");
    if(lb) lb.addClass("firstLevel");
    lb=$(".inline > li:first"); if(lb) lb.addClass("inliner");
    lb = $(".list-wide > li:nth-child(2n)")
            if(lb) lb.addClass("mr0");
    lb=$("#paymentInfo tr:nth-child(even)"); if(lb) lb.addClass("alt");
    lb=$("#payment tr:nth-child(even)"); if(lb) lb.addClass("alt");
    lb=$("#banner p:first"); if(lb) lb.addClass("upper");
    lb=$("#banner p:nth-child(2)"); if(lb) lb.addClass("par");

    lb=$("#bwrapper table tbody tr"); if(lb) lb.each(function () {
        $(this).children("td:first").addClass("cell");
    });

    lb=$(".cb tr"); if(lb) lb.each(function () {
        $(this).children("td:first").addClass("check");
    });

    //$("#main table div:nth-child(1)").addClass("shot-git");
    //$("#main table div#lastUpdateMessage, #main table div#paymentInfo").removeClass("shot-git");

    /* ---- =HOVERS --*/

    lb=$(".input"); if(lb) lb.hover(function () {
        $(this).toggleClass("input-hover");
    });

    lb=$("#primary-nav > li > a"); if(lb) lb.mouseenter(function () {

        lb=$("#primary-nav li > a"); if(lb) lb.removeClass("open");
        lb=$("#primary-nav li ul"); if(lb) lb.hide();

        $(this).addClass("open");
        $(this).next("ul").show();

    });

    lb=$("#primary-nav"); if(lb) lb.mouseleave(function () {

        lb=$("#primary-nav li > a"); if(lb) lb.removeClass("open");
        lb=$("#primary-nav li ul"); if(lb) lb.hide();

    });

});