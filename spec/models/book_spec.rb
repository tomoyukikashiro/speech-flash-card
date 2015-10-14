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
  # card
  # ------------------------------
  context "validation" do
    it "user can set card up to 100 in book" do
      20.times do
        @book.cards.create(text: "test")
      end
      expect(@book.valid?).to be_truthy
    end
    it "user can not set book greater than 21 books" do
      51.times do
        @book.cards.create(text: "test")
      end
      expect(@book.valid?).to be_falsey
    end
  end

  # ------------------------------
  # delete card
  # ------------------------------
  context "if a book is deleted" do
    it "cards instance the book has are deleted too" do
      book = FactoryGirl.create(:book_with_card)
      expect(Book.where(id: book.id).size).to eq(1)
      expect(Card.where(id: book.cards.first.id).size).to eq(1)
      book.destroy
      expect(Book.where(id: book.id).size).to eq(0)
      expect(Card.where(id: book.cards.first.id).size).to eq(0)
    end
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
      @book.cards.create(text: "text", note: "note");
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
