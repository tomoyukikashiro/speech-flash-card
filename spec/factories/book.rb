FactoryGirl.define do
  factory :book do
    sequence(:name) { |i| "name#{i}" }
    after(:create) do |book|
      1.times { create(:card, book: book) }
    end
  end
end
