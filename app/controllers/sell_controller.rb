class SellController < ApplicationController
  include CommonActions
  before_action :authenticate_user!
  before_action :set_categories, only: [:index, :new ,:edit]

  def new
    #データベースに保存する箱を用意
    @product = Product.new
    10.times { @product.product_images.build }

    #--- カテゴリー ---
    #セレクトボックスの初期値設定
    @category_parent_array = ["---"]
    
    #データベースから、親カテゴリーのみ抽出し、配列化
    @category_parent = ViewCategory.where("ancestry is Null")
    @category_parent.each do |parent|
      @category_parent_array << [parent[:name],parent[:id]]
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

  def create
    @product = Product.create(product_params)
    @productStatus = ProductsStatus.create(product_id:@product.id,seller_id:current_user.id,category_parent_id:@product.category_parent_id,brand_id:@product.brand,selling_status:"0",dealing_status:"0")
    image_params[:urls].each do |image|
      @image = ProductImage.new(url: image, product_id: @product.id)
      if !@image.save
        render action: :new
      end
    end
  end

  def edit
    
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
    size_Category = SizesCategory.where("category_parent_id=#{parentId} and category_children_id=#{params[:child_id]}").select("size_id")
    sizeCategory_Array = []
    for i in 0..(size_Category.length-1)
      sizeCategory_Array << Size.find(size_Category[i].size_id)
    end
    @sizes = sizeCategory_Array
  end

  def get_brand
    @brands = Brand.brand_search(params[:keyword]) # brand_serchメソッドはbrandモデルに記載
  end

  # //配送料の負担が選択された後に動くアクション(配送方法を取得)
  def get_method
    @methods = ShippingMethod.all
  end

private

  def product_params
    params1 = params.require(:product).permit(:name,:description,:price,:area_id,:brand,:status_id,:category_parent_id,:shipping_charge_id,:shipping_time_id,:shipping_method_id)
    params2 = params.permit(:size_id,:category_children_id,:category_grandchildren_id).merge(sale_charge_id:1)
    profit = profit_calc(params.require(:product)["price"].to_i)
    hash_profit = {"profit" => profit}
    brandId = brand_check(params.require(:product)["brand"])
    
    if brandId.nil? then
      params1["brand"] = ""
    else
      params1["brand"] = brandId
    end
    
    productParams = params1.merge(params2).merge(hash_profit)
  end

  def image_params
    params.require(:product).permit({urls: []})
  end

  def profit_calc(price)
    rate = SaleCharge.find(1).rate
    profit = (price * rate.to_f).ceil
  end

  def brand_check(brand)
    brand_id = Brand.find_by(name: brand).id
  end


end