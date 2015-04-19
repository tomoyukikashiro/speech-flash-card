require 'rails_helper'

RSpec.describe TopPagesController, type: :controller do

  describe "GET : index" do
    it "should be successfull" do
      get :index
      expect(response).to be_success
    end
  end

end
