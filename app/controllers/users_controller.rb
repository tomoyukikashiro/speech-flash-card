class UsersController < ApplicationController

  before_filter :check_user, only: [:show, :update, :destroy]

  def show
    render json: {id: @user.id.to_s, name: @user.name}, status: 200
  end

end
