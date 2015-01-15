module Api
  module V1
    class ImageController < ApplicationController
      require 'openssl'
      require 'securerandom'
      require 'uri'

      respond_to :json


      def create
        key = "media/#{SecureRandom.uuid}/" + safe_filename(params[:filename])

        render json: {
          policy: s3_upload_policy_document(params[:mime]),
          signature: s3_upload_signature(params[:mime]),
          key: key,
          success_action_redirect: "/"
        }
      end


      def update
        url = URI.decode(params[:url])
        @image = Image.create(url: url)

        render json: {
          image: @image
        }
      end



      private


      def safe_filename(filename)
        extension = File.extname(filename).gsub(/^\.+/, '')
        filename = File.basename(filename, ".#{extension}").parameterize
        return "#{filename}.#{extension}"
      end


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
  end
end