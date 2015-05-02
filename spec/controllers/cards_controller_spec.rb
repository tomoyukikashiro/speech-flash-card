require 'rails_helper'

RSpec.describe CardsController, type: :controller do

  before(:each) do
    @user = stub_login
    @book = FactoryGirl.create(:book_with_card, user: @user)
    @card = @book.cards.first
  end

  describe "GET : #index" do
   describe "if you logined" do
      it "should return cards data with 200" do
        get :index, {book_id: @book.id.to_s}
        expect(response.status).to eq(200)
        expect(response.body).to eq({list: [{id: @card.id.to_s, text: @card.text, note: @card.note}]}.to_json)
      end
    end
    describe "if you don't login" do
      it "should return 403" do
        logout
        get :index, {book_id: "111111"}
        expect(response.status).to eq(403)
      end
    end
  end

  describe "POST : #create : " do
    describe "if you don't login" do
      it "should return 403" do
        logout
        post :create, {book_id: @book.id.to_s, card: {text: "text", note: "note"}}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      describe "if parameters are invalid" do
        it "should return error's keys with 400" do
          post :create, {book_id: @book.id.to_s, card: {text: "", note: ""}}
          expect(response.status).to eq(400)
          expect(response.body).to eq(["text"].to_json)
        end
      end
      describe "if parameters are valid" do
        it "should return 201 and the user is created" do
          @card.destroy
          post :create, {book_id: @book.id.to_s, card: {text: "text1", note: "note1"}}
          expect(response.status).to eq(201)
          expect(JSON.parse(response.body)).to have_key("id")
          expect(@user.books.first.cards.first.text).to eq("text1")
          expect(@user.books.first.cards.first.note).to eq("note1")
        end
      end
    end
  end

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 403" do
        logout
        put :update, {book_id: @book.id.to_s, card_id: @card.id.to_s, card: {text: "text1", note: "note1"}}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      describe "and parameters are invalid" do
        it "should return errors's keys with 400" do
          put :update, {book_id: @book.id.to_s, card_id: @card.id.to_s, card: {text: "", note: ""}}
          expect(response.status).to eq(400)
          expect(response.body).to eq(["text"].to_json)
        end
      end
      describe "and parameters are valid" do
        it "should return 201" do
          put :update, {book_id: @book.id.to_s, card_id: @card.id.to_s, card: {text: "text1", note: "note1"}}
          expect(response.status).to eq(201)
          update_card = @user.books.first.cards.where(id: @card.id.to_s).first
          expect(update_card.text).to eq("text1")
          expect(update_card.note).to eq("note1")
        end
      end
    end
  end

  describe "DELETE : destroy : " do
    describe "if you do'nt login" do
      it "should return 403" do
        logout
        delete :destroy, {book_id: @book.id.to_s, card_id: @card.id.to_s}
        expect(response.status).to eq(403)
      end
    end
    describe "if you logined" do
      it "should return 201 and user is deleted" do
        delete :destroy, {book_id: @book.id.to_s, card_id: @card.id.to_s}
        expect(response.status).to eq(201)
        saved_book = Card.where(id: @card.id.to_s)
        expect(saved_book.size).to eq(0)
      end
    end
  end

end
