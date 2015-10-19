class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  force_ssl if: :ssl_configured?

  private
    def ssl_configured?
      Rails.env.production?
    end

    def check_book
      @book = @user.books.where(id: params[:book_id]).first
      return_empty_error(@book)
    end

    def check_voice
      check_book
      @voice = @book.voices
      return_empty_error(@voice)
    end

    def check_card
      @card = @book.cards.where(id: params[:card_id]).first
      return_empty_error(@card)
    end

    def check_user
      @user = current_user
      return_empty_success(@user)
    end

    def return_empty_error(target)
      render nothing: true, status: 404 and return unless target.present?
    end

    def return_empty_success(target)
      render nothing: true, status: 204 and return unless target.present?
    end
end
