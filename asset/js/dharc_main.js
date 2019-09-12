
var PAGE_ITEM = "../item";

$(document).ready(function() {
        /*Dynamic Blocks to add*/
        $("<div class='item-showcase-title'><a href='"+PAGE_ITEM+"'>The Digital Library items &#10509;</a><div>" ).insertBefore( "div .item-showcase" );

        console.log($(".item-img"));
        console.log(String(window.location.href));

        $(".item-img").wrap("<a href='"+String(window.location.href)+"/view.html'></a>");

});

function init_view(){
  $("body").html("");
  $("body").addClass("view-mirador");
  //mirador css
  $("body").append('<link href="/modules/Mirador/asset/vendor/mirador/css/mirador-combined.min.css?v=3.1.1" media="screen" rel="stylesheet" type="text/css">');
  $("body").append('<link href="/modules/Mirador/asset/css/mirador.css?v=3.1.1" media="screen" rel="stylesheet" type="text/css">');
  //mirador js
  $("body").append('<script type="text/javascript" src="/modules/Mirador/asset/vendor/mirador/mirador.min.js?v=3.1.1"></script>');
  $("body").append('<script type="text/javascript">$(function() {Mirador({ "id": "mirador-view",      "buildPath": "/modules/Mirador/asset/vendor/mirador/",      "locale": "en_US",      "data": [          {              "manifestUri": "http://137.204.168.8/iiif/545/manifest"          }      ],      "windowObjects": [          {              "loadedManifest": "http://137.204.168.8/iiif/545/manifest"          }      ]  });  });  </script>');
  $("body").append('<div id="mirador-view" class="mirador viewer"></div>');
}
