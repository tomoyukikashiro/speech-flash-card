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
  # max size of book
  # ------------------------------
  context "max size validation" do
    before {@user = FactoryGirl.create(:user)}
    it "user can set book up to 20 books" do
      20.times do
        @user.books.create(name: "test")
      end
      expect(@user.valid?).to be_truthy
    end
    it "user can not set book greater than 21 books" do
      21.times do
        @user.books.create(name: "test")
      end
      expect(@user.valid?).to be_falsey
    end
  end

  # ------------------------------
  # #get_data
  # ------------------------------
  describe "#get_data" do
    context "if book contains card" do
      before {@book = FactoryGirl.create(:book)}
      it "return data" do
        expect(@book.get_data).to eq({
          id: @book.id.to_s,
          name: @book.name,
          first_card_id: "",
          voices: Book::Voices.get_all(@book)
        })
      end
    end
    context "if book dose not contain card" do
      before {@book = FactoryGirl.create(:book_with_card)}
      it "return data" do
        expect(@book.get_data).to eq({
          id: @book.id.to_s,
          name: @book.name,
          first_card_id: @book.cards.first.id.to_s,
          voices: Book::Voices.get_all(@book)
        })
      end
    end
  end

  # ------------------------------
  # #self.get_all
  # ------------------------------
  describe "#self.get_all" do
    context "user has a book" do
      before do
        @user = FactoryGirl.create(:user)
        @book = FactoryGirl.create(:book_with_card, user: @user)
      end
      it "return all data" do
        expect(Book.get_all(@user)).to eq([{
          id: @book.id.to_s,
          name: @book.name,
          first_card_id: @book.cards.first.id.to_s,
          voices: Book::Voices.get_all(@book)
        }])
      end
    end
    context "user dose not have a book" do
      before do
        @user = FactoryGirl.create(:user)
      end
      it "return empty array" do
        expect(Book.get_all(@user)).to eq([])
      end
    end
  end
end
