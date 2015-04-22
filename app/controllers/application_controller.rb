class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  private
    def get_book(user)
      user.books.where(params[:book_id]).first
    end

    def check_book(user)
      book = get_book(user)
      render nothing: true, status: 403 unless book.present?
      yield book
    end

    def check_card(user)
      check_book(user) do | book |
        card = book.cards.where(params[:card_id])
        render nothing: true, status: 403 unless card.present?
        yield card
      end
    end

    def check_user
      user = current_user
      if user.present?
        yield user
      else
        render nothing: true, status: 403
      end
    end
end
