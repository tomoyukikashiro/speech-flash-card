class UsersController < ApplicationController

  # ユーザ情報を返すAPI
  def show
  end

  # ユーザ新規登録API
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      render nothing: true, status: 201
    else
    end
  end

  # ユーザ新規更新API
  def update
  end

  # ユーザ新規削除API
  def destroy
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end
