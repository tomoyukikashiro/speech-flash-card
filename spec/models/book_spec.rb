require 'rails_helper'

RSpec.describe Book, :type => :model do

  before do
    @book = FactoryGirl.create(:book)
  end

  it "has properties" do
    expect(@book).to respond_to(:name)
    expect(@book).to respond_to(:cards)
    expect(@book.valid?).to be_truthy
  end

  # ------------------------------
  # name
  # ------------------------------
  describe "name property" do
    describe "when name is not present" do
      it " instance is invalid" do
        @book.name = ""
        expect(@book.valid?).to be_falsey
      end
    end
    describe "when name is too long" do
      it " instance is invalid" do
        @book.name = "a" * 21
        expect(@book.valid?).to be_falsey
      end
    end
  end

  # ------------------------------
  # cards
  # ------------------------------
  describe "cards property" do
    it "can set card instance" do
      expect(Book.where(id: @book.id).first.cards.size).to eq(1)
      card = @book.cards.new(text: "test", note: "test")
      # increase in memory
      expect(@book.cards.size).to eq(2)
      # do not increase in db
      expect(Book.where(id: @book.id).first.cards.size).to eq(1)
      card.save!
      # increase in db
      expect(Book.where(id: @book.id).first.cards.size).to eq(2)
    end
  end

end
