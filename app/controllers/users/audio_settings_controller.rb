class Users::AudioSettingsController < ApplicationController

  before_filter :check_user, only: [:update]

  def update
    if @user.audio_settings.update_attributes(update_params)
      render nothing: true, status: 204
    else
      render json: @user.errors.keys, status: 400
    end
  end

  private

    def update_params
      params.permit(:speed, :repeat)
    end

end
