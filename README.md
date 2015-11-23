
##How it works
1. Select File (click custom button or drag-and-drop)
2. Get file type (image or video) and validate size, mime, etc.
3. Make request to Rails for pre-signed S3 url with filename as the S3 key
4. Create a preview in the browser and upload to S3
5. Update image in browser and post to Rails with S3 Location and create an Image instance


##Settings
####ENV variables
```yaml
AWS_KEY: KEY
AWS_SECRET: SECRET
S3_BUCKET: BUCKET
```

####API routes
In app/assets/javascripts/Image.js
```js
self.getAPI = "api/v1/image-get";
self.postAPI = "api/v1/image-post";
```
In config/routes.rb
```ruby
namespace :api do
  namespace :v1 do
    get 'image-get', to: "image#create"
    post 'image-post', to: "image#update"
  end
end
```

####JS options
In app/assets/javascripts/Image.js
```js
self.sizeLimit = 1000000; // 1mb
```

####S3 bucket CORS configuration
Login to AWS management console. Go to your S3 Bucket and click *Properties*. Select *Permissions* and  *Add CORS Configuration* then paste the xml below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

####Rails will complain that ajax request doesn't pass CSRF
Add to bottom of application.js (or admin.js if different template)
```js
// For ajax request need to pass CSRF
$(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});
```
