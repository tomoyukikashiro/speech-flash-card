class SessionsController < ApplicationController

  def oauth
    user = User.from_omniauth(env["omniauth.auth"])
    if user.present?
      login user
      redirect_to root_path, notice: 'Login しました'
    else
      redirect_to root_path, notice: 'Login 失敗しました'
    end
  end

  def oauth_failure
    redirect_to root_path, notice: 'Login 失敗しました'
  end

  def destroy
    logout
    render nothing: true, status: 204
  end
end
