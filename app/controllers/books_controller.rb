class BooksController < ApplicationController

  before_filter :check_user
  before_filter :check_book, only: [:update, :destroy]

  def index
    render json: {list: @user.books.get_all}.to_json,  status: 200
  end

  def create
    book = @user.books.new(accept_params)
    if book.save
      render json: book.get_data.to_json, status: 201
    else
      render json: book.errors.keys, status: 400
    end
  end

  def update
    if @book.update_attributes(accept_params)
      render nothing: true, status: 201
    else
      render json: @book.errors.keys, status: 400
    end
  end

  def destroy
    if @book.destroy
      render nothing: true, status: 201
    else
      render nothing: true, status: 400
    end
  end

  private
    def accept_params
      params.require(:book).permit(:name)
    end
end
