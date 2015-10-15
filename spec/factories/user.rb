FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "test-user#{i}" }
    sequence(:oauth_token) { |i| "token#{i}" }
  end
end
