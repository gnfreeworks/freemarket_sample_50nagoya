class SearchController < ApplicationController
  include CommonActions
  before_action :set_categories, only: :index

  def index
    # レディース
    @ladies_products = ProductsStatus.where("category_parent_id = 1 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @ladies_products_images = base64image(@ladies_products)

    # メンズ
    @mens_products = ProductsStatus.where("category_parent_id = 219 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @mens_products_images = base64image(@mens_products)
    
    # 家電・スマホ・カメラ
    @goods_products = ProductsStatus.where("category_parent_id = 983 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @goods_products_images = base64image(@goods_products)
    
    # おもちゃ・ホビー・グッズ
    @toy_products = ProductsStatus.where("category_parent_id = 748 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @toy_products_images = base64image(@toy_products)
    
    # ブランド
      # シャネル
    @chanel_products = ProductsStatus.where("brand_id = 2446 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @chanel_products_images = base64image(@chanel_products)
    
    # ヴィトン
    @lv_products = ProductsStatus.where("brand_id = 6154 and buyer_id IS NULL").order(created_at: :desc).limit(10)
    @lv_products_images = base64image(@lv_products)
  end


  def base64image(products)

    # product_imagse.urlをバイナリーデータにしてビューで表示できるようにする
    require 'base64'
    require 'aws-sdk'

    product_images_binary_datas = []

    if Rails.env.production?
      client = Aws::S3::Client.new(
                              region: 'ap-northeast-1',
                              access_key_id: Rails.application.secrets[:aws_access_key_id],
                              secret_access_key: Rails.application.secrets[:aws_secret_access_key],
                              )
      # products.product.product_images.each do |image|
      products.each do |product|
        # binary_data = client.get_object(bucket: 'upload-freemarket', key: image.url.file.path).body.read
        # binary_data = client.get_object(bucket: 'upload-freemarket', key: 'uploads/product_image/url/1/スクリーンショット_2020-02-04_13.55.54.png').body.read
        binary_data = client.get_object(bucket: 'upload-freemarket', key: product.product.product_images[0].url.file.file).body.read
        product_images_binary_datas << Base64.strict_encode64(binary_data)
      end
      return product_images_binary_datas
    else
      products.each do |product|
        binary_data = File.read(product.product.product_images[0].url.file.file)
        product_images_binary_datas << Base64.strict_encode64(binary_data)
      end
      return product_images_binary_datas
    end

  end

end
