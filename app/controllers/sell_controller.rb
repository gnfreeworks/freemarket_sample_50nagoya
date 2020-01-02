class SellController < ApplicationController
  include CommonActions
  before_action :set_categories, only: [:index, :new ,:edit]

  def new
    @product = Product.new
    #セレクトボックスの初期値設定
    @category_parent_array = ["---"]
    #データベースから、親カテゴリーのみ抽出し、配列化
    @category_parent.each do |parent|
      @category_parent_array << parent.name
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
    @category_children = ViewCategory.find_by(name: "#{params[:parent_name]}", ancestry: nil).children
  end

  # //子カテゴリーが選択された後に動くアクション
  def get_category_grandchildren
    #選択された子カテゴリーに紐付く孫カテゴリーの配列を取得（子で選択されたカテゴリ内容のdata-categoryの番号で検索）
    @category_grandchildren = ViewCategory.find("#{params[:child_id]}").children
  end

end