require 'rails_helper'

RSpec.describe User, :type => :model do
  before do
    @user = User.create(name: "Example User", email: "user@example.com", password: "foobar", password_confirmation: "foobar")
  end

  it "user has properties" do
    expect(@user).to respond_to(:name)
    expect(@user).to respond_to(:email)
    expect(@user).to respond_to(:password)
    expect(@user).to respond_to(:password_digest)
    expect(@user).to respond_to(:password_confirmation)
    expect(@user).to respond_to(:remember_token)
    expect(@user).to respond_to(:authenticate)
    expect(@user.valid?).to be_truthy
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
  describe "when name is not present" do
    before { @user.name = "" }
    it { should_not be_valid }
  end
  it "when name is not present" do
    @user.name = ""
    expect(@user.valid?).to be_falsey
  end
  it "when is too long" do
    @user.name = "a" * 51
    expect(@user.valid?).to be_falsey
  end
  # ------------------------------
  # email
  # ------------------------------
  it "when email is not present" do
    @user.email = ""
    expect(@user.valid?).to be_falsey
  end
  it "when email format is invalid" do
    addresses = %w[user@foo,com user_at_foo.org example.user@foo.foo@bar_baz.com foo@bar+baz.com]
    addresses.each do |invalid_address|
      @user.email = invalid_address
      expect(@user).not_to be_valid
    end
  end
  describe "when email format is valid" do
    it "should be valid" do
      addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
      addresses.each do |valid_address|
        @user.email = valid_address
        expect(@user).to be_valid
      end
    end
  end
  it "when email address is already taken" do
     user_with_same_email = @user.dup
     user_with_same_email.save
     expect(user_with_same_email.valid?).to be_falsey
  end
  it "when email address is already taken (uppercase)" do
     user_with_same_email = @user.dup
     user_with_same_email.email = @user.email.upcase
     user_with_same_email.save
     expect(user_with_same_email.valid?).to be_falsey
  end
  # ------------------------------
  # password
  # ------------------------------
  it "when password is not present" do
    @user = User.create(name: "Example User", email: "user@example.com",password: " ", password_confirmation: " ")
    expect(@user.valid?).to be_falsey
  end
  it "when password dose not match confirmation" do
    @user.password_confirmation = "missmatch"
    expect(@user.valid?).to be_falsey
  end
  describe "return value of authenticate method" do
    before do
      @user.save
    end
    let(:found_user) { User.find_by(email: @user.email) }
    it "with valid password" do
      expect(@user).to eq(found_user.authenticate(@user.password))
    end
    let(:user_for_invalid_password) { found_user.authenticate("invalid") }
    it "with invalid password" do
      expect(@user).not_to eq user_for_invalid_password
      expect(user_for_invalid_password).to be_falsey
    end
  end
  it "with a password that's too short" do
    @user.password = @user.password_confirmation = "a" * 5
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
