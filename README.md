1. Select File (click or drag and drop)
2. Get file type (image or video) and validate size, mime, etc.
3. Make request to Rails for pre-signed S3 url and create Image object for S3 key
4. Create a preview in the browser and upload to S3
5. Update image in browser and post to Rails with S3 Location


ENV variables
aws_bucket


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
