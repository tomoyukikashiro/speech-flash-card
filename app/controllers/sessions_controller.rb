class SessionsController < ApplicationController

  def create
    user = User.where(email: params[:session][:email].downcase).first
    if user.present? && user.authenticate(params[:session][:password])
      login user
      render nothing: true, status: 201
    else
      render nothing: true, status: 400
    end
  end

  def destroy
    logout
    render nothing: true, status: 201
  end
end
