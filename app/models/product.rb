class Product < ApplicationRecord
  belongs_to :shipping_charge
  belongs_to :shipping_time
  belongs_to :shipping_method
  belongs_to :status
  belongs_to :sale_charge
  belongs_to :size
  belongs_to :category
  belongs_to :view_categories
  has_many   :products_statuses
  has_many   :product_images, dependent: :destroy
  accepts_nested_attributes_for :product_images
  
  # refer to active has github(https://github.com/zilkey/active_hash/blob/master/README.md)
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :area
end
