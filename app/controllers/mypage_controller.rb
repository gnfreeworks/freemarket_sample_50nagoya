class MypageController < ApplicationController

  def index
    @user = User.find(1)
    @evaluation_count = @user.buyer_evaluations.count
    @products_count = ProductsStatus.where(buyer_id: @user.id).count
  end

  def profile
    @user = User.find(1)  

  end

  def profileupdate
    @user = User.find(params[:id])
    if @user.update_attributes(user_profile)
      render 'profile'
    else
      render 'profile'
    end

  end
  
  private

  def user_profile
    params.permit(:nickname, :profiletext)
  end

end
