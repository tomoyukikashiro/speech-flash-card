class BooksController < ApplicationController

  def index
    check_user do | user |
      render json: {list: user.books.get_all}.to_json,  status: 200
    end
  end

  def create
    check_user do | user |
      book = user.books.new(accept_params)
      if book.save
        render json: book.get_data.to_json, status: 201
      else
        render json: book.errors.keys, status: 400
      end
    end
  end

  def update
    check_user do | user |
      check_book(user) do | book |
        if book.update_attributes(accept_params)
          render nothing: true, status: 201
        else
          render json: book.errors.keys, status: 400
        end
      end
    end
  end

  def destroy
    check_user do | user |
      check_book(user) do | book |
        if book.destroy
          render nothing: true, status: 201
        else
          render nothing: true, status: 400
        end
      end
    end
  end

  private
    def accept_params
      params.require(:book).permit(:name)
    end
end
