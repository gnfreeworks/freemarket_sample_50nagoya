class ProductImage < ApplicationRecord
  belongs_to :product, optional: true
  mount_uploader :url, ImageUploader


  # def self.create_photos_by(image_params)
  #   # /* そもそも一枚も上がってきてない時のためのvalidate */
  #   return false if image_params[:image].nil?
  #     # /* 途中でエラった時にRollbackするようにTransaction */
  #     ProductImage.transaction do 
  #     # /* アップロードされた画像を一枚ずつ処理 */
  #     image_params[:image].each do |image|
  #       new_image = ProductImage.new(image: image)
  #       return false unless new_image.save!
  #     end
  #   end
  #   true
  # end

end


