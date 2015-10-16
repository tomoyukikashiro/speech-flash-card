class TopPagesController < ApplicationController

  include SessionsHelper

  def index
    @is_loggedin = login?
  end
end
