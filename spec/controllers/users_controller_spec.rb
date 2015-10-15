require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET : #show : " do
    describe "if you logined" do
      it "should return user data with 200" do
        user = stub_login
        get :show
        expect(response.status).to eq(200)
        expect(response.body).to eq({id: user.id.to_s, name: user.name}.to_json)
      end
    end
    describe "if you don't login" do
      it "should return 204" do
        get :show
        expect(response.status).to eq(204)
      end
    end
  end

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 204" do
        put :update, {id: "11111", user: {name: "example"}}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
      end
      describe "and parameters are valid" do
        it "should return 201" do
          put :update, {id: @user.id, user: {name: "example update"}}
          expect(response.status).to eq(204)
          saved_user = User.where(id: @user.id).first
        end
      end
    end
  end

  describe "DELETE : destroy : " do
    describe "if you do'nt login" do
      it "should return 204" do
        delete :update, {id: "11111"}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
      end
      it "should return 201 and user is deleted" do
        delete :destroy, {id: @user.id}
        expect(response.status).to eq(204)
        saved_user = User.where(id: @user.id)
        expect(saved_user.size).to eq(0)
      end
    end
  end

end
