class MypageController < ApplicationController

  before_action :setMonthYear, only: [:cardCreate, :cardAdd]

  def index
    @user = User.find(1)
    @evaluation_count = @user.buyer_evaluations.count
    @products_count = ProductsStatus.where(buyer_id: @user.id).count
  end

  def card
    @user = User.find(1)
  end
  
  def cardCreate
    @user = User.find(1)
    @creditcard = PaymentMethod.new()
  end

  def cardAdd
    @creditcard = PaymentMethod.new(creditParam)

    if @creditcard.user_id = params[:user_id]
      flash.now[:alert] = '既に同じカードが存在するため登録できません'
      render :cardCreate
    else
      if @creditcard.save
        redirect_to cardCreate_user_mypage_index_path, notice:'クレジットカードを追加しました!'
      else
        flash.now[:alert] = 'もう一度入力して下さい'
        render :cardCreate
      end
    end
  end
 
  def profile
    @user = User.find(1)
  end

  def profileUpdate
    @user = User.find(params[:id])

    if @user.update_attributes(userProfile)
      redirect_to profile_user_mypage_index_path, notice:'変更しました!!'
    else
      flash.now[:alert] = 'もう一度入力して下さい。'
      render :index
    end

  end
  
  private
  def setMonthYear
    @month = ['--', '1',  '2',  '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    @year =  {'--': '--', '19': '2019', '20': '2020', '21': '2021', '22': '2022', '23': '2023', '24': '2024', '25': '2025', '26': '2026', '27': '2027', '28': '2028', '29': '2029'}
  end

  def userProfile
    params.permit(:nickname, :profiletext)
  end

  def creditParam
    params.require(:payment_method).permit(:card_number, :expiration_month, :expiration_year, :secrity_code).merge(user_id: params[:user_id])
  end

end
