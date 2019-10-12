class SignupController < ApplicationController

  
  def step0
    @user = User.new
  end

  def step1
    @user = User.new
  end

  def update
  end

  def create
  end

  def step2
    if user_params_step1[:password] == user_params_step1[:password_confirmation] 
      session[:step1] = user_params_step1
      session[:step1].delete(:password_confirmation) 
      @user = User.new
    else
    end
  end
  
  def show
    @creditcard = PaymentMethod.new
  end

  def step3
    @tell_number = user_params_step2
    @user = User.new
  end

  def step4
    if user_params_step3 = '3333'
      user_params = session[:step1]
      user = User.create(user_params)
      session[:id] = user.id
      session.delete(:step1)
      @user = User.new
    end
  end

  def step5
    session[:step4] = user_params_step4
    @creditcard = PaymentMethod.new
  end

  def done
    user = User.find(session[:id])
    user.update(session[:step4])
    payment = PaymentMethod.new(user_params_step5)
    payment.save
    binding.pry
    session.delete(:id)
    session.delete(:step4)
  end

  private
    def user_params_step1
      params.require(:user).permit(:nickname,
                                   :maildaddress,
                                   :password,
                                   :password_confirmation,
                                   :first_name,
                                   :last_name,
                                   :first_kananame,
                                   :last_kananame,
                                   :'birthday_date(1i)',
                                   :'birthday_date(2i)',
                                   :'birthday_date(3i)')
    end

    def user_params_step2
      params.require(:user).permit(:tell_number)
    end

    def user_params_step3
      params.require(:user).permit(:authorization_code)
    end

    def user_params_step4
      params.require(:user).permit(:address_first_name,
                                  :address_last_name,
                                  :address_firt_kananame,
                                  :address_last_kananame,
                                  :address_zipcode,
                                  :address_prefecture,
                                  :address_block,
                                  :address_number,
                                  :address_phone_number)
    end

    def user_params_step5
      params.require(:payment_method).permit(:card_number,
                                  :'expiration_date(2i)',
                                  :'expiration_date(1i)',
                                  :'expiration_date(3i)',
                                  :secrity_code,
                                  :address_prefecture,
                                  :address_block,
                                  :address_number,
                                  :address_phone_number).merge(user_id: session[:id])
    end
end
