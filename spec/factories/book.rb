FactoryGirl.define do
  factory :book do
    sequence(:name) { |i| "name#{i}" }
    voices [
      {os: "mac", browser: "chrome", type: "Google US English" }
    ]
  end
end
FactoryGirl.define do
  factory :book_with_card, class: Book do
    sequence(:name) { |i| "name#{i}" }
    voices [
      {os: "mac", browser: "chrome", type: "Google US English" }
    ]
    after(:create) do |book|
      1.times { create(:card, book: book) }
    end
  end
end
