require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET : #show : " do
    describe "if you logined" do
      it "should return user data with 200" do
        user = stub_login
        get :show
        expect(response.status).to eq(200)
        expect(response.body).to eq({id: user.id.to_s, name: user.name}.to_json)
      end
    end
    describe "if you don't login" do
      it "should return 204" do
        get :show
        expect(response.status).to eq(204)
      end
    end
  end

end
