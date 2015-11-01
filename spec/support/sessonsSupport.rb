module SessionsSupport

  include SessionsHelper

  def stub_login(user=nil)
    _user = user.nil? ? FactoryGirl.create(:user) : user
    login(_user)
    _user
  end

end
