class SearchController < ApplicationController
  include CommonActions
  before_action :set_categories, only: :index
  
  def index
    #レディース商品
    @ladies_products = ProductsStatus.where("category_parent_id = 1 and buyer_id IS NULL").limit(10)
    
    #メンズ商品
    @mens_products = ProductsStatus.where("category_parent_id = 219 and buyer_id IS NULL").limit(10)

    # 家電・スマホ・カメラ カテゴリ
    @goods_products = ProductsStatus.where("category_parent_id = 983 and buyer_id IS NULL").limit(10)

    # おもちゃ・ホビー・グッズ カテゴリ
    @toy_products = ProductsStatus.where("category_parent_id = 748 and buyer_id IS NULL").limit(10)

    # シャネル ブランド
    @chanel_products = ProductsStatus.where("brand_id = 2446 and buyer_id IS NULL").limit(10)

    # ルイヴィトン ブランド
    @lv_products = ProductsStatus.where("brand_id = 6154 and buyer_id IS NULL").limit(10)
  end

end
