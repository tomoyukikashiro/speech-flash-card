require 'rails_helper'

RSpec.describe User, :type => :model do
  before do
    @user = User.create(name: "Example User", oauth_token: "token")
  end

  it "user has properties" do
    expect(@user).to respond_to(:name)
    expect(@user).to respond_to(:oauth_token)
    expect(@user).to respond_to(:remember_token)
    expect(@user.valid?).to be_truthy
  end

  # ------------------------------
  # books
  # ------------------------------
  context "validation" do
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
  # delete book
  # ------------------------------
  context "if a user is deleted" do
    it "book instance the book has are deleted too" do
      @user.books.create(name: "test")
      expect(User.where(id: @user.id).size).to eq(1)
      expect(Book.where(id: @user.books.first.id).size).to eq(1)
      @user.destroy
      expect(User.where(id: @user.id).size).to eq(0)
      expect(Book.where(id: @user.books.first.id).size).to eq(0)
    end
  end


  # ------------------------------
  # name
  # ------------------------------
  it "when is too long" do
    @user.name = "a" * 51
    expect(@user.valid?).to be_falsey
  end

  # ------------------------------
  # remember_token
  # ------------------------------
  it "remember_token" do
    @user.save
    expect(@user.remember_token).not_to be_blank
  end
end
