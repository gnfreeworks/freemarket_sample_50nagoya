module CommonActions
  extend ActiveSupport::Concern

  def set_categories
    #### カテゴリー表示
    @parents = ViewCategory.where(ancestry: nil)

    #### ブランドは表示したいidを列挙する
    @brands = Brand.where("(id = ?) OR (id = ?) OR (id = ?) OR (id = ?) OR (id = ?) OR (id = ?)", 2446, 3812, 6154, 2446, 219, 3093)

    if user_signed_in?
      #### ログインユーザの評価数
      @evaluation_count = BuyerEvaluation.where(user_id: current_user.id).count
      #### ログインユーザの出品数
      @sale_count = ProductsStatus.where(seller_id: current_user.id).count
    end

  end
end