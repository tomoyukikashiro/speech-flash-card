FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "test-user#{i}" }
    email { |attrs| "#{attrs[:name].parameterize}@example.com" }
    password "foobar"
    password_confirmation "foobar"
  end
end
