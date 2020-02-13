class ProductsStatusesController < ApplicationController
  include CommonActions
  before_action :set_categories, only: [:index,:show]

  def show
    # 製品情報
    @product_status = ProductsStatus.find(params[:id])

    # 製品名
    @product_name = @product_status.product.name

    # ユーザー情報
    @user = User.find(@product_status.seller_id)
    @seller_name = @user.nickname
    @good_count = @user.buyer_evaluations.where(evaluation_id: 1).count
    @normal_count = @user.buyer_evaluations.where(evaluation_id: 2).count
    @bad_count = @user.buyer_evaluations.where(evaluation_id: 3).count

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
    
  end

  def buy

  end
  
end
