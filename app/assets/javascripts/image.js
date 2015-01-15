var Image = function(file){
  var self = Object.create(Image.prototype);

  // private variables
  var _file = file;

  var $placeholder;
  var $thumb;


  // public variables
  self.sizeLimit = 1000000; // 1mb
  self.getAPI = "api/v1/image-get";
  self.postAPI = "api/v1/image-post"


  //
  var createPlaceholder = function(img){

  };


  //
  var setPlaceholder = function(img) {
    $placeholder.find("img").css({
      "-webkit-filter": "brightness(1.0)",
      "filter": "brightness(1.0)"
    }).attr("src", img);
    $placeholder.find(".loader").remove();
  };



  // --------------------------
  //  Public Methods
  // --------------------------


  self.startUpload = function(){
    createPlaceholder();
  };


  self.progress = function(){

  };


  self.finishUpload = function(img){
    console.log("alll done");
    //setPlaceholder(img);
  };






  return self;
};