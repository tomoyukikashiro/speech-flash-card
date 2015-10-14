FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "test-user#{i}" }
    email { |attrs| "#{attrs[:name].parameterize}@example.com" }
    sequence(:oauth_token) { |i| "token#{i}" }
  end
end
