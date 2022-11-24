// asset/js/dharc_main.js

// define global vars
var PAGE_ITEM = "../item";

var BASE_HOSTNAME = location.hostname; //i.e. dl.domain.org
var BASE_HREF = location.href; //i.e. https://dl.domain.org/item/1

var BASE_ARRAY = BASE_HREF.split(BASE_HOSTNAME);
var BASE_DIRS = BASE_ARRAY[1].split("/");
var k = BASE_DIRS.length - 2;

var BASE_PATH = "/";
var PAGE = "";
for (i = 1; i < k ; i++) {
  PAGE = PAGE+BASE_DIRS[i]+"/";
  if (i == 1 && BASE_DIRS[i] != "s") var BASE_PATH = "/"+BASE_DIRS[i]+"/";
}
PAGE = "/"+PAGE+"page/";

var BASE_URL = location.protocol+"//"+BASE_HOSTNAME; //i.e. https://dl.domain.org
var BASE_PAGE = BASE_URL+PAGE; // BASE_URL+"s/digital-library/page/" i.e. https://dl.domain.org/page/
var BASE_IIIF = BASE_URL+BASE_PATH+"iiif/"; //i.e. https://dl.domain.org/iiif/
var BASE_API = BASE_URL+BASE_PATH+"api/"; //i.e. https://dl.domain.org/api/


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var imgnum = urlParams.get('imgnum'); //get number of first page
if (imgnum > 0) { imgnum = imgnum - 1; } 
   else { imgnum = 0; };


$(document).ready(function() {
  $("<div class='item-showcase-title'><a href='"+PAGE_ITEM+"'>The Digital Library items</a><div>" ).insertBefore( "div .item-showcase" );
});


function init_export_item_link() {
  var request_url = window.location.href;
  var url_parts = request_url.split("/");
  var item_id = url_parts[url_parts.length - 1];

  $('.item-export').prepend('<img class="item-iiif-img" />');
  $(".item-iiif-img").wrap("<a href='"+BASE_IIIF+item_id+"/manifest'></a>");

  $('.item-export').append('<img class="item-json-img" />');
  $(".item-json-img").wrap("<a href='"+BASE_API+"items/"+item_id+"'></a>");

  //$('.item-metadata').append('<div class="property" id="IIIF-manifest"/>');
  //$('#IIIF-manifest').append('<h4>IIIF Manifest</h4><div class="values" id="IIIF-values">');
  //$('#IIIF-values').append('<div class="value uri" id="IIIF-value">');
  //$('#IIIF-value').append('<a class="url-value-link" href="'+BASE_IIIF+item_id+'" target="_blank">'+BASE_IIIF+item_id+'</a>');
}

function init_mirador_item_link() {
  var request_url = window.location.href;
  var url_parts = request_url.split("/");
  var item_id = url_parts[url_parts.length - 1];

  $(".item-img").wrap("<a href='"+BASE_PAGE+"view"+"?id="+item_id+"&type=item'></a>");

  $(".item-view-button").attr("href", BASE_PAGE+"view"+"?id="+item_id+"&type=item");
}

function init_mirador_config() {
  var request_url = window.location.href;
  const regex = /\?id=(.{0,})&type=(\w{0,})/;
  let m;
  var mirador_item_id = -1;
  var mirador_type = -1;
  if ((m = regex.exec(request_url)) !== null) {
      // The result can be accessed through the m-variable.
      m.forEach((match, groupIndex) => {
        //console.log(Found match, group ${groupIndex}: ${match});
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
  /* MIRADOR v3.1
  var miradorConfig = {
        "id": "mirador-view",
        "buildPath": BASE_PATH+"modules/Mirador/asset/vendor/mirador/",
        "locale": "en_US"
  };
  return Object.assign(miradorConfig, mirador_item_obj);
  */

  /* Config MIRADOR v3.3.7.8*/
  var miradorConfig = {
        id: 'mirador-view',
	language: "",
	//selectedTheme: "dark",
	//themes: { dark: { palette: { type: 'dark', primary: { main: '#ff8080', }, }, }, },
        workspace: {
	    showZoomControls: true,
            type: 'mosaic', // Which workspace type to load by default. Other possible values are "elastic"
        },
	window: {
            allowClose: false, // Prevent the user from closing this window
            //allowMaximize: false,
            //defaultSideBarPanel: 'info',
            //sideBarOpenByDefault: true,
            views: [ // Only allow the user to select single and gallery view
              { key: 'single' }, //'single' , 'book' , 'scroll' , 'gallery'
              { key: 'gallery' },
	      { key: 'book' }
            ]
        },
        windows: [{
	    manifestId: BASE_IIIF+mirador_item_id+'/manifest',
	    canvasIndex: imgnum
	}],
        thumbnailNavigation: {
            defaultPosition: 'far-bottom', // Which position for the thumbnail navigation to be be displayed. Other possible values are "far-bottom" or "far-right"
            displaySettings: true, // Display the settings for this in WindowTopMenu
            height: 130, // height of entire ThumbnailNavigation area when position is "far-bottom"
            width: 100, // width of one canvas (doubled for book view) in ThumbnailNavigation area when position is "far-right"
        },
  };
  return JSON.stringify(miradorConfig)
}

function init_view(){

  /* MIRADOR v3.1*/
  //let MIRADOR_CONFIG = init_mirador_config();

  /* MIRADOR v3.3.7.8*/
  var miradorConfig_str = init_mirador_config();

  $("body").html("");
  $("body").addClass("view-mirador");
  //mirador css
  $("body").append('<link href="'+BASE_PATH+'modules/Mirador/asset/css/mirador.css?v=3.3.7.8" media="screen" rel="stylesheet" type="text/css">');

  //mirador js
  $("body").append('<script type="text/javascript" src="'+BASE_PATH+'modules/Mirador/asset/vendor/mirador/mirador.min.js?v=3.3.7.8"></script>');
  $("body").append('<script type="text/javascript" src="'+BASE_PATH+'modules/Mirador/asset/js/mirador.js?v=3.3.7.8"></script>');
  $("body").append('<script type="text/javascript"> var miradorConfig = '+miradorConfig_str+';</script>')

  //$("body").append('<script type="text/javascript">$(function() {Mirador('+JSON.stringify(MIRADOR_CONFIG)+');  });  </script>');
  $("body").append('<div id="mirador-view" class="mirador viewer"></div>');
}
