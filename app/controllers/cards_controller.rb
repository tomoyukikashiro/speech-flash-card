class CardsController < ApplicationController

  before_filter :check_user
  before_filter :check_book
  before_filter :check_card, only: [:show_detail, :update, :destroy]

  def index
    render json: {list: @book.cards.get_all}.to_json, status: 200
  end

  def show_detail
    render json: @card.get_data.to_json, status: 200
  end

  def create
    card = @book.cards.new(accept_params)
    if card.save
      render json: card.get_data.to_json, status: 201
    else
      render json: card.errors.keys, status: 400
    end
  end

  def update
    if @card.update_attributes(accept_params)
      render nothing: true, status: 201
    else
      render json: @card.errors.keys, status: 400
    end
  end

  def destroy
    if @card.destroy
      render nothing: true, status: 201
    else
      render nothing: true, status: 400
    end
  end

  private
    def accept_params
      params.require(:card).permit(:text, :note)
    end

end
