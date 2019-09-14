class ProductsStatus < ApplicationRecord
  belongs_to  :product
  belongs_to  :buyer, class_name: 'User', :foreign_key => 'buyer_id'
  belongs_to  :seller, class_name: 'User', :foreign_key => 'seller_id'
  has_one     :canseling_product
  has_many    :todos
  has_many    :goods
  has_many    :user, through: :goods
end
