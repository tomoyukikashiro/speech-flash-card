require 'rails_helper'

describe UsersController do
  render_views

  describe "GET 'show'" do
    before(:each) do
      @user = FactoryGirl.create(:user)
    end

    it "should be successfull" do
      get :show, :id => @user
      expect(response).to be_success
    end
  end

  describe "GET 'Sign up'" do
    it "should be successfull" do
      get :new
      expect(response).to be_success
    end
  end
end
