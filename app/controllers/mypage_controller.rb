class MypageController < ApplicationController

  def index
    @user = User.find(1)
    @evaluation_count = @user.buyer_evaluations.count
    @products_count = ProductsStatus.where(buyer_id: @user.id).count
  end

  def card
    @user = User.find(1)
  end
  
  def cardcreate
    @user = User.find(1)
    @creditcard = PaymentMethod.new()
  end

  def cardadd
  end

  def profile
    @user = User.find(1)
  end

  def profileupdate
    @user = User.find(params[:id])

    if @user.update_attributes(user_profile)
      redirect_to profile_user_mypage_index_path, notice:'変更しました!!'
    else
      redirect_to profile_user_mypage_index_path, alert:'もう一度入力して下さい。'
    end

  end
  
  private

  def user_profile
    params.permit(:nickname, :profiletext)
  end

  def credit_param
    params.permit(:nickname, :profiletext)
  end

end
