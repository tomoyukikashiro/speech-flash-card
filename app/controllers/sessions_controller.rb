class SessionsController < ApplicationController

  def oauth
    user = User.from_omniauth(env["omniauth.auth"])
    if user.present?
      login user
      render nothing: true, status: 204
    else
      render nothing: true, status: 400
    end
  end

  def oauth_failure
    redirect_to root_path
  end

  #def create
  #  user = User.where(email: params[:session][:email].downcase).first
  #  if user.present? && user.authenticate(params[:session][:password])
  #    login user
  #    render nothing: true, status: 204
  #  else
  #    render nothing: true, status: 400
  #  end
  #end

  def destroy
    logout
    render nothing: true, status: 204
  end
end
