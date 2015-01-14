class ImageController < ApplicationController
  require 'openssl'
  require 'securerandom'


  def index
    @images = Image.order("id")
  end

  def create
  end

  def delete
  end

  def upload
    @image = Image.create()

    extension = File.extname(params[:filename]).gsub(/^\.+/, '')
    filename = File.basename(params[:filename], ".#{extension}").parameterize
    safe_filename = "#{filename}.#{extension}"

    render json: {
      image: @image,
      policy: s3_upload_policy_document(params[:mime]),
      signature: s3_upload_signature(params[:mime]),
      key: "page/#{@id}/#{safe_filename}",
      success_action_redirect: "/"
    }
  end



  private

  # generate the policy document that amazon is expecting.
  def s3_upload_policy_document(mime)
    Base64.encode64(
      {
        expiration: 30.minutes.from_now.utc.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        conditions: [
          { bucket: ENV['S3_BUCKET'] },
          { acl: 'public-read' },
          ["starts-with", "$key", ""],
          { success_action_status: '201' },
          { "Content-Type" => mime }
        ]
      }.to_json
    ).gsub(/\n|\r/, '')
  end

  # sign our request by Base64 encoding the policy document.
  def s3_upload_signature(mime)
    Base64.encode64(
      OpenSSL::HMAC.digest(
        OpenSSL::Digest::Digest.new('sha1'),
        ENV['AWS_SECRET'],
        s3_upload_policy_document(mime)
      )
    ).gsub(/\n/, '')
  end
end
