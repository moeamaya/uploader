var Image = function(){
  var self = Object.create(Image.prototype);

  // private variables
  var _file = file;
  var _project;
  var _form = new FormData();

  var $placeholder;
  var $thumb;
  var aws_bucket = "https://moeamaya.s3.amazonaws.com/";


  // public variables
  self.sizeLimit = 10000000; // 10mb


  // createDBObject
  var getSignature = function(project, mime){
    $.ajax({
      url: "/api/v1/image",
      type: 'GET',
      dataType: 'json',
      data: {project: project, mime: mime, filename: _file.name}, // send the file name to the server so it can generate the key param
      success: function(data) {
        _form.append("key", data.key);
        _form.append("AWSAccessKeyId", "<%= ENV['AWS_KEY'] %>");
        _form.append("Content-Type", mime);
        _form.append("acl", "public-read");
        _form.append("policy", data.policy);
        _form.append("signature", data.signature);
        _form.append("success_action_status", "201");
        _form.append("file", _file);

        _page = data.page;

        // let's fire that damn thing
        createPreview();
        uploadS3();
      }
    });
  };


  var createPlaceholder = function(img){

  };


  var uploadS3 = function(){
    var xhr = new XMLHttpRequest();

    // TODO
    // update to show a progress bar
    //
    // xhr.upload.addEventListener('progress', function(e){
    //   var percent = Math.round((e.loaded / e.total) * 100);
    //   $('.bar').css('width', percent + '%');
    // });

    xhr.onreadystatechange = function(){
      if (xhr.readyState==4) {
        var xml = $.parseXML(xhr.responseText);
        var $xml = $(xml);
        var url = $xml.find("Location").text();

        updateDBObject(url);
      }
    }

    xhr.open('POST', aws_bucket, true); //MUST BE LAST LINE BEFORE YOU SEND
    xhr.send(_form);
  };



  //
  var setPlaceholder = function(img) {
    $placeholder.find("img").css({
      "-webkit-filter": "brightness(1.0)",
      "filter": "brightness(1.0)"
    }).attr("src", img);
    $placeholder.find(".loader").remove();
  };



  // updateDBObject
  var updateDBObject = function(url){
    var data = {"id": _page, "image_url": url}
    $.post("/ajax/image", data, function(){
      setThumb(url);
      setPlaceholder(url);
      saver.finish();
    });
  };

  return self;
};