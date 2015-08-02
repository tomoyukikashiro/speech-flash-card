class UsersController < ApplicationController

  before_filter :check_user, only: [:show, :update, :destroy]

  def show
    render json: {id: @user.id.to_s, name: @user.name, email: @user.email, audio_settings: {speed: @user.audio_settings.speed, repeat: @user.audio_settings.repeat}}, status: 200
  end

  def create
    user = User.new(create_params)
    if user.save
      login user
      render nothing: true, status: 204
    else
      render json: user.errors.keys, status: 400
    end
  end

  def update
    if @user.update_attributes(update_params)
      render nothing: true, status: 204
    else
      render json: @user.errors.keys, status: 400
    end
  end

  def destroy
    if @user.destroy
      render nothing: true, status: 204
    else
      render nothing: true, status: 400
    end
  end

  private

    def update_params
      params.require(:user).permit(:name, :email)
    end

    def create_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end
