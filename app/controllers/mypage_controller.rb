class MypageController < ApplicationController
  include CommonActions
  before_action :set_categories, only: :index
  before_action :authenticate_user!, except: :index
  
  def index
    @user = current_user
    @evaluation_count = @user.buyer_evaluations.count
    @products_count = ProductsStatus.where(buyer_id: @user.id).count
  end

  def card
    @user = current_user
    @credit_card = @user.payment_method

    unless @credit_card.nil?
      reg = Regexp.new(@credit_card.card_number);
      @credit_card_last4 = (@credit_card.card_number.to_i % 10000).to_s
    end
  end

  def cardDestroy
    credit_card = PaymentMethod.find(paymentMethodId[:id])
    credit_card.destroy
    redirect_to card_mypage_index_path, notice:'クレジットカード情報を削除しました!'
  end
  
  def cardCreate
    @user = current_user
    @credit_card = PaymentMethod.new
  end

  def cardAdd

    @credit_card = PaymentMethod.new(creditParam)
    @credit_card.user_id = current_user.id

    if @credit_card.save
      redirect_to card_mypage_index_path, notice:'クレジットカードを追加しました!'
    else
      flash.now[:alert] = '既に同じカードが存在するため登録できません'
      render :card
    end
  end
 
  def logout
    @user = current_user if user_signed_in?
  end

  def profile
    @user = current_user
  end

  def profileUpdate
    @user = current_user
    if @user.update_attributes(userProfile)
      redirect_to profile_mypage_index_path, notice:'変更しました!!'
    else
      flash.now[:alert] = 'もう一度入力して下さい。'
      render :index
    end
  end
  
  def identification
    @user = current_user
  end

  def identificationSave
    @user = current_user
    if @user.update_attributes(setIndentification)
      redirect_to identification_mypage_index_path, notice:'変更しました!!'      
    else
      flash.now[:alert] = 'もう一度入力して下さい。'
      render :identification
    end
  end

  private
  def userProfile
    params.permit(:nickname, :profiletext)
  end

  def creditParam
    params.require(:payment_method).permit(:user_id, :card_number, :expiration_date, :secrity_code)
  end
  
  def paymentMethodId
    params.require(:payment_method).permit(:id)
  end

  def setIndentification
    params.require(:user).permit(:address_zipcode, :address_prefecture, :address_city, :address_block, :address_building)
  end

end
