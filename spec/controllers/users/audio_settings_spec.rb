require 'rails_helper'

RSpec.describe Users::AudioSettingsController, type: :controller do

  describe "PUT : #update : " do
    describe "if you do'nt login" do
      it "should return 204" do
        put :update, {speed: 6, repeat: 'card'}
        expect(response.status).to eq(204)
      end
    end
    describe "if you logined" do
      before do
        @user = stub_login
      end
      describe "and parameters are invalid" do
        it "should return errors's keys with 400" do
          put :update, {speed: 'card', repeat: 6}
          expect(response.status).to eq(400)
        end
      end
      describe "and parameters are valid" do
        it "should return 204" do
          put :update, {speed: 6, repeat: 'card'}
          expect(response.status).to eq(204)
          as = User.where(id: @user.id).first.audio_settings
          expect(as.speed).to eq(6)
          expect(as.repeat).to eq("card")
        end
      end
    end
  end

end
