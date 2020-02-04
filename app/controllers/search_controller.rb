class SearchController < ApplicationController
  include CommonActions
  before_action :set_categories, only: :index
  
  def index
    # レディース
    @ladies_products = ProductsStatus.where("category_parent_id = 1 and buyer_id IS NULL").order(created_at: "DESC").limit(10)

    # メンズ
    @mens_products = ProductsStatus.where("category_parent_id = 219 and buyer_id IS NULL").order(created_at: "DESC").limit(10)
    
    # 家電・スマホ・カメラ
    @goods_products = ProductsStatus.where("category_parent_id = 983 and buyer_id IS NULL").order(created_at: "DESC").limit(10)
    
    # おもちゃ・ホビー・グッズ
    @toy_products = ProductsStatus.where("category_parent_id = 748 and buyer_id IS NULL").order(created_at: "DESC").limit(10)
    
    # ブランド
      # シャネル
    @chanel_products = ProductsStatus.where("brand_id = 2446 and buyer_id IS NULL").order(created_at: "DESC").limit(10)
    
    # ヴィトン
    @lv_products = ProductsStatus.where("brand_id = 6154 and buyer_id IS NULL").order(created_at: "DESC").limit(10)
  end

end
