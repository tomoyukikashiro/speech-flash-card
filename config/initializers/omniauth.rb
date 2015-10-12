OmniAuth.config.logger = Rails.logger

OmniAuth.config.on_failure = SessionsController.action(:oauth_failure)

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV["FACEBOOK_APP_ID"], ENV["FACEBOOK_APP_SECRET"],
           {scope: "email", info_fields: "name, email"}
  provider :twitter, ENV["TWITTER_CONSUMER_KEY"], ENV["TWITTER_CONSUMER_SECRET"],
    {secure_image_url: 'true', image_size: 'original', authorize_params: {force_login: 'true'}}
end
