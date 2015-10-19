require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  #describe "GET: #oauth" do
  #  context "success" do
  #    before {allow(User).to receive(:from_omniauth).and_return(FactoryGirl.create(:user))}
  #    it "redirect to root_path with notice" do
  #      post :oauth
  #      expect(response).to redirect_to(root_url)
  #    end
  #  end
  #  context "fail" do
  #  end
  #end

  describe "destroy" do
    context "loggedin" do
      it "logout with 204" do
        user = stub_login
        delete :destroy
        expect(response.status).to eq(204)
        expect(login?).to be_falsy
      end
    end
    context "no loggedin" do
      it "logout with 204" do
        delete :destroy
        expect(response.status).to eq(204)
      end
    end
  end

end
