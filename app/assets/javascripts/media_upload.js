$(function(){


  //--------------------------------
  // Selector options
  //--------------------------------

  var $box = $(".uploader");

  $box.on("dragover", function(e){ e.preventDefault();e.stopPropagation();$box.addClass("hover"); });
  $box.on("dragenter", function(e){ e.preventDefault();e.stopPropagation(); });
  $box.on("drop", function(e){
    e.preventDefault();
    e.stopPropagation();
    $box.removeClass("hover");

    var selectedFile = e.originalEvent.dataTransfer.files[0];
    selectUploadType(selectedFile);
  });

  $box.click(function(e){
    e.preventDefault();

    // create <input> file
    var $fileSelector = $("<input type='file' />");

    // invoke file selector
    $fileSelector.click();

    $fileSelector.on("change", function(){
      var selectedFile = $(this)[0].files[0];
      selectUploadType(selectedFile);
    });
  });





  // Used to determine whether uploading a
  // video or image in the drag & drop area
  var selectUploadType = function(file){
    var fileType = getFileType(file);

    if (fileType === "video"){
      uploaderVideo(file);
    } else if (fileType === "image") {
      uploaderImage(file);
    } else {
      alert("Oops, we don't support that media type");
    };
  };



  var uploaderImage = function(file){
    var uploader = Uploader();

    // give the uploader the actual file
    uploader.setFile(file);
    uploader.setKey("image");
    uploader.setUploadType("image");

    uploader.upload();
  };


  var uploaderVideo = function(file){



  };



  //--------------------------------
  // Helpers
  //--------------------------------

  // helper method
  var getFileType = function(file){
    return file.type.split('/')[0];
  };



});