class SellController < ApplicationController
  include CommonActions
  before_action :set_categories, only: [:index, :new ,:edit]

  def new
    #--- カテゴリー ---
    @product = Product.new
    #セレクトボックスの初期値設定
    @category_parent_array = ["---"]
    #データベースから、親カテゴリーのみ抽出し、配列化
    @category_parent.each do |parent|
      @category_parent_array << [parent.name,parent.id]
    end
    #--- 商品の状態 ---
    @status = Status.all
    @status_array = ["---",]
    @status.each do |status|
      @status_array << [status.name,status.id]
    end
    #--- 配送料の負担 ---
    @charge = ShippingCharge.all
    @charge_array = ["---",]
    @charge.each do |charge|
      @charge_array << [charge.name,charge.id]
    end
    #--- 発送元の地域 ---
    @area = Area.all
    @area_array = ["---",]
    @area.each do |area|
      @area_array << [area.name,area.id]
    end

    #--- 発送までの日数 ---
    @time = ShippingTime.all
    @time_array = ["---",]
    @time.each do |time|
      @time_array << [time.name,time.id]
    end

  end

  def show

  end

  def edit

  end

  def destroy

  end

  # //親カテゴリーが選択された後に動くアクション
  def get_category_children
    #選択された親カテゴリーに紐付く子カテゴリーの配列を取得（カテゴリ名で検索）
    @category_children = ViewCategory.find_by(id: "#{params[:parent_id]}", ancestry: nil).children
  end

  # //子カテゴリーが選択された後に動くアクション
  def get_category_grandchildren
    #選択された子カテゴリーに紐付く孫カテゴリーの配列を取得（子で選択されたカテゴリ内容のdata-categoryの番号で検索）
    @category_grandchildren = ViewCategory.find("#{params[:child_id]}").children
  end

  # //孫カテゴリーが選択された後に動くアクション
  def get_size
    parentId = "#{params[:parent_id]}".to_i
    # parentId = ViewCategory.find_by(name: params[:parent_id]).id
    selected_CategoryId = Category.where("parent_id=#{parentId} and children_id=#{params[:child_id]} and grandchild_id=#{params[:grandchild_id]}")[0].id
    size_Category = SizesCategory.where(category_id: selected_CategoryId).select("size_id")
    sizeCategory_Array = []
    for i in 0..(size_Category.length-1)
      sizeCategory_Array << Size.find(size_Category[i].size_id)
    end
    @sizes = sizeCategory_Array
  end

end