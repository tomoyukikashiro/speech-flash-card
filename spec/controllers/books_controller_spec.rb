require 'rails_helper'

RSpec.describe BooksController, type: :controller do

  describe "GET : #index" do
    describe "if you logined" do
      it "should return books data with 200" do
        user = stub_login
        user.books.create(name: "aaaaa")
        book = user.books.first
        get :index, {book_id: book.id}
        expect(response.status).to eq(200)
        expect(response.body).to eq([{id: book.id, name: book.name}].to_json)
      end
    end
    describe "if you don't login" do
      it "should return 403" do
        get :index
        expect(response.status).to eq(403)
      end
    end
  end

  describe "POST : #create : " do
    describe "if you don't login" do
      it "should return 403" do
        post :create, {book: {name: "example"}}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      before do
        user = stub_login
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
          post :create, {book: {name: "example"}}
          expect(response.status).to eq(201)
          expect(user.books.first.name).to eq("example")
        end
      end
    end
  end

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 403" do
        put :update, {id: "11111", book: {name: "example"}}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
        @user.books.create(name: "example")
        @book = @user.books.first
      end
      describe "and parameters are invalid" do
        it "should return errors's keys with 400" do
          put :update, {id: @book.id, book: {name: ""}}
          expect(response.status).to eq(400)
        end
      end
      describe "and parameters are valid" do
        it "should return 201" do
          put :update, {id: @book.id, book: {name: "example2"}}
          expect(response.status).to eq(201)
          saved_book = Book.where(id: @book.id).first
          expect(saved_book.name).to eq("example2")
        end
      end
    end
  end

  describe "DELETE : destroy : " do
    describe "if you do'nt login" do
      it "should return 403" do
        delete :destroy, {id: "11111"}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
        @user.books.create(name: "example")
        @book = @user.books.first
      end
      it "should return 201 and user is deleted" do
        delete :destroy, {id: @book.id}
        expect(response.status).to eq(201)
        saved_book = Book.where(id: @book.id)
        expect(saved_book.size).to eq(0)
      end
    end
  end

end
