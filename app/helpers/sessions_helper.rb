module SessionsHelper

  def login(user)
    remember_token = User.new_remember_token
    cookies.permanent[:remember_token] = remember_token
    user.update_attribute(:remember_token, User.encrypt(remember_token))
    self.current_user = user
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user
    remember_token = User.encrypt(cookies[:remember_token])
    @current_users ||= User.where(remember_token: remember_token)
    if @current_users.size === 0
      nil
    else
      @current_users.first
    end
  end

  def login?
    !current_user.nil?
  end

  def logout
    self.current_user = nil
    cookies.delete(:remember_token)
  end

end
