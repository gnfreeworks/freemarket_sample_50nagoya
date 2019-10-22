class MypageController < ApplicationController

  def index
    @user = User.find(current_user.id)
    @evaluation_count = @user.buyer_evaluations.count
    @products_count = ProductsStatus.where(buyer_id: @user.id).count
  end

  def card
    @user = User.find(current_user.id)
    @credit_card = @user.payment_method
    unless @credit_card.nil?
      @credit_card_last4 = (@credit_card.card_number.to_i % 10000).to_s
    end
  end
  
  def cardCreate
    @user = User.find(current_user.id)
    @credit_card = PaymentMethod.new
  end

  def cardAdd
    @user = User.find(current_user.id)
    credit_card = PaymentMethod.where(user_id: params[:user_id])
    if credit_card.empty?
      @credit_card = PaymentMethod.create(creditParam)
      redirect_to card_mypage_index_path, notice:'クレジットカードを追加しました!'
    else
      flash.now[:alert] = '既に同じカードが存在するため登録できません'
      render :card
    end
  end
 
  def logout
    @user = User.find(current_user.id) if user_signed_in?
  end

  def profile
    @user = User.find(current_user.id)
  end

  def profileUpdate
    @user = User.find(params[:id])

    if @user.update_attributes(userProfile)
      redirect_to profile_mypage_index_path, notice:'変更しました!!'
    else
      flash.now[:alert] = 'もう一度入力して下さい。'
      render :index
    end

  end
  
  private
  def userProfile
    params.permit(:nickname, :profiletext)
  end

  def creditParam
    params.require(:payment_method).permit(:card_number, :expiration_date, :secrity_code).merge(user_id: params[:user_id])
  end

end
