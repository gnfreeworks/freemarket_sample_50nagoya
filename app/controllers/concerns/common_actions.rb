module CommonActions
  extend ActiveSupport::Concern

  def set_categories

    #### カテゴリー表示
    @category_parent = ViewCategory.where(ancestry: nil)
    @category_children1  = ViewCategory.where(ancestry: 1)     #レディース
    @category_children2  = ViewCategory.where(ancestry: 219)   #メンズ
    @category_children3  = ViewCategory.where(ancestry: 378)   #ベビー・キッズ
    @category_children4  = ViewCategory.where(ancestry: 528)   #インテリア・住まい・小物
    @category_children5  = ViewCategory.where(ancestry: 682)   #本・音楽・ゲーム
    @category_children6  = ViewCategory.where(ancestry: 748)   #おもちゃ・ホビー・グッズ
    @category_children7  = ViewCategory.where(ancestry: 872)   #コスメ・香水・美容
    @category_children8  = ViewCategory.where(ancestry: 983)   #家電・スマホ・カメラ
    @category_children9  = ViewCategory.where(ancestry: 1079)  #スポーツ・レジャー
    @category_children10 = ViewCategory.where(ancestry: 1200)  #ハンドメイド
    @category_children11 = ViewCategory.where(ancestry: 1259)  #チケット
    @category_children12 = ViewCategory.where(ancestry: 1326)  #自動車・オートバイ
    @category_children13 = ViewCategory.where(ancestry: 1395)  #その他

    #### ブランドは表示したいidを列挙する
    @brands = Brand.where("(id = ?) OR (id = ?) OR (id = ?) OR (id = ?) OR (id = ?) OR (id = ?)", 2446, 3812, 6154, 2446, 219, 3093)
  end
end