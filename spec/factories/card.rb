FactoryGirl.define do
  factory :card do
    sequence(:text) { |i| "text#{i}" }
    sequence(:note) { |i| "note#{i}" }
  end
end
