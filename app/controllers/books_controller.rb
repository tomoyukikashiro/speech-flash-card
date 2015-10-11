class BooksController < ApplicationController

  before_filter :check_user
  before_filter :check_book, only: [:update, :destroy]

  def index
    render json: {list: @user.books.get_all}.to_json,  status: 200
  end

  def create
    data = accept_params
    book = @user.books.new(name: data[:name])
    if !book.save
      render json: book.errors.keys, status: 400 and return
    end
    if !book.voices.create(data[:voice])
      render json: book.errors.keys, status: 400 and return
    end
    render json: book.get_data, status: 201
  end

  def update
    data = accept_params
    if !@book.update_attributes(name: data[:name]) || !data[:voice].kind_of?(Array)
      render json: @book.errors.keys, status: 400 and return
    end
    @book.voices.delete_all
    data[:voice].each do |item|
      if !@book.voices.create(item)
        render json: @book.errors.keys, status: 400 and return
      end
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
      params.require(:book).permit(:name, voice: [:os, :browser, :type])
    end
end
