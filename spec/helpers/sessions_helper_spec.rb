require 'rails_helper'

RSpec.describe SessionsHelper, type: :helper do

  describe "#current_user" do
    describe "if you have logined" do
      it "return logined user" do
        user = FactoryGirl.create(:user)
        login(user)
        expect(current_user()).to eq(user)
      end
    end
    describe "if you have not logined" do
      it "return nil" do
        expect(current_user()).to be_nil
      end
    end
  end

  describe "#login?" do
    describe "if you have logined" do
      it "return true" do
        user = FactoryGirl.create(:user)
        login(user)
        expect(login?).to be_truthy
      end
    end
    describe "if you have not logined" do
      it "return false" do
        expect(login?).to be_falsy
      end
    end
  end

  describe "#logout" do
    describe "if you have logined" do
      it "remember_token in cookie is deleted" do
        user = FactoryGirl.create(:user)
        login(user)
        expect(cookies[:remember_token]).to be_present
        logout
        expect(cookies[:remember_token]).not_to be_present
      end
    end
    describe "if you have not logined" do
      it "remember_token in cookie is deleted" do
        expect(cookies[:remember_token]).not_to be_present
      end
    end
  end
end
