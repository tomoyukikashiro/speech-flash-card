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

end
