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
    @month = ['--', '1',  '2',  '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    @year =  {'--': '--', '19': '2019', '20': '2020', '21': '2021', '22': '2022', '23': '2023', '24': '2024', '25': '2025', '26': '2026', '27': '2027', '28': '2028', '29': '2029'}
    @creditcard = PaymentMethod.new()
  end

  def cardadd
    @creditcard = PaymentMethod.new(credit_param)
    if @creditcard.save
      redirect_to cardcreate_user_mypage_index_path, notice:'クレジットカードを追加しました!'
    else
      redirect_to cardcreate_user_mypage_index_path, notice:'もう一度入力して下さい'
    end

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
    params.require(:payment_method).permit(:card_number, :expiration_month, :expiration_year, :secrity_code).merge(user_id: params[:user_id])
  end

end
