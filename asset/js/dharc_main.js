
var PAGE_ITEM = "../item";

var BASE_PATH = "/";
var BASE_URL = "http://137.204.168.8"+BASE_PATH
var BASE_PAGE = BASE_URL+"s/digital-library/page/";
var BASE_IIIF = BASE_URL+"iiif/";

$(document).ready(function() {
        $("<div class='item-showcase-title'><a href='"+PAGE_ITEM+"'>The Digital Library items &#10509;</a><div>" ).insertBefore( "div .item-showcase" );
});


function init_mirador_item_link() {
  var request_url = window.location.href;
  var url_parts = request_url.split("/");
  var item_id = url_parts[url_parts.length - 1];
  $(".item-img").wrap("<a href='"+BASE_PAGE+"view"+"?id="+item_id+"&type=item'></a>");

  $(".item-view-button").attr("href", BASE_PAGE+"view"+"?id="+item_id+"&type=item");
  
  $('.item-iiif').prepend('<img class="item-iiif-img" />');
  $(".item-iiif-img").wrap("<a href='"+BASE_IIIF+item_id+"/manifest'></a>");

}

function init_mirador_config() {
  var request_url = window.location.href;
  const regex = /\?id=(.{0,})&type=(\w{0,})/;
  let m;
  var mirador_item_id = -1;
  var mirador_type = -1;
  if ((m = regex.exec(request_url)) !== null) {
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        //console.log(`Found match, group ${groupIndex}: ${match}`);
        if (groupIndex == 1) {
          mirador_item_id = match;
        }
        if (groupIndex == 2) {
          mirador_type = match;
        }
      });
  }

  var mirador_browser = "";
  var url_suf = "";
  var mirador_item_obj = {"data": []}

  if (mirador_type == "item") {
    mirador_browser = mirador_item_id+"/manifest";
    mirador_item_obj["data"].push({"manifestUri": BASE_IIIF+mirador_browser});
    mirador_item_obj["windowObjects"] = [{"loadedManifest": BASE_IIIF+mirador_browser}];
    url_suf = "?id="+mirador_item_id+"&type=item";
  }
  else if (mirador_type == "collection") {
    mirador_item_obj["data"].push({"collectionUri": BASE_IIIF+"collection/"+mirador_item_id+","});
    mirador_item_obj["openManifestsPage"] = true;
    url_suf = "?id="+mirador_item_id+"&type=collection";
  }
  var mirador_config = {
        "id": "mirador-view",
        "buildPath": BASE_PATH+"modules/Mirador/asset/vendor/mirador/",
        "locale": "en_US"
  };
  return Object.assign(mirador_config, mirador_item_obj);
}

function init_view(){
  let MIRADOR_CONFIG = init_mirador_config();
  $("body").html("");
  $("body").addClass("view-mirador");
  //mirador css
  $("body").append('<link href="'+BASE_PATH+'modules/Mirador/asset/vendor/mirador/css/mirador-combined.min.css?v=3.1.1" media="screen" rel="stylesheet" type="text/css">');
  $("body").append('<link href="'+BASE_PATH+'modules/Mirador/asset/css/mirador.css?v=3.1.1" media="screen" rel="stylesheet" type="text/css">');
  //mirador js
  $("body").append('<script type="text/javascript" src="'+BASE_PATH+'modules/Mirador/asset/vendor/mirador/mirador.min.js?v=3.1.1"></script>');
  $("body").append('<script type="text/javascript">$(function() {Mirador('+JSON.stringify(MIRADOR_CONFIG)+');  });  </script>');
  $("body").append('<div id="mirador-view" class="mirador viewer"></div>');
}
