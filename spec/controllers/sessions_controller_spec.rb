require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe "POST: #create" do
    describe "if user exist find by email you inputed" do
      before do
        @user = User.create(name: "Example User", email: "user@example.com", password: "foobar", password_confirmation: "foobar")
      end
      describe "then password is incorrect" do
        it "you have not logined with 400" do
          post :create, {session: {email: @user.email, password: "incorrect"}}
          expect(response.status).to eq(400)
          expect(login?).to be_falsy
        end
      end
      describe "then password is correct" do
        it "you have logined with 201" do
          post :create, {session: {email: @user.email, password: @user.password}}
          expect(response.status).to eq(201)
          expect(login?).to be_truthy
        end
      end
    end
    describe "if user does not exist you inputed" do
      it "you have not logined with 400" do
        post :create, {session: {email: "noexist@example.com", password: "incorrect"}}
        expect(response.status).to eq(400)
        expect(login?).to be_falsy
      end
    end
  end

end
