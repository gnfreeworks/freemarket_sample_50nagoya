class SignupController < ApplicationController
  def step0
      @user = User.new
  end
  def step1
      @user = User.new
  end
  def create
    @user = User.new(user_name)
    @user = User.new(user_kananame)
    @user.save
  end

  def step2
      @user = User.new
  end

  def step3
      @user = User.new
  end

  def step4
      @user = User.new
  end

  def step5
      @user = User.new
  end

  def done
  end

  private
    def name_params
      params.require(:user).permit(:firstname, :lastname)
    end
    def kananame_params
      params.require(:user).permit(:firstkananame, :lastkananame)
    end

    def user_name
      name_params.merge(@user.set_extra_information)
    end
    def user_kananame
      kananame_params.merge(@user.set_extra_information)
    end
end
