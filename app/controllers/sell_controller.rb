class SellController < ApplicationController
  include CommonActions
  before_action :authenticate_user!
  before_action :set_categories, only: [:index, :new ,:edit]
  before_action :set_select, only:[:index,:new,:edit]


  def new
    #データベースに保存する箱を用意
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      ProductsStatus.create(product_id:@product.id, seller_id:current_user.id, category_parent_id:@product.category_parent_id, brand_id:@product.brand,selling_status:0,dealing_status:0)
    end
  end


  def edit
    @product = Product.find(params[:id])
    @productStatus = ProductsStatus.where(product_id: params[:id])
    @url = ProductImage.where(product_id: params[:id])

    # 編集画面で初期値として渡す子カテゴリを抽出
    @category_children_array = []
    ViewCategory.find_by(id: @product.category_parent_id, ancestry: nil).children.each do |children|
      @category_children_array << {id: children[:id], name: children[:name]}
    end

    # 編集画面で初期値として渡す孫カテゴリを抽出
    @category_grandchild_array = []
    ViewCategory.where(ancestry: @product.category_parent_id.to_s + "/" + @product.category_children_id.to_s).each do |grandchild|
      @category_grandchild_array << {id: grandchild[:id], name: grandchild[:name]}
    end

    # 編集画面で初期値として渡すサイズカテゴリを抽出
    @size_array = []
    # Size.where(category_parent_id: @product.category_parent_id, category_children_id: @product.category_children_id)
    SizesCategory.where("(category_parent_id = ?) AND (category_children_id = ?)",@product.category_parent_id,@product.category_children_id).each do |size|
      @size_array << {id: size[:size_id], name: Size.find(size[:size_id]).name }
    end

    # 編集画面で初期値として渡すブランドを抽出
    if Brand.find_by(id: @product.brand)
      @brand = Brand.find_by(id: @product.brand).name
    else
      @brand = ""
    end

    gon.product = @product
    gon.product_images = @product.product_images
    gon.category_chidren_array = @category_children_array
    gon.category_grandchild_array = @category_grandchild_array
    gon.size_array = @size_array
    gon.brand = @brand

    
    # @product.product_imagse.urlをバイナリーデータにしてビューで表示できるようにする
    require 'base64'
    require 'aws-sdk'

    gon.product_images_binary_datas = []

    if Rails.env.production?
      client = Aws::S3::Client.new(
                              region: 'ap-northeast-1',
                              access_key_id: Rails.application.secrets[:aws_access_key_id],
                              secret_access_key: Rails.application.secrets[:aws_secret_access_key],
                              )
      @product.product_images.each do |image|
        binary_data = client.get_object(bucket: 'upload-freemarket', key: image.url.file.path).body.read
        gon.product_images_binary_datas << Base64.strict_encode64(binary_data)
      end
    else
      @product.product_images.each do |image|
        binary_data = File.read(image.url.file.file)
        gon.product_images_binary_datas << Base64.strict_encode64(binary_data)
      end
    end
  end


  def update
    @product = Product.find(params[:id])

    # 登録済画像のidの配列を生成
    ids = @product.product_images.map{|image| image.id }
    # 登録済画像のうち、編集後もまだ残っている画像のidの配列を生成(文字列から数値に変換)
    exist_ids = registered_image_params[:ids].map(&:to_i)
    # 登録済画像が残っていない場合(配列に０が格納されている)、配列を空にする
    exist_ids.clear if exist_ids[0] == 0

    if (exist_ids.length != 0 || new_image_params[:images][0] != " ") && @product.update(item_params)
      # 登録済画像のうち削除ボタンをおした画像を削除
      unless ids.length == exist_ids.length
        # 削除する画像のidの配列を生成
        delete_ids = ids - exist_ids
        delete_ids.each do |id|
          @product.product_images.find(id).destroy
        end
      end

      # 新規登録画像があればcreate
      unless new_image_params[:images][0] == " "
        new_image_params[:images].each do |image|
          @product.product_images.create(url: image, product_id: @product.id)
        end
      end

      flash[:notice] = '編集が完了しました'
      redirect_to item_path(@product), data: {turbolinks: false}

    else
      flash[:alert] = '未入力項目があります'
      redirect_back(fallback_location: root_path)
    end
  end


  def destroy
    @product = Product.find(params[:id])
    if @product.destroy
      # TODO: 出品商品ページへリダイレクトの処理を記載する
    end
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
    params1 = params.require(:product).permit(:name,:description,:price,:area_id,:brand,:status_id,:category_parent_id,:category_children_id,:category_grandchild_id,:size_id,:shipping_charge_id,:shipping_time_id,:shipping_method_id,product_images_attributes:[:url]).merge(sale_charge_id:1)
    profit = profit_calc(params.require(:product)["price"].to_i)
    hash_profit = {"profit" => profit}
    brandId = brand_check(params.require(:product)["brand"])
    if brandId.nil? then
      params1["brand"] = ""
    else
      params1["brand"] = brandId.id
    end
    productParams = params1.merge(profit:profit)
  end

  def profit_calc(price)
    rate = SaleCharge.find(1).rate
    profit = (price * rate.to_f).ceil
  end

  def brand_check(brand)
    brand_id = Brand.find_by(name: brand)
  end


  def item_params
    params1 = params.require(:product).permit(:name,:description,:price,:area_id,:brand,:status_id,:category_parent_id,:category_children_id,:category_grandchild_id,:size_id,:shipping_charge_id,:shipping_time_id,:shipping_method_id).merge(sale_charge_id:1)
    profit = profit_calc(params.require(:product)["price"].to_i)
    hash_profit = {"profit" => profit}
    brandId = brand_check(params.require(:product)["brand"])
    if brandId.nil? then
      params1["brand"] = ""
    else
      params1["brand"] = brandId.id
    end
    productParams = params1.merge(profit:profit)
  end

  def registered_image_params
    params.require(:registered_images_ids).permit({ids: []})
  end

  def new_image_params
    params.require(:new_images).permit({images: []})
  end


  def set_select
    #--- カテゴリー ---
    # 親カテゴリを抽出
    @category_parent_array = ["---"]
    ViewCategory.where(ancestry:nil).each do |parent|
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

end