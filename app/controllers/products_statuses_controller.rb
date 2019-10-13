class ProductsStatusesController < ApplicationController

  def index
    # 製品情報
    @product_status = ProductsStatus.find(1)

    # 製品名
    @product_name = @product_status.product.name

    # ユーザー情報
    @user = User.find(@product_status.buyer_id)
    @buyer_name = @user.name
    @good_count = @user.buyer_evaluations.where(evaluation_id: 1).count
    @normal_count = @user.buyer_evaluations.where(evaluation_id: 2).count
    @bad_count = @user.buyer_evaluations.where(evaluation_id: 3).count

    # カテゴリ
    @large_category = @product_status.product.category.large_category.name
    @medium_category = @product_status.product.category.medium_category.name
    @smail_category = @product_status.product.category.smail_category.name

    # ブランド
    brand_id = @product_status.product.brand
    @brand_name = Brand.find(brand_id).name

    # 商品サイズ
    @size = @product_status.product.size.name

    # 商品状態
    @status = @product_status.product.status.name

    # 配送料負担
    @shipping_charge = @product_status.product.shipping_charge.name

    # 配送方法 - テーブル・カラム清水さんに確認中
    @shipping_method = @product_status.product.shipping_method.name
    
    # 配送元地域
    @area = @product_status.product.area.name

    # 発送日目安
    @shipping_time = @product_status.product.shipping_time.name

    # 価格
    @price = @product_status.product.price.to_s(:delimited)

    # 商品詳細文
    @description = @product_status.product.description
  
  end
end
