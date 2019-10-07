class SignupController < ApplicationController
  def step0
    @user = User.new
  end

  def step1
    @user = User.new
  end

  def create
  end

  def step2
    if user_params_step1[:password] = user_params_step1[:password_confirmation] 
      session[:step1] = user_params_step1
      session[:step1].delete(:password_confirmation) 
      @user = User.new
      else
    end

  end

  def step3
    @tell_number = user_params_step2
    @user = User.new
  end

  def step4
    if user_params_step3 = '3333' 
      user_params = session[:step1]
      @user = User.new(user_params)
      binding.pry
    else
    end
  end

  def step5
      @user = User.new
  end

  def done
  end

  private
    def user_params_step1
      params.require(:user).permit(:nickname, :maildaddress, :password, :password_confirmation, :first_name, :last_name, :first_kananame, :last_kananame )
    end

    def user_params_step2
      params.require(:user).permit(:tell_number)
    end

    def user_params_step3
      params.require(:user).permit(:authorization_code)
    end

end
