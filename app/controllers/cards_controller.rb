class CardsController < ApplicationController

  def index
    check_user do | user |
      book = get_book(user)
      if book.present?
        render json: book.cards.get_all.to_json, status: 200
      else
        render nothing: true, status: 403
      end
    end
  end

  def create
    check_user do | user |
      check_book(user) do | book |
        card = book.cards.new(accept_params)
        if card.save
          render nothing: true, status: 201
        else
          render json: card.errors.keys, status: 400
        end
      end
    end
  end

  def update
    check_user do | user |
      check_card(user) do | card |
        if card.update_attributes(accept_params)
          render nothing: true, status: 201
        else
          render json: card.errors.keys, status: 400
        end
      end
    end
  end

  def destroy
    check_user do | user |
      check_card(user) do | card |
        if card.destroy
          render nothing: true, status: 201
        else
          render nothing: true, status: 400
        end
      end
    end
  end

  private
    def accept_params
      params.require(:card).permit(:text, :note)
    end

end
