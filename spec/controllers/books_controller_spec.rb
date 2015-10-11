require 'rails_helper'

RSpec.describe BooksController, type: :controller do

  describe "GET : #index" do
    describe "if you logined" do
      it "should return books data with 200" do
        user = stub_login
        book = FactoryGirl.create(:book, user: user)
        get :index
        expect(response.status).to eq(200)
        res = {
          list: [
            {
              id: book.id.to_s,
              name: book.name,
              first_card_id: "",
              voices: [{id: book.voices.first.id.to_s, os: book.voices.first.os,browser: book.voices.first.browser,type: book.voices.first.type}]
            }
          ]
        }
        expect(response.body).to eq(res.to_json)
      end
    end
    describe "if you don't login" do
      it "should return 204" do
        get :index
        expect(response.status).to eq(204)
      end
    end
  end

  describe "POST : #create : " do
    describe "if you don't login" do
      it "should return 204" do
        post :create, {book: {name: "example"}}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
      end
      describe "if parameters are invalid" do
        it "should return error's keys with 400" do
          post :create, {book: {name: ""}}
          expect(response.status).to eq(400)
          expect(response.body).to eq(["name"].to_json)
        end
      end
      describe "if parameters are valid" do
        it "should return 201 and the user is created" do
          post :create, {book: {name: "example", voice: {os: "mac", browser: "chrome", type: "google chrome English"}}}
          expect(response.status).to eq(201)
          expect(JSON.parse(response.body)).to have_key("id")
          expect(@user.books.first.name).to eq("example")
          expect(@user.books.first.voices.first.os).to eq("mac")
          expect(@user.books.first.voices.first.browser).to eq("chrome")
          expect(@user.books.first.voices.first.type).to eq("google chrome English")
        end
      end
    end
  end

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 403" do
        put :update, {book_id: "11111", book: {name: "example"}}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
        @book = FactoryGirl.create(:book, user: @user)
      end
      describe "and parameters are invalid" do
        it "should return errors's keys with 400" do
          put :update, {book_id: @book.id.to_s, book: {name: ""}}
          expect(response.status).to eq(400)
        end
      end
      describe "and parameters are valid" do
        it "should return 201" do
          put :update, {book_id: @book.id.to_s, book: {name: "example2", voice: [{os: "windows", browser: "Edge", type: "English"}]}}
          expect(response.status).to eq(204)
          saved_book = Book.where(id: @book.id).first
          expect(saved_book.name).to eq("example2")
          expect(saved_book.voices.first.os).to eq("windows")
          expect(saved_book.voices.first.browser).to eq("Edge")
          expect(saved_book.voices.first.type).to eq("English")
        end
      end
    end
  end

  describe "DELETE : destroy : " do
    describe "if you do'nt login" do
      it "should return 403" do
        delete :destroy, {book_id: "11111"}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
        @book = FactoryGirl.create(:book, user: @user)
      end
      it "should return 201 and user is deleted" do
        delete :destroy, {book_id: @book.id.to_s}
        expect(response.status).to eq(204)
        saved_book = Book.where(id: @book.id.to_s)
        expect(saved_book.size).to eq(0)
      end
    end
  end

end
