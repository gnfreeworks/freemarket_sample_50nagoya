class ApplicationController < ActionController::Base
  before_action :basic_auth, if: :production?
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  private
  
  def production?
    Rails.env.production?
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :first_name, :last_name, :first_kananame, :last_kananame, :'birthday_date(1i)', :'birthday_date(2i)', :'birthday_date(3i)', :tell_number, :authorization_code, :address_first_name, :address_last_name, :address_firt_kananame, :address_last_kananame, :address_zipcode, :address_prefecture, :address_city, :address_block, :address_building, :address_phone_number])
  end

  def after_sign_in_path_for(resource)
    'http://localhost:3000'
  end
  
  def after_sign_out_path_for(resource)
    new_user_session_path
  end

end
