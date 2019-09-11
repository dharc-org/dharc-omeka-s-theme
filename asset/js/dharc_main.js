
var PAGE_ITEM = "../item";

$(document).ready(function() {
        /*Dynamic Blocks to add*/
        $("<div class='item-showcase-title'><a href='"+PAGE_ITEM+"'>The Digital Library items &#10509;</a><div>" ).insertBefore( "div .item-showcase" );

        console.log($(".item-img"));
        console.log(String(window.location.href));

        $(".item-img").wrap("<a href='"+String(window.location.href)+"/view.html'></a>");

});

});
