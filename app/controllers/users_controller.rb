class UsersController < ApplicationController

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
    check_user do | user |
      if user.update_attributes(update_params)
        render nothing: true, status: 201
      else
        render json: user.errors.keys, status: 400
      end
    end
  end

  def destroy
    check_user do | user |
      if user.destroy
        render nothing: true, status: 201
      else
        render nothing: true, status: 400
      end
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
