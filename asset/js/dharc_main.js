
var PAGE_ITEM = "../item";

$(document).ready(function() {
        /*Dynamic Blocks to add*/
        $("<div class='item-showcase-title'><a href='"+PAGE_ITEM+"'>The Digital Library items &#10509;</a><div>" ).insertBefore( "div .item-showcase" );

        $("<a href='"+PAGE_ITEM+"/view'>").insertBefore( ".item-img");
        $("</a>").insertAfter( ".item-img");

        $("HIII").insertAfter( "body");
});
