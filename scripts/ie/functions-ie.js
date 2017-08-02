/* ---- =JQUERY --*/

$(function () {
    var lb = $('#primary-nav a');
    if(lb) lb.corner({

        tl: { radius: 8 }, tr: { radius: 8 }, bl: { radius: 0 }, br: { radius: 0 }, antiAlias: true

    });

});