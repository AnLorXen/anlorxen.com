
var Gallery = function () {
  "use strict";

  var
    initPage, bindEvents,
    cfMap, docMap, stateMap, 
    handleResize;

  cfMap = {
    "images": [
      {
        "path": "gallery/img/test_800.jpg",
        "width": 800,
        "height": 600
      }
    ]
  };

  docMap = {
    "gallery": document.getElementsByClassName("gallery")[0], 
    "galleryLeft": document.getElementsByClassName("gallery-left")[0],
    "galleryRight": document.getElementsByClassName("gallery-right")[0],
    "current": document.getElementsByClassName("gallery-center")[0],
    "currentImg": document.getElementById("gallery-center-img"), 
    "thumbs": document.getElementsByClassName("thumbs")[0]
  };

  stateMap = {
    "maxHeight": 0,
    "maxWidth": 0,
    "srcHeight": 0,
    "srcWidth": 0,
    "srcRatio": 0
  };



  handleResize = function () {

    //console.log(
    //  "docMap.current (w h): ",
    //  docMap.current.clientWidth, // good
    //  docMap.current.clientHeight
    //);
    //console.log(
    //  "window.inner(dim) (w h): ",
    //  window.innerWidth,
    //  window.innerHeight
    //);


    stateMap.maxWidth = docMap.current.clientWidth;
    stateMap.maxHeight = window.innerHeight - docMap.thumbs.clientHeight;

    stateMap.srcWidth = 800;// docMap.currentImg.width; // docMap.currentImg.clientWidth
    stateMap.srcHeight = 600;// docMap.currentImg.height;// docMap.currentImg.clientHeight

    stateMap.srcRatio = Math.min(
      stateMap.maxWidth / stateMap.srcWidth,
      stateMap.maxHeight / stateMap.srcHeight
    );


    //docMap.galleryLeft.height = stateMap.srcHeight * stateMap.srcRatio;
    //docMap.galleryRight.height = stateMap.srcHeight * stateMap.srcRatio;


    docMap.currentImg.height = stateMap.srcHeight * stateMap.srcRatio;
    docMap.currentImg.width = stateMap.srcWidth * stateMap.srcRatio;


    docMap.current.style.left =
      (window.innerWidth / 2) - (docMap.currentImg.width / 2) + "px";



  };

  bindEvents = function () {
    window.addEventListener("resize", function () {
      handleResize();
    });
  };

  initPage = function () {


    docMap.currentImg.src = "gallery/img/test_800.jpg";
    docMap.currentImg.addEventListener("load", function () {

      console.log(
        "docMap.current.adj (w h): ",
        docMap.current.clientWidth,
        window.innerHeight - docMap.thumbs.clientHeight
      );

      console.log(
        "docMap.currentImg (w h): ",
        docMap.currentImg.clientWidth,
        docMap.currentImg.clientHeight
      );

      handleResize();
      //console.log(stateMap);
    });



    bindEvents();
    

  };

  initPage();

};


window.addEventListener("load", function () {
  Gallery();
});





// ***

//http://www.photo-mark.com/notes/image-preloading/

//function preload(imageArray, index) {
//  index = index || 0;
//  if (imageArray && imageArray.length > index) {
//    var img = new Image ();
//    img.onload = function() {
//      preload(imageArray, index + 1);
//    }
//    img.src = images[index][‘serving_url’];
//  }
//}
//  /* images is an array with image metadata */
//  preload(images);


// ***


//http://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio

// * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
// * images to fit into a certain area.
// *
// * @param {Number} srcWidth Source area width
// * @param {Number} srcHeight Source area height
// * @param {Number} maxWidth Fittable area maximum available width
// * @param {Number} maxHeight Fittable area maximum available height
// * @return {Object} { width, heigth }
// */
//function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

//  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

//  return { width: srcWidth * ratio, height: srcHeight * ratio };
//}


// ***


//http://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery

//  var folder = "images/";

//$.ajax({
//  url: folder,
//  success: function (data) {
//    $(data).find("a").attr("href", function (i, val) {
//      if (val.match(/\.jpg|\.png|\.gif/)) {
//        $("body").append("<img src='" + folder + val + "'>");
//      }
//    });
//  }
//});


// ***







