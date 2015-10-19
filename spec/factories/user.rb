FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "test-user#{i}" }
    sequence(:screen_name) { |i| "test-user#{i}" }
    sequence(:image_path) { |i| "image_path-#{i}" }
    sequence(:uid) { |i| "uid#{i}" }
    provider "facebook"
    sequence(:oauth_token) { |i| "token#{i}" }
    oauth_expires_at Date.new + 30.days
  end
end
