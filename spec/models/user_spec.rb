require 'rails_helper'

RSpec.describe User, :type => :model do
  before do
    @user = FactoryGirl.create(:user)
  end

  it "user has properties" do
    expect(@user).to respond_to(:name)
    expect(@user).to respond_to(:screen_name)
    expect(@user).to respond_to(:image_path)
    expect(@user).to respond_to(:uid)
    expect(@user).to respond_to(:provider)
    expect(@user).to respond_to(:remember_token)
    expect(@user).to respond_to(:oauth_token)
    expect(@user).to respond_to(:oauth_expires_at)

    expect(@user.valid?).to be_truthy
  end

  # ------------------------------
  # name
  # ------------------------------
  it "when name is too long" do
    @user.name = "a" * 51
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # screen_name
  # ------------------------------
  it "when screen_name is too long" do
    @user.screen_name = "a" * 51
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # image_path
  # ------------------------------
  it "when image_path is too long" do
    @user.screen_name = "a" * 201
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # uid
  # ------------------------------
  it "when uid dose not exist" do
    @user.uid = nil
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # provider
  # ------------------------------
  it "when provider dose not exist" do
    @user.provider = nil
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # remember_token
  # ------------------------------
  it "remember_token" do
    @user.save
    expect(@user.remember_token).not_to be_blank
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
  # self.from_omniauth
  # ------------------------------
  describe "#self.from_omniauth", skip: "引数のauthを作成する方法が不明" do
    context "user dose not exist" do
      before {expect(User.where(provider: "facebook", uid: "1111111").all.size).to eq(0)}
      it "create new user" do
        User.from_omniauth({provider: "facebook", uid: "1111111", credentials: {token: "111"}})
        expect(User.where(provider: "facebook", uid: "1111111").all.size).to eq(1)
      end
    end
  end
end
