// Abstract class used for uploading
// files to S3

var Uploader = function(saver){
  var self = Object.create(Uploader.prototype);

  var _file; // actual file
  var _uploadType; // specific media JS Object
  var _key; // S3 key ie: image/123/image.jpg


  // getType
  var getMimeType = function(){
    return _file.type;
  };


  // checkFilesize
  var checkFileSize = function(){
    return (_file.size <= _uploadType.sizeLimit) ? true : false;
  };


  var formatBytes = function(bytes){
    return (bytes/1000000).toFixed(1) + 'mb';
  };



  // --------------------------
  //  Public Methods
  // --------------------------


  // setFile
  self.setFile = function(file){
    _file = file;
  };


  // Rails parent model: Project or User
  self.setKey = function(key){
    _key = key;
  };


  // Determine whether it's an image or video
  self.getFileType = function(){
    var typeCheck = _file.type.split('/')[0];
    if (typeCheck === "image" || typeCheck === "video"){
      return typeCheck;
    } else {
      return undefined;
    };
  };


  // figure out upload object
  // ProjectImage, ProjectHeader, UserAvatar, etc
  self.setUploadType = function(uploadType){
    if (uploadType === "image"){
      _uploadType = new UploaderProjectImage(_file, saver);
    };
  };


  // createDBObject
  self.upload = function(){
    var mime = getMimeType();
    if (checkFileSize()){
      _uploadType.startUpload(_key, mime);
      _uploadType.disableUI();
    } else {
      saver.finish();
      var size = formatBytes(_uploadType.sizeLimit);
      var msg = "Oops, we don't support media larger than " + size;
      alert(msg);
    };
  };



  return self;
};

