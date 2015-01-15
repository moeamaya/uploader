$(function(){


  //--------------------------------
  // Selector options
  //--------------------------------

  var $box = $(".uploader");

  // Drag and Drop
  $box.on("dragenter", function(e){ e.preventDefault();e.stopPropagation();$box.addClass("over"); });
  $box.on("dragleave", function(e){ e.preventDefault();e.stopPropagation();$box.removeClass("over"); });
  $box.on("drop", function(e){
    e.preventDefault();
    e.stopPropagation();
    $box.removeClass("over");

    var selectedFile = e.originalEvent.dataTransfer.files[0];
    selectUploadType(selectedFile);
  });

  // Click
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



  //--------------------------------
  // Create an uploader
  //--------------------------------


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
    var uploader = Uploader(file);

    // Set what type of image we're uploading
    uploader.setUploadType("Image");

    uploader.upload();
  };


  var uploaderVideo = function(file){
    // upload a video
  };




  //--------------------------------
  // Helper methods
  //--------------------------------


  // splits mime type to return media type
  var getFileType = function(file){
    return file.type.split('/')[0];
  };



});