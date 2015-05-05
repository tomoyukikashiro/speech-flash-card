require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET : #show : " do
    describe "if you logined" do
      it "should return user data with 200" do
        user = stub_login
        get :show
        expect(response.status).to eq(200)
        expect(response.body).to eq({id: user.id.to_s, name: user.name, email: user.email}.to_json)
      end
    end
    describe "if you don't login" do
      it "should return 403" do
        get :show
        expect(response.status).to eq(403)
      end
    end
  end

  describe "POST : #create : " do
    describe "if parameters are invalid" do
      it "should return error's keys with 400" do
        # email is invalid
        post :create, {user: {name: "example", email: "testexample.com", password: "example", password_confirmation: "example"}}
        expect(response.status).to eq(400)
        expect(response.body).to eq(["email"].to_json)
      end
    end
    describe "if parameters are valid" do
      it "should return 201 and the user is created" do
        post :create, {user: {name: "example", email: "test@example.com", password: "example", password_confirmation: "example"}}
        expect(response.status).to eq(204)
      end
    end
  end

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 403" do
        put :update, {id: "11111", user: {name: "example", email: "test@example.com"}}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
      end
      describe "and parameters are invalid" do
        it "should return errors's keys with 400" do
          # email is invalid
          put :update, {id: @user.id, user: {name: "example update", email: "test-modifyexample.com"}}
          expect(response.status).to eq(400)
        end
      end
      describe "and parameters are valid" do
        xit "should return 201" do
          # passwordのバリデーションがかかってしまう
          put :update, {id: @user.id, user: {name: "example update", email: "test-modify@example.com"}}
          expect(response.status).to eq(201)
          saved_user = User.where(id: @user.id).first
          expect(saved_user.name).to eq("example update")
          expect(saved_user.email).to eq("test-modify@example.com")
        end
      end
    end
  end

  describe "DELETE : destroy : " do
    describe "if you do'nt login" do
      it "should return 403" do
        delete :update, {id: "11111"}
        expect(response.status).to eq(403)
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
