class ProductsStatusesController < ApplicationController
  include CommonActions
  before_action :authenticate_user!, only: [:buy]
  before_action :set_categories, only: [:index,:show]

  require 'date'

  def show
    # 製品情報
    @product_status = ProductsStatus.find(params[:id])

    # 製品名
    @product_name = @product_status.product.name

    # ユーザー情報
    @seller = User.find(@product_status.seller_id)
    @seller_name = @seller.nickname
    @good_count = @seller.buyer_evaluations.where(evaluation_id: 1).count
    @normal_count = @seller.buyer_evaluations.where(evaluation_id: 2).count
    @bad_count = @seller.buyer_evaluations.where(evaluation_id: 3).count

    # カテゴリ
    @large_category_name = ViewCategory.find_by(id: @product_status.product.category_parent_id).name
    @medium_category_name = ViewCategory.find_by(id: @product_status.product.category_children_id).name
    @smail_category_name = ViewCategory.find_by(id: @product_status.product.category_grandchild_id).name

    # ブランド
    brand_id = @product_status.product.brand
    @brand_name = Brand.find(brand_id).name

    # 商品サイズ
    @size_name = @product_status.product.size.name

    # 商品状態
    @status_name = @product_status.product.status.name

    # 配送料負担
    @shipping_charge_name = @product_status.product.shipping_charge.name

    # 配送方法
    @shipping_method_name = @product_status.product.shipping_method.name
    
    # 配送エリア
    area_id = @product_status.product.area_id
    @area = Area.all
    @area.each do |area|
      if area_id == area.id then
        @area_name = area.name
      end
    end

    # 発送までの目安
    time_id = @product_status.product.shipping_time_id
    @time = ShippingTime.all
    @time.each do |time|
      if time_id == time.id then
        @shipping_time_name = time.name
      end
    end
    # 価格
    @price = @product_status.product.price.to_s(:delimited)

    @description = @product_status.product.description

  end

  def buy
    # 製品情報
    @product_status = ProductsStatus.find(params[:id])

    # 購入ユーザー情報
    @user = current_user
    @credit_card = @user.payment_method
    @credit_card_number = @credit_card.card_number.gsub(/\d(?=(\D*\d){4})/, '*')
    @credit_card_expiration_date_year = @credit_card.expiration_date.strftime("%Y")[-2,2]
    @credit_card_expiration_date_month = @credit_card.expiration_date.strftime("%m")
    # @address_zipcode = @address_zipcode.to_s.insert(3, '-')
    
    # 販売ユーザー情報
    @seller = User.find(@product_status.seller_id)
    @seller_name = @seller.nickname

    # 製品名
    @product_name = @product_status.product.name

    # 価格
    @price = @product_status.product.price.to_s(:delimited)


  end
  
end
