class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  private
    def check_book
      @book = @user.books.where(id: params[:book_id]).first
      return_empty(@book)
    end

    def check_voice
      check_book
      @voice = @book.voices
      return_empty(@voice)
    end

    def check_card
      @card = @book.cards.where(id: params[:card_id]).first
      return_empty(@card)
    end

    def check_user
      @user = current_user
      return_empty(@user)
    end

    def return_empty(target)
      render nothing: true, status: 204 and return unless target.present?
    end
end
