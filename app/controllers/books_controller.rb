class BooksController < ApplicationController

  before_filter :check_user
  before_filter :check_book, only: [:update, :destroy]

  def index
    render json: {list: Book.get_all(@user)}.to_json,  status: 200
  end

  def create
    data = accept_params
    book = @user.books.new(name: data[:name])
    if !book.save
      render json: book.errors.keys, status: 400 and return
    end
    if !book.voices.create(name: data[:voices][:name], lang: data[:voices][:lang])
      render json: book.errors.keys, status: 400 and return
    end
    render json: book.get_data, status: 201
  end

  def update
    data = accept_params
    if !@book.update_attributes(name: data[:name])
      render json: @book.errors.keys, status: 400 and return
    end
    # update
    if data[:voices][:id].present?
      voice = @book.voices.where(id: data[:voices][:id]).first
      res = voice.update_attributes(name: data[:voices][:name], lang: data[:voices][:lang])
    else
    # create new data
      res = @book.voices.create(name: data[:voices][:name], lang: data[:voices][:lang])
    end
    unless res
      render json: @book.errors.keys, status: 400 and return
    end
    render nothing: true, status: 204
  end

  def destroy
    if @book.destroy
      render nothing: true, status: 204
    else
      render nothing: true, status: 400
    end
  end

  private
    def accept_params
      params.require(:book).permit(:name, voices: [:name, :lang, :id])
    end
end
