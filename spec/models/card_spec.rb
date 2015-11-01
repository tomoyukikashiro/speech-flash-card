require 'rails_helper'

RSpec.describe Card, :type => :model do

  before do
    @card = FactoryGirl.create(:card)
  end

  it "has properties" do
    expect(@card).to respond_to(:text)
    expect(@card).to respond_to(:note)
    expect(@card.valid?).to be_truthy
  end

  # ------------------------------
  # text
  # ------------------------------
  describe "text property" do
    describe "when text is not present" do
      it " instance is invalid" do
        @card.text = ""
        expect(@card.valid?).to be_falsey
      end
    end
    describe "when text is too long" do
      it " instance is invalid" do
        @card.text = "a" * 101
        expect(@card.valid?).to be_falsey
      end
    end
  end

  # ------------------------------
  # note
  # ------------------------------
  describe "note property" do
    describe "when note is not present" do
      it " instance is valid" do
        @card.note = ""
        expect(@card.valid?).to be_truthy
      end
    end
    describe "when note is too long" do
      it " instance is invalid" do
        @card.note = "a" * 101
        expect(@card.valid?).to be_falsey
      end
    end
  end

  # ------------------------------
  # max size of card
  # ------------------------------
  context "max size validation" do
    before {@book = FactoryGirl.create(:book)}
    it "user can set cards up to 50 in book" do
      50.times do
        @book.cards.create(text: "test")
      end
      expect(@book.valid?).to be_truthy
    end
    it "user can not set cards greater than 51 books" do
      51.times do
        @book.cards.create(text: "test")
      end
      expect(@book.valid?).to be_falsey
    end
  end

  # ------------------------------
  # #get_data
  # ------------------------------
  describe "#get_data" do
    it "return data" do
      card = FactoryGirl.create(:card)
      expect(card.get_data).to eq({id: card.id.to_s, text: card.text, note: card.note})
    end
  end

  # ------------------------------
  # #self.get_all
  # ------------------------------
  describe "#self.get_all" do
    context "book contains a card" do
      before {@book = FactoryGirl.create(:book_with_card)}
      it "return data" do
        expect(Card.get_all(@book)).to eq([{
          id: @book.cards.first.id.to_s,
          text: @book.cards.first.text,
          note: @book.cards.first.note
        }])
      end
    end
    context "book dose not contain any card" do
      before {@book = FactoryGirl.create(:book)}
      it "return empty array" do
        expect(Card.get_all(@book)).to eq([])
      end
    end
  end

end
