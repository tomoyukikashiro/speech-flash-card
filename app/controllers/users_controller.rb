class UsersController < ApplicationController

  include SessionsHelper

  def show
    user = current_user
    if user.present?
      render json: {id: user.id.to_s, name: user.name, email: user.email}, status: 200
    else
      render nothing: true, status: 403
    end
  end

  def create
    user = User.new(create_params)
    if user.save
      login user
      render nothing: true, status: 201
    else
      render json: user.errors.keys, status: 400
    end
  end

  def update
    user = check_user
    if user.nil?
      # do nothing
    elsif user.update_attributes(update_params)
      render nothing: true, status: 201
    else
      render json: user.errors.keys, status: 400
    end
  end

  def destroy
    user = check_user
    if user.destroy
      render nothing: true, status: 201
    else
      render nothing: true, status: 400
    end
  end

  private

    def check_user
      user = current_user
      if user.present? && user.id === params[:id]
        user
      else
        render nothing: true, status: 403
        # TODO
        return nil
      end
    end

    def update_params
      params.require(:user).permit(:name, :email)
    end

    def create_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end
